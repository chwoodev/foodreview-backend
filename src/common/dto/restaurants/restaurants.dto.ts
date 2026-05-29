import { IsString } from "class-validator";
import { RestaurantWithMenus } from "prisma/repositories/repository.dto";


export class RestaurantCreateBodyDTO {
    @IsString()
    name: string;

    @IsString()
    imageData: string;
}

export type PickerRestaurantDTO = {
  id: number;
  name: string;
  imageData: string;
  menus: {
    id: number;
    name: string;
  }[]
};

export function toPickerRestaurantDTO(restaurant: RestaurantWithMenus): PickerRestaurantDTO {
  return {
    id: restaurant.id,
    name: restaurant.name,
    imageData: restaurant.imageData,
    menus: restaurant.menus.map(x => ({id: x.id, name: x.name}))
  };
}
