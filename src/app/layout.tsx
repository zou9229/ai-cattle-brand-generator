import "@/config/style/global.css";

import { getLocale, setRequestLocale } from "next-intl/server";
import { locales } from "@/config/locale";
import { envConfigs } from "@/config";
import { getConfigs } from "@/services/config";
import { GoogleAnalytics } from "@/extensions/analytics";
import { AdsenseMeta, AdsenseScript } from "@/extensions/ads";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  setRequestLocale(locale);

  // get configs from db
  const dbConfigs = await getConfigs();

  // app url
  const appUrl = envConfigs.app_url || "";

  const isProduction = process.env.NODE_ENV === "production";

  // google adsense code
  const adsenseCode = isProduction ? dbConfigs.adsense_code : "";

  // google analytics id
  const googleAnalyticsId = isProduction ? dbConfigs.google_analytics_id : "";

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {adsenseCode && <AdsenseMeta adsenseCode={adsenseCode} />}

        <link rel="icon" href="/favicon.ico" />

        {locales ? (
          <>
            {locales.map((loc) => (
              <link
                key={loc}
                rel="alternate"
                hrefLang={loc}
                href={`${appUrl}${loc === "en" ? "" : `/${loc}`}/`}
              />
            ))}
            <link rel="alternate" hrefLang="x-default" href={appUrl} />
          </>
        ) : null}
      </head>
      <body>{children}</body>

      {googleAnalyticsId && <GoogleAnalytics analyticsId={googleAnalyticsId} />}
      {adsenseCode && <AdsenseScript adsenseCode={adsenseCode} />}
    </html>
  );
}
