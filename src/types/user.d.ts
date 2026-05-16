import { User } from '@db-models'

export type UserObject = User

export interface UserProfileData {
  id: number
  email: string
  username: string
}
