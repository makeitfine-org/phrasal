time_a=75

while true; do
    echo "$(date) — Attempting launch..."
    oci compute instance launch \
      --availability-domain Vcji:EU-FRANKFURT-1-AD-1 \
      --shape VM.Standard.A1.Flex \
      --shape-config '{"ocpus": 2, "memoryInGBs": 8}' \
      --image-id ocid1.image.oc1.eu-frankfurt-1.aaaaaaaa33mxho6qsnmm4yu7xo3nrnvjubiimgqpsc5ycpoakz6pb4cts2ma \
      --subnet-id ocid1.subnet.oc1.eu-frankfurt-1.aaaaaaaahsuuw4tlf3axapvev5vqt6oztiqgs44tvsf2zhbm5ar7feydnyea \
      --assign-public-ip true \
      --ssh-authorized-keys-file ~/.ssh/id_rsa.pub \
      --display-name "phrasal-arm-1" 2>&1 | tee /tmp/oci-launch.log

    if grep -q '"lifecycle-state"' /tmp/oci-launch.log; then
      echo "SUCCESS! Instance launched."
      break
    fi

    echo "Failed — retrying in $time_a sec..."
    sleep $time_a
  done
