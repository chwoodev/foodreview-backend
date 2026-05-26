export type ReviewCreateInput = {
  content: string;
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

export type CreateReviewDTO = {
  userId: number;
  menuId: number;
  content: string;
  taste: number;
  amount: number;
  price: number;
};
