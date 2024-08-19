import User from './interfaces/User'
import UserRepository from './interfaces/UserRepository'
import EncryptingProvider from './interfaces/EncryptingProvider'

export default class UserSignIn {
    constructor(
        private readonly repo: UserRepository,
        private readonly cripto: EncryptingProvider
    ) {}

    async execute(email: string, password: string): Promise<User> {
        const user = await this.repo.searchByEmail(email)
        if (!user) throw new Error('User not found')

        const senhaCorreta = await this.cripto.compare(password, user.password)
        if (!senhaCorreta) throw new Error('Incorrect password')

        delete user.password
        return user
    }
}
