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

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="dark">
      <body>
        <HeroUIProvider>
          <DrawerProvider>
            <SwalProvider>
              <ToastProvider toastProps={{ timeout: 3000 }} />
              {children}
            </SwalProvider>
          </DrawerProvider>
        </HeroUIProvider>
      </body>
    </html>
  );
}
