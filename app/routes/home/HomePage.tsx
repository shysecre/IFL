import { PageHeader } from '@/app/components/ui'
import { usePlaylists } from '@/app/hooks'
import { PlaylistCard } from '@/app/routes/home/components/playlist-card/PlaylistCard'

export const HomePage = () => {
  const playlists = usePlaylists()

  return (
    <div className="flex flex-col items-center">
      <PageHeader title="Home" className="w-full" />
      <div className="flex m-5 gap-5">
        {playlists.map((p) => (
          <PlaylistCard playlist={p} key={p.id} />
        ))}
      </div>
    </div>
  )
}
