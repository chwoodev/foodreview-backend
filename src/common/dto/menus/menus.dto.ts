import { IsString } from "class-validator";


export class MenuCreateBodyDTO {
    @IsString()
    name: string;
}