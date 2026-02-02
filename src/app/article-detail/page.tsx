import { Metadata } from "next";
import { ArticleDetailClient } from "./ArticleDetailClient";

const articleData = {
  id: 1,
  title: "Tips Memilih Penyedia Barang yang Tepat untuk Institusi Anda",
  excerpt:
    "Memilih penyedia barang yang tepat adalah keputusan penting. Pelajari kriteria dan tips untuk membuat keputusan terbaik.",
  category: "Panduan",
  author: "Tim Tihani Mafaza",
  authorRole: "Content Writer",
  date: "20 Januari 2024",
  readTime: "8 menit dibaca",
  image: "https://via.placeholder.com/1200x600?text=Panduan+Pemilihan",
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
    { id: 2, title: "Pentingnya Transparansi Harga", category: "Bisnis" },
    { id: 3, title: "Tren Pengadaan Barang 2024", category: "Industri" },
    { id: 4, title: "Panduan Sistem Logistik", category: "Logistik" },
  ],
};

export const metadata: Metadata = {
  title: `${articleData.title} - CV. Tihani Mafaza Blog`,
  description: articleData.excerpt,
};

export default function ArticleDetailPage() {
  return <ArticleDetailClient articleData={articleData} />;
}
