'use client';

import { services } from "@/services";
import { Screen } from "@/ui";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const params = useParams()

  const get = async () => {
    const response = await services.resources.show({ id: params.resource_id })
    console.log(response)
  }

  useEffect(() => {
    get()
  }, [])

  return (
    <Screen>
      {params.resource_id}
    </Screen>
  );
}

