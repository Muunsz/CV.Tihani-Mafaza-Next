'use client';

import { useState } from "react";
import { Heart } from 'lucide-react'; // Import Heart icon
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { COLORS } from '@/lib/constants';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';
import { Card, CardBody, Image, Button, Badge } from '@heroui/react';

const articleData = {
  id: 1,
  title: 'Tips Memilih Penyedia Barang yang Tepat untuk Institusi Anda',
  excerpt: 'Memilih penyedia barang yang tepat adalah keputusan penting. Pelajari kriteria dan tips untuk membuat keputusan terbaik.',
  category: 'Panduan',
  author: 'Tim Tihani Mafaza',
  authorRole: 'Content Writer',
  date: '20 Januari 2024',
  readTime: '8 menit dibaca',
  image: 'https://via.placeholder.com/1200x600?text=Panduan+Pemilihan',
  content: `
    <h2>Pengenalan</h2>
    <p>Memilih penyedia barang yang tepat adalah keputusan krusial bagi setiap institusi. Dalam dunia bisnis modern, keputusan ini dapat berdampak signifikan pada efisiensi operasional, kualitas produk, dan anggaran perusahaan Anda.</p>
    
    <h2>1. Evaluasi Reputasi Penyedia</h2>
    <p>Langkah pertama dalam memilih penyedia barang adalah mengevaluasi reputasi mereka di industri. Anda dapat melakukan ini dengan:</p>
    <ul>
      <li>Mencari review dan testimoni dari klien sebelumnya</li>
      <li>Memeriksa sertifikasi dan akreditasi yang dimiliki</li>
      <li>Menanyakan referensi kepada institusi sejenis</li>
      <li>Mengecek track record dalam melayani klien B2B</li>
    </ul>
    
    <h2>2. Kualitas Produk dan Layanan</h2>
    <p>Kualitas adalah aspek yang tidak dapat dikompromikan. Pastikan untuk:</p>
    <ul>
      <li>Memeriksa spesifikasi produk secara detail</li>
      <li>Meminta sample atau demo produk</li>
      <li>Memverifikasi standar kualitas yang digunakan</li>
      <li>Menanyakan tentang garansi dan layanan purna jual</li>
    </ul>
    
    <h2>3. Transparansi Harga</h2>
    <p>Transparansi harga sangat penting untuk menghindari biaya tersembunyi. Pastikan penyedia memberikan:</p>
    <ul>
      <li>Breakdown harga yang jelas (DPP, PPN, PPh)</li>
      <li>Tidak ada biaya tambahan yang tidak terduga</li>
      <li>Sistem pricing yang konsisten dan fair</li>
      <li>Fleksibilitas untuk negosiasi harga untuk volume besar</li>
    </ul>
    
    <h2>4. Keandalan Logistik</h2>
    <p>Pengiriman yang tepat waktu adalah kunci kepuasan pelanggan. Tanyakan tentang:</p>
    <ul>
      <li>Jangkauan pengiriman mereka</li>
      <li>Sistem tracking real-time</li>
      <li>Track record ketepatan waktu pengiriman</li>
      <li>Prosedur untuk menangani barang rusak atau hilang</li>
    </ul>
    
    <h2>5. Dukungan Pelanggan</h2>
    <p>Dukungan pelanggan yang responsif sangat berharga. Pastikan penyedia menyediakan:</p>
    <ul>
      <li>Tim support yang available 24/7</li>
      <li>Multiple channels komunikasi (telepon, email, chat)</li>
      <li>Response time yang cepat</li>
      <li>Solusi yang efektif untuk masalah</li>
    </ul>
    
    <h2>Kesimpulan</h2>
    <p>Memilih penyedia barang yang tepat memerlukan analisis menyeluruh dan pertimbangan matang. Dengan mengikuti kriteria di atas, Anda dapat membuat keputusan yang tepat untuk institusi Anda. Ingat, investasi dalam penyedia yang berkualitas adalah investasi dalam kesuksesan jangka panjang organisasi Anda.</p>
  `,
  relatedArticles: [
    { id: 2, title: 'Pentingnya Transparansi Harga', category: 'Bisnis' },
    { id: 3, title: 'Tren Pengadaan Barang 2024', category: 'Industri' },
    { id: 4, title: 'Panduan Sistem Logistik', category: 'Logistik' },
  ],
};

export const metadata = {
  title: `${articleData.title} - CV. Tihani Mafaza Blog`,
  description: articleData.excerpt,
};

export default function ArticleDetailPage() {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {/* Header */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition" style={{ color: COLORS.accent }}>
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Blog
          </Link>
        </section>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          {/* Category Badge */}
          <div className="mb-4">
            <Badge content={articleData.category} color="primary" style={{ backgroundColor: COLORS.accent }}>
              <span />
            </Badge>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {articleData.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {articleData.date}
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {articleData.author}
            </div>
            <div className="text-gray-500">
              {articleData.readTime}
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-12 rounded-lg overflow-hidden">
            <Image
              src={articleData.image || "/placeholder.svg"}
              alt={articleData.title}
              className="w-full h-96 object-cover"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div dangerouslySetInnerHTML={{ __html: articleData.content }} />
          </div>

          {/* Article Footer */}
          <div className="border-t border-b border-gray-200 py-8 mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              {/* Author Info */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{articleData.author}</p>
                  <p className="text-sm text-gray-600">{articleData.authorRole}</p>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-3">
                <Button isIconOnly variant="light" className="text-gray-600 hover:text-red-500 transition">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button isIconOnly variant="light" className="text-gray-600 hover:text-blue-600 transition">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Artikel Terkait</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {articleData.relatedArticles.map((article) => (
                <Link key={article.id} href="/blog" className="group">
                  <Card className="hover:shadow-lg transition-all">
                    <CardBody className="gap-4">
                      <Badge content={article.category} size="sm" style={{ backgroundColor: COLORS.accent }}>
                        <span />
                      </Badge>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition line-clamp-2">
                        {article.title}
                      </h3>
                    </CardBody>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </article>

        {/* Newsletter CTA */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4" style={{ color: COLORS.primary }}>
              Jangan Lewatkan Update Terbaru
            </h2>
            <p className="text-gray-600 mb-8">
              Berlangganan newsletter kami untuk mendapatkan artikel baru langsung ke inbox Anda.
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Email Anda"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': COLORS.accent } as React.CSSProperties}
              />
              <Button style={{ backgroundColor: COLORS.accent }} className="text-white font-bold">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
