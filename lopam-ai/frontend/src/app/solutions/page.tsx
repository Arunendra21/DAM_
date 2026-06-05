import { Metadata } from 'next'
import { Navbar } from '@/components/navigation/Navbar'
import { Footer } from '@/components/sections/Footer'
import { solutions } from '@/data/solutions'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Solutions - Lopam AI Industry-Specific Database Security',
  description:
    'Enterprise database security solutions for Banking, Healthcare, Government, Telecom, and SaaS industries. Compliance-focused platforms.',
  keywords: ['solutions', 'industry', 'compliance', 'database security'],
  openGraph: {
    title: 'Solutions - Lopam AI',
    description: 'Industry-specific database security solutions',
    url: 'https://lopam-ai.com/solutions',
  },
}

export default function SolutionsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 bg-white dark:bg-slate-950">
        {/* Header Section */}
        <section className="section-container bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Industry-Specific Solutions
            </h1>
            <p className="text-xl text-slate-700 dark:text-gray-200 font-medium leading-relaxed">
              Tailored database security platforms designed for your industry's unique compliance requirements and challenges.
            </p>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="section-container">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {solutions.map((solution) => (
                <Link key={solution.id} href={`/solutions/${solution.id}`}>
                  <div className="group h-full rounded-2xl border border-slate-200 dark:border-slate-700 p-8 bg-white dark:bg-slate-900 hover:border-primary/50 dark:hover:border-primary/30 hover:shadow-2xl transition-all duration-300 cursor-pointer">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-5xl">{solution.icon}</div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors duration-300">
                        {solution.name}
                      </h3>
                    </div>

                    <p className="text-slate-700 dark:text-gray-200 font-medium mb-8 leading-relaxed">
                      {solution.description}
                    </p>

                    {/* Compliance Requirements */}
                    <div className="mb-8">
                      <p className="text-sm font-bold text-slate-900 dark:text-white mb-4">
                        Compliance Requirements:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {solution.complianceRequirements.map((req, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 text-xs font-bold text-white bg-primary rounded-full"
                          >
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Challenges */}
                    <div className="mb-8">
                      <p className="text-sm font-bold text-slate-900 dark:text-white mb-4">
                        Key Challenges:
                      </p>
                      <ul className="space-y-2">
                        {solution.challenges.slice(0, 2).map((challenge, idx) => (
                          <li key={idx} className="text-sm text-slate-700 dark:text-gray-200 font-medium flex items-start gap-2">
                            <span className="text-primary font-bold">→</span>
                            {challenge}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p className="text-primary font-bold group-hover:translate-x-2 transition-transform duration-300">
                      Learn More →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Lopam */}
        <section className="section-container bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">
              Why Lopam AI for Your Industry?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Compliance-First Design',
                  description:
                    'Built from the ground up to meet industry-specific compliance requirements including PCI-DSS, HIPAA, GDPR, SOX, FedRAMP, and FISMA.',
                },
                {
                  title: 'Deep Industry Expertise',
                  description:
                    'Our team has decades of experience in banking, healthcare, government, telecom, and SaaS security best practices.',
                },
                {
                  title: 'Real-time Threat Detection',
                  description:
                    'AI-powered threat detection identifies industry-specific attack patterns and insider threats in real-time.',
                },
                {
                  title: 'Automated Reporting',
                  description:
                    'Generate industry-specific compliance reports automatically for audits, regulatory reviews, and internal governance.',
                },
                {
                  title: 'Seamless Integration',
                  description:
                    'Integrates with your existing security infrastructure including SIEM, identity management, and compliance tools.',
                },
                {
                  title: '24/7 Expert Support',
                  description:
                    'Industry-trained support specialists available around the clock to help with deployment, operations, and compliance.',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                >
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                    {item.title}
                  </h4>
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
              Ready to Secure Your Data?
            </h2>
            <p className="text-slate-700 dark:text-gray-200 font-medium mb-8 text-lg">
              Choose your industry above to explore a customized database security solution.
            </p>
            <button className="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-300">
              Request Industry Demo
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
