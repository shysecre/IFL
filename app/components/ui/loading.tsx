import { cn } from '@/lib/utils'
import { LoaderIcon } from 'lucide-react'
import React from 'react'

export const LoadingElement = ({ className, children, ...args }: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div className={cn('flex justify-center items-center gap-3', className)} {...args}>
      <LoaderIcon className="size-10 animate-spin" />
      {children}
    </div>
  )
}
