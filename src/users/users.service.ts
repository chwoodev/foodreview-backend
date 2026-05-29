import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserCreateDTO } from 'prisma/repositories/repository.dto';
import { UserRepository } from 'prisma/repositories/user.repository';
import { CreateUserDTO } from 'src/common/dto/users/users.dto';
import * as bcrypt from 'bcrypt';


const USERNAME_REGEX = /^[a-z0-9]{4,16}$/;

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) { }

  async createUser(data: CreateUserDTO) {
    if (!USERNAME_REGEX.test(data.username)) throw new BadRequestException('Invalid username format');
    if (data.password.length < 8) throw new BadRequestException('Password is too short');
    if (data.password.length > 24) throw new BadRequestException('Password is too long');
    const existingUser = await this.userRepository.getByUsername(data.username);
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

  async resetRefreshToken(userId: number){
    return await this.userRepository.resetRefreshToken(userId);
  }

  async getByUsername(username: string) {
    const user = await this.userRepository.getByUsername(username);
    if(!user)  throw new NotFoundException();
    return user;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.getById(id);
    if(!user) throw new NotFoundException();
    return user;
  }

  async getByIdWithAuth(id: number) {
    const user = await this.userRepository.getByIdWithAuth(id);
    if(!user) throw new NotFoundException();
    return user;
  }
}
