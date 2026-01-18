import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, FileText, Brain, Shield, ArrowRight, Zap, Globe } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center p-1.5">
              <Image
                src="/Logo.png"
                alt="NotexAI Logo"
                width={28}
                height={28}
              />
            </div>
            <span className="font-display text-2xl font-bold text-white">NotexAI</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-midnight-200 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-midnight-200 hover:text-white transition-colors">How It Works</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-midnight-200 hover:text-white transition-colors font-medium">
              Sign In
            </Link>
            <Link href="/register" className="btn-primary text-sm">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-8 animate-fade-in">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-midnight-100">AI-Powered Note Enhancement</span>
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight animate-slide-up">
              Transform Your
              <span className="text-gradient"> Thoughts </span>
              Into Brilliance
            </h1>
            
            <p className="text-xl text-midnight-200 mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
              NotexAI combines elegant note-taking with powerful AI to help you capture, 
              organize, and enhance your ideas like never before.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link href="/register" className="btn-primary flex items-center gap-2 text-lg">
                Start Writing Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="#features" className="btn-secondary flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Explore Features
              </Link>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 to-transparent z-10 pointer-events-none" />
            <div className="glass-card rounded-2xl p-8 max-w-5xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-coral-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-1 space-y-3">
                  <div className="glass-light rounded-lg p-3">
                    <div className="text-sm text-amber-400 mb-1">📁 Projects</div>
                    <div className="text-xs text-midnight-300">5 notes</div>
                  </div>
                  <div className="glass rounded-lg p-3">
                    <div className="text-sm text-white mb-1">📝 Meeting Notes</div>
                    <div className="text-xs text-midnight-300">12 notes</div>
                  </div>
                  <div className="glass rounded-lg p-3">
                    <div className="text-sm text-white mb-1">💡 Ideas</div>
                    <div className="text-xs text-midnight-300">8 notes</div>
                  </div>
                </div>
                <div className="md:col-span-2 glass rounded-lg p-6">
                  <h3 className="font-display text-xl font-semibold mb-4">Product Strategy Q1</h3>
                  <div className="space-y-2 text-midnight-200 text-sm">
                    <p>Key objectives for the quarter include...</p>
                    <p className="text-midnight-400">• Market expansion into APAC region</p>
                    <p className="text-midnight-400">• Launch v2.0 with AI features</p>
                    <p className="text-midnight-400">• Achieve 50% user growth</p>
                  </div>
                  <div className="mt-6 flex items-center gap-2">
                    <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-midnight-950 text-sm font-medium flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Enhance with AI
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Everything You Need to
              <span className="text-gradient"> Think Better</span>
            </h2>
            <p className="text-xl text-midnight-200 max-w-2xl mx-auto">
              Powerful features designed to elevate your note-taking experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: 'AI Enhancement',
                description: 'Transform rough notes into polished, well-structured content with one click',
                color: 'from-amber-400 to-amber-600',
              },
              {
                icon: FileText,
                title: 'Rich Editor',
                description: 'Beautiful formatting with support for headers, lists, code blocks, and more',
                color: 'from-blue-400 to-blue-600',
              },
              {
                icon: Shield,
                title: 'Secure Storage',
                description: 'Your notes are encrypted and safely stored in our secure PostgreSQL database',
                color: 'from-green-400 to-green-600',
              },
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Instant sync and search across all your notes, powered by modern infrastructure',
                color: 'from-purple-400 to-purple-600',
              },
              {
                icon: Globe,
                title: 'Access Anywhere',
                description: 'Your notes are always available from any device with an internet connection',
                color: 'from-pink-400 to-pink-600',
              },
              {
                icon: Sparkles,
                title: 'Smart Organization',
                description: 'Folders, tags, and AI-powered suggestions keep everything organized',
                color: 'from-coral-400 to-coral-600',
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="glass-card rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-midnight-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Simple as
              <span className="text-gradient"> 1, 2, 3</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Capture', description: 'Write your thoughts freely without worrying about structure' },
              { step: '02', title: 'Enhance', description: 'Let AI transform your notes into polished, organized content' },
              { step: '03', title: 'Organize', description: 'Store in folders, add tags, and find anything instantly' },
            ].map((item, index) => (
              <div key={item.step} className="text-center">
                <div className="text-6xl font-display font-bold text-gradient mb-4">{item.step}</div>
                <h3 className="text-2xl font-display font-semibold mb-2">{item.title}</h3>
                <p className="text-midnight-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card rounded-3xl p-12 glow-amber">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Ready to Transform Your Notes?
            </h2>
            <p className="text-xl text-midnight-200 mb-8">
              Join thousands of thinkers who use NotexAI to capture and enhance their ideas.
            </p>
            <Link href="/register" className="btn-primary inline-flex items-center gap-2 text-lg">
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-midnight-700">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center p-1">
              <Image
                src="/Logo.png"
                alt="NotexAI Logo"
                width={22}
                height={22}
              />
            </div>
            <span className="font-display text-lg font-bold text-white">NotexAI</span>
          </div>
          <p className="text-midnight-400 text-sm">
            © 2026 NotexAI. Crafted with care for thinkers everywhere.
          </p>
        </div>
      </footer>
    </main>
  );
}
