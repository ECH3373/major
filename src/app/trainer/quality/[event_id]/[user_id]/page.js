'use client';

import { Grid, Item } from '@/components';
import { services } from "@/services";
import { Screen } from "@/ui";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()
  const [resources, setResources] = useState([])

  const get = async () => {
    const allResources = [];

    const response = await services.events.show({ id: params.event_id })
    const modules = await services.modules.index({ params: { course_id: response.data.course_id, limit: 100 } })

    for (const mod of modules.data) {
      const lessons = await services.lessons.index({ params: { module_id: mod.id, limit: 100 } })

      for (const lesson of lessons.data) {
        const resourcesRes = await services.resources.index({ params: { lesson_id: lesson.id, limit: 100 } })
        allResources.push(...resourcesRes.data);
      }
    }

    setResources(allResources);
  };

  useEffect(() => {
    get();
  }, [params.event_id]);


  return (
    <Screen>

      <Grid title="Pieza a calificar">
        {resources.map((resource) => (
          <Item key={resource.id} title={`${resource.name} - ${resource.quantity}`} src={resource?.image} description={resource.description}
            onPress={() => router.push(`${pathname}/${resource.id}`)} />
        ))}
      </Grid>

    </Screen>
  );
}

