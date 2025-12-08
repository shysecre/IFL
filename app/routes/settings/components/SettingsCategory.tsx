import { cn } from '@/lib/utils'
import React from 'react'

interface SettingsCategoryProps extends React.HTMLProps<HTMLDivElement> {
  name: string
}

export const SettingsCategory = ({ name, className, children, ...props }: SettingsCategoryProps) => {
  return (
    <div className={cn(className)} {...props}>
      <div>{name}</div>
      <div>{children}</div>
    </div>
  )
}
