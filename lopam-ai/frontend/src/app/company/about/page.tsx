import { Metadata } from 'next'
import { Navbar } from '@/components/navigation/Navbar'
import { Footer } from '@/components/sections/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Lopam AI - Our Mission & Vision',
  description:
    'Learn about Lopam AI mission to secure enterprise databases globally. Meet our team of security experts.',
  keywords: ['about', 'team', 'mission', 'vision'],
  openGraph: {
    title: 'About Lopam AI',
    description: 'Our mission to secure enterprise databases',
    url: 'https://lopam-ai.com/company/about',
  },
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 bg-white dark:bg-slate-950">
        {/* Hero Section */}
        <section className="section-container bg-gradient-to-b from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Securing Enterprise Databases Globally
            </h1>
            <p className="text-xl text-slate-700 dark:text-gray-200 font-medium leading-relaxed">
              Lopam AI was founded to solve a critical problem: enterprises need real-time visibility and control over their most sensitive databases.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="section-container">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 border border-primary/20 dark:border-primary/10">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  Our Mission
                </h2>
                <p className="text-slate-700 dark:text-gray-200 font-medium text-lg leading-relaxed">
                  To empower enterprises with the tools and intelligence they need to protect their databases from threats, ensure compliance, and maintain complete visibility into database activities.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-gradient-to-br from-secondary/10 to-primary/10 dark:from-secondary/20 dark:to-primary/20 border border-secondary/20 dark:border-secondary/10">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  Our Vision
                </h2>
                <p className="text-slate-700 dark:text-gray-200 font-medium text-lg leading-relaxed">
                  A world where every database is secure, every threat is detected, and every enterprise can prove compliance. Zero database breaches. Zero compromise.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why We Started */}
        <section className="section-container bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
              Why We Started Lopam AI
            </h2>

            <div className="space-y-6">
              {[
                {
                  title: 'The Problem',
                  description:
                    'Enterprise databases are the crown jewels of sensitive data - customer information, financial records, health data. Yet most organizations lack real-time visibility into who accesses them and what they do.',
                },
                {
                  title: 'The Opportunity',
                  description:
                    'As regulations became stricter (PCI-DSS, HIPAA, GDPR) and breach costs increased, enterprises desperately needed a modern solution. We saw an opportunity to build the database security platform we wish existed.',
                },
                {
                  title: 'Our Approach',
                  description:
                    'We combined AI/ML threat detection with compliance automation and user behavior analytics. The result: a platform that catches threats before they cause damage and proves compliance automatically.',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                >
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-700 dark:text-gray-200 font-medium text-lg leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="section-container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">
              Our Core Values
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: '🛡️',
                  title: 'Security First',
                  description: 'Security is not a feature. It is our foundation.',
                },
                {
                  icon: '🤝',
                  title: 'Customer Trust',
                  description: 'Your success is our success. We obsess over outcomes.',
                },
                {
                  icon: '🔬',
                  title: 'Innovation',
                  description: 'We stay at the forefront of threat detection technology.',
                },
                {
                  icon: '📈',
                  title: 'Excellence',
                  description: 'We pursue perfection in every detail of our platform.',
                },
              ].map((value, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 text-center"
                >
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-slate-700 dark:text-gray-200 font-medium">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* By the Numbers */}
        <section className="section-container bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">
              By The Numbers
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { number: '500+', label: 'Enterprise Customers' },
                { number: '50K+', label: 'Databases Protected' },
                { number: '2.3M+', label: 'Daily Threats Detected' },
                { number: '15+', label: 'Compliance Frameworks' },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-5xl font-bold text-primary mb-2">{stat.number}</p>
                  <p className="text-slate-700 dark:text-gray-200 font-bold">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
              Join Us in Our Mission
            </h2>
            <p className="text-slate-700 dark:text-gray-200 font-medium mb-8 text-lg">
              Whether you're interested in using Lopam AI or joining our team, we'd love to talk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo">
                <button className="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-300">
                  Request Demo
                </button>
              </Link>
              <Link href="/company/careers">
                <button className="px-8 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors duration-300">
                  View Careers
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
