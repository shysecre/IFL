import { useWindowContext } from './WindowContext'
import { TitlebarMenu } from './TitlebarMenu'
import { useConveyor } from '@/app/hooks/use-conveyor'
import { useAuth } from '@/app/providers/AuthProvider'

const SVG_PATHS = {
  close: 'M 0,0 0,0.7 4.3,5 0,9.3 0,10 0.7,10 5,5.7 9.3,10 10,10 10,9.3 5.7,5 10,0.7 10,0 9.3,0 5,4.3 0.7,0 Z',
  maximize: 'M 0,0 0,10 10,10 10,0 Z M 1,1 9,1 9,9 1,9 Z',
  minimize: 'M 0,5 10,5 10,6 0,6 Z',
} as const

export const Titlebar = () => {
  const { icon } = useWindowContext().titlebar
  const { window: wcontext } = useWindowContext()

  return (
    <div className={`window-titlebar ${wcontext?.platform ? `platform-${wcontext.platform}` : ''}`}>
      {wcontext?.platform === 'win32' && (
        <div className="window-titlebar-icon">
          <img src={icon} />
        </div>
      )}

      <User />
      <TitlebarMenu />
      {wcontext?.platform === 'win32' && <TitlebarControls />}
    </div>
  )
}

const User = () => {
  const { user } = useAuth()

  return (
    user && (
      <div className="absolute left-1/2 -translate-x-1/2 flex gap-1">
        <span>Logged in as</span>
        <img className="h-5 rounded-[50%] w-5" src={user.avatar} />
        <span>{user.username}</span>
      </div>
    )
  )
}

const TitlebarControls = () => {
  const { window: wcontext } = useWindowContext()

  return (
    <div className="window-titlebar-controls">
      {wcontext?.minimizable && <TitlebarControlButton label="minimize" svgPath={SVG_PATHS.minimize} />}
      <TitlebarControlButton label="close" svgPath={SVG_PATHS.close} />
    </div>
  )
}

const TitlebarControlButton = ({ svgPath, label }: { svgPath: string; label: string }) => {
  const { windowMinimize, windowClose } = useConveyor('window')

  const handleAction = async () => {
    const actions = {
      minimize: windowMinimize,
      close: windowClose,
    }
    await actions[label as keyof typeof actions]?.()
  }

  return (
    <div aria-label={label} className="titlebar-controlButton" onClick={handleAction}>
      <svg width="10" height="10">
        <path fill="currentColor" d={svgPath} />
      </svg>
    </div>
  )
}

export interface TitlebarProps {
  title: string
  titleCentered?: boolean
  icon?: string
  menuItems?: TitlebarMenu[]
}
