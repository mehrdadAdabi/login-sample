"use client";
import "./public/styles/globals.css";
import { ThemeProvider } from "./provider/ThemeProvider";
import { NotificationProvider } from "./components/base/Alert/alert";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="container">
        <NotificationProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
