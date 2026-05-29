import { IsInt, IsString, Max, Min, MaxLength } from 'class-validator';


export class ReviewCreateBodyDTO {
    @IsInt()
    menuId: number;

    @IsString()
    @MaxLength(200)
    content: string;

    @IsInt()
    @Min(1)
    @Max(5)
    taste: number;

    @IsInt()
    @Min(1)
    @Max(5)
    amount: number;

    @IsInt()
    @Min(1)
    @Max(5)
    price: number;

    @IsString()
    imageData: string;
}
