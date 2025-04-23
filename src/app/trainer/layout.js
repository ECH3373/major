import { Navigation } from '@/components';
import { Home, Store } from '@/icons';

export default function Layout({ children }) {
  return (
    <div>
      <Navigation
        items={[
          { link: '/trainer/', name: 'Inicio', icon: <Home /> },
          //{ link: '/trainer/store', name: 'Tienda', icon: <Store /> },
        ]}
      />
      {children}
    </div>
  );
}
