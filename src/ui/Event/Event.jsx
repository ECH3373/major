import React from 'react';
import { Card, Divider, User } from '..';

export const Event = ({ data }) => {

  return (
    <Card className="flex flex-col gap-2">
      <header className="flex flex-col gap-2">
        <h1 className="font-bold text-xl text-center">
          {data?.name} {data?.start_date} - {data?.end_date}{' '}
        </h1>
        <User src={data?.trainer?.avatar} name={data?.trainer?.name} />
      </header>

      <Divider />

      <div className="flex flex-col gap-2">
        {data.enrollments.map((enrollment, index) => (
          <User key={index} src={enrollment.employee.avatar} name={enrollment.employee.name} />
        ))}
      </div>
    </Card>
  );
};
