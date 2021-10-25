import { ICarouselItem } from "./ICarrouselItem";

export interface IProduct extends ICarouselItem {
  id: number;
  category: number;
  price: number;
  description: string
}
