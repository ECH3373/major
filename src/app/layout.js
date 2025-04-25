import { DrawerProvider, SwalProvider } from '@/context';
import '@/styles/index.css';
import { HeroUIProvider } from '@heroui/react';
import { ToastProvider } from '@heroui/toast';

export default function Layout({ children }) {
  return (
    <HeroUIProvider>
      <DrawerProvider>
        <SwalProvider>
          <ToastProvider toastProps={{ timeout: 3000 }} />
          <html lang="es" className="dark">
            <body>{children}</body>
          </html>
        </SwalProvider>
      </DrawerProvider>
    </HeroUIProvider>
  );
}
