import { DrawerProvider, SwalProvider } from '@/context';
import '@/styles/index.css';
import { HeroUIProvider } from '@heroui/react';
import { ToastProvider } from '@heroui/toast';

export const metadata = {
  title: "MAJOR",
  manifest: "/manifest.json",

  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  }
}

export default function Layout({ children }) {
  return (
    <HeroUIProvider>
      <DrawerProvider>
        <SwalProvider>
          <ToastProvider toastProps={{ timeout: 3000 }} />
          <html lang="es" className="dark" >
            <head>
              <link rel="icon" href="/favicon.png" sizes="any" />
              <link rel="manifest" href="/manifest.json" />
            </head>
            <body>{children}</body>
          </html>
        </SwalProvider>
      </DrawerProvider>
    </HeroUIProvider>
  );
}
