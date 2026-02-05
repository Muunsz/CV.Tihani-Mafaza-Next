"use client";

import { TESTIMONIALS, COLORS } from "@/lib/constants";
import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  rating: number;
  title: string;
  review_text: string;
  users: {
    full_name: string;
  };
}

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

export function TestimonialsSection({
  testimonials,
}: TestimonialsSectionProps) {
  // Use database testimonials if available, otherwise fallback to constants
  const displayTestimonials =
    testimonials && testimonials.length > 0
      ? testimonials.map((t) => ({
          id: t.id,
          rating: t.rating,
          content: t.review_text,
          author: t.users.full_name,
          role: "Customer",
        }))
      : TESTIMONIALS;

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className="text-4xl font-bold mb-4"
            style={{ color: COLORS.primary }}
          >
            Apa Kata Klien Kami
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Ribuan institusi telah mempercayai CV. Tihani Mafaza untuk kebutuhan
            pengadaan mereka
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {displayTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="p-8 rounded-lg border border-gray-200 bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5"
                    fill={COLORS.accent}
                    stroke={COLORS.accent}
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                &quot;{testimonial.content}&quot;
              </p>

              {/* Author */}
              <div className="border-t border-gray-200 pt-4">
                <p className="font-bold text-gray-900">{testimonial.author}</p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 p-12 rounded-xl bg-gradient-to-r from-blue-50 to-orange-50 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p
                className="text-4xl font-bold mb-2"
                style={{ color: COLORS.primary }}
              >
                98%
              </p>
              <p className="text-gray-600 font-semibold">Kepuasan Klien</p>
            </div>
            <div>
              <p
                className="text-4xl font-bold mb-2"
                style={{ color: COLORS.primary }}
              >
                50+
              </p>
              <p className="text-gray-600 font-semibold">Review Positif</p>
            </div>
            <div>
              <p
                className="text-4xl font-bold mb-2"
                style={{ color: COLORS.primary }}
              >
                99%
              </p>
              <p className="text-gray-600 font-semibold">Tepat Waktu</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
