import { Tooltip } from '@heroui/react';
import React from 'react';

export const Dot = ({ data }) => {
  return (
    <div
      className={`absolute z-10 translate-x-[-5px] translate-y-[-5px]`}
      style={{ top: `${data.percent_y}%`, left: `${data.percent_x}%` }}
    >
      <Tooltip showArrow color="primary" delay={1000} content={data.defect.name}>
        <div className={`absolute rounded-[50%] opacity-80 h-[18px] w-[18px] border-[2px] border-red-400`}></div>
      </Tooltip>
    </div>
  );
};
