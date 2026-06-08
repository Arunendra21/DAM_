import { Metadata } from 'next'
import { Navbar } from '@/components/navigation/Navbar'
import { Footer } from '@/components/sections/Footer'
import { features } from '@/data/features'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Features - Lopam DAM Enterprise Database Security',
  description:
    'Explore all features of Lopam DAM: real-time monitoring, threat detection, compliance automation, access control, and more.',
  keywords: [
    'database features',
    'security features',
    'monitoring',
    'threat detection',
    'compliance',
  ],
  openGraph: {
    title: 'Features - Lopam DAM',
    description: 'Enterprise database security features',
    url: 'https://lopam-ai.com/features',
  },
}

export default function FeaturesPage() {
  const featureList = features.slice(0, 8)

  return (
    <>
      <Navbar />
      <main className="pt-16 bg-white dark:bg-slate-950">
        {/* Header Section */}
        <section className="section-container bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10">
          <div className="max-w-7xl mx-auto">
            <div className="section-header">
              <h1 className="section-title text-4xl md:text-5xl">
                Comprehensive Database Security Features
              </h1>
              <p className="section-subtitle text-lg">
                Enterprise-grade features designed to protect your databases, detect threats, and ensure compliance
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="section-container">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featureList.map((feature) => (
                <Link key={feature.id} href={`/features/${feature.id}`}>
                  <div className="group relative h-full p-8 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 dark:hover:border-primary/30 bg-white dark:bg-slate-900 hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-slate-700 dark:text-gray-200 font-medium text-sm leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-primary font-bold text-sm group-hover:translate-x-1 transition-transform duration-300">
                      Learn More <span className="text-lg">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="section-container bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">
              Why These Features Matter
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Real-time Protection',
                  description:
                    'Monitor every query, login, and change in real-time. Detect threats before they impact your data.',
                },
                {
                  title: 'Compliance Automation',
                  description:
                    'Automatically generate compliance reports for PCI-DSS, HIPAA, GDPR, SOX, FedRAMP, and FISMA.',
                },
                {
                  title: 'Insider Threat Detection',
                  description:
                    'AI-powered behavioral analytics identify suspicious activities and potential insider threats.',
                },
                {
                  title: 'Forensic Investigation',
                  description:
                    'Full session recording and replay for forensic investigation and incident response.',
                },
                {
                  title: 'Zero Trust Access',
                  description:
                    'Implement zero-trust principles with privileged access management and continuous verification.',
                },
                {
                  title: 'SIEM Integration',
                  description:
                    'Integrate with Splunk, ELK, QRadar, and 10+ SIEM platforms for centralized security.',
                },
              ].map((item, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-700 dark:text-gray-200 font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
              Ready to Secure Your Databases?
            </h2>
            <p className="text-slate-700 dark:text-gray-200 font-medium mb-8 text-lg">
              Experience enterprise-grade database security with Lopam DAM. Start your free trial or schedule a demo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-300">
                Start Free Trial
              </button>
              <button className="px-8 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors duration-300">
                Request Demo
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
