import { cn } from '@/lib/utils'
import React from 'react'

export const SettingsCategoryItem = ({ className, children, ...props }: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  )
}
