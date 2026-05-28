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


export type UserCreateDTO = {
  username: string;
  passwordHash: string;
  isAdmin?: boolean;
};

export type RestaurantCreateInput = {
  name: string;
  imageData: string;
};


export type RestaurantCreateDTO = {
  name: string;
  imageData: string;
};