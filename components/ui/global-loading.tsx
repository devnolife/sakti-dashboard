"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface GlobalLoadingProps {
  text?: string
  className?: string
}

export function GlobalLoading({ text = "Loading...", className = "" }: GlobalLoadingProps) {
  return (
    <div className={`flex h-[calc(100vh-3.5rem)] w-full items-center justify-center ${className}`}>
      <div className="flex flex-col items-center gap-6">
        {/* Logo dengan animasi fade in-out */}
        <motion.div
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.95, 1, 0.95],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/logo/logo.png"
            alt="Loading"
            width={120}
            height={120}
            priority
            className="object-contain"
          />
        </motion.div>

        {/* Text loading dengan animasi */}
        <motion.p
          className="text-lg font-medium text-muted-foreground"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {text}
        </motion.p>

        {/* Dots loading animation */}
        <div className="flex gap-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="h-2 w-2 rounded-full bg-primary"
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// Loading fullscreen untuk overlay
export function GlobalLoadingOverlay({ text = "Loading...", className = "" }: GlobalLoadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center ${className}`}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Logo dengan animasi fade in-out */}
        <motion.div
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.95, 1, 0.95],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/logo/logo.png"
            alt="Loading"
            width={120}
            height={120}
            priority
            className="object-contain"
          />
        </motion.div>

        {/* Text loading dengan animasi */}
        <motion.p
          className="text-lg font-medium text-foreground"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {text}
        </motion.p>

        {/* Dots loading animation */}
        <div className="flex gap-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="h-2 w-2 rounded-full bg-primary"
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// Loading compact untuk inline usage
export function GlobalLoadingCompact({ text = "Loading...", className = "" }: GlobalLoadingProps) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <motion.div
        animate={{
          opacity: [0.3, 1, 0.3],
          scale: [0.95, 1, 0.95],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Image
          src="/logo/logo.png"
          alt="Loading"
          width={40}
          height={40}
          priority
          className="object-contain"
        />
      </motion.div>
      <motion.span
        className="text-sm font-medium text-muted-foreground"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.span>
    </div>
  )
}
