import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Nunito } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import { Author, IconDescriptor } from "next/dist/lib/metadata/types/metadata-types";
const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simple group chat app",
  description: "A simple group chat app",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["message", "im"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [
    { name: "janlely" },
  ],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
  ],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title as string}</title>
        <meta name="description" content={metadata.description as string} />
        <meta name="generator" content={metadata.generator as string} />
        <link rel="manifest" href={metadata.manifest as string} />
        <meta name="keywords" content={(metadata.keywords! as string[]).join(", ") as string} />
        {(metadata.authors! as Author[]).map(({ name, url }, index) => (
          <meta key={index} name="author" content={name} {...(url && { href: url })} />
        ))}
        {(metadata.icons! as IconDescriptor[]).map(({ rel, url }, index) => (
          <link key={index} rel={rel} href={url as string} />
        ))}
      </head>
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
