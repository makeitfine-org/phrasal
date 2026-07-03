#!/bin/bash
LOG=/tmp/oci-launch.log
time_a=75

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
    echo "[$ts] Trying $ad..." | tee -a "$LOG"
    result=$(oci compute instance launch \
      --availability-domain "$ad" \
      --shape VM.Standard.A1.Flex \
      --shape-config '{"ocpus": 1, "memoryInGBs": 8}' \
      --image-id ocid1.image.oc1.eu-frankfurt-1.aaaaaaaa33mxho6qsnmm4yu7xo3nrnvjubiimgqpsc5ycpoakz6pb4cts2ma \
      --subnet-id ocid1.subnet.oc1.eu-frankfurt-1.aaaaaaaahsuuw4tlf3axapvev5vqt6oztiqgs44tvsf2zhbm5ar7feydnyea \
      --assign-public-ip true \
      --ssh-authorized-keys-file ~/.ssh/id_rsa.pub \
      --display-name "phrasal-arm-1" 2>&1)
    echo "$result" | tee -a "$LOG"

    if echo "$result" | grep -q '"lifecycle-state"'; then
      echo "[$(date '+%Y-%m-%d %H:%M:%S')] SUCCESS in $ad!" | tee -a "$LOG"
      tn "🖥 VPS created in $ad 🖥"
      exit 0
    fi
    echo "[$ts] Failed in $ad" | tee -a "$LOG"
  done

  echo "[$(date '+%Y-%m-%d %H:%M:%S')] All ADs full — retrying in $time_a sec..." | tee -a "$LOG"
  sleep $time_a
done
