import { Navigation } from '@/components';
import { Book, Calendar, Home, Store } from '@/icons';

export default function Layout({ children }) {
  return (
    <div>
      <Navigation
        items={[
          { link: '/admin/', name: 'Inicio', icon: <Home /> },
          { link: '/admin/courses', name: 'Cursos', icon: <Book /> },
          { link: '/admin/events', name: 'Eventos', icon: <Calendar /> },
          //{ link: '/admin/store', name: 'Tienda', icon: <Store /> },
        ]}
      />
      {children}
    </div>
  );
}
