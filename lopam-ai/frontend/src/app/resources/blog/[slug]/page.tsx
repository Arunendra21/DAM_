import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navigation/Navbar'
import { Footer } from '@/components/sections/Footer'
import { blogPosts, blogPostBySlug } from '@/data/blog-posts'
import Link from 'next/link'

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPostBySlug[params.slug]

  if (!post) {
    return { title: 'Article Not Found' }
  }

  return {
    title: `${post.title} - Lopam DAM Blog`,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://lopam-ai.com/resources/blog/${params.slug}`,
      type: 'article',
      publishedTime: post.publishedAt.toISOString(),
      authors: ['Lopam DAM'],
    },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPostBySlug[params.slug]

  if (!post) {
    notFound()
  }

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3)

  return (
    <>
      <Navbar />
      <main className="pt-16 bg-white dark:bg-slate-950">
        {/* Article Header */}
        <section className="section-container bg-gradient-to-b from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10">
          <div className="max-w-3xl mx-auto">
            <Link href="/resources/blog">
              <p className="text-primary font-semibold hover:underline mb-6">← Back to Blog</p>
            </Link>

            <span className="inline-block px-4 py-2 mb-6 bg-primary text-white rounded-full text-sm font-bold">
              {post.category}
            </span>

            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              {post.title}
            </h1>

            <div className="flex items-center gap-6 flex-wrap text-slate-700 dark:text-gray-200 font-semibold">
              <span>{post.publishedAt.toLocaleDateString()}</span>
              <span>{post.viewCount.toLocaleString()} views</span>
              <span>{Math.ceil(post.content.split(' ').length / 200)} min read</span>
            </div>

            <div className="flex gap-2 mt-6 flex-wrap">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-bold text-primary bg-primary/10 dark:bg-primary/20 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="section-container">
          <div className="max-w-3xl mx-auto prose dark:prose-invert prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white prose-p:text-slate-700 dark:prose-p:text-gray-300 prose-p:font-medium prose-p:leading-relaxed prose-a:text-primary prose-a:font-semibold prose-strong:font-bold prose-strong:text-slate-900 dark:prose-strong:text-white prose-code:text-primary prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-slate-100 dark:prose-pre:bg-slate-800">
            {/* Simple markdown parsing - for production use a library like remark */}
            <div className="text-slate-700 dark:text-gray-300 font-medium leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
          </div>
        </section>

        {/* Author Info */}
        <section className="section-container bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10">
          <div className="max-w-3xl mx-auto">
            <div className="p-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                About Lopam DAM
              </h3>
              <p className="text-slate-700 dark:text-gray-200 font-medium leading-relaxed">
                Lopam DAM is the leading enterprise database security platform, protecting databases with real-time monitoring, threat detection, and compliance automation.
              </p>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="section-container">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
                Related Articles
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/resources/blog/${relatedPost.slug}`}>
                    <div className="group h-full rounded-xl border border-slate-200 dark:border-slate-700 p-6 bg-white dark:bg-slate-900 hover:border-primary/50 dark:hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col">
                      <span className="text-xs font-bold text-primary bg-primary/10 dark:bg-primary/20 rounded-full px-3 py-1 w-fit mb-4">
                        {relatedPost.category}
                      </span>

                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors duration-300 flex-1">
                        {relatedPost.title}
                      </h3>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                        <span className="text-xs text-slate-600 dark:text-gray-400 font-semibold">
                          {relatedPost.publishedAt.toLocaleDateString()}
                        </span>
                        <span className="text-primary font-bold text-sm">Read →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Newsletter CTA */}
        <section className="section-container bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
              Subscribe to Our Blog
            </h2>
            <p className="text-slate-700 dark:text-gray-200 font-medium mb-8 text-lg">
              Get the latest database security insights delivered to your inbox.
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
