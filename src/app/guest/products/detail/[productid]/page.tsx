"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/guest/layout/Navbar";
import { Footer } from "@/components/guest/layout/Footer";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Select,
  SelectItem,
  Breadcrumbs,
  BreadcrumbItem,
  Badge,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Skeleton,
  ScrollShadow,
  RadioGroup,
  Radio,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Alert,
  Accordion,
  AccordionItem,
} from "@heroui/react";
import {
  ShoppingCart,
  Heart,
  Share2,
  Check,
  AlertCircle,
  Star,
} from "lucide-react";
import { COLORS, PRODUCTS } from "@/lib/constants";
import { useParams } from "next/navigation";

interface Product {
  id: string;
  name: string;
  priceFinal: number;
  priceOriginal?: number;
  rating?: number;
  reviews?: number;
  image: string;
  description: string;
  specifications?: {
    [key: string]: string;
  };
  availability?: string;
  warranty?: string;
  category: string;
  sku?: string;
  colors?: string[];
  sizes?: string[];
  stock: number;
}

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.productId as string;

  // Find product from constants or use mock
  const product = PRODUCTS.find((p) => p.id === productId);

  const mockProduct: Product = product || {
    id: "1",
    name: "Produk Tidak Ditemukan",
    priceFinal: 0,
    image: "/placeholder.svg",
    description: "Produk yang Anda cari tidak tersedia.",
    category: "General",
    stock: 0,
  };

  const [isLoading, setIsLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState(
    mockProduct.colors?.[0] || "Default",
  );
  const [selectedSize, setSelectedSize] = useState(
    mockProduct.sizes?.[0] || "Standard",
  );
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleAddToCart = () => {
    onOpen();
  };

  const handleConfirmAddToCart = () => {
    console.log("Added to cart:", {
      product: mockProduct.name,
      quantity,
      color: selectedColor,
      size: selectedSize,
    });
    onOpenChange();
  };

  const priceOriginal =
    mockProduct.priceOriginal || mockProduct.priceFinal * 1.15;
  const discountPercentage = Math.round(
    ((priceOriginal - mockProduct.priceFinal) / priceOriginal) * 100,
  );

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="text-5xl mb-4">404</div>
            <h1
              className="text-3xl font-bold mb-4"
              style={{ color: COLORS.primary }}
            >
              Produk Tidak Ditemukan
            </h1>
            <p className="text-gray-600 mb-8">
              Produk yang Anda cari tidak tersedia.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs className="mb-8">
          <BreadcrumbItem href="/">Beranda</BreadcrumbItem>
          <BreadcrumbItem href="/products">Produk</BreadcrumbItem>
          <BreadcrumbItem href={`/products?category=${mockProduct.category}`}>
            {mockProduct.category}
          </BreadcrumbItem>
          <BreadcrumbItem>{mockProduct.name}</BreadcrumbItem>
        </Breadcrumbs>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div>
            {isLoading ? (
              <Skeleton className="w-full aspect-square rounded-lg" />
            ) : (
              <Card className="overflow-hidden">
                <CardBody className="p-0">
                  <Image
                    src={mockProduct.image || "/placeholder.svg"}
                    alt={mockProduct.name}
                    width={500}
                    height={500}
                    className="w-full h-auto"
                  />
                </CardBody>
              </Card>
            )}
            <div className="mt-4 flex gap-2">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="w-20 h-20 rounded-lg" />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Title and Rating */}
            {isLoading ? (
              <Skeleton className="h-10 w-3/4 rounded-lg" />
            ) : (
              <>
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">
                      {mockProduct.name}
                    </h1>
                    <button
                      onClick={() => setIsFavorite(!isFavorite)}
                      className="p-2 rounded-lg hover:bg-gray-100 transition"
                    >
                      <Heart
                        className={`w-6 h-6 ${
                          isFavorite
                            ? "fill-red-500 text-red-500"
                            : "text-gray-400"
                        }`}
                      />
                    </button>
                  </div>
                  {mockProduct.rating && (
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(mockProduct.rating!)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {mockProduct.rating} ({mockProduct.reviews} ulasan)
                      </span>
                    </div>
                  )}
                  {discountPercentage > 0 && (
                    <Badge
                      content={`-${discountPercentage}%`}
                      color="danger"
                      className="mb-4"
                    >
                      <span className="text-sm">Diskon Spesial</span>
                    </Badge>
                  )}
                </div>

                {/* Price */}
                {isLoading ? (
                  <Skeleton className="h-8 w-1/2 rounded-lg" />
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl font-bold text-gray-900">
                        Rp {mockProduct.priceFinal.toLocaleString("id-ID")}
                      </span>
                      {priceOriginal > mockProduct.priceFinal && (
                        <span className="text-lg text-gray-400 line-through">
                          Rp {priceOriginal.toLocaleString("id-ID")}
                        </span>
                      )}
                    </div>
                    <Alert
                      icon={<Check className="w-4 h-4" />}
                      color="success"
                      title={`Stok Tersedia: ${mockProduct.stock} unit`}
                    >
                      Barang siap dikirim dalam 1-2 hari kerja
                    </Alert>
                  </div>
                )}

                {/* Options */}
                {isLoading ? (
                  <>
                    <Skeleton className="h-10 w-full rounded-lg" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                  </>
                ) : (
                  <div className="space-y-4">
                    {/* Color Selection */}
                    {mockProduct.colors && mockProduct.colors.length > 0 && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Pilih Warna
                        </label>
                        <RadioGroup
                          value={selectedColor}
                          onValueChange={setSelectedColor}
                          orientation="horizontal"
                        >
                          {mockProduct.colors.map((color) => (
                            <Radio key={color} value={color}>
                              {color}
                            </Radio>
                          ))}
                        </RadioGroup>
                      </div>
                    )}

                    {/* Size Selection */}
                    {mockProduct.sizes && mockProduct.sizes.length > 0 && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Ukuran
                        </label>
                        <Select
                          label="Pilih ukuran"
                          selectedKeys={[selectedSize]}
                          onSelectionChange={(keys) =>
                            setSelectedSize(Array.from(keys)[0] as string)
                          }
                        >
                          {mockProduct.sizes.map((size) => (
                            <SelectItem key={size}>{size}</SelectItem>
                          ))}
                        </Select>
                      </div>
                    )}

                    {/* Quantity */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Jumlah
                      </label>
                      <div className="flex items-center gap-3">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="bordered"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        >
                          -
                        </Button>
                        <Input
                          type="number"
                          value={String(quantity)}
                          onChange={(e) =>
                            setQuantity(
                              Math.max(1, parseInt(e.target.value) || 1),
                            )
                          }
                          className="w-20 text-center"
                        />
                        <Button
                          isIconOnly
                          size="sm"
                          variant="bordered"
                          onClick={() => setQuantity(quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                {isLoading ? (
                  <Skeleton className="h-12 w-full rounded-lg" />
                ) : (
                  <div className="flex gap-3 pt-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          size="lg"
                          style={{ backgroundColor: COLORS.accent }}
                          className="flex-1 text-white font-semibold"
                          startContent={<ShoppingCart className="w-5 h-5" />}
                        >
                          Keranjang
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="px-1 py-2">
                          <p className="text-sm font-semibold">
                            Tambah ke Keranjang?
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            {mockProduct.name}
                          </p>
                          <p className="text-sm font-semibold mt-2">
                            Qty: {quantity} x Rp
                            {mockProduct.priceFinal.toLocaleString("id-ID")}
                          </p>
                          <Button
                            size="sm"
                            className="w-full mt-3"
                            style={{ backgroundColor: COLORS.accent }}
                            onPress={handleAddToCart}
                          >
                            Konfirmasi
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Button size="lg" variant="bordered" isIconOnly>
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>
                )}

                {/* Additional Info */}
                {isLoading ? (
                  <Skeleton className="h-20 w-full rounded-lg" />
                ) : (
                  <Card>
                    <CardBody className="p-4">
                      <div className="space-y-3">
                        {mockProduct.warranty && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Garansi:</span>
                            <span className="font-semibold">
                              {mockProduct.warranty}
                            </span>
                          </div>
                        )}
                        {mockProduct.sku && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">SKU:</span>
                            <span className="font-semibold">
                              {mockProduct.sku}
                            </span>
                          </div>
                        )}
                      </div>
                    </CardBody>
                  </Card>
                )}
              </>
            )}
          </div>
        </div>

        {/* Specifications */}
        {mockProduct.specifications &&
          Object.keys(mockProduct.specifications).length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Spesifikasi Produk
              </h2>
              {isLoading ? (
                <Skeleton className="h-64 w-full rounded-lg" />
              ) : (
                <Card>
                  <CardBody>
                    <ScrollShadow className="w-full">
                      <table className="w-full">
                        <tbody>
                          {Object.entries(mockProduct.specifications).map(
                            ([key, value]) => (
                              <tr
                                key={key}
                                className="border-b border-gray-200 last:border-0"
                              >
                                <td className="py-3 px-4 font-semibold text-gray-900 w-1/3">
                                  {key}
                                </td>
                                <td className="py-3 px-4 text-gray-600">
                                  {value}
                                </td>
                              </tr>
                            ),
                          )}
                        </tbody>
                      </table>
                    </ScrollShadow>
                  </CardBody>
                </Card>
              )}
            </div>
          )}

        {/* FAQ/Accordion */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Pertanyaan Umum
          </h2>
          {isLoading ? (
            <Skeleton className="h-64 w-full rounded-lg" />
          ) : (
            <Accordion>
              <AccordionItem
                key="1"
                aria-label="Apa garansi produk?"
                title="Apa garansi produk?"
              >
                Produk ini dilengkapi dengan garansi resmi dari manufacturer.
              </AccordionItem>
              <AccordionItem
                key="2"
                aria-label="Apakah bisa dicicil?"
                title="Apakah bisa dicicil?"
              >
                Ya, kami menyediakan opsi cicilan tanpa bunga untuk pembelian
                tertentu dengan kartu kredit tertentu.
              </AccordionItem>
              <AccordionItem
                key="3"
                aria-label="Berapa lama pengiriman?"
                title="Berapa lama pengiriman?"
              >
                Pengiriman biasanya dilakukan dalam 1-2 hari kerja untuk area
                Bandung dan sekitarnya.
              </AccordionItem>
            </Accordion>
          )}
        </div>
      </main>

      {/* Add to Cart Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Konfirmasi Keranjang
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Produk</p>
                <p className="font-semibold">{mockProduct.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {mockProduct.colors && mockProduct.colors.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-600">Warna</p>
                    <p className="font-semibold">{selectedColor}</p>
                  </div>
                )}
                {mockProduct.sizes && mockProduct.sizes.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-600">Ukuran</p>
                    <p className="font-semibold">{selectedSize}</p>
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-600">Jumlah</p>
                <p className="font-semibold">{quantity} unit</p>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total</span>
                  <span className="text-2xl font-bold">
                    Rp
                    {(mockProduct.priceFinal * quantity).toLocaleString(
                      "id-ID",
                    )}
                  </span>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="default" variant="light" onPress={onOpenChange}>
              Batal
            </Button>
            <Button
              className="text-white"
              style={{ backgroundColor: COLORS.accent }}
              onPress={handleConfirmAddToCart}
            >
              Lanjut ke Keranjang
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Footer />
    </div>
  );
}
