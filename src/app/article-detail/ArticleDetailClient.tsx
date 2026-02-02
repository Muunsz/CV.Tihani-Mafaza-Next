"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { COLORS } from "@/lib/constants";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import { Card, CardBody, Image, Button, Badge } from "@heroui/react";

interface ArticleData {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  image: string;
  content: string;
  relatedArticles: Array<{
    id: number;
    title: string;
    category: string;
  }>;
}

interface ArticleDetailClientProps {
  articleData: ArticleData;
}

export function ArticleDetailClient({ articleData }: ArticleDetailClientProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative h-96 bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center text-white px-4">
              <div className="flex items-center justify-center mb-4">
                <Badge color="primary" variant="flat" className="mb-4">
                  {articleData.category}
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-4xl mx-auto">
                {articleData.title}
              </h1>
              <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                {articleData.excerpt}
              </p>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-600">
            <div className="flex items-center gap-2">
              <User size={18} />
              <span>{articleData.author}</span>
              <span className="text-sm text-gray-500">
                ({articleData.authorRole})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{articleData.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>⏱️</span>
              <span>{articleData.readTime}</span>
            </div>
          </div>

          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft size={18} />
              Kembali ke Blog
            </Link>
          </div>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none mb-12">
            <div dangerouslySetInnerHTML={{ __html: articleData.content }} />
          </div>

          {/* Like and Share */}
          <div className="flex items-center justify-between py-8 border-t border-b border-gray-200 mb-12">
            <div className="flex items-center gap-4">
              <Button
                variant="light"
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center gap-2 ${isLiked ? "text-red-500" : "text-gray-600"}`}
              >
                <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
                <span>{isLiked ? "Disukai" : "Suka"}</span>
              </Button>
            </div>
            <Button
              variant="light"
              className="flex items-center gap-2 text-gray-600"
            >
              <Share2 size={20} />
              <span>Bagikan</span>
            </Button>
          </div>

          {/* Related Articles */}
          <div>
            <h2
              className="text-2xl font-bold mb-8"
              style={{ color: COLORS.primary }}
            >
              Artikel Terkait
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {articleData.relatedArticles.map((related) => (
                <Card
                  key={related.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardBody>
                    <div className="mb-4">
                      <Badge color="secondary" variant="flat" size="sm">
                        {related.category}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                      {related.title}
                    </h3>
                    <Button
                      variant="light"
                      color="primary"
                      size="sm"
                      className="mt-4"
                      as={Link}
                      href={`/article-detail/${related.id}`}
                    >
                      Baca Selengkapnya
                    </Button>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
