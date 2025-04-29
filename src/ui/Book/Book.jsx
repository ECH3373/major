'use client'

import { Book as Icon } from '@/icons'
import { Button } from '@heroui/react'
import React, { useState } from 'react'

export const Book = ({ className = '', src }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {isOpen && <iframe src={src} className='fixed h-full w-full top-0 left-0' />}

      <Button onPress={() => setIsOpen(!isOpen)} isIconOnly className={`${className} h-[60px] w-[60px] bg-secondary rounded-full flex justify-center items-center`}>
        <Icon />
      </Button>
    </>
  )
}
