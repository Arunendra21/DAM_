import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navigation/Navbar'
import { Footer } from '@/components/sections/Footer'
import { features, featureDetails } from '@/data/features'
import Link from 'next/link'

export async function generateStaticParams() {
  return features.map((feature) => ({
    id: feature.id,
  }))
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const feature = features.find((f) => f.id === params.id)

  if (!feature) {
    return {
      title: 'Feature Not Found',
    }
  }

  return {
    title: `${feature.title} - Lopam AI`,
    description: feature.description,
    openGraph: {
      title: `${feature.title} - Lopam AI`,
      description: feature.description,
      url: `https://lopam-ai.com/features/${params.id}`,
    },
  }
}

export default function FeatureDetailPage({ params }: { params: { id: string } }) {
  const feature = features.find((f) => f.id === params.id)
  const details = featureDetails[params.id as keyof typeof featureDetails]

  if (!feature || !details) {
    notFound()
  }

  const relatedFeatures = features.filter((f) => f.id !== params.id).slice(0, 3)

  return (
    <>
      <Navbar />
      <main className="pt-16 bg-white dark:bg-slate-950">
        {/* Hero Section */}
        <section className="section-container bg-gradient-to-b from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10">
          <div className="max-w-4xl mx-auto">
            <Link href="/features">
              <p className="text-primary font-semibold hover:underline mb-6">← Back to Features</p>
            </Link>

            <div className="text-6xl mb-6">{feature.icon}</div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              {feature.title}
            </h1>
            <p className="text-xl text-slate-700 dark:text-gray-200 font-medium leading-relaxed">
              {feature.description}
            </p>
          </div>
        </section>

        {/* Overview */}
        <section className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Overview</h2>
            <p className="text-slate-700 dark:text-gray-200 font-medium text-lg leading-relaxed mb-8">
              {details.longDescription}
            </p>

            {/* Key Capabilities */}
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Key Capabilities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              {details.features.map((capability, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <span className="text-primary font-bold text-lg mt-1">✓</span>
                  <span className="text-slate-700 dark:text-gray-200 font-medium">{capability}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="section-container bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Benefits</h2>
            <div className="space-y-4">
              {details.benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                >
                  <span className="text-primary font-bold text-lg mt-0.5 flex-shrink-0">→</span>
                  <p className="text-slate-700 dark:text-gray-200 font-medium">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Supported Databases */}
        {'databases' in details && (
          <section className="section-container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                Supported Databases
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {(details as { databases: string[] }).databases.map((db, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-center font-semibold text-slate-900 dark:text-white"
                  >
                    {db}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}


        {/* Related Features */}
        {relatedFeatures.length > 0 && (
          <section className="section-container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
                Related Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedFeatures.map((relatedFeature) => (
                  <Link key={relatedFeature.id} href={`/features/${relatedFeature.id}`}>
                    <div className="group h-full p-6 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-primary/50 dark:hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <div className="text-4xl mb-4">{relatedFeature.icon}</div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors duration-300">
                        {relatedFeature.title}
                      </h3>
                      <p className="text-slate-700 dark:text-gray-200 text-sm font-medium">
                        {relatedFeature.description}
                      </p>
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
              Ready to Experience {feature.title}?
            </h2>
            <p className="text-slate-700 dark:text-gray-200 font-medium mb-8 text-lg">
              See how {feature.title} can enhance your database security posture.
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
