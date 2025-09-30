'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Star } from 'lucide-react'

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Raka – Computer Science Student, Indonesia",
      review: "\"SINTEKMu helped me understand programming in a simple and practical way. The mentors were always supportive!\"",
      rating: 5,
      isMain: true
    },
    {
      id: 2,
      name: "Sarah – Marketing Specialist, UK",
      review: "",
      rating: 5,
      isMain: false
    }
  ]

  return (
    <section id="testimonials" className="py-12 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 grid lg:grid-cols-2 gap-8">
          <div>
            <Badge className="bg-primary text-white px-4 py-1.5 text-sm rounded-full shadow-lg mb-4">
              Testimonials
            </Badge>
            <h2 className="text-2xl md:text-3xl font-medium leading-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary via-brand to-primary/80">
              Trusted by Thousands of Learners
            </h2>
            <p className="text-sm md:text-base text-[rgba(16,16,18,0.4)] leading-relaxed mb-6">
              Real experiences from learners around the world.
            </p>

            {/* Navigation Button */}
            <Button className="bg-primary hover:bg-primary/90 rounded-full w-12 h-12 p-0 shadow-lg">
              <ChevronLeft className="w-5 h-5 text-white" />
            </Button>
          </div>
        </div>

        {/* Testimonial Cards */}
        <div className="flex gap-6 justify-center lg:justify-end">
          {/* Main Testimonial */}
          <div className="relative p-6 bg-black rounded-2xl max-w-sm shadow-lg overflow-hidden">
            <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand via-primary to-brand" />
            <div className="text-white space-y-4">
              {/* Client Name */}
              <h3 className="font-bold text-sm leading-normal">
                {testimonials[0].name}
              </h3>

              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Empty space for content symmetry */}
              <div className="h-32" />

              {/* Review */}
              <p className="font-normal text-sm leading-normal">
                {testimonials[0].review}
              </p>
            </div>
          </div>

          {/* Secondary Testimonial */}
          <div className="relative p-6 bg-black rounded-2xl max-w-xs shadow-lg overflow-hidden">
            <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-primary via-brand to-primary" />
            <div className="text-white space-y-4 h-full flex flex-col justify-between">
              {/* Empty space */}
              <div className="flex-1" />

              {/* Client Name */}
              <h3 className="font-bold text-sm leading-normal">
                {testimonials[1].name}
              </h3>

              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
