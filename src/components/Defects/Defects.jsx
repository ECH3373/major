'use client';

import { services } from '@/services'
import { Card } from '@/ui';
import { Switch } from '@heroui/react';
import React, { useEffect, useState } from 'react'

export const Defects = ({ value, onChange }) => {
  const [categoryID, setCategoryID] = useState("97bbf247-623a-4a6a-8f8e-0d7feaed9f22")
  const [defects, setDefects] = useState([])


  const getDefects = async () => {
    const response = await services.defects.index({ params: { limit: 1000, category_id: categoryID } })
    setDefects(response?.data)
  }

  useEffect(() => {
    getDefects()
  }, [categoryID])

  return (
    <Card className='p-4'>
      <header>
        <Switch isSelected={categoryID == '97bbf247-623a-4a6a-8f8e-0d7feaed9f22'} onValueChange={() => setCategoryID('97bbf247-623a-4a6a-8f8e-0d7feaed9f22')}>
          Atributo
        </Switch>

        <Switch isSelected={categoryID == '92dc670d-7c1f-4ce9-9826-265bde1e7be7'} onValueChange={() => setCategoryID('92dc670d-7c1f-4ce9-9826-265bde1e7be7')}>
          Defecto
        </Switch>

        <Switch isSelected={categoryID == 'c5aca1e1-6770-4594-af24-824b77dfe426'} onValueChange={() => setCategoryID('c5aca1e1-6770-4594-af24-824b77dfe426')}>
          F.P.
        </Switch>
      </header>

      <main className='h-[480px] overflow-y-auto'>
        {defects.map((defect) => (

          <div key={defect.id} onClick={() => onChange(defect)} className={`hover:bg-default-100 cursor-pointer ${value == defect && 'bg-red-500'}`}>
            <p>{defect.name}</p>
          </div>

        ))}
      </main>



    </Card>
  )
}
