import { Metadata } from 'next'
import { Navbar } from '@/components/navigation/Navbar'
import { Footer } from '@/components/sections/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Careers at Lopam AI - Join Our Team',
  description:
    'Build the future of database security. View open positions at Lopam AI and apply to join our team.',
  keywords: ['careers', 'jobs', 'hiring', 'team'],
  openGraph: {
    title: 'Careers - Lopam AI',
    description: 'Join our team',
    url: 'https://lopam-ai.com/company/careers',
  },
}

export default function CareersPage() {
  const openPositions = [
    {
      id: 1,
      title: 'Senior Backend Engineer - Go',
      department: 'Engineering',
      location: 'San Francisco, CA',
      type: 'Full-time',
      description:
        'Build scalable backend systems for real-time database monitoring. Experience with Go, PostgreSQL, and distributed systems required.',
    },
    {
      id: 2,
      title: 'Frontend Engineer - React/Next.js',
      department: 'Engineering',
      location: 'San Francisco, CA',
      type: 'Full-time',
      description:
        'Create beautiful, responsive interfaces for our enterprise platform. Strong React and TypeScript skills required.',
    },
    {
      id: 3,
      title: 'Machine Learning Engineer',
      department: 'AI/ML',
      location: 'Remote',
      type: 'Full-time',
      description:
        'Develop ML models for threat detection. Experience with Python, TensorFlow, and security datasets preferred.',
    },
    {
      id: 4,
      title: 'Security Researcher',
      department: 'Security',
      location: 'San Francisco, CA',
      type: 'Full-time',
      description:
        'Research emerging database threats and vulnerabilities. Work with our R&D team to develop new detection mechanisms.',
    },
    {
      id: 5,
      title: 'Sales Engineer',
      department: 'Sales',
      location: 'San Francisco, CA',
      type: 'Full-time',
      description:
        'Help enterprise customers implement Lopam AI. Technical background and communication skills essential.',
    },
    {
      id: 6,
      title: 'DevOps Engineer',
      department: 'Infrastructure',
      location: 'Remote',
      type: 'Full-time',
      description:
        'Scale our infrastructure for thousands of databases. Kubernetes, AWS, and monitoring tools expertise required.',
    },
  ]

  return (
    <>
      <Navbar />
      <main className="pt-16 bg-white dark:bg-slate-950">
        {/* Hero Section */}
        <section className="section-container bg-gradient-to-b from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Join Our Team
            </h1>
            <p className="text-xl text-slate-700 dark:text-gray-200 font-medium leading-relaxed">
              Help us build the future of database security. We&apos;re hiring talented engineers, security researchers, and product professionals.
            </p>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="section-container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">
              Why Join Lopam AI?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: '🎯',
                  title: 'Impact',
                  description:
                    'Your work protects sensitive data for Fortune 500 companies across every industry.',
                },
                {
                  icon: '💡',
                  title: 'Innovation',
                  description:
                    'Work with cutting-edge AI/ML, security research, and distributed systems.',
                },
                {
                  icon: '🤝',
                  title: 'Great Team',
                  description:
                    'Collaborate with security experts and passionate engineers from top companies.',
                },
                {
                  icon: '🏢',
                  title: 'Growth',
                  description:
                    'Early-stage company with significant growth opportunities and learning.',
                },
                {
                  icon: '💰',
                  title: 'Competitive Pay',
                  description:
                    'Competitive salary, equity, and comprehensive benefits package.',
                },
                {
                  icon: '🌍',
                  title: 'Remote Options',
                  description:
                    'Flexible work arrangements with some positions available fully remote.',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-700 dark:text-gray-200 font-medium text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="section-container bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 text-center">
              Open Positions
            </h2>
            <p className="text-center text-slate-700 dark:text-gray-200 font-medium mb-12">
              {openPositions.length} positions available
            </p>

            <div className="space-y-4">
              {openPositions.map((position) => (
                <div
                  key={position.id}
                  className="group rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-primary/50 dark:hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors duration-300">
                        {position.title}
                      </h3>
                      <p className="text-slate-700 dark:text-gray-200 font-medium mb-4">
                        {position.description}
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <span className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-gray-400 font-semibold">
                          <span>🏢</span>
                          {position.department}
                        </span>
                        <span className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-gray-400 font-semibold">
                          <span>📍</span>
                          {position.location}
                        </span>
                        <span className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-gray-400 font-semibold">
                          <span>⏰</span>
                          {position.type}
                        </span>
                      </div>
                    </div>
                    <button className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-300 whitespace-nowrap">
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Culture */}
        <section className="section-container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">
              Our Culture
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-900/50">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Mission-Driven
                </h3>
                <p className="text-slate-700 dark:text-gray-200 font-medium leading-relaxed">
                  Everyone on our team is united by a shared mission: to secure enterprise databases and protect sensitive data globally. We&apos;re not just building a product, we&apos;re building a movement.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-900/50">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Continuous Learning
                </h3>
                <p className="text-slate-700 dark:text-gray-200 font-medium leading-relaxed">
                  Security evolves daily. We invest in continuous learning through training, conferences, research time, and mentorship from industry experts.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-900/50">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Work-Life Balance
                </h3>
                <p className="text-slate-700 dark:text-gray-200 font-medium leading-relaxed">
                  We believe great work comes from rested, happy people. Flexible hours, remote options, unlimited PTO, and mental health support are standard.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-900/50">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Diversity & Inclusion
                </h3>
                <p className="text-slate-700 dark:text-gray-200 font-medium leading-relaxed">
                  We actively build a diverse team and foster an inclusive culture where everyone feels welcomed and valued. We believe different perspectives make us stronger.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="section-container bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">
              Benefits & Perks
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                '💰 Competitive salary & equity',
                '🏥 Comprehensive health insurance',
                '📚 Learning & development budget',
                '🌍 Remote work options',
                '⏰ Unlimited PTO',
                '🍔 Free meals & snacks',
                '🏋️ Gym membership',
                '👶 Parental leave',
                '🚗 Commuter benefits',
              ].map((benefit, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center gap-4"
                >
                  <span className="text-2xl flex-shrink-0">
                    {benefit.split(' ')[0]}
                  </span>
                  <span className="text-slate-700 dark:text-gray-200 font-medium">
                    {benefit.split(' ').slice(1).join(' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
              Don&apos;t See a Perfect Fit?
            </h2>
            <p className="text-slate-700 dark:text-gray-200 font-medium mb-8 text-lg">
              We&apos;re always interested in exceptional people. Send us your resume and a note about why you&apos;d like to work on database security.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-300">
                Send Application
              </button>
              <Link href="/company/about">
                <button className="px-8 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors duration-300">
                  Learn About Us
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
