"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/icons";
import { Button, Price, SearchInput, Select } from "@/components/ui/primitives";
import { customers, products } from "@/lib/mock-data";
import type { CartItem, PaymentMethod, Product } from "@/lib/types";

type HeldCart = {
  id: string;
  customer: string;
  items: CartItem[];
  timestamp: string;
};

export default function PosPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("ទាំងអស់");
  const [cart, setCart] = useState<CartItem[]>([
    { ...products[0], quantity: 2 },
    { ...products[3], quantity: 1 },
  ]);

  // Discount & Tax state
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [customDiscount, setCustomDiscount] = useState<number>(0);
  const [taxRate, setTaxRate] = useState<number>(0); // 0 or 0.10
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0]?.name || "អតិថិជនមកទិញផ្ទាល់");

  // Held Carts
  const [heldCarts, setHeldCarts] = useState<HeldCart[]>([]);
  const [showHeldModal, setShowHeldModal] = useState(false);

  // Payment & Dialogs
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [method, setMethod] = useState<PaymentMethod>("Cash");
  const [received, setReceived] = useState("50");
  const [receiptData, setReceiptData] = useState<{
    invoice: string;
    items: CartItem[];
    subtotal: number;
    discount: number;
    tax: number;
    total: number;
    method: PaymentMethod;
    received: number;
    change: number;
    date: string;
  } | null>(null);

  const categories = ["ទាំងអស់", "ភេសជ្ជៈ", "អាហារសម្រន់", "គ្រឿងទេស"];

  // Filter products by category & search query
  const visibleProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = category === "ទាំងអស់" || product.category === category;
      const matchesQuery =
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.sku.toLowerCase().includes(query.toLowerCase()) ||
        product.barcode.includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  // Cart operations
  const addToCart = (product: Product) => {
    if (product.stock === 0) return;
    setCart((items) => {
      const existing = items.find((item) => item.id === product.id);
      if (existing) {
        return items.map((item) =>
          item.id === product.id ? { ...item, quantity: Math.min(product.stock, item.quantity + 1) } : item
        );
      }
      return [...items, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((items) =>
      items
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: Math.min(item.stock, newQty) } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const removeItem = (id: string) => {
    setCart((items) => items.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    setDiscountPercent(0);
    setCustomDiscount(0);
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.sellingPrice * item.quantity, 0);
  const calculatedDiscount = discountPercent > 0 ? (subtotal * discountPercent) / 100 : customDiscount;
  const taxableAmount = Math.max(0, subtotal - calculatedDiscount);
  const taxAmount = taxableAmount * taxRate;
  const total = taxableAmount + taxAmount;
  const changeDue = Math.max(0, Number(received || 0) - total);

  // Hold Cart Action
  const holdCurrentCart = () => {
    if (cart.length === 0) return;
    const newHold: HeldCart = {
      id: `HOLD-${Date.now().toString().slice(-4)}`,
      customer: selectedCustomer,
      items: [...cart],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setHeldCarts((prev) => [newHold, ...prev]);
    clearCart();
  };

  const restoreHeldCart = (heldId: string) => {
    const target = heldCarts.find((h) => h.id === heldId);
    if (!target) return;
    setCart(target.items);
    setSelectedCustomer(target.customer);
    setHeldCarts((prev) => prev.filter((h) => h.id !== heldId));
    setShowHeldModal(false);
  };

  // Quick simulated barcode scan button
  const handleBarcodeScan = () => {
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    if (randomProduct && randomProduct.stock > 0) {
      addToCart(randomProduct);
    }
  };

  // Complete Payment Action
  const handleCompletePayment = () => {
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString("km-KH")} · ${now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;

    setReceiptData({
      invoice: `INV-${Math.floor(10000 + Math.random() * 90000)}`,
      items: [...cart],
      subtotal,
      discount: calculatedDiscount,
      tax: taxAmount,
      total,
      method,
      received: method === "Cash" ? Number(received) : total,
      change: method === "Cash" ? Math.max(0, Number(received) - total) : 0,
      date: formattedDate,
    });

    setPaymentOpen(false);
  };

  const startNewSale = () => {
    setReceiptData(null);
    clearCart();
    setReceived("50");
  };

  return (
    <div className="h-[calc(100vh-112px)] flex flex-col space-y-4 overflow-hidden">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-[#07885f]">
            បញ្ជីលក់ ០១ · ហាងកណ្តាល
          </div>
          <h1 className="text-xl font-bold text-[#0f172a] mt-0.5 m-0">ប្រព័ន្ធលក់ (POS)</h1>
        </div>
        <div className="flex items-center gap-2.5">
          {heldCarts.length > 0 && (
            <Button variant="secondary" icon="archive" onClick={() => setShowHeldModal(true)}>
              កន្ត្រកដែលផ្អាកទុក{" "}
              <span className="bg-[#07885f] text-white text-xs font-bold px-2 py-0.5 rounded-full ml-1">
                {heldCarts.length}
              </span>
            </Button>
          )}
          <Button variant="secondary" icon="scan" onClick={handleBarcodeScan}>
            ស្កេនបាកូដ
          </Button>
        </div>
      </div>

      {/* POS Layout Container */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-5 overflow-hidden">
        {/* Left Side: Product Catalogue */}
        <section className="lg:col-span-2 flex flex-col space-y-3 min-h-0 h-full overflow-hidden">
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex-1">
              <SearchInput
                value={query}
                onChange={setQuery}
                placeholder="ស្វែងរកតាមឈ្មោះ, SKU ឬស្កេនបាកូដ..."
              />
            </div>
            <button
              className="h-9.5 px-3 bg-white border border-[#cbd5e1] rounded-md text-[#475569] hover:bg-[#f8fafc] hover:border-[#07885f] hover:text-[#07885f] transition-colors inline-flex items-center justify-center cursor-pointer shrink-0"
              onClick={handleBarcodeScan}
              title="ស្កេនបាកូដរហ័ស"
              aria-label="ស្កេនបាកូដ"
            >
              <Icon name="scan" size={18} />
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 shrink-0">
            {categories.map((item) => {
              const active = category === item;
              return (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`px-3.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    active
                      ? "bg-[#07885f] text-white"
                      : "bg-white text-[#475569] border border-[#cbd5e1] hover:bg-[#f8fafc]"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          {/* Product Grid Panel (Scrollable internally) */}
          <div className="bg-white border border-[#e2e8f0] rounded-md p-4 shadow-2xs flex-1 min-h-0 overflow-y-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {visibleProducts.map((product) => {
                const isOutOfStock = product.stock === 0;
                const isLowStock = product.stock > 0 && product.stock <= product.minimumStock;

                return (
                  <button
                    key={product.id}
                    disabled={isOutOfStock}
                    onClick={() => addToCart(product)}
                    className={`bg-white border border-[#e2e8f0] rounded-md overflow-hidden text-left flex flex-col transition-all cursor-pointer ${
                      isOutOfStock
                        ? "opacity-50 grayscale cursor-not-allowed"
                        : "hover:border-[#07885f] hover:-translate-y-0.5 hover:shadow-md"
                    }`}
                  >
                    <div className="relative w-full h-24 bg-[#f1f5f9] shrink-0">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-1.5 right-1.5">
                        <span
                          className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                            isOutOfStock
                              ? "bg-[#fee2e2] text-[#991b1b]"
                              : isLowStock
                              ? "bg-[#fef3c7] text-[#92400e]"
                              : "bg-[#e6f4ef] text-[#056447]"
                          }`}
                        >
                          {isOutOfStock ? "អស់ពីស្តុក" : isLowStock ? "ជិតអស់" : "មានស្តុក"}
                        </span>
                      </span>
                    </div>

                    <div className="p-2.5 flex flex-col flex-1 justify-between">
                      <div>
                        <strong className="block text-xs font-semibold text-[#0f172a] truncate">
                          {product.name}
                        </strong>
                        <small className="block text-[11px] text-[#64748b] mt-0.5 truncate">
                          {product.sku} · {isOutOfStock ? "អស់ពីស្តុក" : `${product.stock} ${product.unit}`}
                        </small>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-dashed border-[#f1f5f9]">
                        <b className="text-xs font-bold text-[#056447]">
                          <Price value={product.sellingPrice} />
                        </b>
                        <span className="text-[10px] text-[#94a3b8] font-medium">/{product.unit}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Right Side: Cart Panel (Scrollable internally) */}
        <aside className="bg-white border border-[#e2e8f0] rounded-md p-4 flex flex-col shadow-2xs h-full min-h-0 overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0] shrink-0">
            <h2 className="text-base font-bold text-[#0f172a] m-0">កន្ត្រកបច្ចុប្បន្ន</h2>
            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <>
                  <button
                    className="text-xs text-[#64748b] hover:text-[#07885f] font-medium px-2 py-1 rounded bg-[#f8fafc] border border-[#e2e8f0] hover:border-[#07885f] transition-colors cursor-pointer"
                    onClick={holdCurrentCart}
                    title="ផ្អាកកន្ត្រកនេះទុក"
                  >
                    <Icon name="archive" size={13} className="inline mr-1" /> ផ្អាក
                  </button>
                  <button
                    className="text-xs text-[#dc2626] hover:text-[#b91c1c] font-medium px-2 py-1 rounded bg-[#fee2e2]/50 hover:bg-[#fee2e2] transition-colors cursor-pointer"
                    onClick={clearCart}
                    title="សម្អាតកន្ត្រក"
                  >
                    សម្អាត
                  </button>
                </>
              )}
              <span className="text-xs font-semibold text-[#07885f] bg-[#e6f4ef] px-2 py-0.5 rounded-full">
                {cart.reduce((sum, item) => sum + item.quantity, 0)} មុខ
              </span>
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 min-h-0 overflow-y-auto py-3 space-y-2.5">
            {cart.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center text-center text-[#94a3b8]">
                <Icon name="shopping-bag" size={36} className="text-[#cbd5e1] mb-2" />
                <strong className="text-sm font-semibold text-[#334155]">កន្ត្រកនៅទទេ</strong>
                <p className="text-xs text-[#64748b] mt-1 max-w-[200px]">
                  ចុចលើផលិតផលខាងឆ្វេង ដើម្បីបន្ថែមចូលកន្ត្រកលក់។
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2.5 p-2 bg-[#f8fafc] border border-[#f1f5f9] rounded-md"
                >
                  <img src={item.imageUrl} alt="" className="w-10 h-10 object-cover rounded shrink-0 bg-white" />
                  <div className="flex-1 min-w-0">
                    <strong className="block text-xs font-semibold text-[#0f172a] truncate">
                      {item.name}
                    </strong>
                    <div className="text-[11px] text-[#64748b]">
                      <Price value={item.sellingPrice} /> / {item.unit}
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-5 h-5 bg-white border border-[#cbd5e1] rounded hover:bg-[#f1f5f9] grid place-items-center text-[#475569] cursor-pointer"
                        aria-label="បន្ថយចំនួន"
                      >
                        <Icon name="minus" size={10} />
                      </button>
                      <span className="text-xs font-bold text-[#0f172a] px-1">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        disabled={item.quantity >= item.stock}
                        className="w-5 h-5 bg-white border border-[#cbd5e1] rounded hover:bg-[#f1f5f9] grid place-items-center text-[#475569] disabled:opacity-50 cursor-pointer"
                        aria-label="បង្កើនចំនួន"
                      >
                        <Icon name="plus" size={10} />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-xs font-bold text-[#056447]">
                      <Price value={item.sellingPrice * item.quantity} />
                    </span>
                    <button
                      className="text-[#94a3b8] hover:text-[#dc2626] p-1 rounded hover:bg-[#fee2e2] transition-colors cursor-pointer"
                      onClick={() => removeItem(item.id)}
                      title="លុបមុខទំនិញ"
                    >
                      <Icon name="trash" size={13} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Summary (Fixed at bottom) */}
          <div className="pt-3 border-t border-[#e2e8f0] space-y-2.5 shrink-0">
            <div className="flex justify-between text-xs text-[#64748b]">
              <span>សរុបរង</span>
              <strong className="text-[#0f172a]">
                <Price value={subtotal} />
              </strong>
            </div>

            {/* Quick Discount Presets */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-[#64748b]">
                <span>បញ្ចុះតម្លៃ</span>
                <strong className="text-[#07885f]">
                  {calculatedDiscount > 0 ? `- $${calculatedDiscount.toFixed(2)}` : "$0.00"}
                </strong>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[0, 5, 10, 15].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => {
                      setDiscountPercent(pct);
                      setCustomDiscount(0);
                    }}
                    className={`px-2 py-0.5 rounded text-xs font-semibold border cursor-pointer transition-colors ${
                      discountPercent === pct && customDiscount === 0
                        ? "bg-[#07885f] text-white border-[#056447]"
                        : "bg-[#f1f5f9] text-[#334155] border-[#cbd5e1] hover:bg-[#e2e8f0]"
                    }`}
                  >
                    {pct === 0 ? "0%" : `${pct}%`}
                  </button>
                ))}
              </div>
            </div>

            {/* Tax Option */}
            <div className="flex items-center justify-between text-xs text-[#64748b]">
              <span>ពន្ធ (VAT 10%)</span>
              <button
                type="button"
                onClick={() => setTaxRate((prev) => (prev > 0 ? 0 : 0.1))}
                className={`px-2 py-0.5 rounded text-xs font-semibold border cursor-pointer transition-colors ${
                  taxRate > 0
                    ? "bg-[#07885f] text-white border-[#056447]"
                    : "bg-[#f1f5f9] text-[#334155] border-[#cbd5e1] hover:bg-[#e2e8f0]"
                }`}
              >
                {taxRate > 0 ? "+10% VAT" : "គ្មានពន្ធ"}
              </button>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center text-sm font-bold pt-2 border-t border-[#e2e8f0]">
              <span className="text-[#0f172a]">ត្រូវទូទាត់សរុប</span>
              <strong className="text-base text-[#056447]">
                <Price value={total} />
              </strong>
            </div>

            {/* Customer Select */}
            <div>
              <Select value={selectedCustomer} onChange={setSelectedCustomer}>
                {customers.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name} ({c.phone})
                  </option>
                ))}
                <option value="អតិថិជនមកទិញផ្ទាល់">អតិថិជនមកទិញផ្ទាល់</option>
              </Select>
            </div>

            {/* Pay Button */}
            <Button
              className="w-full py-2.5"
              icon="credit-card"
              disabled={cart.length === 0}
              onClick={() => {
                setReceived(total > 0 ? Math.ceil(total).toString() : "0");
                setPaymentOpen(true);
              }}
            >
              បន្តទៅការទូទាត់ (<Price value={total} />)
            </Button>
          </div>
        </aside>
      </div>

      {/* Held Carts Modal */}
      {showHeldModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-[#e2e8f0] rounded-md max-w-md w-full p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0]">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#07885f]">
                  បញ្ជីកន្ត្រកដែលបានផ្អាក
                </div>
                <h2 className="text-lg font-bold text-[#0f172a] m-0">
                  កន្ត្រកដែលបានរក្សាទុក ({heldCarts.length})
                </h2>
              </div>
              <button
                className="text-[#64748b] hover:text-[#0f172a] p-1 rounded hover:bg-[#f1f5f9] cursor-pointer"
                onClick={() => setShowHeldModal(false)}
                aria-label="បិទ"
              >
                <Icon name="x" size={18} />
              </button>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto">
              {heldCarts.map((h) => (
                <div
                  key={h.id}
                  className="p-3 border border-[#cbd5e1] rounded-md flex items-center justify-between bg-[#f8fafc]"
                >
                  <div>
                    <strong className="block text-xs font-bold text-[#0f172a]">
                      {h.id} · {h.customer}
                    </strong>
                    <span className="text-[11px] text-[#64748b]">
                      {h.items.length} មុខទំនិញ · {h.timestamp}
                    </span>
                  </div>
                  <Button variant="secondary" onClick={() => restoreHeldCart(h.id)}>
                    យកមកវិញ
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Payment Dialog */}
      {paymentOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-[#e2e8f0] rounded-md max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0]">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#07885f]">
                  បញ្ចប់ការលក់
                </div>
                <h2 className="text-lg font-bold text-[#0f172a] m-0">ជ្រើសរើសវិធីសាស្ត្រទូទាត់</h2>
              </div>
              <button
                className="text-[#64748b] hover:text-[#0f172a] p-1 rounded hover:bg-[#f1f5f9] cursor-pointer"
                onClick={() => setPaymentOpen(false)}
                aria-label="បិទ"
              >
                <Icon name="x" size={18} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#e6f4ef] border border-[#a0d4c1] rounded-md text-sm text-[#334155]">
              <span>ទឹកប្រាក់ត្រូវទូទាត់</span>
              <strong className="text-2xl font-bold text-[#056447]">
                <Price value={total} />
              </strong>
            </div>

            {/* Payment Methods Tabs */}
            <div className="grid grid-cols-3 gap-2">
              {(["Cash", "QR", "Card"] as PaymentMethod[]).map((item) => (
                <button
                  key={item}
                  onClick={() => setMethod(item)}
                  className={`h-16 border rounded-md flex flex-col items-center justify-center gap-1 text-xs font-semibold cursor-pointer transition-colors ${
                    method === item
                      ? "bg-[#e6f4ef] border-[#07885f] text-[#056447]"
                      : "bg-white border-[#cbd5e1] text-[#64748b] hover:bg-[#f8fafc]"
                  }`}
                >
                  <Icon name={item === "Cash" ? "banknote" : item === "Card" ? "credit-card" : "qr"} size={20} />
                  <span>{item === "Cash" ? "សាច់ប្រាក់" : item === "Card" ? "កាតធនាគារ" : "KHQR"}</span>
                </button>
              ))}
            </div>

            {/* CASH PAYMENT VIEW */}
            {method === "Cash" && (
              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-2 gap-3 items-end">
                  <div>
                    <label htmlFor="received" className="block text-xs font-medium text-[#475569] mb-1">
                      ប្រាក់ទទួលបាន ($)
                    </label>
                    <input
                      id="received"
                      type="number"
                      min={0}
                      step="0.01"
                      value={received}
                      onChange={(event) => setReceived(event.target.value)}
                      className="w-full h-9.5 px-3 border border-[#cbd5e1] rounded-md text-sm font-semibold outline-none focus:border-[#07885f]"
                    />
                  </div>

                  <div className="h-9.5 px-3 bg-[#e6f4ef] border border-[#a0d4c1] rounded-md flex items-center justify-between text-xs font-semibold">
                    <span className="text-[#475569]">ប្រាក់អាប់</span>
                    <strong className={changeDue >= 0 ? "text-[#056447]" : "text-[#dc2626]"}>
                      <Price value={changeDue} />
                    </strong>
                  </div>
                </div>

                {/* Quick Cash Dollar Presets */}
                <div className="space-y-1">
                  <span className="text-xs text-[#64748b]">ជ្រើសរើសក្រដាសប្រាក់លឿន:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { label: "ល្មម", val: total.toFixed(2) },
                      { label: "$1", val: "1" },
                      { label: "$5", val: "5" },
                      { label: "$10", val: "10" },
                      { label: "$20", val: "20" },
                      { label: "$50", val: "50" },
                      { label: "$100", val: "100" },
                    ].map((chip) => (
                      <button
                        key={chip.label}
                        type="button"
                        onClick={() => setReceived(chip.val)}
                        className="px-2.5 py-1 bg-[#f1f5f9] border border-[#cbd5e1] hover:bg-[#e6f4ef] hover:border-[#07885f] hover:text-[#056447] text-[#334155] rounded text-xs font-semibold cursor-pointer transition-colors"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* KHQR PAYMENT VIEW */}
            {method === "QR" && (
              <div className="bg-white border-2 border-[#e12729] rounded-lg p-4 text-center space-y-3">
                <div className="inline-block bg-[#e12729] text-white text-xs font-bold px-3 py-1 rounded tracking-wider">
                  KHQR BAKONG
                </div>
                <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-md p-4 flex flex-col items-center justify-center">
                  <Icon name="qr" size={110} className="text-[#0f172a]" />
                  <div className="mt-2 text-sm font-bold text-[#0f172a]">
                    ស៊កស្កេនទូទាត់ $<Price value={total} />
                  </div>
                  <small className="text-xs text-[#64748b] mt-0.5">ហាងកណ្តាល vPost · Bakong QR</small>
                </div>
              </div>
            )}

            {/* CARD PAYMENT VIEW */}
            {method === "Card" && (
              <div className="p-6 bg-[#f8fafc] border border-[#e2e8f0] rounded-md text-center space-y-2">
                <Icon name="credit-card" size={38} className="text-[#07885f] mx-auto" />
                <div className="text-sm font-bold text-[#0f172a]">កំពុងភ្ជាប់ជាមួយ POS Terminal...</div>
                <small className="text-xs text-[#64748b]">សូមប៉ះ ឬបញ្ចូលកាតអតិថិជនលើម៉ាស៊ីន</small>
              </div>
            )}

            {/* Dialog Actions */}
            <div className="flex justify-end gap-2 pt-2 border-t border-[#e2e8f0]">
              <Button variant="secondary" onClick={() => setPaymentOpen(false)}>
                បោះបង់
              </Button>
              <Button
                icon="check"
                onClick={handleCompletePayment}
                disabled={method === "Cash" && Number(received || 0) < total}
              >
                {method === "Cash" && Number(received || 0) < total ? "ប្រាក់មិនគ្រាន់" : "បញ្ចប់ការទូទាត់"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Printable Receipt Modal */}
      {receiptData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-[#e2e8f0] rounded-md max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="bg-[#fafbfc] border border-dashed border-[#cbd5e1] rounded-md p-5 text-xs text-[#1e293b] font-mono space-y-3">
              <div className="text-center border-b border-dashed border-[#cbd5e1] pb-3 space-y-0.5">
                <h3 className="text-base font-bold text-[#0f172a] m-0">vPost Central Store</h3>
                <p className="text-xs text-[#64748b] m-0">វិក្កយបត្រ / Official Receipt</p>
                <p className="text-xs text-[#64748b] m-0">ទូរស័ព្ទ: 012 345 678</p>
              </div>

              <div className="flex justify-between text-xs text-[#64748b]">
                <div>
                  <div>
                    លេខ: <strong>{receiptData.invoice}</strong>
                  </div>
                  <div>អតិថិជន: {selectedCustomer}</div>
                </div>
                <div className="text-right">
                  <div>ថ្ងៃខែ: {receiptData.date}</div>
                  <div>អ្នកគិតលុយ: Sokha Lim</div>
                </div>
              </div>

              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-[#e2e8f0] text-left text-[#475569]">
                    <th className="py-1">ទំនិញ</th>
                    <th className="py-1 text-center">ចំនួន</th>
                    <th className="py-1 text-right">តម្លៃ</th>
                    <th className="py-1 text-right">សរុប</th>
                  </tr>
                </thead>
                <tbody>
                  {receiptData.items.map((item) => (
                    <tr key={item.id} className="border-b border-dashed border-[#f1f5f9]">
                      <td className="py-1.5">{item.name}</td>
                      <td className="py-1.5 text-center">{item.quantity}</td>
                      <td className="py-1.5 text-right">${item.sellingPrice.toFixed(2)}</td>
                      <td className="py-1.5 text-right">
                        ${(item.sellingPrice * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="pt-2 border-t border-dashed border-[#cbd5e1] space-y-1">
                <div className="flex justify-between">
                  <span>សរុបរង:</span>
                  <span>${receiptData.subtotal.toFixed(2)}</span>
                </div>
                {receiptData.discount > 0 && (
                  <div className="flex justify-between text-[#07885f]">
                    <span>បញ្ចុះតម្លៃ:</span>
                    <span>-${receiptData.discount.toFixed(2)}</span>
                  </div>
                )}
                {receiptData.tax > 0 && (
                  <div className="flex justify-between">
                    <span>ពន្ធ VAT (10%):</span>
                    <span>+${receiptData.tax.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-[#056447] pt-1.5 border-t border-[#cbd5e1]">
                  <span>សរុបត្រូវទូទាត់:</span>
                  <span>${receiptData.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>វិធីសាស្ត្រទូទាត់:</span>
                  <span>
                    {receiptData.method === "Cash"
                      ? "សាច់ប្រាក់"
                      : receiptData.method === "Card"
                      ? "កាតធនាគារ"
                      : "KHQR"}
                  </span>
                </div>
                {receiptData.method === "Cash" && (
                  <>
                    <div className="flex justify-between">
                      <span>ប្រាក់ទទួលបាន:</span>
                      <span>${receiptData.received.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ប្រាក់អាប់:</span>
                      <span>${receiptData.change.toFixed(2)}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="text-center pt-3 border-t border-dashed border-[#cbd5e1] text-xs text-[#64748b]">
                សូមអរគុណចំពោះការទិញទំនិញ! សូមអញ្ជើញមកម្តងទៀត!
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#e2e8f0]">
              <Button
                variant="secondary"
                icon="refresh"
                onClick={() => {
                  window.print();
                }}
              >
                បោះពុម្ពវិក្កយបត្រ
              </Button>
              <Button icon="check" onClick={startNewSale}>
                ការលក់ថ្មី
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
