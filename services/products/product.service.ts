import { products } from "@/lib/mock-data";
import type { Product } from "@/lib/types";

export async function listProducts(): Promise<Product[]> { return Promise.resolve(products); }
export async function getProduct(id: string): Promise<Product | undefined> { return Promise.resolve(products.find((product) => product.id === id)); }

