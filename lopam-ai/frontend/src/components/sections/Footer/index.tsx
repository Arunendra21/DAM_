'use client'

export function Footer() {
  return (
    <footer className="relative border-t border-slate-300 dark:border-surface-border py-12 backdrop-blur-lg bg-white/40 dark:bg-black/30">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/20 to-white/10 dark:from-black/20 dark:to-black/10 backdrop-blur-xl" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                <span className="text-white font-bold">L</span>
              </div>
              <span className="font-bold text-lg text-slate-900 dark:text-white">Lopam DAM</span>
            </div>
            <p className="text-slate-700 dark:text-gray-200 font-semibold leading-relaxed">Enterprise database security for the modern enterprise.</p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-4 text-lg">Product</h4>
            <ul className="space-y-2">
              {['Features', 'Security', 'Compliance'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors font-semibold">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company section — commented out
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-4 text-lg">Company</h4>
            <ul className="space-y-2">
              {['Careers'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors font-semibold">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          */}

          {/* Legal section — commented out
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-4 text-lg">Legal</h4>
            <ul className="space-y-2">
              {['Privacy', 'Terms', 'Cookie Policy', 'Disclaimer'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors font-semibold">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          */}
        </div>

        <div className="border-t border-slate-300 dark:border-white/20 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-700 dark:text-gray-200 font-bold">© 2026 Lopam DAM. All rights reserved.</p>
          <p className="text-sm text-slate-700 dark:text-gray-200 font-bold">Made with ❤️ by the security team</p>
        </div>
      </div>
    </footer>
  )
}
