import { motion } from 'framer-motion';
import { ExternalLink, MapPin, Users, GitFork, Star, Heart } from 'lucide-react';

export default function UserCard({ user, index, onToggleFavorite, isFavorite = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.4, delay: index * 0.1 }}
      whileHover={{
        y: -10,
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      className="glass-card floating user-card group"
    >
      {/* Favorite Button */}
      {onToggleFavorite && (
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(user);
          }}
          className="favorite-button"
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-300 ${isFavorite
              ? 'text-red-300 fill-red-300 drop-shadow-[0_0_8px_rgba(252,165,165,0.8)]'
              : 'text-white/30 group-hover:text-white/50'
              }`}
          />
        </motion.button>
      )}

      <div className="text-center">
        {/* Avatar */}
        <motion.div
          className="relative mx-auto mb-4"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={user.avatar_url}
            alt={user.login}
            className="avatar"
          />
          <div className="avatar-glow" />
        </motion.div>

        {/* Name and Username */}
        <h3 className="user-title">
          {user.name || user.login}
        </h3>
        <p className="user-subtitle">@{user.login}</p>

        {/* Bio */}
        {user.bio && (
          <p className="user-bio">
            {user.bio}
          </p>
        )}

        {/* Location */}
        {user.location && (
          <div className="user-location">
            <MapPin className="icon" />
            {user.location}
          </div>
        )}

        {/* Stats */}
        <div className="stats-grid">
          <div className="text-center">
            <div className="icon-row">
              <Users className="icon" />
            </div>
            <p className="stat-value">{user.followers}</p>
            <p className="stat-label">Followers</p>
          </div>
          <div className="text-center">
            <div className="icon-row">
              <Users className="icon" />
            </div>
            <p className="stat-value">{user.following}</p>
            <p className="stat-label">Following</p>
          </div>
          <div className="text-center">
            <div className="icon-row">
              <GitFork className="icon" />
            </div>
            <p className="stat-value">{user.public_repos}</p>
            <p className="stat-label">Repos</p>
          </div>
        </div>

        {/* View Profile Button */}
        <motion.a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="profile-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="profile-button-text">View Profile</span>
          <ExternalLink className="icon" />
        </motion.a>
      </div>
    </motion.div>
  );
}