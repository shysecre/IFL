import type { TitlebarMenu } from '@/app/components/window/TitlebarMenu'

export const defaultMenuItems: TitlebarMenu[] = [
  {
    name: 'App',
    items: [
      {
        name: 'Exit',
        action: 'window-close',
      },
    ],
  },
]
