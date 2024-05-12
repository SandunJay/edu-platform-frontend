import { Inter } from "next/font/google";
import "./ui/globals.css";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LMS Admin Panel",
  description: "Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container">
          <Navbar />
          <div className="content">{children}</div>
        </div>
      </body>
    </html>
  );
}
