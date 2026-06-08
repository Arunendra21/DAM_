import { Metadata } from 'next'
import { Navbar } from '@/components/navigation/Navbar'
import { Footer } from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service - Lopam DAM',
  description: 'Terms of service for Lopam DAM database security platform.',
  robots: 'noindex, nofollow',
}

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 bg-white dark:bg-slate-950">
        <section className="section-container">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-8">
              Terms of Service
            </h1>

            <div className="prose dark:prose-invert max-w-none">
              <p className="text-slate-700 dark:text-gray-200 font-medium mb-6">
                Last Updated: January 2024
              </p>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
                1. Agreement to Terms
              </h2>
              <p className="text-slate-700 dark:text-gray-200 font-medium mb-4 leading-relaxed">
                These Terms of Service (&quot;Terms&quot;) constitute a legal agreement between you and Lopam DAM (&quot;Company&quot;) regarding your use of our website, services, and products. By accessing or using Lopam DAM, you agree to be bound by these Terms.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
                2. Use License
              </h2>
              <p className="text-slate-700 dark:text-gray-200 font-medium mb-4 leading-relaxed">
                We grant you a limited, non-exclusive, non-transferable license to access and use our services in accordance with these Terms. You agree not to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-gray-200 font-medium mb-4">
                <li>Reproduce or duplicate any content without permission</li>
                <li>Sell, trade, or exploit our services or content</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Reverse engineer or modify our software</li>
                <li>Use our services for illegal purposes</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
                3. Pricing and Billing
              </h2>
              <p className="text-slate-700 dark:text-gray-200 font-medium mb-4 leading-relaxed">
                Pricing for our services is as stated on our Pricing page. We reserve the right to modify prices with 30 days&apos; notice. Subscriptions automatically renew unless cancelled. You are responsible for all charges incurred under your account.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
                4. Data Security and Compliance
              </h2>
              <p className="text-slate-700 dark:text-gray-200 font-medium mb-4 leading-relaxed">
                Lopam DAM implements security measures designed to protect your data. However, no system is completely secure. You acknowledge that transmission of data is at your own risk. We maintain compliance with major security standards including PCI-DSS, HIPAA, GDPR, and other regulatory frameworks.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
                5. Intellectual Property
              </h2>
              <p className="text-slate-700 dark:text-gray-200 font-medium mb-4 leading-relaxed">
                All content, features, and functionality of Lopam DAM are owned by Lopam DAM, its licensors, or other providers. Your use does not grant you ownership of any intellectual property rights.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
                6. Limitation of Liability
              </h2>
              <p className="text-slate-700 dark:text-gray-200 font-medium mb-4 leading-relaxed">
                To the maximum extent permitted by law, Lopam DAM shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services, even if we have been advised of the possibility of such damages.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
                7. Disclaimers
              </h2>
              <p className="text-slate-700 dark:text-gray-200 font-medium mb-4 leading-relaxed">
                Our services are provided &quot;as is&quot; without warranties of any kind, either express or implied. We do not warrant that our services will be uninterrupted, error-free, or secure. While we strive to detect threats and provide accurate compliance reporting, we do not guarantee 100% threat detection or compliance certification.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
                8. Indemnification
              </h2>
              <p className="text-slate-700 dark:text-gray-200 font-medium mb-4 leading-relaxed">
                You agree to indemnify and hold harmless Lopam DAM from any claims, damages, or costs arising from your violation of these Terms or your use of our services.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
                9. Termination
              </h2>
              <p className="text-slate-700 dark:text-gray-200 font-medium mb-4 leading-relaxed">
                We reserve the right to terminate your account and access to our services at any time for violation of these Terms or other grounds. Upon termination, your right to use our services ceases immediately.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
                10. Modifications to Terms
              </h2>
              <p className="text-slate-700 dark:text-gray-200 font-medium mb-4 leading-relaxed">
                We reserve the right to modify these Terms at any time. Changes will be effective when posted. Your continued use of our services constitutes acceptance of modified Terms.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
                11. Governing Law
              </h2>
              <p className="text-slate-700 dark:text-gray-200 font-medium mb-4 leading-relaxed">
                These Terms are governed by and construed in accordance with the laws of California, United States, without regard to its conflict of laws principles.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
                12. Contact Information
              </h2>
              <p className="text-slate-700 dark:text-gray-200 font-medium mb-4 leading-relaxed">
                For questions about these Terms, please contact us at:
              </p>
              <p className="text-slate-700 dark:text-gray-200 font-medium">
                Email: legal@lopam-ai.com<br />
                Address: 123 Security Lane, San Francisco, CA 94105
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
