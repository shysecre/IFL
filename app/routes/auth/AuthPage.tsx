import { SpotifyApi } from '@/app/api/spotify'
import SpotifyIconSvg from '@/app/assets/icons/spotify.svg'
import { Button } from '@/app/components/ui'
import { useConveyor } from '@/app/hooks/'
import { base64encode, generateRandomString, sha256 } from '@/lib/utils'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

export const AuthPage = () => {
  const [proccessStarted, setProccessStarted] = useState(false)
  const windowApi = useConveyor('window')
  const navigate = useNavigate()

  const handleCode = useCallback((_, code: string) => navigate(`/process-auth?code=${code}`), [navigate])

  async function handleLoginStart() {
    const codeVerifier = generateRandomString(69)

    localStorage.setItem('code_verifier', codeVerifier)

    const hashed = await sha256(codeVerifier)
    const codeChallenge = base64encode(hashed)

    const url = SpotifyApi.getOAuthUrl(codeChallenge)

    await windowApi.webOpenUrl(url)
    setProccessStarted(true)
  }

  useEffect(() => {
    window.ipc.on('code', handleCode)

    return () => {
      window.ipc.off('code', handleCode)
    }
  }, [handleCode])

  return (
    <div className="flex flex-col gap-5 h-full justify-center items-center">
      {proccessStarted ? (
        <span>You need to authorize with your account on the page that just opened</span>
      ) : (
        <>
          <img src={SpotifyIconSvg} alt="spotify-svg" className="w-14" />
          <div className="flex flex-col items-center gap-5 h-fit!">
            <Button onClick={handleLoginStart} className="font-bold">
              Authorize with Spotify
            </Button>
            <Button onClick={() => navigate('/')} className="w-full font-bold">
              Go back
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
