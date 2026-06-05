import { Metadata } from 'next'
import { Navbar } from '@/components/navigation/Navbar'
import { Footer } from '@/components/sections/Footer'
import { blogPosts, blogPostsByCategory } from '@/data/blog-posts'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog - Lopam AI Database Security Insights',
  description:
    'Read articles about database security, compliance, threat detection, and best practices for enterprise database protection.',
  keywords: ['blog', 'database security', 'compliance', 'threat detection', 'security best practices'],
  openGraph: {
    title: 'Blog - Lopam AI',
    description: 'Database security insights and best practices',
    url: 'https://lopam-ai.com/resources/blog',
  },
}

export default function BlogPage() {
  const categories = Object.keys(blogPostsByCategory)

  return (
    <>
      <Navbar />
      <main className="pt-16 bg-white dark:bg-slate-950">
        {/* Header Section */}
        <section className="section-container bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Database Security Insights
            </h1>
            <p className="text-xl text-slate-700 dark:text-gray-200 font-medium leading-relaxed">
              Expert articles on database security, compliance, threat detection, and best practices for protecting enterprise data.
            </p>
          </div>
        </section>

        {/* Featured Post */}
        <section className="section-container">
          <div className="max-w-6xl mx-auto">
            {blogPosts.length > 0 && (
              <Link href={`/resources/blog/${blogPosts[0].slug}`}>
                <div className="group rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 cursor-pointer">
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="flex-1 p-8 md:p-12">
                      <div className="inline-block px-4 py-2 mb-6 bg-primary text-white rounded-full text-sm font-bold">
                        Featured
                      </div>
                      <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-primary transition-colors duration-300">
                        {blogPosts[0].title}
                      </h2>
                      <p className="text-slate-700 dark:text-gray-200 font-medium mb-6 leading-relaxed">
                        {blogPosts[0].excerpt}
                      </p>
                      <div className="flex items-center gap-4 flex-wrap">
                        <span className="text-sm text-slate-600 dark:text-gray-400 font-semibold">
                          {blogPosts[0].publishedAt.toLocaleDateString()}
                        </span>
                        <span className="text-sm text-slate-600 dark:text-gray-400 font-semibold">
                          {blogPosts[0].viewCount.toLocaleString()} views
                        </span>
                        {blogPosts[0].tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 text-xs font-bold text-primary bg-primary/10 dark:bg-primary/20 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="md:w-64 bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 flex items-center justify-center p-8">
                      <div className="text-6xl">{blogPosts[0].category === 'Compliance' ? '📋' : '🔒'}</div>
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="section-container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12">Latest Articles</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.slice(1).map((post) => (
                <Link key={post.id} href={`/resources/blog/${post.slug}`}>
                  <div className="group h-full rounded-xl border border-slate-200 dark:border-slate-700 p-6 bg-white dark:bg-slate-900 hover:border-primary/50 dark:hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col">
                    <div className="text-4xl mb-4">
                      {post.category === 'Compliance'
                        ? '📋'
                        : post.category === 'Security'
                          ? '🔒'
                          : '⚡'}
                    </div>

                    <span className="text-xs font-bold text-primary bg-primary/10 dark:bg-primary/20 rounded-full px-3 py-1 w-fit mb-4">
                      {post.category}
                    </span>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors duration-300">
                      {post.title}
                    </h3>

                    <p className="text-slate-700 dark:text-gray-200 font-medium text-sm mb-6 flex-1 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                      <span className="text-xs text-slate-600 dark:text-gray-400 font-semibold">
                        {post.publishedAt.toLocaleDateString()}
                      </span>
                      <span className="text-xs text-slate-600 dark:text-gray-400 font-semibold">
                        {post.viewCount.toLocaleString()} views
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="section-container bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
              Browse by Category
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categories.map((category) => (
                <div
                  key={category}
                  className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow duration-300 text-center"
                >
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {category}
                  </h3>
                  <p className="text-slate-700 dark:text-gray-200 font-semibold mb-4">
                    {blogPostsByCategory[category]?.length || 0} articles
                  </p>
                  <button className="text-primary font-bold hover:underline text-sm">
                    View All →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
              Never Miss an Article
            </h2>
            <p className="text-slate-700 dark:text-gray-200 font-medium mb-8 text-lg">
              Subscribe to our newsletter for the latest database security insights delivered to your inbox.
            </p>
            <div className="flex gap-3 flex-col sm:flex-row max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium placeholder-slate-500 dark:placeholder-gray-400"
              />
              <button className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-300 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
