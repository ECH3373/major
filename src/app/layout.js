import { DrawerProvider, SwalProvider } from '@/context';
import '@/styles/index.css';
import { HeroUIProvider } from '@heroui/react';
import { ToastProvider } from '@heroui/toast';

export const metadata = {
  title: 'MAJOR',
  description: 'Tu descripción aquí',
  manifest: '/manifest.json',
  themeColor: '#000000',
  icons: {
    icon: '/icon512_rounded.png',
    shortcut: '/icon512_rounded.png',
    apple: '/icon512_rounded.png',
  },
};

export default function Layout({ children }) {
  return (
    <html lang='es' className='dark'>
      <body >
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
