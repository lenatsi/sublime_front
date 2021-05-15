import { User } from './user.model';
export class Job {
  _id?: string
  name?: string
  logo?:string
  description?: string
  localization?: string
  city?: string
  type?: string
  publishedBy?: User
  savedAt?: string
  updatedAt?: string
}
