import { z } from "zod";

export const productSchema = z.object({ name: z.string().min(2), sku: z.string().min(2), barcode: z.string().optional(), category: z.string().min(1), costPrice: z.coerce.number().nonnegative(), sellingPrice: z.coerce.number().nonnegative(), minimumStock: z.coerce.number().int().nonnegative() });
export const categorySchema = z.object({ name: z.string().min(2), status: z.enum(["Active", "Inactive"]) });
export const supplierSchema = z.object({ name: z.string().min(2), contact: z.string().min(2), phone: z.string().min(6) });
export const customerSchema = z.object({ name: z.string().min(2), phone: z.string().min(6), email: z.string().email() });
export const purchaseSchema = z.object({ supplierId: z.string().min(1), purchaseDate: z.string(), items: z.array(z.object({ productId: z.string(), quantity: z.number().positive(), costPrice: z.number().nonnegative() })).min(1) });
export const saleSchema = z.object({ customerId: z.string().optional(), items: z.array(z.object({ productId: z.string(), quantity: z.number().positive() })).min(1), paymentMethod: z.enum(["Cash", "Card", "QR"]) });
export const userSchema = z.object({ name: z.string().min(2), email: z.string().email(), role: z.enum(["Owner", "Manager", "Cashier"]) });

