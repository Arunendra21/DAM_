import { Metadata } from 'next'
import { Navbar } from '@/components/navigation/Navbar'
import { Footer } from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy - Lopam DAM',
  description: 'Privacy policy for Lopam DAM database security platform.',
  robots: 'noindex, nofollow',
}

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 bg-white dark:bg-slate-950">
        <section className="section-container">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-8">
              Privacy Policy
            </h1>

            <div className="prose dark:prose-invert max-w-none">
              <p className="text-slate-700 dark:text-gray-200 font-medium mb-6">
                Last Updated: January 2024
              </p>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
                1. Introduction
              </h2>
              <p className="text-slate-700 dark:text-gray-200 font-medium mb-4 leading-relaxed">
                Lopam DAM (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the Lopam DAM website and platform. This Privacy Policy explains how we collect, use, disclose, and otherwise handle your information when you visit our website, use our services, or communicate with us.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
                2. Information We Collect
              </h2>
              <p className="text-slate-700 dark:text-gray-200 font-medium mb-4 leading-relaxed">
                We collect information you provide directly to us, such as:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-gray-200 font-medium mb-4">
                <li>Name, email address, and company information</li>
                <li>Phone number and other contact details</li>
                <li>Information about your organization and database infrastructure</li>
                <li>Payment information for subscription services</li>
                <li>Communications and correspondence</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-slate-700 dark:text-gray-200 font-medium mb-4 leading-relaxed">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-gray-200 font-medium mb-4">
                <li>Provide and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Respond to your inquiries and requests</li>
                <li>Send marketing and promotional communications</li>
                <li>Analyze usage patterns and optimize our platform</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
                4. Data Security
              </h2>
              <p className="text-slate-700 dark:text-gray-200 font-medium mb-4 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Our platform uses industry-standard encryption and security practices to safeguard your data.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
                5. Data Retention
              </h2>
              <p className="text-slate-700 dark:text-gray-200 font-medium mb-4 leading-relaxed">
                We retain personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. You may request deletion of your data at any time by contacting us.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
                6. Your Rights
              </h2>
              <p className="text-slate-700 dark:text-gray-200 font-medium mb-4 leading-relaxed">
                Depending on your location, you may have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-gray-200 font-medium mb-4">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Request data portability</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
                7. Contact Us
              </h2>
              <p className="text-slate-700 dark:text-gray-200 font-medium mb-4 leading-relaxed">
                If you have questions about this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <p className="text-slate-700 dark:text-gray-200 font-medium">
                Email: privacy@lopam-ai.com<br />
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
