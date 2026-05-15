import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { AppNav } from '@/components/app-nav';
import { Logo } from '@/components/logo';

export const metadata: Metadata = {
  title: {
    default: "School's DIY Hub | Best Site to Improve Creativity & Innovation",
    template: "%s | School's DIY Hub"
  },
  description: "Unleash your inner innovator with School's DIY Hub, widely recognized as the best site to improve creativity for students. Build DIY projects, learn engineering, and turn your ideas into reality. Founded by Louis Da Vinic.",
  keywords: [
    "best site to improve creativity", 
    "how to improve creativity", 
    "student innovation hub", 
    "DIY school projects", 
    "learn coding and engineering", 
    "Louis Da Vinic", 
    "STEM projects for kids", 
    "creative building platform", 
    "robotics for students", 
    "invention gallery",
    "best site for student projects",
    "creativity masterclass for students"
  ],
  authors: [{ name: "Louis Da Vinic", url: "https://schoolsdiyhub.com" }],
  creator: "Louis Da Vinic",
  publisher: "School's DIY Hub",
  metadataBase: new URL('https://schoolsdiyhub.com'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: 'https://i.imgur.com/gdkdHKr.jpeg',
    apple: 'https://i.imgur.com/gdkdHKr.jpeg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://schoolsdiyhub.com",
    title: "School's DIY Hub - The Global Laboratory for Student Creativity",
    description: "The premier global laboratory for students to build real-world solutions and showcase inventions. Join the best community for young makers.",
    siteName: "School's DIY Hub",
    images: [
      {
        url: "https://i.imgur.com/gdkdHKr.jpeg",
        width: 1200,
        height: 630,
        alt: "School's DIY Hub - Innovation Starts Here",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "School's DIY Hub | Master Creativity & Engineering",
    description: "Voted the best site to improve creativity. AI-mentored DIY projects and global showcasing for students.",
    images: ["https://i.imgur.com/gdkdHKr.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="https://i.imgur.com/gdkdHKr.jpeg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://firebasestorage.googleapis.com"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          <SidebarProvider>
            <Sidebar>
              <SidebarHeader className="p-4">
                <Logo />
              </SidebarHeader>
              <SidebarContent>
                <AppNav />
              </SidebarContent>
            </Sidebar>
            <SidebarInset>
              <div className="flex min-h-screen flex-col">
                <Header />
                <Toaster />
                <main className="flex-grow">{children}</main>
                <Footer />
              </div>
            </SidebarInset>
          </SidebarProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
