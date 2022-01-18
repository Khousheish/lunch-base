import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/modules/users/shared/entities/user.entity';
import { IAccessTokenPayload } from 'src/modules/users/shared/models/access-token-payload';
import { UsersRepository } from 'src/modules/users/users.repository';

@Injectable()
// tslint:disable-next-line: no-inferred-empty-object-type
export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  public async validate(
    accessTokenPayload: IAccessTokenPayload,
  ): Promise<User> {
    const user: User = await this.usersRepository.findOne({
      id: accessTokenPayload.profile.id,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
