import type { Metadata } from "next";
import { Poppins, Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import SmoothScroll from "@/components/common/SmoothScroll";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins-variable",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter-variable",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans-variable",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title:"DocuShield — AI Co-Pilot for Legal Contract Risk Triage",
  description:
    "DocuShield is your AI co-pilot for legal contract risk triage. Upload a contract and get fast, clause-level risk flags (low / medium / high) so legal teams can focus on what matters.",
  applicationName: "DocuShield",
  keywords: [
    "contract review",
    "contract risk",
    "legal AI",
    "legal contract triage",
    "docu-shield",
    "DocuShield",
  ],
  openGraph: {
    type: "website",
    title: "DocuShield — AI Co-Pilot for Legal Contract Risk Triage",
    description:
      "Upload a contract and get fast, clause-level risk flags (low / medium / high) so legal teams can focus on what matters.",
    siteName: "DocuShield",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} ${plusJakartaSans.variable} font-plus h-full antialiased`}
    >
      <body className="font-plus min-h-full flex flex-col">
        <SmoothScroll />
        {children}
        <Toaster
          richColors
          position="bottom-right"
          closeButton
          toastOptions={{ duration: 5000 }}
        />
      </body>
    </html>
  );
}
