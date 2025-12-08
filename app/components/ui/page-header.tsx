import { cn } from '@/lib/utils'
import React from 'react'

interface PageHeaderProps extends React.HTMLProps<HTMLDivElement> {
  title: string
}

export const PageHeader = ({ title, className, ...props }: PageHeaderProps) => {
  return (
    <div className={cn('flex flex-col justify-center gap-1 items-center pt-1', className)} {...props}>
      <span className="text-3xl">{title}</span>
      <hr className="w-full" />
    </div>
  )
}
