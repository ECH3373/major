import { Navigation } from '@/components';
import { Book, Calendar, Home, Settings } from '@/icons';

export default function Layout({ children }) {
  return (
    <div>
      <Navigation
        items={[
          { link: '/admin', name: 'Inicio', icon: <Home /> },
          { link: '/admin/courses', name: 'Cursos', icon: <Book /> },
          { link: '/admin/events', name: 'Eventos', icon: <Calendar /> },
          //{ link: '/admin/settings', name: 'Configuraciones', icon: <Settings /> },
        ]}
      />
      {children}
    </div>
  );
}
