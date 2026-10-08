export type Status = "Active" | "Inactive";
export type StockStatus = "In stock" | "Low stock" | "Out of stock";
export type PaymentMethod = "Cash" | "Card" | "QR";

export type Product = {
  id: string;
  name: string;
  sku: string;
  barcode: string;
  category: string;
  unit: string;
  costPrice: number;
  sellingPrice: number;
  stock: number;
  minimumStock: number;
  status: Status;
  imageUrl: string;
  updatedAt: string;
};

export type Sale = {
  id: string;
  invoice: string;
  date: string;
  customer: string;
  cashier: string;
  items: number;
  total: number;
  payment: PaymentMethod;
  status: "Completed" | "Refunded" | "Pending";
};

export type Category = { id: string; name: string; products: number; status: Status; updatedAt: string };
export type Supplier = { id: string; name: string; contact: string; phone: string; products: number; balance: number; status: Status };
export type Customer = { id: string; name: string; phone: string; email: string; purchases: number; spent: number; lastPurchase: string; status: Status };
export type InventoryTransaction = { id: string; date: string; product: string; type: "Purchase" | "Sale" | "Return" | "Adjustment"; quantity: number; reference: string; user: string };
export type Purchase = { id: string; number: string; supplier: string; date: string; items: number; total: number; status: "Received" | "Pending" | "Cancelled"; createdBy: string };
export type User = { id: string; name: string; email: string; role: "Owner" | "Manager" | "Cashier"; status: Status; lastLogin: string; created: string };
export type CartItem = Product & { quantity: number };

