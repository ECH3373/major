'use client';

import { Defects, Pointer } from "@/components";
import { services } from "@/services";
import { Button, Dot, Screen } from "@/ui";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const params = useParams()
  const [resource, setResource] = useState([])
  const [defect, setDefect] = useState([])
  const [dots, setDots] = useState([]);
  const [index, setIndex] = useState(0);

  const getPiece = async () => {
    const response = await services.resources.show({ id: params.resource_id })
    setResource(response?.data)
  }

  const addPoint = (x, y) => {
    if (defect.id) {
      const newDot = {
        id: `new-dot-${index}`,
        percent_x: x,
        percent_y: y,
        comment: null,
        defect: {
          id: defect.id,
          name: defect.name,
          category: { id: defect.category.id, name: defect.category.name },
        },
      };

      setDots((prev) => [...prev, newDot]);
      setIndex((prev) => prev + 1);
    }
  };


  useEffect(() => {
    getPiece()
  }, [])

  return (

    <Screen className="flex flex-col gap-4 justify-center items-center">

      <div className=" flex gap-4">
        <Defects value={defect} onChange={setDefect} />

        <Pointer src={resource.image} onPress={addPoint} >
          {dots.map((dot, index) => (
            <Dot key={index} data={dot} />
          ))}
        </Pointer>
      </div>

      <div className="flex">
        <Button>
          Guardar cambios
        </Button>
      </div>

    </Screen>
  );
}

