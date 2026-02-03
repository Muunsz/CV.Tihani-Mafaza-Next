"use client";

import React, { useState } from "react";
import { CustomerLayout } from "@/components/customer/CustomerLayout";
import { COLORS } from "@/lib/constants";
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const initialCart: CartItem[] = [
  { id: 1, name: "Laptop Gaming Pro", price: 12500000, quantity: 1, image: "💻" },
  { id: 2, name: "Mouse Wireless", price: 450000, quantity: 2, image: "🖱️" },
  { id: 3, name: "Keyboard Mechanical", price: 1200000, quantity: 1, image: "⌨️" },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCart);

  const handleQuantityChange = (id: number, change: number) => {
    setCartItems(
      cartItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;

  return (
    <CustomerLayout>
      <div className="p-6 md:p-8">
        <div className="mb-8">
          <Link href="/customer/products" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft size={20} />
            Lanjut Belanja
          </Link>
          <h1 className="text-3xl font-bold" style={{ color: COLORS.primary }}>
            Keranjang Belanja
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {cartItems.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-600 text-lg">Keranjang Anda kosong</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg border border-gray-200 p-4 flex gap-4">
                    <div className="text-4xl">{item.image}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-gray-600 mt-1">
                        Rp {item.price.toLocaleString("id-ID")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="p-1 rounded hover:bg-gray-100"
                      >
                        <Minus size={18} />
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => {
                          const newQty = parseInt(e.target.value);
                          if (newQty > 0) {
                            setCartItems(
                              cartItems.map((i) =>
                                i.id === item.id ? { ...i, quantity: newQty } : i
                              )
                            );
                          }
                        }}
                        className="w-12 text-center border border-gray-300 rounded py-1"
                      />
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="p-1 rounded hover:bg-gray-100"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">Rp {(item.price * item.quantity).toLocaleString("id-ID")}</p>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-600 hover:text-red-700 mt-2 flex items-center gap-1 text-sm"
                      >
                        <Trash2 size={16} />
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
              <h2 className="text-lg font-bold mb-4">Ringkasan Pesanan</h2>
              <div className="space-y-3 pb-4 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({cartItems.length} item)</span>
                  <span className="font-semibold">Rp {subtotal.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pajak (10%)</span>
                  <span className="font-semibold">Rp {tax.toLocaleString("id-ID")}</span>
                </div>
              </div>
              <div className="flex justify-between mt-4 mb-6">
                <span className="font-bold">Total</span>
                <span className="font-bold text-lg" style={{ color: COLORS.accent }}>
                  Rp {total.toLocaleString("id-ID")}
                </span>
              </div>
              <button
                disabled={cartItems.length === 0}
                className="w-full py-3 rounded-lg text-white font-semibold transition hover:shadow-lg disabled:opacity-50"
                style={{ backgroundColor: COLORS.accent }}
              >
                Lanjut ke Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
