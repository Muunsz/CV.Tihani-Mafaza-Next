"use client";

import { RoleLayout } from "@/components/admin/RoleLayout";
import { COLORS } from "@/lib/constants";
import { Save, Eye } from "lucide-react";
import { useState } from "react";

export default function CompanyProfileManagement() {
  const [formData, setFormData] = useState({
    companyName: "CV. Tihani Mafaza",
    description: "Kami adalah perusahaan terkemuka dalam penyediaan barang dan jasa berkualitas tinggi...",
    email: "info@tihani.com",
    phone: "+62-812-XXXX-XXXX",
    address: "Jl. Merdeka No. 123, Jakarta Pusat",
    website: "www.tihani.com",
    foundedYear: "2015",
    employees: "50+",
    mission: "Memberikan layanan terbaik kepada pelanggan...",
    vision: "Menjadi pemimpin industri dalam 5 tahun ke depan...",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Perubahan disimpan!");
    }, 1000);
  };

  return (
    <RoleLayout role="admin" title="Manajemen Company Profile" subtitle="Kelola informasi perusahaan">
      <div className="space-y-6">
        {/* Tabs */}
        <div className="flex gap-4 border-b border-gray-200">
          {["general", "details", "media"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-semibold border-b-2 transition ${
                activeTab === tab
                  ? "border-current text-current"
                  : "border-transparent text-gray-600"
              }`}
              style={{
                borderColor: activeTab === tab ? COLORS.accent : undefined,
                color: activeTab === tab ? COLORS.accent : undefined,
              }}
            >
              {tab === "general" && "Informasi Umum"}
              {tab === "details" && "Detail Perusahaan"}
              {tab === "media" && "Media & File"}
            </button>
          ))}
        </div>

        {/* General Tab */}
        {activeTab === "general" && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Nama Perusahaan</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Deskripsi Perusahaan</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Telepon</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Alamat</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Website</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
              />
            </div>
          </div>
        )}

        {/* Details Tab */}
        {activeTab === "details" && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Tahun Berdiri</label>
                <input
                  type="text"
                  name="foundedYear"
                  value={formData.foundedYear}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Jumlah Karyawan</label>
                <input
                  type="text"
                  name="employees"
                  value={formData.employees}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Misi Perusahaan</label>
              <textarea
                name="mission"
                value={formData.mission}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Visi Perusahaan</label>
              <textarea
                name="vision"
                value={formData.vision}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
              />
            </div>
          </div>
        )}

        {/* Media Tab */}
        {activeTab === "media" && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold mb-4">Kelola File & Media</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["Logo Perusahaan", "Company Profile PDF", "Sertifikat & Penghargaan", "Foto Tim"].map((item) => (
                <div key={item} className="border border-gray-300 rounded-lg p-4 text-center">
                  <p className="text-sm font-semibold mb-3">{item}</p>
                  <input
                    type="file"
                    className="w-full text-sm mb-2"
                  />
                  <button className="w-full px-3 py-2 rounded-lg text-white text-sm font-semibold" style={{ backgroundColor: COLORS.accent }}>
                    Upload
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end gap-3">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold transition hover:shadow-lg disabled:opacity-50"
            style={{ backgroundColor: COLORS.accent }}
          >
            <Save size={18} />
            {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
          <button className="flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 font-semibold hover:bg-gray-50">
            <Eye size={18} />
            Pratinjau
          </button>
        </div>
      </div>
    </RoleLayout>
  );
}
