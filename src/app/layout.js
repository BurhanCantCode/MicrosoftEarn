import "./globals.css";
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: "Microsoft Resource Hub \n made with love by Burhan",
  description: "Microsoft Resource Hub",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}