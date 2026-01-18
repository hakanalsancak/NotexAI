import { auth } from '@/auth';
import { Settings, User, Key, Palette } from 'lucide-react';

export default async function SettingsPage() {
  const session = await auth();

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold mb-1">Settings</h1>
        <p className="text-midnight-400">Manage your account and preferences</p>
      </div>

      <div className="space-y-6">
        {/* Profile Section */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/30 to-amber-600/30 flex items-center justify-center">
              <User className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold">Profile</h2>
              <p className="text-sm text-midnight-400">Your account information</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-midnight-300 mb-1">Name</label>
              <div className="input-field bg-midnight-800/30 cursor-not-allowed">
                {session?.user?.name || 'Not set'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-midnight-300 mb-1">Email</label>
              <div className="input-field bg-midnight-800/30 cursor-not-allowed">
                {session?.user?.email}
              </div>
            </div>
          </div>
        </div>

        {/* API Keys Section */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/30 to-purple-600/30 flex items-center justify-center">
              <Key className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold">AI Integration</h2>
              <p className="text-sm text-midnight-400">Configure your OpenAI API key</p>
            </div>
          </div>

          <p className="text-midnight-300 text-sm mb-4">
            To use AI enhancement features, add your OpenAI API key to the environment variables.
            Set <code className="px-2 py-1 bg-midnight-800 rounded text-amber-400">OPENAI_API_KEY</code> in your <code className="px-2 py-1 bg-midnight-800 rounded text-amber-400">.env.local</code> file.
          </p>

          <a
            href="https://platform.openai.com/api-keys"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
          >
            Get an API key from OpenAI →
          </a>
        </div>

        {/* Appearance Section */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/30 to-pink-600/30 flex items-center justify-center">
              <Palette className="w-5 h-5 text-pink-400" />
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold">Appearance</h2>
              <p className="text-sm text-midnight-400">Customize how NotexAI looks</p>
            </div>
          </div>

          <p className="text-midnight-300 text-sm">
            Theme customization coming soon! Currently using the beautiful midnight theme.
          </p>
        </div>
      </div>
    </div>
  );
}
