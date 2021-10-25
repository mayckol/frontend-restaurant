import api from "../api";
import { IProduct } from "../interface/IProduct";

const getAll = () => api.get<IProduct[]>("/products");

export const ProductService = {
  getAll,
};
