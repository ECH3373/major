import { Lock } from '@/icons';
import { Card, Divider, Progress } from '@/ui';
import React from 'react';

export const Item = ({ className = '', onPress, title, description, src, tags = [], isLocked = false, progress }) => {
  return (
    <Card isPressable={!isLocked} onPress={onPress} className={`flex flex-col gap-2 h-full w-full pb-2 ${isLocked && 'filter grayscale opacity-65'} ${className}`}>
      <header className="relative flex flex-col h-[200px] w-full">
        {src && <img src={src} className="h-full w-full object-cover fade-bottom" />}
        {isLocked && <Lock className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-9xl" />}
      </header>

      <main className="flex flex-col gap-1 flex-1 px-2">
        <h3 className="text-xl font-bold text-center capitalize">{title}</h3>
        <p className="text-sm text-center capitalize">{description}</p>
      </main>

      <footer className="flex flex-col gap-2 px-2">
        {tags.length > 0 && <Divider />}

        <div className="flex flex-wrap gap-2 justify-center items-center">
          {tags.map((tag, index) => (
            <div key={index} className="flex gap-1 items-center">
              <div className="text-sm">{tag.icon}</div>
              <p className="text-tiny">{tag.text}</p>
            </div>
          ))}
        </div>

        {progress >= 0 && <Progress value={progress} />}
      </footer>
    </Card>
  );
};
