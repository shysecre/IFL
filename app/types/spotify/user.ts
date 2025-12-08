export interface UserMeResponse {
  id: string
  display_name: string
  images: UserMeImages[]
}

interface UserMeImages {
  url: string
  height: number | null
  width: number | null
}
