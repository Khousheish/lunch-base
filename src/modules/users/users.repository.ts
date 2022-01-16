import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { SignUpDto } from 'src/core/auth/shared/dto/sign-up.dto';
import { User } from './shared/entities/user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  public async signUp(signUpDto: SignUpDto): Promise<any> {
    const salt: string = await bcrypt.genSalt();
    const user: User = this.create({
      ...signUpDto,
      password: await UsersRepository.hashPassword(signUpDto.password, salt),
      salt,
      createdAt: new Date(),
      active: true,
    });
    await user.save();

    return user;
  }

  private static async hashPassword(
    password: string,
    salt: string,
  ): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
