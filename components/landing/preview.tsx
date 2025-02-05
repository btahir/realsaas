"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function Preview() {
  const previews = [
    { id: 1, src: "/preview1.png", alt: "Preview 1" },
    { id: 2, src: "/preview2.png", alt: "Preview 2" },
    { id: 3, src: "/preview3.png", alt: "Preview 3" },
    { id: 4, src: "/preview4.png", alt: "Preview 4" },
  ];

  return (
    <section className="py-20 bg-[hsl(var(--section-bg))]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-foreground mb-12">See It In Action</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {previews.map((preview, index) => (
            <motion.div
              key={preview.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-[hsl(var(--card))] rounded-lg shadow-lg overflow-hidden"
            >
              <Image src={preview.src} alt={preview.alt} width={400} height={300} className="w-full h-auto" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 