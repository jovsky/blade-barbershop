import User from './User'
import UserRepository from './UserRepository'
import EncryptingProvider from './EncryptingProvider'

export default class UserSignIn {
    constructor(
        private readonly repo: UserRepository,
        private readonly cripto: EncryptingProvider
    ) {}

    async executar(email: string, password: string): Promise<User | null> {
        const user = await this.repo.searchByEmail(email)
        if (!user) throw new Error('User not found')

        const senhaCorreta = await this.cripto.compare(password, user.password)
        if (!senhaCorreta) throw new Error('Incorrect password')

        delete user.password
        return user
    }
}
