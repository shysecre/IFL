import { useNavigate } from 'react-router'
import { CatIcon, DogIcon, Loader2 } from 'lucide-react'
import GuraImage from '@/app/assets/images/gura.png'
import { useAuth } from '@/app/providers'
import { Button } from '@/app/components/ui'

export const WelcomePage = () => {
  const { user, isLoading } = useAuth()

  const WELCOME_TEXT = user ? 'Welcome back!' : 'Welcome!'

  return (
    <div className="flex flex-col gap-5 justify-center items-center h-full">
      {isLoading ? (
        <>
          <div className="flex gap-2 items-center text-4xl">
            <Loader2 className="size-10 animate-spin" />
            <span>Loading...</span>
          </div>
        </>
      ) : (
        <>
          <img src={GuraImage} className="rounded-2xl" />
          <div className="text-2xl">{WELCOME_TEXT}</div>
          {user ? <GoHomeComponent /> : <GoAuthComponent />}
        </>
      )}
    </div>
  )
}

function GoHomeComponent() {
  const nav = useNavigate()

  return (
    <Button onClick={() => nav('/home')} className="font-bold">
      <DogIcon />
      <span>Home</span>
    </Button>
  )
}

function GoAuthComponent() {
  const nav = useNavigate()

  return (
    <Button onClick={() => nav('/auth')} className="font-bold">
      <CatIcon />
      <span>Auth</span>
    </Button>
  )
}
