import { IsString, IsNotEmpty, IsInt } from 'class-validator'

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}


export type UserDTO = {
  id: number;
  username: string;
  isAdmin: boolean;
};

export function toUserDTO(user: UserDTO): UserDTO {
  return {
    id: user.id,
    username: user.username,
    isAdmin: user.isAdmin
  };
}