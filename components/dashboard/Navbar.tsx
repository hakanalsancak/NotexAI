'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Bell, ChevronDown, LogOut, User as UserIcon } from 'lucide-react';
import { logoutUser } from '@/lib/auth-actions';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  async function handleLogout() {
    await logoutUser();
    toast.success('Signed out successfully');
    router.push('/login');
    router.refresh();
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/dashboard?search=${encodeURIComponent(searchQuery)}`);
    }
  }

  return (
    <header className="sticky top-0 z-30 glass border-b border-white/10">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-xl ml-12 lg:ml-0">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-midnight-400" />
            <input
              type="text"
              placeholder="Search your notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-midnight-800/50 border border-white/10 text-white placeholder-midnight-400 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all"
            />
          </div>
        </form>

        {/* Right Side */}
        <div className="flex items-center gap-4 ml-4">
          {/* Notifications */}
          <button className="p-2 rounded-lg hover:bg-white/10 transition-colors relative">
            <Bell className="w-5 h-5 text-midnight-200" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500" />
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-coral-500 flex items-center justify-center text-sm font-bold text-midnight-950">
                {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-white">{user.name || 'User'}</p>
                <p className="text-xs text-midnight-400">{user.email}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-midnight-400 hidden md:block" />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-56 rounded-xl glass-card py-2 z-50"
                  >
                    <div className="px-4 py-3 border-b border-white/10 md:hidden">
                      <p className="text-sm font-medium text-white">{user.name || 'User'}</p>
                      <p className="text-xs text-midnight-400">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left text-coral-400 hover:bg-white/5 transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      Sign Out
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
