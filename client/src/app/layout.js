import { Montserrat } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "UI-Bazar",
  description: "Open Source free UI snippets",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Nav />
          {children}
        </body>
      </html>
    </ClerkProvider>

  );
}
