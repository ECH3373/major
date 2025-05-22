import { Navigation } from '@/components';
import { Book, Home } from '@/icons';

export default function Layout({ children }) {
  return (
    <div>
      <Navigation
        items={[
          { link: '/user', name: 'Inicio', icon: <Home /> },
          { link: '/user/events', name: 'Eventos', icon: <Book /> },
        ]}
      />
      {children}
    </div>
  );
}
