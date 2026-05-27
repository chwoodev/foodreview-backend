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
};


export type UserCreateDTO = {
  email: string;
  passwordHash: string;
  isAdmin?: boolean;
};