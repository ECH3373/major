import { Navigation } from '@/components';
import { Home, Ring, Store } from '@/icons';

export default function Layout({ children }) {
  return (
    <div>
      <Navigation
        items={[
          { link: '/trainer/', name: 'Inicio', icon: <Home /> },
          { link: '/trainer/quality/', name: 'Calificar', icon: <Ring /> },
        ]}
      />
      {children}
    </div>
  );
}
