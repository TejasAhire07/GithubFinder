import { motion } from 'framer-motion';

export default function LoadingSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-card p-6 floating"
    >
      <div className="text-center animate-pulse">
        {/* Avatar Skeleton */}
        <div className="w-24 h-24 bg-glass rounded-full mx-auto mb-4 border-2 border-glass-border"></div>

        {/* Name Skeleton */}
        <div className="h-6 bg-glass rounded mb-2 mx-auto w-32"></div>
        <div className="h-4 bg-glass rounded mb-3 mx-auto w-24"></div>

        {/* Bio Skeleton */}
        <div className="h-4 bg-glass rounded mb-2 mx-auto w-full max-w-xs"></div>
        <div className="h-4 bg-glass rounded mb-4 mx-auto w-3/4"></div>

        {/* Location Skeleton */}
        <div className="h-4 bg-glass rounded mb-4 mx-auto w-20"></div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="text-center">
              <div className="w-4 h-4 bg-glass rounded mx-auto mb-1"></div>
              <div className="h-5 bg-glass rounded mb-1 mx-auto w-8"></div>
              <div className="h-3 bg-glass rounded mx-auto w-12"></div>
            </div>
          ))}
        </div>

        {/* Button Skeleton */}
        <div className="h-10 bg-glass rounded-lg mx-auto w-32"></div>
      </div>
    </motion.div>
  );
}