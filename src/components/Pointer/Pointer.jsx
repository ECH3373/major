import React from 'react'

export const Pointer = ({ children, src, className, onPress }) => {
  const handlePress = (e) => {
    const boundingRect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - boundingRect.left;
    const offsetY = e.clientY - boundingRect.top;
    const percentX = parseFloat(((offsetX / boundingRect.width) * 100).toFixed(2));
    const percentY = parseFloat(((offsetY / boundingRect.height) * 100).toFixed(2));

    if (onPress && percentX >= 0 && percentY >= 0 && percentX <= 100 && percentY <= 100)
      onPress(percentX, percentY);
  };

  return (
    <div onClick={(e) => handlePress(e)} className={`relative h-[600px] w-[600px] cursor-pointer ${className}`}>
      <img className="pointer-events-none select-none h-full w-full" src={src} />
      {children}
    </div>)
}
