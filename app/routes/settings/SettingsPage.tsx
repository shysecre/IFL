import { PageHeader } from '@/app/components/ui/page-header'
import { FavoritePlaylistSettingCategory, SelectPlaylistsSettingsCategory } from '@/app/routes/settings/categories'
import { SettingsCategory } from '@/app/routes/settings/components/SettingsCategory'
import { SettingsCategoryItem } from '@/app/routes/settings/components/SettingsCategoryItem'

export const SettingsPage = () => {
  return (
    <div className="flex flex-col">
      <PageHeader title="Settings" />
      <div className="m-5 flex flex-col gap-5">
        <SettingsCategory name="Playlists settings">
          <SettingsCategoryItem>
            <SelectPlaylistsSettingsCategory />
          </SettingsCategoryItem>
        </SettingsCategory>
        <SettingsCategory name="Favorite Playlist settings">
          <SettingsCategoryItem>
            <FavoritePlaylistSettingCategory />
          </SettingsCategoryItem>
        </SettingsCategory>
      </div>
    </div>
  )
}
