"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { COLORS } from "@/lib/constants";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  Heart,
  Package,
  Truck,
  CreditCard,
  Star,
  Search,
  Filter,
  ChevronRight,
  MessageCircle,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  LogOut,
} from "lucide-react";

// Mock data untuk orders
const orders = [
  {
    id: "ORD-001",
    date: "2024-02-01",
    total: 5500000,
    status: "delivered",
    items: 3,
  },
  {
    id: "ORD-002",
    date: "2024-01-28",
    total: 2300000,
    status: "in_transit",
    items: 2,
  },
  {
    id: "ORD-003",
    date: "2024-01-25",
    total: 8900000,
    status: "processing",
    items: 5,
  },
];

// Mock data untuk wishlist
const wishlist = [
  {
    id: 1,
    name: "Laptop Acer E5-474",
    price: 5500000,
    category: "Electronics",
    image: "/images/product-1.jpg",
    inStock: true,
  },
  {
    id: 2,
    name: "Mesin Absen Digital",
    price: 3500000,
    category: "Office Equipment",
    image: "/images/product-2.jpg",
    inStock: true,
  },
];

// Mock data untuk products featured
const featuredProducts = [
  {
    id: 1,
    name: "Laptop Acer E5-474 Core i5",
    price: 5500000,
    rating: 4.5,
    reviews: 24,
    category: "Electronics",
    image: "/images/product-1.jpg",
    discount: 10,
  },
  {
    id: 2,
    name: "Mesin Absen Digital Presensi",
    price: 3500000,
    rating: 4.8,
    reviews: 18,
    category: "Office Equipment",
    image: "/images/product-2.jpg",
    discount: 0,
  },
  {
    id: 3,
    name: "Printer Epson L3110",
    price: 1800000,
    rating: 4.3,
    reviews: 32,
    category: "Office Equipment",
    image: "/images/product-3.jpg",
    discount: 15,
  },
  {
    id: 4,
    name: "Scanner Plustek Smart Office",
    price: 2200000,
    rating: 4.6,
    reviews: 21,
    category: "Office Equipment",
    image: "/images/product-4.jpg",
    discount: 5,
  },
];

const stats = [
  {
    label: "Total Pesanan",
    value: "12",
    icon: ShoppingCart,
    color: COLORS.accent,
  },
  {
    label: "Wishlist",
    value: wishlist.length.toString(),
    icon: Heart,
    color: "#ef4444",
  },
  {
    label: "Pesanan Aktif",
    value: "2",
    icon: Truck,
    color: "#3b82f6",
  },
  {
    label: "Total Pengeluaran",
    value: "Rp 16.7M",
    icon: CreditCard,
    color: "#10b981",
  },
];

function StatusBadge({
  status,
}: {
  status: "delivered" | "in_transit" | "processing";
}) {
  const styles = {
    delivered: { bg: "#10b98115", text: "#10b981", label: "Terkirim" },
    in_transit: { bg: "#3b82f515", text: "#3b82f5", label: "Sedang Dikirim" },
    processing: { bg: "#f5951515", text: "#f59e0b", label: "Diproses" },
  };

  const style = styles[status];
  return (
    <span
      className="px-3 py-1 rounded-full text-xs font-semibold"
      style={{
        backgroundColor: style.bg,
        color: style.text,
      }}
    >
      {style.label}
    </span>
  );
}

function CustomerDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/guest/auth/login");
      return;
    }
    if (session.user?.role !== "customer") {
      // Redirect to appropriate dashboard
      if (session.user?.role === "admin") {
        router.push("/admin/dashboard");
      } else if (session.user?.role === "staff") {
        router.push("/staff/dashboard");
      } else {
        router.push("/guest");
      }
    }
  }, [session, status, router]);

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/guest/auth/login" });
  };

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!session || session.user?.role !== "customer") {
    return null;
  }

  const filteredProducts = featuredProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    "all",
    ...new Set(featuredProducts.map((p) => p.category)),
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header with Logout */}
        <div className="flex justify-between items-center">
          <div></div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-red-50 transition border border-gray-300"
          >
            <LogOut size={18} />
            <span>Keluar</span>
          </button>
        </div>

        {/* Header Welcome Section */}
        <div
          className="rounded-lg p-8 text-white"
          style={{ backgroundColor: COLORS.primary }}
        >
          <h1 className="text-4xl font-bold mb-2">
            Selamat Datang di Dashboard Anda
          </h1>
          <p className="text-lg opacity-90">
            Kelola pesanan, wishlist, dan jelajahi produk terbaru kami
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div
                    className="w-14 h-14 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}15` }}
                  >
                    <Icon size={28} style={{ color: stat.color }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Orders Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-bold" style={{ color: COLORS.primary }}>
              Pesanan Terakhir
            </h2>
            <Link
              href="/customer/orders"
              className="text-sm font-semibold hover:underline"
              style={{ color: COLORS.accent }}
            >
              Lihat Semua
              <ChevronRight size={16} className="inline ml-1" />
            </Link>
          </div>

          <div className="divide-y">
            {orders.slice(0, 3).map((order) => (
              <div
                key={order.id}
                className="px-6 py-4 hover:bg-gray-50 transition flex items-center justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-semibold text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {order.items} item • {order.date}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <StatusBadge status={order.status} />
                  <p className="font-semibold text-gray-900 min-w-fit">
                    {formatPrice(order.total)}
                  </p>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                    <ChevronRight size={20} className="text-gray-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wishlist & Featured Products */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Wishlist */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Heart size={20} style={{ color: "#ef4444" }} />
                  Wishlist Anda
                </h3>
              </div>

              <div className="divide-y">
                {wishlist.length === 0 ? (
                  <div className="px-6 py-8 text-center text-gray-500">
                    <Heart size={32} className="mx-auto mb-2 opacity-50" />
                    <p>Belum ada item di wishlist</p>
                  </div>
                ) : (
                  wishlist.map((item) => (
                    <div key={item.id} className="px-6 py-4">
                      <p className="font-semibold text-gray-900 text-sm mb-2">
                        {item.name}
                      </p>
                      <div className="flex items-center justify-between">
                        <p
                          className="text-sm font-bold"
                          style={{ color: COLORS.accent }}
                        >
                          {formatPrice(item.price)}
                        </p>
                        <button
                          className="text-xs px-3 py-1.5 rounded-lg font-semibold text-white transition hover:shadow-lg"
                          style={{ backgroundColor: COLORS.accent }}
                        >
                          Beli
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Featured Products */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-3 top-3 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Cari produk..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition"
                  style={
                    {
                      "--tw-ring-color": COLORS.accent,
                    } as React.CSSProperties
                  }
                />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2.5 rounded-lg font-semibold text-sm whitespace-nowrap transition ${
                      selectedCategory === cat
                        ? "text-white"
                        : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                    style={{
                      backgroundColor:
                        selectedCategory === cat ? COLORS.accent : undefined,
                    }}
                  >
                    {cat === "all" ? "Semua" : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition"
                >
                  {/* Product Image Placeholder */}
                  <div
                    className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center relative"
                    style={{
                      backgroundColor: COLORS.primary + "20",
                    }}
                  >
                    <ShoppingCart
                      size={48}
                      className="text-gray-400 opacity-50"
                    />
                    {product.discount > 0 && (
                      <div
                        className="absolute top-3 right-3 px-3 py-1 rounded-lg text-white font-semibold text-sm"
                        style={{ backgroundColor: "#ef4444" }}
                      >
                        -{product.discount}%
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase">
                      {product.category}
                    </p>
                    <h4 className="font-semibold text-gray-900 mt-1 line-clamp-2">
                      {product.name}
                    </h4>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mt-2">
                      <Star
                        size={16}
                        className="fill-yellow-400 text-yellow-400"
                      />
                      <span className="text-sm font-semibold text-gray-900">
                        {product.rating}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({product.reviews})
                      </span>
                    </div>

                    {/* Price */}
                    <p
                      className="text-lg font-bold mt-3"
                      style={{ color: COLORS.accent }}
                    >
                      {formatPrice(product.price)}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-2 mt-4">
                      <button
                        className="flex-1 py-2.5 rounded-lg font-semibold text-white transition hover:shadow-lg"
                        style={{ backgroundColor: COLORS.accent }}
                      >
                        Beli
                      </button>
                      <button
                        className="px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                        title="Tambah ke Wishlist"
                      >
                        <Heart size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg">
                <AlertCircle size={48} className="mx-auto text-gray-400 mb-3" />
                <p className="text-gray-600">Produk tidak ditemukan</p>
              </div>
            )}
          </div>
        </div>

        {/* Contact Support CTA */}
        <div
          className="rounded-lg p-8 text-white text-center"
          style={{ backgroundColor: COLORS.accent }}
        >
          <h3 className="text-2xl font-bold mb-2">Perlu Bantuan?</h3>
          <p className="mb-4">Hubungi tim customer service kami</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-2.5 rounded-lg bg-white text-gray-900 font-semibold hover:bg-gray-100 transition">
              <MessageCircle size={18} className="inline mr-2" />
              Chat dengan Kami
            </button>
            <button className="px-6 py-2.5 rounded-lg border-2 border-white text-white font-semibold hover:bg-white hover:text-gray-900 transition">
              Lihat FAQ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;
