import { DrawerProvider } from '@/context';
import '@/styles/index.css';
import { HeroUIProvider } from '@heroui/react';
import { ToastProvider } from '@heroui/toast';

export default function Layout({ children }) {
  return (
    <HeroUIProvider>
      <DrawerProvider>
        <ToastProvider toastProps={{ timeout: 3000 }} />
        <html lang="es" className="dark">
          <body>{children}</body>
        </html>
      </DrawerProvider>
    </HeroUIProvider>
  );
}
