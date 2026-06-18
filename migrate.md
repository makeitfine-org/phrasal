# Migration Guide: Phrasal → Full-Stack (Java + React + K8s + AWS)

This document is a step-by-step instruction to split the current single-page React app into a **Java backend** (Spring Boot, MongoDB, Elasticsearch) and a **React frontend**, deploy locally with **Kubernetes + Skaffold**, and ship to **AWS** as cheaply as possible.

---

## Table of Contents

1. [Current Architecture](#1-current-architecture)
2. [Target Architecture](#2-target-architecture)
3. [Monorepo Structure](#3-monorepo-structure)
4. [Phase 1 — Backend (Java / Spring Boot)](#4-phase-1--backend)
5. [Phase 2 — Frontend Adaptation](#5-phase-2--frontend-adaptation)
6. [Phase 3 — Local Kubernetes with Skaffold](#6-phase-3--local-kubernetes-with-skaffold)
7. [Phase 4 — AWS Deployment (Cheapest Path)](#7-phase-4--aws-deployment)
8. [Cost Estimate](#8-cost-estimate)
9. [Migration Checklist](#9-migration-checklist)

---

## 1. Current Architecture

```
┌─────────────────────────────────────────────┐
│              GitHub Pages (static)          │
│                                             │
│  React 18 + TypeScript + Vite + Tailwind    │
│  ┌────────────┐  ┌───────────────────────┐  │
│  │ Quiz Pages │  │ Verb Detail Pages (71)│  │
│  │ App.tsx    │  │ src/pages/{verb}/      │  │
│  │ IWishPage  │  │ VerbPageLayout         │  │
│  └────────────┘  └───────────────────────┘  │
│  ┌────────────────────────────────────────┐  │
│  │ Hardcoded data (src/data/)             │  │
│  │  phrasalVerbs.ts  ~280 RawVerbEntry[]  │  │
│  │  wishData.ts      ~6 GrammarEntry[]    │  │
│  │  listVerbIndex.ts (derived index)      │  │
│  └────────────────────────────────────────┘  │
│  State: localStorage only, no auth          │
└─────────────────────────────────────────────┘
```

**Key facts:**
- All data is baked into the JS bundle (no API calls)
- State lives in `localStorage` (`phrasalQuizState`, `grammarIWishState`, `verbListExpanded`)
- No authentication, no user accounts
- Deployed as static files to GitHub Pages at `/phrasal/`

---

## 2. Target Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Kubernetes Cluster                       │
│                                                                 │
│  ┌──────────────────┐    ┌──────────────────────────────────┐   │
│  │   frontend (nginx)│    │       backend (Spring Boot)      │   │
│  │   React SPA       │───▶│  /api/v1/verbs                  │   │
│  │   Port 80         │    │  /api/v1/verbs/{verb}            │   │
│  │                   │    │  /api/v1/verbs/search?q=         │   │
│  │                   │    │  /api/v1/grammar/wish             │   │
│  │                   │    │  /api/v1/quiz/state (CRUD)       │   │
│  │                   │    │  Port 8080                       │   │
│  └──────────────────┘    └──────┬──────────┬────────────────┘   │
│                                 │          │                     │
│                          ┌──────▼───┐ ┌────▼──────────┐         │
│                          │ MongoDB  │ │ Elasticsearch │         │
│                          │ Port     │ │ Port 9200     │         │
│                          │ 27017    │ │ (full-text    │         │
│                          │          │ │  search)      │         │
│                          └──────────┘ └───────────────┘         │
└─────────────────────────────────────────────────────────────────┘
```

**Data flow:**
- MongoDB = source of truth (verbs, grammar entries, user quiz state)
- Elasticsearch = search index (verb meanings, examples — powers the search modals)
- Frontend fetches everything via REST API (no hardcoded data)

---

## 3. Monorepo Structure

```
phrasal/
├── frontend/                    # React app (moved from root)
│   ├── src/
│   │   ├── api/                 # NEW — API client layer
│   │   │   ├── client.ts        # axios/fetch wrapper, base URL config
│   │   │   ├── verbs.ts         # getVerbs(), getVerb(), searchVerbs()
│   │   │   ├── grammar.ts       # getWishData()
│   │   │   └── quizState.ts     # getState(), saveState()
│   │   ├── hooks/
│   │   │   └── useApi.ts        # NEW — generic fetch hook with loading/error
│   │   ├── components/          # existing components (unchanged)
│   │   ├── pages/               # existing pages (adapted to use API)
│   │   ├── types.ts             # shared types (keep + extend)
│   │   └── main.tsx
│   ├── nginx.conf               # NEW — serves SPA + proxies /api → backend
│   ├── Dockerfile               # NEW
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                     # NEW — Java Spring Boot
│   ├── src/main/java/com/phrasal/
│   │   ├── PhrasalApplication.java
│   │   ├── config/
│   │   │   ├── MongoConfig.java
│   │   │   ├── ElasticsearchConfig.java
│   │   │   └── CorsConfig.java
│   │   ├── controller/
│   │   │   ├── VerbController.java
│   │   │   ├── GrammarController.java
│   │   │   └── QuizStateController.java
│   │   ├── service/
│   │   │   ├── VerbService.java
│   │   │   ├── GrammarService.java
│   │   │   ├── SearchService.java
│   │   │   └── QuizStateService.java
│   │   ├── repository/
│   │   │   ├── VerbRepository.java
│   │   │   ├── GrammarRepository.java
│   │   │   ├── QuizStateRepository.java
│   │   │   └── VerbSearchRepository.java
│   │   ├── model/
│   │   │   ├── Verb.java
│   │   │   ├── VerbMeaning.java
│   │   │   ├── VerbSection.java
│   │   │   ├── GrammarEntry.java
│   │   │   └── QuizState.java
│   │   ├── dto/
│   │   │   ├── VerbResponse.java
│   │   │   ├── VerbListResponse.java
│   │   │   ├── GrammarResponse.java
│   │   │   └── QuizStateRequest.java
│   │   └── seed/
│   │       └── DataSeeder.java  # migrates hardcoded data → MongoDB
│   ├── src/main/resources/
│   │   ├── application.yml
│   │   └── application-local.yml
│   ├── Dockerfile
│   ├── pom.xml
│   └── seed-data/               # JSON exports of current TS data
│       ├── phrasal-verbs.json
│       └── wish-data.json
│
├── k8s/                         # Kubernetes manifests
│   ├── base/
│   │   ├── namespace.yaml
│   │   ├── frontend-deployment.yaml
│   │   ├── frontend-service.yaml
│   │   ├── backend-deployment.yaml
│   │   ├── backend-service.yaml
│   │   ├── mongodb-statefulset.yaml
│   │   ├── mongodb-service.yaml
│   │   ├── elasticsearch-statefulset.yaml
│   │   ├── elasticsearch-service.yaml
│   │   └── kustomization.yaml
│   └── overlays/
│       ├── local/
│       │   └── kustomization.yaml
│       └── aws/
│           └── kustomization.yaml
│
├── skaffold.yaml
├── docker-compose.yaml          # alternative local dev without K8s
└── README.md
```

---

## 4. Phase 1 — Backend

### 4.1 Initialize Spring Boot project

```bash
mkdir -p backend
cd backend

# Use Spring Initializr (or curl):
curl https://start.spring.io/starter.zip \
  -d type=maven-project \
  -d language=java \
  -d bootVersion=3.3.0 \
  -d baseDir=. \
  -d groupId=com.phrasal \
  -d artifactId=phrasal-backend \
  -d name=phrasal-backend \
  -d packageName=com.phrasal \
  -d javaVersion=21 \
  -d dependencies=web,data-mongodb,data-elasticsearch,validation,actuator,devtools \
  -o starter.zip && unzip starter.zip && rm starter.zip
```

### 4.2 MongoDB document schemas

**Verb collection** — maps from `RawVerbEntry` and verb page `SectionData`:

```java
// model/Verb.java
@Document(collection = "verbs")
public class Verb {
    @Id
    private String id;

    @Indexed(unique = true)
    private String verb;          // e.g. "break"

    private List<VerbSection> sections;   // particle groups
    private List<QuizEntry> quizEntries;  // from rawData
    private boolean isLearned;

    // --- nested ---
    public record VerbSection(
        String particle,          // e.g. "away", "down"
        String title,             // "Break away"
        List<VerbMeaning> meanings
    ) {}

    public record VerbMeaning(
        String meaning,           // definition
        List<String> examples,    // example sentences
        List<String> wordsToHide  // for quiz masking
    ) {}

    public record QuizEntry(
        String verb,              // "Break down"
        String definition,
        List<String> sentences,
        List<String> wordsToHide,
        boolean isLearned
    ) {}
}
```

**MongoDB document example:**

```json
{
  "_id": "ObjectId(...)",
  "verb": "break",
  "sections": [
    {
      "particle": "away",
      "title": "Break away",
      "meanings": [
        {
          "meaning": "To flee or escape from someone or something physically",
          "examples": [
            "The puppy slipped its leash and tried to break away into the woods."
          ],
          "wordsToHide": ["break away"]
        }
      ]
    },
    {
      "particle": "down",
      "title": "Break down",
      "meanings": [
        {
          "meaning": "To stop working due to a mechanical or technical failure",
          "examples": [
            "My ten-year-old car finally broke down on the highway."
          ],
          "wordsToHide": ["broke down"]
        }
      ]
    }
  ],
  "quizEntries": [
    {
      "verb": "Break away",
      "definition": "To flee or escape from someone...",
      "sentences": ["The puppy slipped its leash..."],
      "wordsToHide": ["break away"],
      "isLearned": false
    }
  ]
}
```

**Grammar collection:**

```java
// model/GrammarEntry.java
@Document(collection = "grammar_entries")
public class GrammarEntry {
    @Id
    private String id;
    private String type;              // "i-wish-if-only"
    private String sentence;          // Russian sentence
    private List<String> correctAnswers;
}
```

**Quiz state collection** (replaces localStorage):

```java
// model/QuizState.java
@Document(collection = "quiz_states")
public class QuizState {
    @Id
    private String id;
    private String sessionId;         // cookie/anonymous ID (no auth)
    private String quizType;          // "phrasal" | "grammar-wish"
    private Set<Integer> mastered;
    private Set<Integer> excluded;
    private List<HistoryItem> history;
    private int currentIndex;
    private boolean darkMode;
    private Instant updatedAt;

    public record HistoryItem(
        int index,
        String inputValue,
        String status   // "idle" | "correct" | "wrong"
    ) {}
}
```

### 4.3 Elasticsearch index mapping

```json
PUT /verbs
{
  "mappings": {
    "properties": {
      "verb":       { "type": "keyword" },
      "particle":   { "type": "keyword" },
      "fullPhrase": { "type": "text", "analyzer": "english" },
      "meaning":    { "type": "text", "analyzer": "english" },
      "examples":   { "type": "text", "analyzer": "english" },
      "pageVerb":   { "type": "keyword" }
    }
  }
}
```

One ES document per meaning (flattened from sections), enabling search across all verbs like `ListSearchModal` does today.

### 4.4 REST API endpoints

```
GET    /api/v1/verbs                       → all quiz entries (replaces allVerbs)
GET    /api/v1/verbs?learned=false          → active quiz pool (replaces allVerbs filtered)
GET    /api/v1/verbs/browse                 → browse entries with quizIndex
GET    /api/v1/verbs/pages                  → list of verb page slugs
GET    /api/v1/verbs/pages/{verb}           → single verb page data (sections)
GET    /api/v1/verbs/search?q={query}       → Elasticsearch full-text search
GET    /api/v1/grammar/wish                 → all wish grammar entries
GET    /api/v1/quiz/state/{sessionId}/{type}→ get saved quiz state
PUT    /api/v1/quiz/state/{sessionId}/{type}→ save quiz state
GET    /api/v1/health                       → health check
```

**Controller example:**

```java
@RestController
@RequestMapping("/api/v1/verbs")
public class VerbController {

    private final VerbService verbService;
    private final SearchService searchService;

    @GetMapping
    public List<VerbResponse> getAllVerbs(
            @RequestParam(defaultValue = "false") boolean learned) {
        return verbService.getQuizEntries(learned);
    }

    @GetMapping("/pages/{verb}")
    public VerbPageResponse getVerbPage(@PathVariable String verb) {
        return verbService.getVerbPage(verb);
    }

    @GetMapping("/search")
    public List<SearchResult> search(@RequestParam String q) {
        return searchService.search(q);
    }
}
```

### 4.5 `application.yml`

```yaml
spring:
  data:
    mongodb:
      uri: ${MONGO_URI:mongodb://localhost:27017/phrasal}
  elasticsearch:
    uris: ${ELASTICSEARCH_URI:http://localhost:9200}

server:
  port: 8080

management:
  endpoints:
    web:
      exposure:
        include: health,info
```

### 4.6 Data seeder

Export current TS data to JSON, then seed on startup:

```bash
# Run once to export (from project root):
node -e "
  const {rawData} = require('./src/data/phrasalVerbs.ts');
  // ... transform and write to backend/seed-data/phrasal-verbs.json
"
```

Better approach — write a one-time migration script:

```java
@Component
@Profile("seed")
public class DataSeeder implements CommandLineRunner {

    @Autowired private MongoTemplate mongo;
    @Autowired private ElasticsearchOperations esOps;

    @Override
    public void run(String... args) throws Exception {
        if (mongo.count(new Query(), Verb.class) > 0) return; // skip if seeded

        ObjectMapper mapper = new ObjectMapper();
        List<RawVerbJson> raw = mapper.readValue(
            new ClassPathResource("seed-data/phrasal-verbs.json").getInputStream(),
            new TypeReference<>() {}
        );

        // Group by base verb, build Verb documents, save to Mongo
        // Index each meaning into Elasticsearch
    }
}
```

### 4.7 Backend Dockerfile

```dockerfile
# backend/Dockerfile
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .
RUN ./mvnw dependency:go-offline -B
COPY src src
RUN ./mvnw package -DskipTests -B

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

---

## 5. Phase 2 — Frontend Adaptation

### 5.1 Move files

```bash
mkdir frontend
# Move all current source into frontend/
mv src frontend/
mv public frontend/
mv package.json package-lock.json vite.config.ts tsconfig.json \
   tsconfig.node.json tailwind.config.js postcss.config.js index.html \
   frontend/
```

### 5.2 Create API client layer

```typescript
// frontend/src/api/client.ts
const BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`);
  return res.json();
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  put: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
};
```

```typescript
// frontend/src/api/verbs.ts
import { api } from './client';
import type { VerbEntry, BrowseVerbEntry } from '../types';

export const verbsApi = {
  getAll: (learned?: boolean) =>
    api.get<VerbEntry[]>(`/verbs${learned !== undefined ? `?learned=${learned}` : ''}`),

  getPage: (verb: string) =>
    api.get<VerbPageData>(`/verbs/pages/${verb}`),

  search: (q: string) =>
    api.get<SearchResult[]>(`/verbs/search?q=${encodeURIComponent(q)}`),

  browse: () => api.get<BrowseVerbEntry[]>('/verbs/browse'),
};
```

```typescript
// frontend/src/api/quizState.ts
import { api } from './client';

export const quizStateApi = {
  get: (sessionId: string, type: string) =>
    api.get(`/quiz/state/${sessionId}/${type}`),

  save: (sessionId: string, type: string, state: unknown) =>
    api.put(`/quiz/state/${sessionId}/${type}`, state),
};
```

### 5.3 Replace hardcoded data imports

**Before (App.tsx):**
```typescript
import { allVerbs, verbsForBrowse } from './data/phrasalVerbs';
// uses allVerbs directly
```

**After (App.tsx):**
```typescript
import { verbsApi } from './api/verbs';
import { useEffect, useState } from 'react';

const [verbs, setVerbs] = useState<VerbEntry[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  verbsApi.getAll(false).then(setVerbs).finally(() => setLoading(false));
}, []);
```

Apply the same pattern to:
- `IWishPage` → replace `wishData` import with `grammarApi.getWish()`
- `PhrasalVerbsListPage` → fetch verb list from API
- `ListSearchModal` → call search API instead of using `listVerbIndex`
- `AllVerbsModal` → use `verbsApi.browse()`

### 5.4 Replace localStorage with API-backed state

Create a hook that syncs to the backend:

```typescript
// frontend/src/hooks/useQuizState.ts
import { useEffect, useRef, useState } from 'react';
import { quizStateApi } from '../api/quizState';

function getSessionId(): string {
  let id = localStorage.getItem('sessionId');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('sessionId', id);
  }
  return id;
}

export function useQuizState<T>(quizType: string, defaultState: T) {
  const [state, setState] = useState<T>(defaultState);
  const [loaded, setLoaded] = useState(false);
  const sessionId = useRef(getSessionId());
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    quizStateApi.get(sessionId.current, quizType)
      .then((s) => { if (s) setState(s as T); })
      .finally(() => setLoaded(true));
  }, [quizType]);

  const update = (next: T) => {
    setState(next);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      quizStateApi.save(sessionId.current, quizType, next);
    }, 500);
  };

  return { state, update, loaded };
}
```

### 5.5 Frontend Dockerfile

```dockerfile
# frontend/Dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

### 5.6 nginx.conf

```nginx
# frontend/nginx.conf
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    # API proxy to backend service
    location /api/ {
        proxy_pass http://backend:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2?)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## 6. Phase 3 — Local Kubernetes with Skaffold

### 6.1 Prerequisites

```bash
# Install tools
brew install minikube kubectl skaffold   # macOS
# or
sudo snap install kubectl --classic     # Linux
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
curl -Lo skaffold https://storage.googleapis.com/skaffold/releases/latest/skaffold-linux-amd64
sudo install skaffold /usr/local/bin/skaffold

# Start cluster
minikube start --cpus=4 --memory=6g --driver=docker
minikube addons enable ingress
```

### 6.2 Kubernetes manifests

**Namespace:**

```yaml
# k8s/base/namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: phrasal
```

**MongoDB StatefulSet:**

```yaml
# k8s/base/mongodb-statefulset.yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mongodb
  namespace: phrasal
spec:
  serviceName: mongodb
  replicas: 1
  selector:
    matchLabels:
      app: mongodb
  template:
    metadata:
      labels:
        app: mongodb
    spec:
      containers:
        - name: mongodb
          image: mongo:7
          ports:
            - containerPort: 27017
          volumeMounts:
            - name: mongo-data
              mountPath: /data/db
          resources:
            requests:
              memory: "256Mi"
              cpu: "250m"
            limits:
              memory: "512Mi"
              cpu: "500m"
  volumeClaimTemplates:
    - metadata:
        name: mongo-data
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 1Gi
---
# k8s/base/mongodb-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: mongodb
  namespace: phrasal
spec:
  selector:
    app: mongodb
  ports:
    - port: 27017
  clusterIP: None
```

**Elasticsearch StatefulSet:**

```yaml
# k8s/base/elasticsearch-statefulset.yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: elasticsearch
  namespace: phrasal
spec:
  serviceName: elasticsearch
  replicas: 1
  selector:
    matchLabels:
      app: elasticsearch
  template:
    metadata:
      labels:
        app: elasticsearch
    spec:
      initContainers:
        - name: sysctl
          image: busybox
          command: ["sysctl", "-w", "vm.max_map_count=262144"]
          securityContext:
            privileged: true
      containers:
        - name: elasticsearch
          image: docker.elastic.co/elasticsearch/elasticsearch:8.13.0
          ports:
            - containerPort: 9200
          env:
            - name: discovery.type
              value: single-node
            - name: xpack.security.enabled
              value: "false"
            - name: ES_JAVA_OPTS
              value: "-Xms256m -Xmx256m"
          volumeMounts:
            - name: es-data
              mountPath: /usr/share/elasticsearch/data
          resources:
            requests:
              memory: "512Mi"
              cpu: "250m"
            limits:
              memory: "1Gi"
              cpu: "1000m"
  volumeClaimTemplates:
    - metadata:
        name: es-data
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 2Gi
---
# k8s/base/elasticsearch-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: elasticsearch
  namespace: phrasal
spec:
  selector:
    app: elasticsearch
  ports:
    - port: 9200
  clusterIP: None
```

**Backend Deployment:**

```yaml
# k8s/base/backend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
  namespace: phrasal
spec:
  replicas: 1
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
        - name: backend
          image: phrasal-backend
          ports:
            - containerPort: 8080
          env:
            - name: MONGO_URI
              value: "mongodb://mongodb:27017/phrasal"
            - name: ELASTICSEARCH_URI
              value: "http://elasticsearch:9200"
            - name: SPRING_PROFILES_ACTIVE
              value: "local,seed"
          readinessProbe:
            httpGet:
              path: /actuator/health
              port: 8080
            initialDelaySeconds: 15
            periodSeconds: 5
          resources:
            requests:
              memory: "256Mi"
              cpu: "250m"
            limits:
              memory: "512Mi"
              cpu: "500m"
---
# k8s/base/backend-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: backend
  namespace: phrasal
spec:
  selector:
    app: backend
  ports:
    - port: 8080
```

**Frontend Deployment:**

```yaml
# k8s/base/frontend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
  namespace: phrasal
spec:
  replicas: 1
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
        - name: frontend
          image: phrasal-frontend
          ports:
            - containerPort: 80
          resources:
            requests:
              memory: "64Mi"
              cpu: "50m"
            limits:
              memory: "128Mi"
              cpu: "200m"
---
# k8s/base/frontend-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: frontend
  namespace: phrasal
spec:
  type: NodePort
  selector:
    app: frontend
  ports:
    - port: 80
      targetPort: 80
      nodePort: 30080
```

**Kustomization:**

```yaml
# k8s/base/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
namespace: phrasal
resources:
  - namespace.yaml
  - mongodb-statefulset.yaml
  - mongodb-service.yaml
  - elasticsearch-statefulset.yaml
  - elasticsearch-service.yaml
  - backend-deployment.yaml
  - backend-service.yaml
  - frontend-deployment.yaml
  - frontend-service.yaml
```

### 6.3 Skaffold configuration

```yaml
# skaffold.yaml
apiVersion: skaffold/v4beta11
kind: Config
metadata:
  name: phrasal

build:
  artifacts:
    - image: phrasal-backend
      context: backend
      docker:
        dockerfile: Dockerfile
    - image: phrasal-frontend
      context: frontend
      docker:
        dockerfile: Dockerfile
  local:
    push: false   # use minikube's docker daemon

manifests:
  kustomize:
    paths:
      - k8s/base

deploy:
  kubectl: {}

portForward:
  - resourceType: service
    resourceName: frontend
    namespace: phrasal
    port: 80
    localPort: 8080
  - resourceType: service
    resourceName: backend
    namespace: phrasal
    port: 8080
    localPort: 8081
  - resourceType: service
    resourceName: mongodb
    namespace: phrasal
    port: 27017
    localPort: 27017
```

### 6.4 Running locally

```bash
# Point docker to minikube's daemon
eval $(minikube docker-env)

# Dev mode (auto-rebuild on changes)
skaffold dev --port-forward

# One-time deploy
skaffold run --port-forward

# Access:
#   Frontend: http://localhost:8080
#   Backend:  http://localhost:8081/api/v1/health
#   MongoDB:  mongodb://localhost:27017
```

### 6.5 docker-compose.yaml (alternative to K8s for quick dev)

```yaml
# docker-compose.yaml
version: "3.9"
services:
  mongodb:
    image: mongo:7
    ports: ["27017:27017"]
    volumes: [mongo-data:/data/db]

  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.13.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
      - ES_JAVA_OPTS=-Xms256m -Xmx256m
    ports: ["9200:9200"]
    volumes: [es-data:/usr/share/elasticsearch/data]

  backend:
    build: ./backend
    ports: ["8080:8080"]
    environment:
      MONGO_URI: mongodb://mongodb:27017/phrasal
      ELASTICSEARCH_URI: http://elasticsearch:9200
      SPRING_PROFILES_ACTIVE: local,seed
    depends_on: [mongodb, elasticsearch]

  frontend:
    build: ./frontend
    ports: ["80:80"]
    depends_on: [backend]

volumes:
  mongo-data:
  es-data:
```

---

## 7. Phase 4 — AWS Deployment (Cheapest Path)

### 7.1 Strategy: EKS is expensive — avoid it

EKS costs ~$73/month just for the control plane. For a small app like this, the cheapest path is:

```
┌────────────────────────────────────────────────────────────────┐
│                     AWS — Cheapest Setup                       │
│                     (~$15-25/month)                            │
│                                                                │
│  ┌────────────┐     ┌──────────────────────────────────┐       │
│  │ CloudFront │────▶│ S3 Bucket (static frontend)      │       │
│  │ (CDN)      │     │ React build artifacts             │       │
│  │ $0-1/mo    │     │ $0.02/mo                          │       │
│  └─────┬──────┘     └──────────────────────────────────┘       │
│        │ /api/*                                                │
│        ▼                                                       │
│  ┌──────────────────────────────────────────────────────┐      │
│  │  EC2 t4g.small (ARM) — $12/mo with 1yr reservation  │      │
│  │  ┌────────────────────────────────────────────────┐  │      │
│  │  │  Docker Compose                                │  │      │
│  │  │  ┌──────────┐ ┌─────────┐ ┌───────────────┐   │  │      │
│  │  │  │ Backend  │ │ MongoDB │ │ Elasticsearch │   │  │      │
│  │  │  │ :8080    │ │ :27017  │ │ :9200         │   │  │      │
│  │  │  └──────────┘ └─────────┘ └───────────────┘   │  │      │
│  │  └────────────────────────────────────────────────┘  │      │
│  └──────────────────────────────────────────────────────┘      │
│                                                                │
│  Alternative managed DBs (more expensive but zero-ops):        │
│  • MongoDB Atlas Free Tier (512MB) — $0                        │
│  • Amazon OpenSearch t3.small.search — ~$25/mo                 │
└────────────────────────────────────────────────────────────────┘
```

### 7.2 Option A: Single EC2 + S3/CloudFront (cheapest — ~$15/month)

This is the **recommended cheapest** approach. Everything runs on one EC2 instance except the frontend static files.

#### Step 1: Create S3 bucket for frontend

```bash
aws s3 mb s3://phrasal-frontend-prod --region us-east-1

# Configure for static hosting
aws s3 website s3://phrasal-frontend-prod \
  --index-document index.html \
  --error-document index.html

# Bucket policy for CloudFront access
cat > /tmp/bucket-policy.json << 'EOF'
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "CloudFrontAccess",
    "Effect": "Allow",
    "Principal": {"Service": "cloudfront.amazonaws.com"},
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::phrasal-frontend-prod/*",
    "Condition": {
      "StringEquals": {
        "AWS:SourceArn": "arn:aws:cloudfront::ACCOUNT_ID:distribution/DIST_ID"
      }
    }
  }]
}
EOF
aws s3api put-bucket-policy --bucket phrasal-frontend-prod \
  --policy file:///tmp/bucket-policy.json
```

#### Step 2: Create CloudFront distribution

```bash
cat > /tmp/cf-config.json << 'EOF'
{
  "Comment": "Phrasal app",
  "DefaultCacheBehavior": {
    "TargetOriginId": "s3-frontend",
    "ViewerProtocolPolicy": "redirect-to-https",
    "CachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6",
    "Compress": true
  },
  "Origins": {
    "Items": [
      {
        "Id": "s3-frontend",
        "DomainName": "phrasal-frontend-prod.s3.us-east-1.amazonaws.com",
        "S3OriginConfig": { "OriginAccessIdentity": "" },
        "OriginAccessControlId": "OAC_ID"
      },
      {
        "Id": "backend-api",
        "DomainName": "EC2_PUBLIC_IP",
        "CustomOriginConfig": {
          "HTTPPort": 8080,
          "OriginProtocolPolicy": "http-only"
        }
      }
    ],
    "Quantity": 2
  },
  "CacheBehaviors": {
    "Items": [
      {
        "PathPattern": "/api/*",
        "TargetOriginId": "backend-api",
        "ViewerProtocolPolicy": "https-only",
        "CachePolicyId": "4135ea2d-6df8-44a3-9df3-4b5a84be39ad",
        "AllowedMethods": {
          "Items": ["GET","HEAD","OPTIONS","PUT","POST","PATCH","DELETE"],
          "Quantity": 7
        }
      }
    ],
    "Quantity": 1
  },
  "CustomErrorResponses": {
    "Items": [
      {
        "ErrorCode": 403,
        "ResponsePagePath": "/index.html",
        "ResponseCode": "200",
        "ErrorCachingMinTTL": 0
      },
      {
        "ErrorCode": 404,
        "ResponsePagePath": "/index.html",
        "ResponseCode": "200",
        "ErrorCachingMinTTL": 0
      }
    ],
    "Quantity": 2
  },
  "Enabled": true
}
EOF

aws cloudfront create-distribution \
  --distribution-config file:///tmp/cf-config.json
```

#### Step 3: Launch EC2 instance

```bash
# Create security group
aws ec2 create-security-group \
  --group-name phrasal-backend \
  --description "Phrasal backend"

aws ec2 authorize-security-group-ingress \
  --group-name phrasal-backend \
  --protocol tcp --port 22 --cidr YOUR_IP/32

aws ec2 authorize-security-group-ingress \
  --group-name phrasal-backend \
  --protocol tcp --port 8080 --cidr 0.0.0.0/0

# Launch t4g.small (ARM, 2 vCPU, 2GB RAM) — cheapest for running all 3 services
aws ec2 run-instances \
  --image-id ami-0c7217cdde317cfec \
  --instance-type t4g.small \
  --key-name your-key \
  --security-groups phrasal-backend \
  --block-device-mappings '[{"DeviceName":"/dev/xvda","Ebs":{"VolumeSize":20,"VolumeType":"gp3"}}]' \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=phrasal-backend}]'
```

#### Step 4: Server setup script

```bash
#!/bin/bash
# run on EC2 instance after SSH

# Install Docker
sudo yum update -y
sudo yum install -y docker git
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ec2-user

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" \
  -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Clone and run
git clone https://github.com/YOUR_USER/phrasal.git
cd phrasal

# Production docker-compose (backend + mongo + ES only, no frontend)
docker-compose -f docker-compose.prod.yaml up -d
```

#### Step 5: Production docker-compose (backend only — frontend served from S3)

```yaml
# docker-compose.prod.yaml
version: "3.9"
services:
  mongodb:
    image: mongo:7
    restart: always
    volumes: [mongo-data:/data/db]
    deploy:
      resources:
        limits:
          memory: 256M

  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.13.0
    restart: always
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
      - ES_JAVA_OPTS=-Xms128m -Xmx128m
    volumes: [es-data:/usr/share/elasticsearch/data]
    deploy:
      resources:
        limits:
          memory: 512M

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    restart: always
    ports: ["8080:8080"]
    environment:
      MONGO_URI: mongodb://mongodb:27017/phrasal
      ELASTICSEARCH_URI: http://elasticsearch:9200
      SPRING_PROFILES_ACTIVE: prod,seed
    depends_on: [mongodb, elasticsearch]
    deploy:
      resources:
        limits:
          memory: 384M

volumes:
  mongo-data:
  es-data:
```

#### Step 6: Deploy frontend to S3

```bash
# Build and upload (run from frontend/)
cd frontend
npm run build
aws s3 sync dist/ s3://phrasal-frontend-prod/ --delete
aws cloudfront create-invalidation --distribution-id DIST_ID --paths "/*"
```

### 7.3 Option B: Full Kubernetes on AWS (EKS) — ~$90/month

Only if you need K8s on AWS for learning/portfolio purposes:

```
┌──────────────────────────────────────────────────┐
│  EKS Cluster ($73/mo control plane)              │
│                                                   │
│  ┌─────────────────────────────────────────────┐  │
│  │  1x t4g.small node ($12/mo reserved)        │  │
│  │  frontend + backend + mongo + ES pods       │  │
│  └─────────────────────────────────────────────┘  │
│                                                   │
│  + ALB Ingress Controller (free with EC2)         │
│  + EBS gp3 volumes for data ($0.08/GB/mo)         │
└──────────────────────────────────────────────────┘
```

```bash
# Create EKS cluster (cheapest config)
eksctl create cluster \
  --name phrasal \
  --region us-east-1 \
  --nodegroup-name workers \
  --node-type t4g.small \
  --nodes 1 \
  --managed

# Deploy with skaffold
skaffold run -p aws

# Add Ingress
kubectl apply -f k8s/overlays/aws/ingress.yaml
```

**AWS Ingress:**

```yaml
# k8s/overlays/aws/ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: phrasal-ingress
  namespace: phrasal
  annotations:
    kubernetes.io/ingress.class: alb
    alb.ingress.kubernetes.io/scheme: internet-facing
    alb.ingress.kubernetes.io/target-type: ip
spec:
  rules:
    - http:
        paths:
          - path: /api
            pathType: Prefix
            backend:
              service:
                name: backend
                port:
                  number: 8080
          - path: /
            pathType: Prefix
            backend:
              service:
                name: frontend
                port:
                  number: 80
```

### 7.4 Option C: Hybrid — MongoDB Atlas Free + EC2 (~$13/month)

Use Atlas free tier (512MB, shared cluster) instead of self-hosted MongoDB:

```yaml
# backend application-prod.yml
spring:
  data:
    mongodb:
      uri: mongodb+srv://phrasal:${MONGO_PASSWORD}@cluster0.xxxxx.mongodb.net/phrasal
```

This saves ~100MB RAM on the EC2 instance and gives you automatic backups.

### 7.5 CI/CD for AWS deployment

```yaml
# .github/workflows/deploy-aws.yml
name: Deploy to AWS

on:
  push:
    tags: ['v*']

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with: { node-version: '20' }

      - name: Build frontend
        working-directory: frontend
        run: npm ci && npm run build

      - name: Deploy to S3
        uses: jakejarvis/s3-sync-action@master
        with:
          args: --delete
        env:
          AWS_S3_BUCKET: phrasal-frontend-prod
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          SOURCE_DIR: frontend/dist

      - name: Invalidate CloudFront
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.CF_DISTRIBUTION_ID }} \
            --paths "/*"
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Build backend Docker image
        working-directory: backend
        run: docker build -t phrasal-backend .

      - name: Save and transfer to EC2
        run: |
          docker save phrasal-backend | gzip > backend.tar.gz
          scp -o StrictHostKeyChecking=no \
            -i <(echo "${{ secrets.EC2_SSH_KEY }}") \
            backend.tar.gz ec2-user@${{ secrets.EC2_HOST }}:/tmp/

          ssh -o StrictHostKeyChecking=no \
            -i <(echo "${{ secrets.EC2_SSH_KEY }}") \
            ec2-user@${{ secrets.EC2_HOST }} \
            'docker load < /tmp/backend.tar.gz && \
             cd ~/phrasal && \
             docker-compose -f docker-compose.prod.yaml up -d --no-deps backend'
```

---

## 8. Cost Estimate

| Component | Option A (EC2+S3) | Option B (EKS) | Option C (Atlas+EC2) |
|---|---|---|---|
| EC2 t4g.small (1yr reserved) | $12.26/mo | — | $12.26/mo |
| EKS control plane | — | $73.00/mo | — |
| EKS node (t4g.small) | — | $12.26/mo | — |
| S3 (< 1GB static) | $0.02/mo | — | $0.02/mo |
| CloudFront (< 10GB transfer) | $0-1/mo | — | $0-1/mo |
| EBS gp3 20GB | $1.60/mo | $1.60/mo | $1.60/mo |
| MongoDB Atlas free tier | — | — | $0 |
| **Total** | **~$15/mo** | **~$87/mo** | **~$14/mo** |

**Recommendation: Option A or C.** Option B only makes sense for learning Kubernetes on AWS.

---

## 9. Migration Checklist

### Phase 1 — Backend
- [ ] Initialize Spring Boot project with dependencies
- [ ] Create MongoDB document models (`Verb`, `GrammarEntry`, `QuizState`)
- [ ] Create repositories (Mongo + Elasticsearch)
- [ ] Export current TS data to JSON seed files
- [ ] Write `DataSeeder` to populate MongoDB + ES on first run
- [ ] Implement REST controllers with all endpoints
- [ ] Write integration tests (Testcontainers for Mongo + ES)
- [ ] Create backend Dockerfile
- [ ] Verify: `docker build` succeeds, seed data loads, all endpoints return correct data

### Phase 2 — Frontend
- [ ] Move frontend files to `frontend/` directory
- [ ] Create `src/api/` client layer (client, verbs, grammar, quizState)
- [ ] Replace `phrasalVerbs.ts` import in `App.tsx` with API calls
- [ ] Replace `wishData.ts` import in `IWishPage.tsx` with API calls
- [ ] Replace `listVerbIndex.ts` in `ListSearchModal` with search API
- [ ] Replace localStorage reads/writes with `useQuizState` hook
- [ ] Update `vite.config.ts` dev proxy to forward `/api` → `localhost:8080`
- [ ] Update all verb page routes to fetch data from API
- [ ] Create frontend Dockerfile + nginx.conf
- [ ] Verify: `npm run build` succeeds, all pages load, quiz state persists

### Phase 3 — Local K8s
- [ ] Write all K8s manifests (namespace, deployments, services, statefulsets)
- [ ] Write `skaffold.yaml`
- [ ] `skaffold dev` starts all services, frontend reachable at localhost:8080
- [ ] Data seeds on first backend startup
- [ ] Quiz state persists across browser refreshes
- [ ] Search works via Elasticsearch

### Phase 4 — AWS
- [ ] Create S3 bucket + CloudFront distribution
- [ ] Launch EC2 t4g.small + security group
- [ ] Deploy backend stack via docker-compose on EC2
- [ ] Deploy frontend to S3, verify CloudFront serves it
- [ ] Set up CI/CD pipeline (`.github/workflows/deploy-aws.yml`)
- [ ] Verify end-to-end: CloudFront URL → SPA loads → API calls reach EC2
- [ ] Set up monitoring (CloudWatch basic metrics — free tier)
- [ ] Optional: set up Route53 custom domain + ACM certificate (free with CloudFront)

---

## Appendix: Data Migration Script

One-time script to convert the current TypeScript data files to JSON for the seed:

```javascript
// scripts/export-data.mjs
// Run: node scripts/export-data.mjs

import { readFileSync, writeFileSync, mkdirSync } from 'fs';

// Parse the raw TS array manually (it's just array literals)
const phrasalTs = readFileSync('frontend/src/data/phrasalVerbs.ts', 'utf-8');

// Extract the array between the first [ and last ]
const match = phrasalTs.match(/\[[\s\S]*\]/);
// Use eval in a controlled context (one-time migration script)
const rawData = eval(match[0]);

// Group by base verb
const verbMap = new Map();
for (const [verb, definition, sentences, wordsToHide, isLearned] of rawData) {
  const base = verb.split(' ')[0].toLowerCase();
  if (!verbMap.has(base)) verbMap.set(base, []);
  verbMap.get(base).push({
    verb, definition,
    sentences: Array.isArray(sentences) ? sentences : [sentences],
    wordsToHide,
    isLearned
  });
}

const output = Array.from(verbMap.entries()).map(([base, entries]) => ({
  verb: base,
  quizEntries: entries
}));

mkdirSync('backend/seed-data', { recursive: true });
writeFileSync(
  'backend/seed-data/phrasal-verbs.json',
  JSON.stringify(output, null, 2)
);

console.log(`Exported ${output.length} verb groups, ${rawData.length} total entries`);
```
