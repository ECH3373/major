import { useDrawer } from '@/context';
import { Delete, Folder } from '@/icons';
import { services } from '@/services';
import { CreateCourse, CreateEnrollment, CreateLesson, CreateModule, CreateResource, EditCourse, EditLesson, EditModule } from '@/templates';
import { EditResource } from '@/templates/EditResource/EditResource';
import { Button } from '@/ui';
import { addToast } from '@heroui/react';
import { usePathname, useRouter } from 'next/navigation';

export const useDrawers = () => {
  const router = useRouter();
  const pathname = usePathname();
  const drawer = useDrawer();

  const create_course = ({ onSubmit }) => {
    const handleSubmit = async (response) => {
      drawer.close();
      if (onSubmit) await onSubmit(response);
    };

    drawer.fire({ content: <CreateCourse onSubmit={handleSubmit} /> });
  };

  const edit_course = async ({ id, onSubmit }) => {
    const handleSubmit = async (response) => {
      drawer.close();
      if (onSubmit) await onSubmit(response);
    };

    const handleDestroy = async () => {
      const response = await services.courses.destroy({ id });

      if (response?.status == 'error') addToast({ title: 'Error', description: response?.message, color: 'danger' });

      if (response?.status == 'success') {
        addToast({ title: 'Success', description: response?.message, color: 'success' });
        drawer.close();
        if (onSubmit) await onSubmit(response);
      }
    };

    const handleNavigate = () => {
      router.push(`${pathname}/${id}`);
      drawer.close();
    };

    drawer.fire({
      content: <EditCourse id={id} onSubmit={handleSubmit} />,
      footer: (
        <div className="flex gap-2">
          <Button onPress={handleDestroy} startContent={<Delete />} isIconOnly color="danger" />
          <Button onPress={handleNavigate} startContent={<Folder />} isIconOnly />
        </div>
      ),
    });
  };

  const create_module = ({ course_id, onSubmit }) => {
    const handleSubmit = async (response) => {
      drawer.close();
      if (onSubmit) await onSubmit(response);
    };

    drawer.fire({ content: <CreateModule course_id={course_id} onSubmit={handleSubmit} /> });
  };

  const edit_module = async ({ id, onSubmit }) => {
    const handleSubmit = async (response) => {
      drawer.close();
      if (onSubmit) await onSubmit(response);
    };

    const handleDestroy = async () => {
      const response = await services.modules.destroy({ id });

      if (response?.status == 'error') addToast({ title: 'Error', description: response?.message, color: 'danger' });

      if (response?.status == 'success') {
        addToast({ title: 'Success', description: response?.message, color: 'success' });
        drawer.close();
        if (onSubmit) await onSubmit(response);
      }
    };

    const handleNavigate = () => {
      router.push(`${pathname}/${id}`);
      drawer.close();
    };

    drawer.fire({
      content: <EditModule id={id} onSubmit={handleSubmit} />,
      footer: (
        <div className="flex gap-2">
          <Button onPress={handleDestroy} startContent={<Delete />} isIconOnly color="danger" />
          <Button onPress={handleNavigate} startContent={<Folder />} isIconOnly />
        </div>
      ),
    });
  };

  const create_lesson = ({ module_id, onSubmit }) => {
    const handleSubmit = async (response) => {
      drawer.close();
      if (onSubmit) await onSubmit(response);
    };

    drawer.fire({ content: <CreateLesson module_id={module_id} onSubmit={handleSubmit} /> });
  };

  const edit_lesson = async ({ id, onSubmit }) => {
    const handleSubmit = async (response) => {
      drawer.close();
      if (onSubmit) await onSubmit(response);
    };

    const handleDestroy = async () => {
      const response = await services.lessons.destroy({ id });

      if (response?.status == 'error') addToast({ title: 'Error', description: response?.message, color: 'danger' });

      if (response?.status == 'success') {
        addToast({ title: 'Success', description: response?.message, color: 'success' });
        drawer.close();
        if (onSubmit) await onSubmit(response);
      }
    };

    const handleNavigate = () => {
      router.push(`${pathname}/${id}`);
      drawer.close();
    };

    drawer.fire({
      content: <EditLesson id={id} onSubmit={handleSubmit} />,
      footer: (
        <div className="flex gap-2">
          <Button onPress={handleDestroy} startContent={<Delete />} isIconOnly color="danger" />
          <Button onPress={handleNavigate} startContent={<Folder />} isIconOnly />
        </div>
      ),
    });
  };

  const create_resource = ({ lesson_id, onSubmit }) => {
    const handleSubmit = async (response) => {
      drawer.close();
      if (onSubmit) await onSubmit(response);
    };

    drawer.fire({ content: <CreateResource lesson_id={lesson_id} onSubmit={handleSubmit} /> });
  };

  const edit_resource = async ({ id, onSubmit }) => {
    const handleSubmit = async (response) => {
      drawer.close();
      if (onSubmit) await onSubmit(response);
    };

    const handleDestroy = async () => {
      const response = await services.resources.destroy({ id });

      if (response?.status == 'error') addToast({ title: 'Error', description: response?.message, color: 'danger' });

      if (response?.status == 'success') {
        addToast({ title: 'Success', description: response?.message, color: 'success' });
        drawer.close();
        if (onSubmit) await onSubmit(response);
      }
    };

    drawer.fire({
      content: <EditResource id={id} onSubmit={handleSubmit} />,
      footer: (
        <div className="flex gap-2">
          <Button onPress={handleDestroy} startContent={<Delete />} isIconOnly color="danger" />
        </div>
      ),
    });
  };

  const create_enrollment = ({ onSubmit }) => {
    const handleSubmit = async (response) => {
      drawer.close();
      if (onSubmit) await onSubmit(response);
    };

    drawer.fire({ content: <CreateEnrollment onSubmit={handleSubmit} /> });
  };

  return { create_course, edit_course, create_module, create_resource, edit_module, create_lesson, edit_lesson, edit_resource, create_enrollment };
};
