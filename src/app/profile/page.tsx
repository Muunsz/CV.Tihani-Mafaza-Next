'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { COLORS } from '@/lib/constants';
import { User, Mail, Phone, Building2, MapPin, Edit, Settings, LogOut, Shield, Bell, Lock } from 'lucide-react';

interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
}

export default function ProfilePage() {
  const [profile] = useState<UserProfile>({
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+62 812 3456 7890',
    companyName: 'PT Contoh Jaya',
    address: 'Jl. Merdeka No. 123',
    city: 'Bandung',
    province: 'Jawa Barat',
    postalCode: '40123',
    joinDate: '2023-01-15',
    totalOrders: 24,
    totalSpent: 150000000,
  });

  const menuItems = [
    { icon: User, label: 'Edit Profil', href: '/profile/edit', description: 'Ubah informasi profil Anda' },
    { icon: Lock, label: 'Ganti Password', href: '/profile/change-password', description: 'Ubah password Anda' },
    { icon: Bell, label: 'Notifikasi', href: '/profile/notifications', description: 'Kelola pengaturan notifikasi' },
    { icon: Shield, label: 'Keamanan', href: '/profile/security', description: 'Kelola keamanan akun' },
    { icon: LogOut, label: 'Logout', href: '#', description: 'Keluar dari akun Anda' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2" style={{ color: COLORS.primary }}>
              Profil Saya
            </h1>
            <p className="text-gray-600">
              Kelola informasi profil dan pengaturan akun Anda
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 border border-gray-200 sticky top-20">
                {/* Avatar */}
                <div className="flex justify-center mb-6">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold"
                    style={{ backgroundColor: COLORS.accent }}
                  >
                    {profile.fullName.charAt(0).toUpperCase()}
                  </div>
                </div>

                {/* Profile Info */}
                <div className="text-center mb-6 border-b pb-6">
                  <h2 className="text-2xl font-bold mb-1" style={{ color: COLORS.primary }}>
                    {profile.fullName}
                  </h2>
                  <p className="text-gray-600 text-sm">{profile.companyName}</p>
                  <p className="text-gray-500 text-xs mt-2">
                    Bergabung sejak {new Date(profile.joinDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })}
                  </p>
                </div>

                {/* Stats */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: `${COLORS.primary}10` }}>
                    <span className="text-sm text-gray-600">Total Pesanan</span>
                    <span className="font-bold" style={{ color: COLORS.primary }}>{profile.totalOrders}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: `${COLORS.accent}10` }}>
                    <span className="text-sm text-gray-600">Total Dibelanjakan</span>
                    <span className="font-bold" style={{ color: COLORS.accent }}>
                      Rp{(profile.totalSpent / 1000000).toFixed(0)}M
                    </span>
                  </div>
                </div>

                {/* Edit Button */}
                <Link
                  href="/profile/edit"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-white font-semibold transition hover:shadow-lg"
                  style={{ backgroundColor: COLORS.accent }}
                >
                  <Edit size={18} />
                  Edit Profil
                </Link>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Information */}
              <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
                <h3 className="text-xl font-bold mb-6" style={{ color: COLORS.primary }}>
                  Informasi Profil
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <User size={20} style={{ color: COLORS.accent }} className="flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600">Nama Lengkap</p>
                      <p className="font-semibold">{profile.fullName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Mail size={20} style={{ color: COLORS.accent }} className="flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-semibold">{profile.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Phone size={20} style={{ color: COLORS.accent }} className="flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600">Telepon</p>
                      <p className="font-semibold">{profile.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Building2 size={20} style={{ color: COLORS.accent }} className="flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600">Perusahaan</p>
                      <p className="font-semibold">{profile.companyName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <MapPin size={20} style={{ color: COLORS.accent }} className="flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600">Alamat</p>
                      <p className="font-semibold">
                        {profile.address}, {profile.city} {profile.province} {profile.postalCode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu Grid */}
              <div>
                <h3 className="text-xl font-bold mb-6" style={{ color: COLORS.primary }}>
                  Pengaturan Akun
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="bg-white rounded-lg shadow border border-gray-200 p-4 hover:shadow-lg transition hover:border-gray-300"
                      >
                        <div className="flex items-start gap-3">
                          <Icon size={24} style={{ color: COLORS.accent }} className="flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold mb-1" style={{ color: COLORS.primary }}>
                              {item.label}
                            </h4>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
