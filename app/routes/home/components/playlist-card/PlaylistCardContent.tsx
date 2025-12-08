import React from 'react'

export const PlaylistCardContent = ({ children }: React.HTMLProps<HTMLDivElement>) => {
  return <div className="flex flex-col p-2 h-full">{children}</div>
}
