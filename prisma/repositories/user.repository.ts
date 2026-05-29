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
        username: data.username,
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

  async resetRefreshToken(userId: number): Promise<User> {
    return this.prisma.user.update({
      where: {id: userId},
      data: {refreshToken: null}
    });
  }
  
  async getById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {id}
    });
  }

  async getByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {username}
    });
  }

  async setAdmin(id: number, isAdmin: boolean): Promise<User> {
    return this.prisma.user.update({
      where: {id},
      data: {isAdmin}
    });
  }
}
