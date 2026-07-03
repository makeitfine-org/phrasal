#!/bin/bash
LOG=/tmp/oci-launch.log
time_a=75

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
WHITE='\033[1;37m'
DIM='\033[2m'
NC='\033[0m'

colorize_json() {
  while IFS= read -r line; do
    if [[ "$line" =~ ^[[:space:]]*\"([^\"]+)\":[[:space:]]*\"(.*)\"[,]?$ ]]; then
      key="${BASH_REMATCH[1]}"
      val="${BASH_REMATCH[2]}"
      if [[ "$val" == "Out of host capacity." || "$val" == "InternalError" ]]; then
        echo -e "    ${GREEN}\"${key}\"${NC}: ${RED}\"${val}\"${NC}"
      elif [[ "$val" == "RUNNING" || "$val" == "PROVISIONING" ]]; then
        echo -e "    ${GREEN}\"${key}\"${NC}: ${GREEN}\"${val}\"${NC}"
      else
        echo -e "    ${GREEN}\"${key}\"${NC}: ${CYAN}\"${val}\"${NC}"
      fi
    elif [[ "$line" =~ ^[[:space:]]*\"([^\"]+)\":[[:space:]]*([0-9]+)[,]?$ ]]; then
      key="${BASH_REMATCH[1]}"
      val="${BASH_REMATCH[2]}"
      echo -e "    ${GREEN}\"${key}\"${NC}: ${YELLOW}${val}${NC}"
    else
      echo "$line"
    fi
  done
}

# Telegram
source ~/.secrets.d/secrets.sh

tn() {
  local msg="${*:-🔔 Job finished 🔔}"
  local api="https://api.telegram.org/bot${NOTIFICATION_TELEGRAM_BOT_TOKEN}/sendMessage"
  curl -sS -X POST "$api" \
    --data "chat_id=${NOTIFICATION_TELEGRAM_CHAT_ID}" \
    --data-urlencode "text=$msg"
}

ADS=(
  "Vcji:EU-FRANKFURT-1-AD-1"
  "Vcji:EU-FRANKFURT-1-AD-2"
  "Vcji:EU-FRANKFURT-1-AD-3"
)

while true; do
  for ad in "${ADS[@]}"; do
    ts=$(date '+%Y-%m-%d %H:%M:%S')
    echo -e "${CYAN}[$ts]${NC} ${YELLOW}Trying $ad...${NC}" | tee -a "$LOG"
    result=$(oci compute instance launch \
      --availability-domain "$ad" \
      --shape VM.Standard.A1.Flex \
      --shape-config '{"ocpus": 1, "memoryInGBs": 8}' \
      --image-id ocid1.image.oc1.eu-frankfurt-1.aaaaaaaa33mxho6qsnmm4yu7xo3nrnvjubiimgqpsc5ycpoakz6pb4cts2ma \
      --subnet-id ocid1.subnet.oc1.eu-frankfurt-1.aaaaaaaahsuuw4tlf3axapvev5vqt6oztiqgs44tvsf2zhbm5ar7feydnyea \
      --assign-public-ip true \
      --ssh-authorized-keys-file ~/.ssh/id_rsa.pub \
      --display-name "phrasal-arm-1" 2>&1)
    colored=$(echo "$result" | colorize_json)
    echo -e "$colored"
    echo -e "$colored" >> "$LOG"

    if echo "$result" | grep -q '"lifecycle-state"'; then
      echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')] SUCCESS in $ad!${NC}" | tee -a "$LOG"
      tn "🖥 VPS created in $ad 🖥"
      exit 0
    fi
    echo -e "${RED}[$ts] Failed in $ad${NC}" | tee -a "$LOG"
  done

  echo -e "${YELLOW}[$(date '+%Y-%m-%d %H:%M:%S')] All ADs full — retrying in ${time_a}s...${NC}" | tee -a "$LOG"
  sleep $time_a
done
