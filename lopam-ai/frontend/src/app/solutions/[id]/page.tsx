import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navigation/Navbar'
import { Footer } from '@/components/sections/Footer'
import { solutions } from '@/data/solutions'
import Link from 'next/link'

export async function generateStaticParams() {
  return solutions.map((solution) => ({
    id: solution.id,
  }))
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const solution = solutions.find((s) => s.id === params.id)

  if (!solution) {
    return { title: 'Solution Not Found' }
  }

  return {
    title: `${solution.name} Solution - Lopam AI`,
    description: solution.description,
    openGraph: {
      title: `${solution.name} - Lopam AI`,
      description: solution.description,
      url: `https://lopam-ai.com/solutions/${params.id}`,
    },
  }
}

export default function SolutionDetailPage({ params }: { params: { id: string } }) {
  const solution = solutions.find((s) => s.id === params.id)

  if (!solution) {
    notFound()
  }

  const relatedSolutions = solutions.filter((s) => s.id !== params.id).slice(0, 2)

  return (
    <>
      <Navbar />
      <main className="pt-16 bg-white dark:bg-slate-950">
        {/* Hero Section */}
        <section className="section-container bg-gradient-to-b from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10">
          <div className="max-w-4xl mx-auto">
            <Link href="/solutions">
              <p className="text-primary font-semibold hover:underline mb-6">← Back to Solutions</p>
            </Link>

            <div className="text-7xl mb-6">{solution.icon}</div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              {solution.name}
            </h1>
            <p className="text-xl text-slate-700 dark:text-gray-200 font-medium leading-relaxed">
              {solution.description}
            </p>
          </div>
        </section>

        {/* Challenges Section */}
        <section className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
              Key Challenges
            </h2>

            <div className="space-y-4">
              {solution.challenges.map((challenge, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border border-red-200 dark:border-red-900/50"
                >
                  <p className="text-slate-900 dark:text-white font-bold text-lg">{challenge}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance Requirements */}
        <section className="section-container bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
              Compliance Requirements
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {solution.complianceRequirements.map((req, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-white dark:bg-slate-900 border-2 border-primary/30 dark:border-primary/20"
                >
                  <p className="font-bold text-slate-900 dark:text-white text-lg text-center">
                    {req}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recommended Features */}
        <section className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
              Recommended Features
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {solution.recommendedFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 border border-primary/20 dark:border-primary/10"
                >
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {feature}
                  </h4>
                  <p className="text-sm text-slate-700 dark:text-gray-200 font-medium">
                    Essential for {solution.name} security and compliance
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Metrics */}
        <section className="section-container bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
              Expected Success Metrics
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {solution.successMetrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-center"
                >
                  <p className="text-3xl font-bold text-primary mb-2">{metric.improvement}</p>
                  <p className="font-bold text-slate-900 dark:text-white text-sm">
                    {metric.metric}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Study Section */}

        {/* Related Solutions */}
        {relatedSolutions.length > 0 && (
          <section className="section-container bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
                Other Solutions
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedSolutions.map((relatedSolution) => (
                  <Link key={relatedSolution.id} href={`/solutions/${relatedSolution.id}`}>
                    <div className="group h-full rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-primary/50 dark:hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-4xl">{relatedSolution.icon}</div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors duration-300">
                          {relatedSolution.name}
                        </h3>
                      </div>
                      <p className="text-slate-700 dark:text-gray-200 text-sm font-medium">
                        {relatedSolution.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Implementation CTA */}
        <section className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
              Ready to Implement {solution.name} Database Security?
            </h2>
            <p className="text-slate-700 dark:text-gray-200 font-medium mb-8 text-lg">
              Our solution experts can help you design and deploy a tailored security platform for your specific industry needs.
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
