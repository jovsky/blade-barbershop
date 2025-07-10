import User from './interfaces/User'
import EncryptingProvider from './interfaces/EncryptingProvider'
import UserRepository from './interfaces/UserRepository'

export default class UserSignUp {
  constructor(
    private readonly repo: UserRepository,
    private readonly cripto: EncryptingProvider
  ) {}

  async execute(user: User): Promise<void> {
    const existingUser = await this.repo.searchByEmail(user.email)
    if (existingUser) throw new Error('User already exists')

    const encryptedPassword = await this.cripto.encrypt(user.password)
    const newUser: User = { ...user, password: encryptedPassword, isBarber: false }
    await this.repo.save(newUser)
  }
}
