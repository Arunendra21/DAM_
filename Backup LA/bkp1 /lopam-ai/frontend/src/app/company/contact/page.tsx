import { Metadata } from 'next'
import { Navbar } from '@/components/navigation/Navbar'
import { Footer } from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'Contact Lopam AI - Sales, Support & Partnerships',
  description:
    'Get in touch with our team. Contact sales, request a demo, or inquire about partnerships.',
  keywords: ['contact', 'sales', 'support', 'partnerships'],
  openGraph: {
    title: 'Contact Lopam AI',
    description: 'Get in touch with our team',
    url: 'https://lopam-ai.com/company/contact',
  },
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 bg-white dark:bg-slate-950">
        {/* Hero Section */}
        <section className="section-container bg-gradient-to-b from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-slate-700 dark:text-gray-200 font-medium leading-relaxed">
              Have questions about Lopam AI? Our team is ready to help. Contact us for sales inquiries, technical support, or partnership opportunities.
            </p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="section-container">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: '📧',
                title: 'Email',
                description: 'Get in touch via email',
                contact: 'hello@lopam-ai.com',
              },
              {
                icon: '📞',
                title: 'Phone',
                description: 'Call our sales team',
                contact: '+1 (555) 123-4567',
              },
              {
                icon: '📍',
                title: 'Address',
                description: 'Visit our offices',
                contact: '123 Security Lane, San Francisco, CA 94105',
              },
            ].map((method, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 text-center"
              >
                <div className="text-5xl mb-4">{method.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {method.title}
                </h3>
                <p className="text-slate-700 dark:text-gray-200 font-medium mb-4">
                  {method.description}
                </p>
                <p className="text-lg font-bold text-primary">{method.contact}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="section-container bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
              Send us a Message
            </h2>

            <form className="space-y-6 p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium placeholder-slate-500 dark:placeholder-gray-400 focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@company.com"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium placeholder-slate-500 dark:placeholder-gray-400 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    placeholder="Acme Corp"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium placeholder-slate-500 dark:placeholder-gray-400 focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium placeholder-slate-500 dark:placeholder-gray-400 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                  Subject *
                </label>
                <select className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-primary">
                  <option>Sales Inquiry</option>
                  <option>Technical Support</option>
                  <option>Partnership</option>
                  <option>General Question</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                  Message *
                </label>
                <textarea
                  required
                  rows={6}
                  placeholder="Tell us how we can help..."
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium placeholder-slate-500 dark:placeholder-gray-400 focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" id="terms" className="w-5 h-5 rounded" />
                <label htmlFor="terms" className="text-sm text-slate-700 dark:text-gray-200 font-medium">
                  I agree to the privacy policy and terms of service
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>

        {/* Quick Links */}
        <section className="section-container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">
              Quick Links
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Request Demo',
                  description: 'See Lopam AI in action',
                  link: '/demo',
                },
                {
                  title: 'Pricing',
                  description: 'View our pricing plans',
                  link: '/pricing',
                },
                {
                  title: 'Documentation',
                  description: 'Read our guides and docs',
                  link: '/resources/documentation',
                },
                {
                  title: 'Careers',
                  description: 'Join our team',
                  link: '/company/careers',
                },
              ].map((quickLink, idx) => (
                <a
                  key={idx}
                  href={quickLink.link}
                  className="p-6 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {quickLink.title}
                  </h3>
                  <p className="text-slate-700 dark:text-gray-200 font-medium text-sm">
                    {quickLink.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Response Time */}
        <section className="section-container bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
              We're Here to Help
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: '⚡',
                  title: 'Fast Response',
                  description: 'We reply to inquiries within 2 hours',
                },
                {
                  icon: '🌍',
                  title: 'Global Support',
                  description: 'Available in multiple time zones',
                },
                {
                  icon: '👥',
                  title: 'Expert Team',
                  description: 'Security experts ready to help',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-700 dark:text-gray-200 font-medium">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
