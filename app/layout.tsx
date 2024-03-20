import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";


import { ClerkProvider } from "@clerk/nextjs";
import { dark  } from '@clerk/themes';
import { SideMenu } from "@/components/SibebarMenu";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["200", "400", "600", "700"] 
});

export const metadata: Metadata = {
  title: "Image Gallery App",
  description: "creating Image gallery App in next js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
    appearance={{
      baseTheme: dark,
    }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={poppins.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
          </ThemeProvider>
          <div className="flex">
            <SideMenu />
            <div className="w-full px-4 pt-8"> {children}</div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
