export interface IProduct {
  productId: string;
  productName: string;
  productPrice: number;
  productPriceCost: number;
  productDescription: string;
  productStock: number;
}

export type ICreateProduct = Omit<IProduct, 'productId'>;

export type IUpdateProduct = Partial<ICreateProduct>;
