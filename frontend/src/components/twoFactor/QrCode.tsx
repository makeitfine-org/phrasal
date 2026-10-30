import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

const QR_WIDTH = 200;
const QR_MARGIN = 1;

/** Renders nothing on error: the manual key shown next to it is the fallback. */
export default function QrCode({ value }: { value: string }) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    QRCode.toDataURL(value, { errorCorrectionLevel: 'M', margin: QR_MARGIN, width: QR_WIDTH })
      .then(url => { if (active) setDataUrl(url); })
      .catch(() => { if (active) setDataUrl(null); });
    return () => { active = false; };
  }, [value]);

  if (!dataUrl) return null;
  return (
    <img
      src={dataUrl}
      alt="QR code for your authenticator app"
      data-testid="two-factor-qr"
      width={QR_WIDTH}
      height={QR_WIDTH}
      className="bg-white rounded-lg border border-gray-200"
    />
  );
}
