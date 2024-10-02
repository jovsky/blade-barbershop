import User from './User'

export default interface UserRepository {
  save(user: User): Promise<void>
  searchByEmail(email: string): Promise<User | null>
}
