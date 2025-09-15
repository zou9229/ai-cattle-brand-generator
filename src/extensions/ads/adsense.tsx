export function AdsenseScript({ adsenseCode }: { adsenseCode: string }) {
  if (!adsenseCode) {
    return null;
  }

  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseCode}`}
      crossOrigin="anonymous"
    ></script>
  );
}

export function AdsenseMeta({ adsenseCode }: { adsenseCode: string }) {
  if (!adsenseCode) {
    return null;
  }

  return <meta name="google-adsense-account" content={adsenseCode} />;
}
