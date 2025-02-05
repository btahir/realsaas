"use client"

import { motion } from "framer-motion"
import { Palette, Zap, Layout, Smile } from "lucide-react"

const features = [
  {
    icon: Palette,
    title: "Beautiful Templates",
    description: "Choose from a variety of stunning, customizable designs.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Build your portfolio in minutes, not hours or days.",
  },
  {
    icon: Layout,
    title: "Drag and Drop",
    description: "Easily customize your layout with our intuitive builder.",
  },
  {
    icon: Smile,
    title: "User-Friendly",
    description: "No coding skills required. It's that simple!",
  },
]

export default function Features() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Why Choose Our Builder?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300"
            >
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

