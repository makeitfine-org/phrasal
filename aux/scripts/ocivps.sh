#!/bin/bash
LOG=/tmp/oci-launch.log
time_a=90

# Telegram
source ~/.secrets.d/secrets.sh

tn() {
  local msg="${*:-🔔 Job finished 🔔}"
  local api="https://api.telegram.org/bot${NOTIFICATION_TELEGRAM_BOT_TOKEN}/sendMessage"
  curl -sS -X POST "$api" \
    --data "chat_id=${NOTIFICATION_TELEGRAM_CHAT_ID}" \
    --data-urlencode "text=$msg"
}

while true; do
    ts=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$ts] Attempting launch..." | tee -a "$LOG"
    oci compute instance launch \
      --availability-domain Vcji:EU-FRANKFURT-1-AD-2 \
      --shape VM.Standard.A1.Flex \
      --shape-config '{"ocpus": 1, "memoryInGBs": 8}' \
      --image-id ocid1.image.oc1.eu-frankfurt-1.aaaaaaaa33mxho6qsnmm4yu7xo3nrnvjubiimgqpsc5ycpoakz6pb4cts2ma \
      --subnet-id ocid1.subnet.oc1.eu-frankfurt-1.aaaaaaaahsuuw4tlf3axapvev5vqt6oztiqgs44tvsf2zhbm5ar7feydnyea \
      --assign-public-ip true \
      --ssh-authorized-keys-file ~/.ssh/id_rsa.pub \
      --display-name "phrasal-arm-1" 2>&1 | tee -a "$LOG"

    if grep -q '"lifecycle-state"' "$LOG"; then
      echo "[$(date '+%Y-%m-%d %H:%M:%S')] SUCCESS! Instance launched." | tee -a ".$LOG"
      tn "🖥 VPs might have been created 🖥"
      break
    fi

    echo "[$ts] Failed — retrying in $time_a sec..." | tee -a "$LOG"
    sleep $time_a
done
