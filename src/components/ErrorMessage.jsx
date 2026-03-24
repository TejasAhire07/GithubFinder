import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

export default function ErrorMessage({ message }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="glass-card p-6 text-center max-w-md mx-auto"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-8"
      >
        <AlertCircle className="w-8 h-8 text-red-400" />
      </motion.div>
      <h3 className="text-xl font-semibold text-white mb-2 font-poppins">
        User Not Found
      </h3>
      <p className="text-gray-300">
        {message || "The GitHub user you're looking for doesn't exist or is private."}
      </p>
    </motion.div>
  );
}