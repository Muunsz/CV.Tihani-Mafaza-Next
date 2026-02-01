'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  Card,
  CardBody,
  CardHeader,
  Tabs,
  Tab,
  Badge,
  Progress,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  DatePicker,
  DateRangePicker,
  Pagination,
  Skeleton,
  Avatar,
  Accordion,
  AccordionItem,
  Alert,
} from '@heroui/react';
import { parseDate } from '@internationalized/date';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Mail,
  Download,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { COLORS } from '@/lib/constants';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  totalPrice: number;
  items: OrderItem[];
  shippingAddress: string;
  estimatedDelivery: string;
  progress: number;
  trackingNumber: string;
  carrier: string;
}

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    date: '2024-01-20',
    status: 'shipped',
    totalPrice: 2500000,
    items: [
      {
        id: '1',
        name: 'Laptop Professional 15 Inch',
        quantity: 1,
        price: 2500000,
        image: '/placeholder.jpg',
      },
    ],
    shippingAddress: 'Jl. Pendidikan No. 42, Bandung, Jawa Barat 40154',
    estimatedDelivery: '2024-01-25',
    progress: 75,
    trackingNumber: 'JNE-123456789',
    carrier: 'JNE',
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    date: '2024-01-15',
    status: 'delivered',
    totalPrice: 1500000,
    items: [
      {
        id: '2',
        name: 'Monitor 27 Inch',
        quantity: 2,
        price: 750000,
        image: '/placeholder.jpg',
      },
    ],
    shippingAddress: 'Jl. Pendidikan No. 42, Bandung, Jawa Barat 40154',
    estimatedDelivery: '2024-01-20',
    progress: 100,
    trackingNumber: 'JNE-987654321',
    carrier: 'JNE',
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    date: '2024-01-10',
    status: 'processing',
    totalPrice: 3500000,
    items: [
      {
        id: '3',
        name: 'Keyboard Gaming RGB',
        quantity: 1,
        price: 800000,
        image: '/placeholder.jpg',
      },
      {
        id: '4',
        name: 'Mouse Gaming',
        quantity: 1,
        price: 500000,
        image: '/placeholder.jpg',
      },
    ],
    shippingAddress: 'Jl. Pendidikan No. 42, Bandung, Jawa Barat 40154',
    estimatedDelivery: '2024-01-28',
    progress: 30,
    trackingNumber: 'JNE-456789123',
    carrier: 'JNE',
  },
];

