import User from './User'
import EncryptingProvider from './EncryptingProvider'
import UserRepository from './UserRepository'

export default class UserSignUp {
    constructor(
        private readonly repo: UserRepository,
        private readonly cripto: EncryptingProvider
    ) {}

    async executar(user: User): Promise<void> {
        const existingUser = await this.repo.searchByEmail(user.email)
        if (existingUser) throw new Error('Usuário já existe')

        const encryptedPassword = await this.cripto.encrypt(user.password)
        const novoUser: User = { ...user, password: encryptedPassword, isBarber: false }
        await this.repo.save(novoUser)
    }
}
