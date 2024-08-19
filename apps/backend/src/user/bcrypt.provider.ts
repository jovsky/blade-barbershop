import { Injectable } from '@nestjs/common'
import { EncryptingProvider } from '@barba/core'
import * as bcrypt from 'bcrypt'

@Injectable()
export class BcryptProvider implements EncryptingProvider {
  async encrypt(senha: string): Promise<string> {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(senha, salt)
  }

  async compare(pass: string, encryptedPass: string): Promise<boolean> {
    return bcrypt.compare(pass, encryptedPass)
  }
}
