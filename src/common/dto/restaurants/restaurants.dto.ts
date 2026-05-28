import { IsString } from "class-validator";


export class RestaurantCreateBodyDTO {
    @IsString()
    name: string;

    @IsString()
    imageData: string;
}
