import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import ParticleBackground from './components/ParticleBackground';


import SearchSection from './components/SearchSection';
import UserCard from './components/UserCard';
import RepoCard from './components/RepoCard';

import LoadingSkeleton from './components/LoadingSkeleton';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [searchType, setSearchType] = useState('users');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState('search');


  // Load data from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('github-finder-favorites');

    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Debounced search function
  const handleSearch = async () => {
    if (!username.trim()) return;

    setLoading(true);
    setError('');
    setUser(null);
    setRepos([]);

    try {
      if (searchType === 'users') {
        const response = await axios.get(`https://api.github.com/users/${username.trim()}`);
        setUser(response.data);
      } else {
        const response = await axios.get(`https://api.github.com/search/repositories?q=${username.trim()}`);
        setRepos(response.data.items);
        if (response.data.items.length === 0) {
          setError('No repositories found for this search.');
        }
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setError(searchType === 'users' ? 'Username not found in input.' : 'Repository search failed.');
      } else {
        setError('An error occurred while fetching data');
      }
    } finally {
      setLoading(false);
    }
  };


  const toggleFavorite = (userData) => {
    const isFavorite = favorites.some(fav => fav.id === userData.id);
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter(fav => fav.id !== userData.id);
    } else {
      updatedFavorites = [userData, ...favorites];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem('github-finder-favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="app">
      <ParticleBackground />


      {/* Tabs */}
      <div className="flex justify-center mt-12 mb-8 relative z-10">
        <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl relative">
          {/* Animated Background Highlighting */}
          <motion.div
            layoutId="activeTab"
            className={`absolute top-1.5 bottom-1.5 rounded-xl ${activeTab === 'search' ? 'bg-cyan-400/90 shadow-[0_0_20px_rgba(34,211,238,0.4)]' : 'bg-red-500/90 shadow-[0_0_20px_rgba(239,68,68,0.4)]'
              }`}
            initial={false}
            animate={{
              left: activeTab === 'search' ? '6px' : 'calc(50% + 3px)',
              width: 'calc(50% - 9px)',
            }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={() => setActiveTab('search')}
            className={`relative z-10 px-4 sm:px-10 py-2 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-colors duration-300 w-28 sm:w-36 ${activeTab === 'search' ? 'text-black' : 'text-gray-400 hover:text-white'
              }`}
          >
            Search
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={() => setActiveTab('favorites')}
            className={`relative z-10 px-4 sm:px-10 py-2 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-colors duration-300 w-32 sm:w-36 ${activeTab === 'favorites' ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
          >
            Favorites {favorites.length > 0 && `(${favorites.length})`}
          </motion.button>
        </div>
      </div>

      {/* Main Content */}
      <main className={`flex-1 flex flex-col ${!user && activeTab === 'search' ? 'justify-center' : ''} pb-16`}>
        <div className="mx-auto w-full max-w-6xl px-4">
          <AnimatePresence mode="wait">
            {activeTab === 'search' ? (
              <motion.div
                key="search-tab"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <AnimatePresence>
                  {!user && repos.length === 0 && !loading && (
                    <SearchSection
                      searchValue={username}
                      onSearchChange={setUsername}
                      onSearch={handleSearch}
                      loading={loading}
                      searchType={searchType}
                      onSearchTypeChange={setSearchType}
                      hasError={!!error}
                    />
                  )}
                </AnimatePresence>

                <div className={`w-full ${!user && repos.length === 0 && !loading ? 'mt-4' : 'mt-8'}`}>
                  <AnimatePresence mode="wait">
                    {loading && (
                      <div className="flex justify-center">
                        <LoadingSkeleton />
                      </div>
                    )}

                    {error && (
                      <div className="flex justify-center">
                        <ErrorMessage message={error} />
                      </div>
                    )}

                    {user && !loading && (
                      <div className="flex justify-center">
                        <UserCard
                          user={user}
                          index={0}
                          onToggleFavorite={toggleFavorite}
                          isFavorite={favorites.some(fav => fav.id === user.id)}
                        />
                      </div>
                    )}

                    {repos.length > 0 && !loading && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                        {repos.map((repo, index) => (
                          <RepoCard
                            key={repo.id}
                            repo={repo}
                            index={index}
                          />
                        ))}
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="favorites-tab"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {favorites.length > 0 ? (
                  <div className="mx-auto w-full max-w-6xl">
                    <h3 className="text-2xl font-semibold text-white mb-8 text-center font-poppins">
                      Your Favorite Explorers
                    </h3>
                    <div className="responsive-grid">
                      {favorites.map((favUser, index) => (
                        <UserCard
                          key={favUser.id}
                          user={favUser}
                          index={index}
                          onToggleFavorite={toggleFavorite}
                          isFavorite={true}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                    <p className="text-gray-400 text-lg">No favorite users found yet.</p>
                    <button
                      onClick={() => setActiveTab('search')}
                      className="mt-4 text-cyan-400 hover:text-cyan-300 font-medium"
                    >
                      Go search for some!
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Fixed New Search Button */}
      <AnimatePresence>
        {(user || repos.length > 0) && !loading && activeTab === 'search' && (
          <motion.div
            initial={{ y: 100, x: '-50%', opacity: 0 }}
            animate={{ y: 0, x: '-50%', opacity: 1 }}
            exit={{ y: 100, x: '-50%', opacity: 0 }}
            className="fixed bottom-8 left-1/2 z-50 group"
          >
            {/* Ambient Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
            
            <motion.button
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95, y: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              onClick={() => { setUser(null); setRepos([]); setError(''); setUsername(''); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="relative px-6 sm:px-8 py-3 sm:py-4 bg-black/50 backdrop-blur-xl border border-white/10 hover:border-white/30 rounded-xl sm:rounded-2xl text-white font-bold shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 flex items-center justify-center overflow-hidden"
            >
              {/* Internal Gradient Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Top/Bottom Accents */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-500 ease-out" />
              
              <span className="relative z-10 tracking-wide text-sm sm:text-[15px]">New Search</span>
              
              {/* Glossy Reflection */}
              <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] group-hover:left-[150%] transition-all duration-1000 ease-in-out" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;