const statusConfig = {
  pending: {
    label: 'Menunggu',
    color: 'warning',
    icon: Clock,
  },
  processing: {
    label: 'Diproses',
    color: 'info',
    icon: Package,
  },
  shipped: {
    label: 'Dikirim',
    color: 'primary',
    icon: Truck,
  },
  delivered: {
    label: 'Terkirim',
    color: 'success',
    icon: CheckCircle2,
  },
  cancelled: {
    label: 'Dibatalkan',
    color: 'danger',
    icon: AlertCircle,
  },
};

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const itemsPerPage = 5;
  const totalPages = Math.ceil(mockOrders.length / itemsPerPage);
  const paginatedOrders = mockOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    onOpen();
  };

  const getStatusColor = (status: string) => {
    const config = statusConfig[status as keyof typeof statusConfig];
    return config?.color || 'default';
  };

  const getStatusIcon = (status: string) => {
    const config = statusConfig[status as keyof typeof statusConfig];
    return config?.icon || Package;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Pesanan Saya</h1>

        {/* Filter and Search */}
        <div className="mb-8 space-y-4">
          <Card>
            <CardBody className="gap-4 p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Date Range Filter */}
                <div>
                  <label className="text-sm font-semibold text-gray-900 mb-2 block">
                    Rentang Tanggal
                  </label>
                  <DateRangePicker
                    defaultValue={{
                      start: parseDate('2024-01-01'),
                      end: parseDate('2024-01-31'),
                    }}
                  />
                </div>

                {/* Status Filter */}
                <div>
                  <label className="text-sm font-semibold text-gray-900 mb-2 block">
                    Status
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {Object.entries(statusConfig).map(([key, config]) => (
                      <Badge key={key} color={config.color} variant="flat">
                        {config.label}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action */}
                <div className="flex items-end">
                  <Button
                    style={{ backgroundColor: COLORS.accent }}
                    className="w-full text-white"
                  >
                    Filter
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Orders List */}
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="space-y-4 mb-8">
            {paginatedOrders.map((order) => {
              const StatusIcon = getStatusIcon(order.status);
              const config = statusConfig[order.status];

              return (
                <Card key={order.id} className="hover:shadow-md transition">
                  <CardBody className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                      {/* Order Number */}
                      <div>
                        <p className="text-xs text-gray-600">Nomor Pesanan</p>
                        <p className="font-semibold text-gray-900">
                          {order.orderNumber}
                        </p>
                      </div>

                      {/* Status */}
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Status</p>
                        <Badge color={getStatusColor(order.status)}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {config?.label}
                        </Badge>
                      </div>

                      {/* Total Price */}
                      <div>
                        <p className="text-xs text-gray-600">Total</p>
                        <p className="font-semibold text-gray-900">
                          Rp {order.totalPrice.toLocaleString('id-ID')}
                        </p>
                      </div>

                      {/* Items Count */}
                      <div>
                        <p className="text-xs text-gray-600">Jumlah Item</p>
                        <p className="font-semibold text-gray-900">
                          {order.items.reduce((sum, item) => sum + item.quantity, 0)} item
                        </p>
                      </div>

                      {/* Action */}
                      <Button
                        size="sm"
                        style={{ backgroundColor: COLORS.accent }}
                        className="text-white"
                        onPress={() => handleOrderDetails(order)}
                      >
                        Detail
                      </Button>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <Progress
                        value={order.progress}
                        className="mb-2"
                        color={
                          order.progress === 100
                            ? 'success'
                            : order.status === 'shipped'
                              ? 'primary'
                              : 'warning'
                        }
                      />
                      <p className="text-xs text-gray-600">
                        Perkiraan tiba: {new Date(order.estimatedDelivery).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && mockOrders.length > itemsPerPage && (
          <div className="flex justify-center">
            <Pagination
              total={totalPages}
              page={currentPage}
              onChange={setCurrentPage}
            />
          </div>
        )}
      </main>

      {/* Order Detail Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
        <ModalContent>
          {selectedOrder && (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span>Detail Pesanan</span>
                  <Badge color={getStatusColor(selectedOrder.status)}>
                    {statusConfig[selectedOrder.status]?.label}
                  </Badge>
                </div>
              </ModalHeader>
              <ModalBody className="gap-6">
                {/* Order Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Nomor Pesanan</p>
                    <p className="font-semibold">{selectedOrder.orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tanggal</p>
                    <p className="font-semibold">
                      {new Date(selectedOrder.date).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                </div>

                {/* Progress */}
                <div>
                  <p className="text-sm font-semibold mb-2">Progres Pengiriman</p>
                  <Progress value={selectedOrder.progress} />
                  <div className="grid grid-cols-4 gap-2 mt-4 text-xs">
                    {[
                      { label: 'Diproses', progress: 0 },
                      { label: 'Dikirim', progress: 50 },
                      { label: 'Transit', progress: 75 },
                      { label: 'Terkirim', progress: 100 },
                    ].map((step, i) => (
                      <div key={i} className="text-center">
                        <div
                          className={`w-8 h-8 rounded-full mx-auto mb-1 flex items-center justify-center ${
                            selectedOrder.progress >= step.progress
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 text-gray-600'
                          }`}
                        >
                          {selectedOrder.progress >= step.progress ? '✓' : i + 1}
                        </div>
                        <p>{step.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Items */}
                <div>
                  <p className="text-sm font-semibold mb-3">Item Pesanan</p>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.name} x {item.quantity}
                        </span>
                        <span className="font-semibold">
                          Rp {item.price.toLocaleString('id-ID')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Info */}
                <Accordion>
                  <AccordionItem title="Informasi Pengiriman">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Alamat Pengiriman</p>
                        <p className="text-sm">{selectedOrder.shippingAddress}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Kurir</p>
                          <p className="text-sm font-semibold">
                            {selectedOrder.carrier}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">No. Tracking</p>
                          <p className="text-sm font-semibold">
                            {selectedOrder.trackingNumber}
                          </p>
                        </div>
                      </div>
                    </div>
                  </AccordionItem>
                </Accordion>

                {/* Total */}
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold">Total Pesanan</span>
                    <span className="text-xl font-bold">
                      Rp {selectedOrder.totalPrice.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                {/* Alert */}
                {selectedOrder.status === 'shipped' && (
                  <Alert
                    icon={<AlertCircle className="w-4 h-4" />}
                    color="info"
                    title="Paket Sedang Dalam Perjalanan"
                  >
                    Paket Anda sedang dalam perjalanan menuju alamat tujuan.
                  </Alert>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onOpenChange}>
                  Tutup
                </Button>
                <Button
                  className="text-white"
                  style={{ backgroundColor: COLORS.accent }}
                  startContent={<Download className="w-4 h-4" />}
                >
                  Unduh Invoice
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Footer />
    </div>
  );
}
