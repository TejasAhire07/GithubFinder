import { motion } from 'framer-motion';
import { ExternalLink, Star, GitFork, Book, Code2 } from 'lucide-react';

export default function RepoCard({ repo, index }) {
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
      className="glass-card repo-card group"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
              <Book className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
                {repo.name}
              </h3>
              <p className="text-sm text-gray-400 font-medium">by {repo.owner.login}</p>
            </div>
          </div>
        </div>

        <p className="text-gray-300 text-sm mb-6 line-clamp-2 h-10">
          {repo.description || 'No description provided.'}
        </p>

        <div className="flex items-center gap-4 mb-6">
          {repo.language && (
            <div className="badge">
              <Code2 className="w-3 h-3 text-cyan-400" />
              <span>{repo.language}</span>
            </div>
          )}
          <div className="badge">
            <Star className="w-3 h-3 text-yellow-400" />
            <span>{repo.stargazers_count.toLocaleString()}</span>
          </div>
          <div className="badge">
            <GitFork className="w-3 h-3 text-purple-400" />
            <span>{repo.forks_count.toLocaleString()}</span>
          </div>
        </div>

        <div className="mt-auto">
          <motion.a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="profile-button w-full justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="profile-button-text">View Repository</span>
            <ExternalLink className="icon" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}
