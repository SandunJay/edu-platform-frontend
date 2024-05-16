import { Inter } from "next/font/google";
import "./ui/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LMS",
  description: "Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container">
          <div className="content">{children}</div>
        </div>
      </body>
    </html>
  );
}
