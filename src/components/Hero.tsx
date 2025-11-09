import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Heart, Flower2 } from 'lucide-react';

interface HeroProps {
  onStartQuiz: () => void;
}

export function Hero({ onStartQuiz }: HeroProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1709098165904-e9c5f9eec48a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwZmxvd2VycyUyMHBhc3RlbHxlbnwxfHx8fDE3NjI3MDI5MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)'
        }}
      />
      
      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-pink-900/30 to-rose-900/40" />
      <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/20 to-transparent" />
      
      {/* Floating flowers animation */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ y: -100, x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200), opacity: 0 }}
          animate={{
            y: typeof window !== 'undefined' ? window.innerHeight + 100 : 900,
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
            opacity: [0, 0.6, 0.6, 0],
            rotate: 360
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
        >
          <Flower2 className="w-8 h-8 text-pink-200/60" />
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-md bg-white/10 p-12 rounded-3xl border border-white/20 shadow-2xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <Heart className="w-20 h-20 text-pink-200 fill-pink-200" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0"
              >
                <Heart className="w-20 h-20 text-pink-300/40" />
              </motion.div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white mb-6"
          >
            You Are Not Alone
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-pink-50 mb-8 max-w-2xl mx-auto text-lg"
          >
            Postpartum depression affects 1 in 7 women. Understanding your feelings is the first step 
            toward healing and finding support.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Button
              onClick={onStartQuiz}
              size="lg"
              className="bg-white text-purple-900 hover:bg-pink-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Take the Self-Assessment
            </Button>
            <Button
              onClick={() => document.getElementById('info')?.scrollIntoView({ behavior: 'smooth' })}
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10 backdrop-blur-sm"
            >
              Learn More
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
