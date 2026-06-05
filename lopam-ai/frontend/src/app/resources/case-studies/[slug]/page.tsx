import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navigation/Navbar'
import { Footer } from '@/components/sections/Footer'
import { caseStudies } from '@/data/case-studies'
import Link from 'next/link'

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({
    slug: cs.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const caseStudy = caseStudies.find((cs) => cs.slug === params.slug)

  if (!caseStudy) {
    return { title: 'Case Study Not Found' }
  }

  return {
    title: `${caseStudy.title} - Lopam AI Case Study`,
    description: caseStudy.title,
    openGraph: {
      title: `${caseStudy.title} - Lopam AI`,
      description: caseStudy.title,
      url: `https://lopam-ai.com/resources/case-studies/${params.slug}`,
      type: 'article',
    },
  }
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const caseStudy = caseStudies.find((cs) => cs.slug === params.slug)

  if (!caseStudy) {
    notFound()
  }

  const relatedCaseStudies = caseStudies
    .filter((cs) => cs.industry === caseStudy.industry && cs.id !== caseStudy.id)
    .slice(0, 2)

  return (
    <>
      <Navbar />
      <main className="pt-16 bg-white dark:bg-slate-950">
        {/* Header Section */}
        <section className="section-container bg-gradient-to-b from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10">
          <div className="max-w-4xl mx-auto">
            <Link href="/resources/case-studies">
              <p className="text-primary font-semibold hover:underline mb-6">← Back to Case Studies</p>
            </Link>

            <span className="inline-block px-4 py-2 mb-6 text-sm font-bold text-white bg-primary rounded-full">
              {caseStudy.industry}
            </span>

            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              {caseStudy.title}
            </h1>

            <p className="text-xl text-slate-700 dark:text-gray-200 font-medium leading-relaxed">
              {caseStudy.title}
            </p>
          </div>
        </section>

        {/* Challenge Section */}
        <section className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">The Challenge</h2>

            <div className="p-8 rounded-xl bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border border-red-200 dark:border-red-900/50">
              <p className="text-slate-700 dark:text-gray-200 font-medium text-lg leading-relaxed">
                {caseStudy.challenge}
              </p>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="section-container bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">The Solution</h2>

            <div className="p-8 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-900/50">
              <p className="text-slate-700 dark:text-gray-200 font-medium text-lg leading-relaxed">
                {caseStudy.solution}
              </p>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
              Implementation Approach
            </h3>

            <div className="space-y-4">
              {[
                'Real-time database activity monitoring',
                'AI-powered threat detection',
                'Automated compliance reporting',
                'Access control policies',
                'Incident response workflows',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <span className="text-primary font-bold text-lg">✓</span>
                  <span className="text-slate-700 dark:text-gray-200 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Results</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {caseStudy.results
                .split(', ')
                .map((result, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-900/50"
                  >
                    <p className="text-slate-700 dark:text-gray-200 font-bold text-lg text-center">
                      {result}
                    </p>
                  </div>
                ))}
            </div>

            <div className="p-8 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Business Impact
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-slate-700 dark:text-gray-200 font-medium">
                  <span className="text-primary font-bold mt-1">✓</span>
                  Achieved full compliance with regulatory requirements
                </li>
                <li className="flex items-start gap-3 text-slate-700 dark:text-gray-200 font-medium">
                  <span className="text-primary font-bold mt-1">✓</span>
                  Reduced security incidents and investigation time
                </li>
                <li className="flex items-start gap-3 text-slate-700 dark:text-gray-200 font-medium">
                  <span className="text-primary font-bold mt-1">✓</span>
                  Improved operational efficiency
                </li>
                <li className="flex items-start gap-3 text-slate-700 dark:text-gray-200 font-medium">
                  <span className="text-primary font-bold mt-1">✓</span>
                  Enhanced visibility into database activities
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="section-container bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
              Key Performance Indicators
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { metric: '100%', label: 'Compliance Achieved' },
                { metric: '99.9%', label: 'Uptime Maintained' },
                { metric: '50%', label: 'Cost Reduction' },
                { metric: '24/7', label: 'Monitoring Coverage' },
              ].map((kpi, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-center"
                >
                  <p className="text-3xl font-bold text-primary mb-2">{kpi.metric}</p>
                  <p className="text-slate-700 dark:text-gray-200 font-semibold text-sm">
                    {kpi.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Case Studies */}
        {relatedCaseStudies.length > 0 && (
          <section className="section-container">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
                Related Case Studies
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedCaseStudies.map((relatedCS) => (
                  <Link key={relatedCS.id} href={`/resources/case-studies/${relatedCS.slug}`}>
                    <div className="group h-full rounded-xl border border-slate-200 dark:border-slate-700 p-6 bg-white dark:bg-slate-900 hover:border-primary/50 dark:hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col">
                      <span className="text-xs font-bold text-white bg-primary rounded-full px-3 py-1 w-fit mb-4">
                        {relatedCS.industry}
                      </span>

                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors duration-300 flex-1">
                        {relatedCS.title}
                      </h3>

                      <p className="text-primary font-bold text-sm">Read Study →</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="section-container bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
              Ready to Achieve Similar Results?
            </h2>
            <p className="text-slate-700 dark:text-gray-200 font-medium mb-8 text-lg">
              Let&apos;s discuss how Lopam AI can transform your database security and compliance posture.
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
