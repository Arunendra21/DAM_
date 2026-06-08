import { Metadata } from 'next'
import { Navbar } from '@/components/navigation/Navbar'
import { Footer } from '@/components/sections/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Custom Cursor Demo - Lopam DAM',
  description: 'Experience the premium cybersecurity-themed custom cursor.',
  robots: 'noindex, nofollow',
}

export default function CursorDemoPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 bg-white dark:bg-slate-950">
        {/* Hero Section */}
        <section className="section-container bg-gradient-to-b from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Custom Cursor Experience
            </h1>
            <p className="text-xl text-slate-700 dark:text-gray-200 font-medium leading-relaxed">
              Move your cursor around to experience the premium cybersecurity-themed cursor design. Hover over interactive elements to see dynamic effects.
            </p>
          </div>
        </section>

        {/* Cursor Showcase Section */}
        <section className="section-container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">
              Try the Cursor
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Button Examples */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                  Buttons
                </h3>
                <div className="space-y-3">
                  <button className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-300">
                    Primary Button
                  </button>
                  <button className="w-full px-6 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors duration-300">
                    Secondary Button
                  </button>
                  <button className="w-full px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-semibold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors duration-300">
                    Neutral Button
                  </button>
                </div>
              </div>

              {/* Link Examples */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                  Links
                </h3>
                <div className="space-y-3 flex flex-col">
                  <Link href="/" className="text-primary hover:underline font-semibold">
                    Home Link
                  </Link>
                  <Link href="/features" className="text-primary hover:underline font-semibold">
                    Features Link
                  </Link>
                  <a href="#" className="text-primary hover:underline font-semibold">
                    Anchor Link
                  </a>
                </div>
              </div>

              {/* Input Examples */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                  Form Elements
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Text input"
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                  <select className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
                    <option>Select option</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                  </select>
                </div>
              </div>

              {/* Card Examples */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 border border-primary/20 dark:border-primary/10 cursor-pointer hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                  Interactive Card 1
                </h3>
                <p className="text-slate-700 dark:text-gray-200 font-medium">
                  Hover over this card to see the cursor expand and brighten. Click to trigger a pulse animation.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-br from-secondary/10 to-primary/10 dark:from-secondary/20 dark:to-primary/20 border border-secondary/20 dark:border-secondary/10 cursor-pointer hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                  Interactive Card 2
                </h3>
                <p className="text-slate-700 dark:text-gray-200 font-medium">
                  Each interactive element has smooth hover effects with the cybersecurity-themed cursor.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-900 dark:to-slate-800 border border-slate-300 dark:border-slate-700 cursor-pointer hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                  Interactive Card 3
                </h3>
                <p className="text-slate-700 dark:text-gray-200 font-medium">
                  All interactive elements are automatically detected for cursor enhancement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Section */}
        <section className="section-container bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
              Cursor Features
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: '⚡ Ultra-Smooth Motion',
                  description:
                    'Hardware-accelerated with requestAnimationFrame for 60+ FPS performance with zero perceived latency.',
                },
                {
                  title: '🎯 Cybersecurity Design',
                  description:
                    'Inspired by enterprise security dashboards with neon glow and targeting reticle aesthetics.',
                },
                {
                  title: '🌈 Theme Support',
                  description:
                    'Automatically adapts to dark and light themes with appropriate color schemes and visibility.',
                },
                {
                  title: '🎬 Dynamic Animations',
                  description:
                    'Rotating radar rings, hover expansion effects, and click pulse animations for premium feel.',
                },
                {
                  title: '📱 Accessibility',
                  description:
                    'Automatically disables on touch devices and respects prefers-reduced-motion preferences.',
                },
                {
                  title: '🚀 Performance First',
                  description:
                    'GPU-accelerated transforms, no expensive DOM updates, and optimized event handling.',
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                >
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-700 dark:text-gray-200 font-medium text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Instructions Section */}
        <section className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 border border-primary/20 dark:border-primary/10">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                How to Experience the Cursor
              </h2>

              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="text-2xl font-bold text-primary flex-shrink-0">1</span>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">
                      Move Your Cursor
                    </p>
                    <p className="text-slate-700 dark:text-gray-200 font-medium">
                      Watch the neon-glowing targeting reticle follow your mouse with smooth, hardware-accelerated motion.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-2xl font-bold text-primary flex-shrink-0">2</span>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">
                      Hover Over Interactive Elements
                    </p>
                    <p className="text-slate-700 dark:text-gray-200 font-medium">
                      The cursor expands and brightens when hovering over buttons, links, cards, and form inputs.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-2xl font-bold text-primary flex-shrink-0">3</span>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">
                      Click to Trigger Effects
                    </p>
                    <p className="text-slate-700 dark:text-gray-200 font-medium">
                      Click anywhere to see the concentric ring pulse animation that simulates a security scan.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-2xl font-bold text-primary flex-shrink-0">4</span>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">
                      Notice the Followers
                    </p>
                    <p className="text-slate-700 dark:text-gray-200 font-medium">
                      The larger outer ring follows your cursor with smooth easing, creating a radar-like effect.
                    </p>
                  </div>
                </li>
              </ol>

              <div className="mt-8 p-6 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-700 dark:text-gray-300 font-medium">
                  💡 <strong>Pro Tip:</strong> Toggle between dark and light themes (top-right corner) to see how
                  the cursor colors adapt for optimal visibility in each theme.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Back to Home */}
        <section className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-slate-700 dark:text-gray-200 font-medium mb-6">
              Ready to explore the full Lopam DAM platform?
            </p>
            <Link href="/">
              <button className="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-300">
                Return to Home
              </button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
