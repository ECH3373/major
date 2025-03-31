import { Navigation } from '@/components';
import { Book, Home, User } from '@/icons';

export default function Layout({ children }) {
  return (
    <div>
      <Navigation
        items={[
          { link: '/admin/', name: 'Inicio', icon: <Home /> },
          { link: '/admin/courses', name: 'Cursos', icon: <Book /> },
          { link: '/admin/enrollments', name: 'Inscripciones', icon: <User /> },
        ]}
      />
      {children}
    </div>
  );
}
