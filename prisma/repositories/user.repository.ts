import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from 'generated/prisma/client';
import { UserCreateDTO } from './repository.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: UserCreateDTO): Promise<User> {
    return this.prisma.user.create({
      data:{
        email: data.email,
        passwordHash: data.passwordHash,
        isAdmin: data.isAdmin
      }
    });
  }

  async updateRefreshToken(userId: number, refreshToken: string): Promise<User> {
    return this.prisma.user.update({
      where: {id: userId},
      data: {refreshToken}
    });
  }
  
  async getById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {id}
    });
  }

  async getByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {email}
    });
  }

  async setAdmin(id: number, isAdmin: boolean): Promise<User> {
    return this.prisma.user.update({
      where: {id},
      data: {isAdmin}
    });
  }
}
