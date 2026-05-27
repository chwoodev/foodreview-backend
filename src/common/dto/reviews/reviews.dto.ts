import { IsInt, IsString, Max, Min } from 'class-validator';


export class ReviewCreateBodyDTO {
    @IsInt()
    menuId: number;

    @IsString()
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
}
