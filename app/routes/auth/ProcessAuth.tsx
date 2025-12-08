import { SpotifyApi } from '@/app/api/spotify'
import { LoadingElement } from '@/app/components/ui'
import { useAuth } from '@/app/providers'
import { getProfilePic, setAccessToken, setRefreshToken } from '@/app/utils'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

export const ProcessAuthPage = () => {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { setUser } = useAuth()

  useEffect(() => {
    async function processCode() {
      const code = params.get('code')
      const verifier = localStorage.getItem('code_verifier')

      if (!verifier || !code) {
        return navigate('/auth')
      }

      try {
        const { access_token, refresh_token } = await SpotifyApi.exchangeCode(code, verifier)

        setAccessToken(access_token)
        setRefreshToken(refresh_token)

        const me = await SpotifyApi.getUserData()

        setUser({ id: me.id, username: me.display_name, avatar: getProfilePic(me) })

        await navigate('/home')
      } catch {
        await navigate('/auth')
        setUser(null)
      }
    }

    processCode().catch(console.error)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <LoadingElement className="gap-3 h-full">
      <span className="text-2xl">Processing your authorization...</span>
    </LoadingElement>
  )
}
