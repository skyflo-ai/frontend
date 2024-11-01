import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

const AuthProvider = dynamic(
  () =>
    import("@/components/auth/AuthProvider").then((mod) => mod.AuthProvider),
  { ssr: false }
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-dark text-gray-200`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
