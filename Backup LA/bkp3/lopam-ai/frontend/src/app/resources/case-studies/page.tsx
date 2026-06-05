import { Metadata } from 'next'
import { Navbar } from '@/components/navigation/Navbar'
import { Footer } from '@/components/sections/Footer'
import { caseStudies, caseStudiesByIndustry } from '@/data/case-studies'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Case Studies - Lopam AI Customer Success Stories',
  description:
    'Read how enterprises across banking, healthcare, and government improved security and compliance with Lopam AI.',
  keywords: ['case studies', 'success stories', 'customer stories', 'database security'],
  openGraph: {
    title: 'Case Studies - Lopam AI',
    description: 'Enterprise customer success stories',
    url: 'https://lopam-ai.com/resources/case-studies',
  },
}

export default function CaseStudiesPage() {
  const industries = Object.keys(caseStudiesByIndustry)

  return (
    <>
      <Navbar />
      <main className="pt-16 bg-white dark:bg-slate-950">
        {/* Header Section */}
        <section className="section-container bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Customer Success Stories
            </h1>
            <p className="text-xl text-slate-700 dark:text-gray-200 font-medium leading-relaxed">
              See how enterprises across banking, healthcare, and government improved security and compliance with Lopam AI.
            </p>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="section-container">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {caseStudies.map((caseStudy) => (
                <Link key={caseStudy.id} href={`/resources/case-studies/${caseStudy.slug}`}>
                  <div className="group h-full rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-primary/50 dark:hover:border-primary/30 hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col">
                    {/* Header */}
                    <div className="p-8 pb-6">
                      <div className="mb-4">
                        <span className="inline-block px-4 py-2 text-sm font-bold text-white bg-primary rounded-full">
                          {caseStudy.industry}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors duration-300">
                        {caseStudy.title}
                      </h3>
                      <p className="text-slate-700 dark:text-gray-200 font-medium leading-relaxed">
                        {caseStudy.summary}
                      </p>
                    </div>

                    {/* Results */}
                    <div className="px-8 py-6 bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 border-t border-slate-200 dark:border-slate-700 flex-1">
                      <p className="text-sm font-bold text-slate-900 dark:text-white mb-3">
                        Key Results:
                      </p>
                      <ul className="space-y-2">
                        {caseStudy.results
                          .split(', ')
                          .slice(0, 3)
                          .map((result, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-slate-700 dark:text-gray-200 font-medium flex items-start gap-2"
                            >
                              <span className="text-primary font-bold mt-0.5">✓</span>
                              {result}
                            </li>
                          ))}
                      </ul>
                    </div>

                    {/* Footer */}
                    <div className="px-8 py-6 border-t border-slate-200 dark:border-slate-700">
                      <p className="text-primary font-bold group-hover:translate-x-2 transition-transform duration-300">
                        Read Full Case Study →
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Filter by Industry */}
        <section className="section-container bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
              Case Studies by Industry
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {industries.map((industry) => (
                <div
                  key={industry}
                  className="p-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {industry}
                  </h3>
                  <p className="text-slate-700 dark:text-gray-200 font-semibold mb-4">
                    {caseStudiesByIndustry[industry]?.length || 0} case studies
                  </p>
                  <button className="text-primary font-bold hover:underline text-sm">
                    View All →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="section-container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">
              Proven Results Across Industries
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  metric: '100%',
                  description: 'Compliance Achievement Rate',
                },
                {
                  metric: '99.9%',
                  description: 'Threat Detection Accuracy',
                },
                {
                  metric: '73%',
                  description: 'Average Cost Reduction',
                },
                {
                  metric: '4 hrs',
                  description: 'Average Response Time',
                },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 text-center"
                >
                  <p className="text-4xl font-bold text-primary mb-3">{stat.metric}</p>
                  <p className="text-slate-700 dark:text-gray-200 font-bold">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-container bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-slate-700 dark:text-gray-200 font-medium mb-8 text-lg">
              Join hundreds of enterprises protecting their databases with Lopam AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-300">
                Request Demo
              </button>
              <button className="px-8 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors duration-300">
                Contact Sales
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
