#!/bin/sh
# Paste your values between the quotes. Do not commit this file.
#SMTP_LOGIN=''
#SMTP_KEY=''
#TO=''

 SMTP_KEY=''
 SMTP_LOGIN=''
 TO=''

FROM='no-reply@phrasalbox.com'
MSG="$(mktemp)"

# SMTP needs CRLF line endings, so build the message with explicit \r\n
printf 'From: Phrasal <%s>\r\nTo: %s\r\nSubject: Brevo SMTP test\r\nDate: %s\r\n\r\nIf you can read this, SMTP works.\r\n' \
  "$FROM" "$TO" "$(date -R)" > "$MSG"

curl -v --ssl-reqd 'smtp://smtp-relay.brevo.com:587' \
  --user "$SMTP_LOGIN:$SMTP_KEY" \
  --mail-from "$FROM" \
  --mail-rcpt "$TO" \
  -T "$MSG"
STATUS=$?

rm -f "$MSG"
if [ "$STATUS" -eq 0 ]; then echo "SENT: check the inbox of $TO"; else echo "FAILED: curl exit $STATUS"; fi
