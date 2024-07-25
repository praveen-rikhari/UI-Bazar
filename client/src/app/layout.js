import { Quicksand } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Quicksand({ subsets: ["latin"] });

export const metadata = {
  title: "UI-Bazar",
  description: "Free & Open Source UI snippets",
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
