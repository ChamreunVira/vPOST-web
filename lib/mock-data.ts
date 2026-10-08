import type { Category, Customer, InventoryTransaction, Product, Purchase, Sale, Supplier, User } from "./types";

export const products: Product[] = [
  { id: "p-001", name: "កូកា-កូឡា ៣៣០មល", sku: "BEV-001", barcode: "5449000000996", category: "ភេសជ្ជៈ", unit: "កំប៉ុង", costPrice: 0.42, sellingPrice: 0.75, stock: 86, minimumStock: 24, status: "Active", imageUrl: "https://images.unsplash.com/photo-1629203849820-fdd70d49c38e?auto=format&fit=crop&w=300&q=80", updatedAt: "០៨ តុលា ២០២៦" },
  { id: "p-002", name: "ទឹកអង្គរ ៥០០មល", sku: "BEV-002", barcode: "8850389100014", category: "ភេសជ្ជៈ", unit: "ដប", costPrice: 0.18, sellingPrice: 0.35, stock: 148, minimumStock: 36, status: "Active", imageUrl: "https://images.unsplash.com/photo-1559839914-17aae19cec71?auto=format&fit=crop&w=300&q=80", updatedAt: "០៨ តុលា ២០២៦" },
  { id: "p-003", name: "ភេសជ្ជៈប៉ូវកម្លាំង Sting", sku: "BEV-003", barcode: "8850389100519", category: "ភេសជ្ជៈ", unit: "កំប៉ុង", costPrice: 0.38, sellingPrice: 0.8, stock: 14, minimumStock: 24, status: "Active", imageUrl: "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=300&q=80", updatedAt: "០៧ តុលា ២០២៦" },
  { id: "p-004", name: "ដំឡូងបំពង Lays", sku: "SNK-001", barcode: "8934680002030", category: "អាហារសម្រន់", unit: "កញ្ចប់", costPrice: 0.55, sellingPrice: 1.2, stock: 42, minimumStock: 18, status: "Active", imageUrl: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=300&q=80", updatedAt: "០៦ តុលា ២០២៦" },
  { id: "p-005", name: "តែបៃតង Oishi ៥០០មល", sku: "BEV-004", barcode: "8850389110105", category: "ភេសជ្ជៈ", unit: "ដប", costPrice: 0.34, sellingPrice: 0.75, stock: 8, minimumStock: 20, status: "Active", imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=300&q=80", updatedAt: "០៦ តុលា ២០២៦" },
  { id: "p-006", name: "មីឆា Indomie", sku: "GRC-001", barcode: "8994504101038", category: "គ្រឿងទេស", unit: "កញ្ចប់", costPrice: 0.23, sellingPrice: 0.5, stock: 72, minimumStock: 30, status: "Active", imageUrl: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=300&q=80", updatedAt: "០៥ តុលា ២០២៦" },
  { id: "p-007", name: "ស្រាបៀរកម្ពុជា ៣៣០មល", sku: "BEV-005", barcode: "8847100010080", category: "ភេសជ្ជៈ", unit: "កំប៉ុង", costPrice: 0.62, sellingPrice: 1.25, stock: 0, minimumStock: 24, status: "Active", imageUrl: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=300&q=80", updatedAt: "០៥ តុលា ២០២៦" },
  { id: "p-008", name: "ភេសជ្ជៈ Hanuman", sku: "BEV-006", barcode: "8850389100915", category: "ភេសជ្ជៈ", unit: "កំប៉ុង", costPrice: 0.35, sellingPrice: 0.7, stock: 31, minimumStock: 16, status: "Active", imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=300&q=80", updatedAt: "០៤ តុលា ២០២៦" },
];

export const categories: Category[] = [
  { id: "cat-1", name: "ភេសជ្ជៈ", products: 32, status: "Active", updatedAt: "០៨ តុលា ២០២៦" },
  { id: "cat-2", name: "អាហារសម្រន់", products: 18, status: "Active", updatedAt: "០៦ តុលា ២០២៦" },
  { id: "cat-3", name: "គ្រឿងទេស", products: 24, status: "Active", updatedAt: "០៥ តុលា ២០២៦" },
  { id: "cat-4", name: "សម្ភារៈថែទាំខ្លួន", products: 12, status: "Active", updatedAt: "២៨ កញ្ញា ២០២៦" },
  { id: "cat-5", name: "សម្ភារៈប្រើប្រាស់ក្នុងផ្ទះ", products: 9, status: "Inactive", updatedAt: "១៦ កញ្ញា ២០២៦" },
];

export const sales: Sale[] = [
  { id: "sale-1", invoice: "INV-10482", date: "Oct 08, 2026 · 10:42 AM", customer: "Walk-in customer", cashier: "Sokha Lim", items: 8, total: 24.8, payment: "Cash", status: "Completed" },
  { id: "sale-2", invoice: "INV-10481", date: "Oct 08, 2026 · 10:31 AM", customer: "Dara Market", cashier: "Sokha Lim", items: 15, total: 82.4, payment: "QR", status: "Completed" },
  { id: "sale-3", invoice: "INV-10480", date: "Oct 08, 2026 · 09:58 AM", customer: "Walk-in customer", cashier: "Vannak Chea", items: 4, total: 10.2, payment: "Card", status: "Completed" },
  { id: "sale-4", invoice: "INV-10479", date: "Oct 08, 2026 · 09:44 AM", customer: "Srey Mom Cafe", cashier: "Vannak Chea", items: 28, total: 146.75, payment: "QR", status: "Completed" },
  { id: "sale-5", invoice: "INV-10478", date: "Oct 08, 2026 · 09:19 AM", customer: "Walk-in customer", cashier: "Sokha Lim", items: 2, total: 4.25, payment: "Cash", status: "Refunded" },
  { id: "sale-6", invoice: "INV-10477", date: "Oct 08, 2026 · 08:52 AM", customer: "Malis Grocery", cashier: "Vannak Chea", items: 19, total: 68.9, payment: "QR", status: "Completed" },
  { id: "sale-7", invoice: "INV-10476", date: "Oct 07, 2026 · 06:32 PM", customer: "Walk-in customer", cashier: "Sokha Lim", items: 6, total: 17.5, payment: "Cash", status: "Completed" },
];

export const suppliers: Supplier[] = [
  { id: "sup-1", name: "Cambrew Distribution", contact: "Sok Vicheka", phone: "+855 12 884 223", products: 18, balance: 1240.5, status: "Active" },
  { id: "sup-2", name: "Cambodia Beverage Co.", contact: "Chinara Lim", phone: "+855 17 235 881", products: 24, balance: 0, status: "Active" },
  { id: "sup-3", name: "Mekong Wholesale", contact: "Rithy Chea", phone: "+855 10 663 190", products: 31, balance: 482.75, status: "Active" },
  { id: "sup-4", name: "Lucky Food Supply", contact: "Bunthoeun Sok", phone: "+855 96 711 029", products: 16, balance: 0, status: "Inactive" },
];

export const customers: Customer[] = [
  { id: "cus-1", name: "Dara Market", phone: "+855 12 238 440", email: "dara@market.kh", purchases: 48, spent: 3240.6, lastPurchase: "Today, 10:31 AM", status: "Active" },
  { id: "cus-2", name: "Srey Mom Cafe", phone: "+855 77 851 020", email: "hello@sreymom.kh", purchases: 26, spent: 1874.25, lastPurchase: "Today, 09:44 AM", status: "Active" },
  { id: "cus-3", name: "Malis Grocery", phone: "+855 96 332 781", email: "malis@grocery.kh", purchases: 19, spent: 1142.9, lastPurchase: "Today, 08:52 AM", status: "Active" },
  { id: "cus-4", name: "Kirirom Guesthouse", phone: "+855 92 440 118", email: "admin@kirirom.kh", purchases: 8, spent: 584, lastPurchase: "Oct 04, 2026", status: "Inactive" },
];

export const purchases: Purchase[] = [
  { id: "pur-1", number: "PO-00241", supplier: "Cambrew Distribution", date: "Oct 08, 2026", items: 12, total: 1860.5, status: "Received", createdBy: "Admin" },
  { id: "pur-2", number: "PO-00240", supplier: "Mekong Wholesale", date: "Oct 06, 2026", items: 18, total: 942.75, status: "Pending", createdBy: "Sokha Lim" },
  { id: "pur-3", number: "PO-00239", supplier: "Cambodia Beverage Co.", date: "Oct 03, 2026", items: 8, total: 1264, status: "Received", createdBy: "Admin" },
  { id: "pur-4", number: "PO-00238", supplier: "Lucky Food Supply", date: "Sep 29, 2026", items: 9, total: 482.3, status: "Cancelled", createdBy: "Vannak Chea" },
];

export const inventoryTransactions: InventoryTransaction[] = [
  { id: "tx-1", date: "Oct 08, 2026 · 09:12", product: "Coca-Cola 330ml", type: "Purchase", quantity: 120, reference: "PO-00241", user: "Admin" },
  { id: "tx-2", date: "Oct 08, 2026 · 08:52", product: "Coca-Cola 330ml", type: "Sale", quantity: -8, reference: "INV-10476", user: "Vannak Chea" },
  { id: "tx-3", date: "Oct 07, 2026 · 17:32", product: "Sting Energy Drink", type: "Sale", quantity: -12, reference: "INV-10462", user: "Sokha Lim" },
  { id: "tx-4", date: "Oct 06, 2026 · 14:05", product: "Oishi Green Tea 500ml", type: "Adjustment", quantity: -2, reference: "ADJ-0008", user: "Admin" },
];

export const users: User[] = [
  { id: "usr-1", name: "Sokha Lim", email: "sokha@lotusmart.kh", role: "Cashier", status: "Active", lastLogin: "Today, 08:41 AM", created: "Mar 12, 2026" },
  { id: "usr-2", name: "Vannak Chea", email: "vannak@lotusmart.kh", role: "Cashier", status: "Active", lastLogin: "Today, 08:22 AM", created: "Apr 02, 2026" },
  { id: "usr-3", name: "Malis Chhay", email: "malis@lotusmart.kh", role: "Manager", status: "Active", lastLogin: "Yesterday, 06:14 PM", created: "Jan 08, 2026" },
];

export const chartData = [42, 58, 47, 71, 64, 82, 76, 91, 84, 108, 96, 128];
