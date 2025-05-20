'use client';

import { Folder } from "@/icons";
import { services } from "@/services";
import { Button, Screen, Table, User } from "@/ui";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [enrollments, setEnrollments] = useState([])
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()

  const getEmployees = async () => {
    const response = await services.enrollments.index({
      params: {
        event_id: params.event_id
      }
    })

    setEnrollments(response.data)
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <Screen>

      <Table
        title="Usuario a calificar"
        headers={['Nombre', 'Acciones']}
      //page={pagination?.page}
      //pages={pagination?.pages}
      //isLoading={isLoading}
      //onSearch={(search) => get({ search })}
      //onChange={(page) => get({ page })}
      //onCreate={() => drawers.create_event({ onSubmit: get })}
      >
        {enrollments.map((enrollment, index) => {
          return [

            <User
              key={'name'}
              src={enrollment.employee.avatar}
              name={enrollment.employee.name}
              description={enrollment.employee.code}
            />,

            <div key={'action'} className="flex gap-2">
              <Button
                onPress={() => router.push(`${pathname}/${enrollment.employee.id}`)}
                startContent={<Folder />} isIconOnly
              />
            </div>,

          ];
        })}
      </Table>

    </Screen>
  );
}

