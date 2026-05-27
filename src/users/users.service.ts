import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserCreateDTO } from 'prisma/repositories/repository.dto';
import { UserRepository } from 'prisma/repositories/user.repository';
import { CreateUserDTO } from 'src/common/dto/users/users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) { }

  async createUser(data: CreateUserDTO) {
    const existingUser = await this.userRepository.getByEmail(data.email);
    if(existingUser) throw new ConflictException();
    const {password, ...rest} = data;
    const passwordHash = await bcrypt.hash(password, 10);
  
    return await this.userRepository.create({
      ...rest,
      passwordHash
    });
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    return await this.userRepository.updateRefreshToken(userId, refreshToken);
  }


  async getByEmail(email: string) {
    const user = await this.userRepository.getByEmail(email);
    if(!user)  throw new NotFoundException();
    return user;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.getById(id);
    if(!user) throw new NotFoundException();
    return user;
  }
}
