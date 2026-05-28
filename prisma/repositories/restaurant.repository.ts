import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { Image, Restaurant } from "generated/prisma/client";
import { RestaurantCreateInput } from "./repository.dto";

@Injectable()
export class RestaurantRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createRestaurant(data: RestaurantCreateInput): Promise<Restaurant> {
        return await this.prisma.restaurant.create({data});
    }

    async getRestaurants(): Promise<Restaurant[]> {
        return await this.prisma.restaurant.findMany();
    }

    
}