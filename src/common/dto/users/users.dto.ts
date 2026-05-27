import { IsString, IsNotEmpty, IsInt } from 'class-validator'

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}


export type UserDTO = {
  id: number;
  email: string;
  isAdmin: boolean;
};

export function toUserDTO(user: UserDTO): UserDTO {
  return {
    id: user.id,
    email: user.email,
    isAdmin: user.isAdmin
  };
}