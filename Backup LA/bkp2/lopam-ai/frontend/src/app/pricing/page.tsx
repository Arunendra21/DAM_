import { Metadata } from 'next'
import { Navbar } from '@/components/navigation/Navbar'
import { Footer } from '@/components/sections/Footer'
import { pricingPlans, pricingFAQ } from '@/data/pricing'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pricing - Lopam AI Enterprise Database Security',
  description: 'Choose the right plan for your enterprise database security needs. From Starter to Enterprise with flexible pricing.',
  openGraph: {
    title: 'Pricing - Lopam AI',
    description: 'Simple, transparent pricing for database security',
    url: 'https://lopam-ai.com/pricing',
  },
}

export default function PricingPage() {
  // Extract all unique features across all plans
  const allFeatures = new Set<string>()
  pricingPlans.forEach((plan) => {
    plan.features.forEach((feature) => {
      allFeatures.add(feature)
    })
  })

  return (
    <>
      <Navbar />
      <main className="pt-16 bg-white dark:bg-slate-950">
        {/* Header Section */}
        <section className="section-container bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-slate-700 dark:text-gray-200 font-medium leading-relaxed">
              Choose the plan that fits your enterprise database security needs. All plans include 24/7 support, real-time monitoring, and threat detection.
            </p>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="section-container">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`rounded-2xl p-8 flex flex-col transition-all duration-300 ${
                    plan.featured
                      ? 'border-2 border-primary bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10 shadow-2xl dark:shadow-primary/20 lg:scale-105'
                      : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:shadow-lg'
                  }`}
                >
                  {plan.featured && (
                    <div className="mb-4 px-3 py-1 inline-block text-sm font-bold text-primary bg-primary/10 dark:bg-primary/20 rounded-full w-fit">
                      Most Popular
                    </div>
                  )}

                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-slate-600 dark:text-gray-300 text-sm mb-6 font-medium">
                    {plan.description}
                  </p>

                  <div className="mb-8">
                    {plan.price === 'Custom' ? (
                      <p className="text-4xl font-bold text-slate-900 dark:text-white">
                        {plan.price}
                      </p>
                    ) : (
                      <>
                        <p className="text-4xl font-bold text-slate-900 dark:text-white">
                          ${plan.price}/mo
                        </p>
                        {plan.billingInfo && (
                          <p className="text-xs text-slate-600 dark:text-gray-300 mt-2">
                            {plan.billingInfo}
                          </p>
                        )}
                      </>
                    )}
                  </div>

                  <button
                    className={`w-full py-3 px-4 rounded-lg font-semibold mb-8 transition-colors duration-300 ${
                      plan.featured
                        ? 'bg-primary text-white hover:bg-primary/90'
                        : 'border border-primary text-primary hover:bg-primary/5 dark:hover:bg-primary/10'
                    }`}
                  >
                    {plan.cta}
                  </button>

                  <div className="space-y-3 flex-1">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="text-primary font-bold text-lg leading-none mt-0.5">✓</span>
                        <span className="text-slate-700 dark:text-gray-200 text-sm font-medium">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* All Plans Include */}
            <div className="p-12 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
                All Plans Include
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  '24/7 Priority Support',
                  'Real-time Monitoring',
                  'Threat Detection',
                  'Compliance Reports',
                  'API Access',
                  'Session Recording',
                  'Alert System',
                  'SIEM Integration',
                  'Custom Dashboards',
                  'User Management',
                  'Audit Logs',
                  'Encryption',
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="text-primary font-bold text-lg">✓</span>
                    <span className="text-slate-700 dark:text-gray-200 font-semibold">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="section-container bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">
              Detailed Feature Comparison
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                    <th className="px-6 py-4 text-left font-bold text-slate-900 dark:text-white">
                      Feature
                    </th>
                    {pricingPlans.map((plan) => (
                      <th
                        key={plan.id}
                        className="px-6 py-4 text-center font-bold text-slate-900 dark:text-white"
                      >
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from(allFeatures)
                    .sort()
                    .map((feature, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                      >
                        <td className="px-6 py-4 font-medium text-slate-700 dark:text-gray-200">
                          {feature}
                        </td>
                        {pricingPlans.map((plan) => (
                          <td
                            key={plan.id}
                            className="px-6 py-4 text-center"
                          >
                            {plan.features.includes(feature) ? (
                              <span className="text-primary font-bold text-lg">✓</span>
                            ) : (
                              <span className="text-slate-400">-</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              {pricingFAQ.map((faq, idx) => (
                <details
                  key={idx}
                  className="group rounded-lg border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <summary className="flex items-center justify-between cursor-pointer font-bold text-slate-900 dark:text-white text-lg">
                    {faq.question}
                    <span className="text-primary group-open:rotate-180 transition-transform duration-300">
                      ▼
                    </span>
                  </summary>
                  <p className="mt-4 text-slate-700 dark:text-gray-200 font-medium leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-container bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
              Not sure which plan is right for you?
            </h2>
            <p className="text-slate-700 dark:text-gray-200 font-medium mb-8 text-lg">
              Our enterprise solution specialists can help you find the perfect fit for your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-300">
                Schedule Consultation
              </button>
              <button className="px-8 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors duration-300">
                Start Free Trial
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
