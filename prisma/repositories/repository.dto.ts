import { Auth, Menu, Restaurant, Review, Stat, User } from "generated/prisma/client";

export type ReviewCreateInput = {
  content: string;
  userId: number;
  menuId: number;
  imageId: string;
  taste: number;
  amount: number;
  price: number;
};

export type ReviewPayload = {
  menuId: number;
  content: string;
  taste: number;
  amount: number;
  price: number;
};

export type ReviewCreateDTO = {
  userId: number;
  menuId: number;
  content: string;
  taste: number;
  amount: number;
  price: number;
  imageData: string;
};

export type ReviewDTO = Review & { likeCount: number; liked: boolean };

export type ReviewWithLikeInfo = Review & {
  _count: { likes: number };
  likes: { id: number }[];
};


export type UserCreateDTO = {
  username: string;
  passwordHash: string;
  isAdmin?: boolean;
};

export type UserWithAuth = User & { auth: Auth | null };

export type RestaurantCreateInput = {
  name: string;
  imageData: string;
};


export type RestaurantCreateDTO = {
  name: string;
  imageData: string;
};

export type StatFields = Pick<Stat, 'sumTaste' | 'sumAmount' | 'sumPrice' | 'reviewCount'>;

export type MenuDTO = Menu & StatFields;

export type RestaurantDTO = Restaurant & StatFields;

export type RestaurantWithMenus = RestaurantDTO & { menus: Menu[] };

export type MenuWithStat = Menu & { stat: Stat | null };

export type RestaurantWithStat = Restaurant & { stat: Stat | null };

export type RestaurantWithMenusAndStat = RestaurantWithStat & { menus: MenuWithStat[] };


export type MenuCreateDTO = {
  name: string;
};

export type MenuCreateInput = {
  restaurantId: number;
  name: string;
};


export type StatUpdateInput = {
  menuId: number;
  tasteChange: number;
  amountChange: number;
  priceChange: number;
  reviewCountChange: number;
};
