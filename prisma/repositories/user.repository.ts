import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from 'generated/prisma/client';
import { UserCreateDTO, UserWithAuth } from './repository.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: UserCreateDTO): Promise<User> {
    return this.prisma.user.create({
      data:{
        username: data.username,
        isAdmin: data.isAdmin,
        auth: {
          create: {
            passwordHash: data.passwordHash,
          },
        },
      }
    });
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    return this.prisma.auth.update({
      where: {userId},
      data: {refreshToken}
    });
  }

  async resetRefreshToken(userId: number) {
    return this.prisma.auth.update({
      where: {userId},
      data: {refreshToken: null}
    });
  }
  
  async getById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {id}
    });
  }

  async getByIdWithAuth(id: number): Promise<UserWithAuth | null> {
    return this.prisma.user.findUnique({
      where: {id},
      include: {auth: true}
    });
  }

  async getByUsername(username: string): Promise<UserWithAuth | null> {
    return this.prisma.user.findUnique({
      where: {username},
      include: {auth: true}
    });
  }

  async setAdmin(id: number, isAdmin: boolean): Promise<User> {
    return this.prisma.user.update({
      where: {id},
      data: {isAdmin}
    });
  }
}
