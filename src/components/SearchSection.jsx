import { motion } from 'framer-motion';
import { Search, Sparkles, Github } from 'lucide-react';

export default function SearchSection({
  searchValue,
  onSearchChange,
  onSearch,
  loading,
  searchType,
  onSearchTypeChange,
  hasError
}) {


  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className={`hero ${hasError ? '!pb-8 !min-h-[40vh]' : ''}`}
    >
      <div className="hero-inner">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-8"
        >

          <h2 className="hero-title glow flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-center">
            <Sparkles className="hero-icon shrink-0" />
            <span>Discover GitHub {searchType === 'users' ? 'Users' : 'Repos'}</span>
          </h2>
          <p className="hero-subtitle px-4 sm:px-0 text-sm sm:text-base">
            Explore {searchType === 'users' ? 'profiles' : 'repositories'}, repositories, and connections in the developer universe
          </p>
        </motion.div>

        {/* Search Type Toggle */}
        <div className="flex justify-center mb-10">
          <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10 backdrop-blur-2xl shadow-2xl">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={() => onSearchTypeChange('users')}
              className={`px-4 sm:px-8 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-1 sm:gap-2 ${searchType === 'users'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 ring-1 ring-white/20'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
            >
              Users
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={() => onSearchTypeChange('repos')}
              className={`px-4 sm:px-8 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-1 sm:gap-2 ${searchType === 'repos'
                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/25 ring-1 ring-white/20'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
            >
              Repositories
            </motion.button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="w-full max-w-2xl mx-auto"
        >
          <motion.div 
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative group"
          >
            <div className={`absolute -inset-1 bg-gradient-to-r ${searchType === 'users' ? 'from-cyan-400 to-blue-500' : 'from-purple-400 to-pink-500'} rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200`}></div>
            <div className="relative flex items-center bg-black/40 backdrop-blur-2xl rounded-2xl border border-white/10 p-2 shadow-2xl transition-all duration-300 group-focus-within:border-white/20 group-focus-within:ring-4 group-focus-within:ring-white/5 group-focus-within:scale-[1.02]">
              <Search className={`absolute left-4 sm:left-6 ${searchType === 'users' ? 'group-focus-within:text-cyan-400' : 'group-focus-within:text-purple-400'} text-gray-400 w-4 h-4 sm:w-5 sm:h-5 transition-colors`} />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && onSearch()}
                placeholder={searchType === 'users' ? "Find Account" : "Find Repository"}
                className="w-full bg-transparent pl-10 sm:pl-14 pr-24 sm:pr-32 py-3 sm:py-4 text-white placeholder-gray-500 outline-none text-base sm:text-lg font-medium"
              />
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95, y: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                onClick={onSearch}
                disabled={loading}
                className={`absolute right-1 sm:right-2 px-4 sm:px-8 py-2 sm:py-3 bg-gradient-to-r ${searchType === 'users' ? 'from-cyan-500 to-blue-600 shadow-cyan-500/30' : 'from-purple-500 to-pink-600 shadow-purple-500/30'} text-white rounded-xl font-bold disabled:opacity-50 flex items-center gap-1 sm:gap-2 border border-white/10 overflow-hidden group/btn text-sm sm:text-base`}
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                {loading ? (
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span className="relative z-10 hidden sm:inline">Search</span>
                    <span className="relative z-10 sm:hidden">Go</span>
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 relative z-10 group-hover/btn:rotate-12 transition-transform" />
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>


        </motion.div>
      </div>
    </motion.section>
  );
}