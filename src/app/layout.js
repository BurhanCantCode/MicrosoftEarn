import "./globals.css";

export const metadata = {
  title: "Microsoft Resource Teacher \n made with love by Burhan",
  description: "Microsoft Resource Hub",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}