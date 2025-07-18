import { MDXRemote } from 'next-mdx-remote/rsc';
import BlogHeader from '@/components/blog-header';
import { getBlogPostList, loadBlogPost } from '@/lib/file-helper';
import components from '@/lib/mdx-components';

export async function generateStaticParams() {
  // Evaluate this generateStaticParams function is needed?
  const posts = await getBlogPostList();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const { frontmatter } = await loadBlogPost(slug);
  return {
    title: `${frontmatter.title} • Julio Ramirez`,
    description: frontmatter.abstract,
  };
};

const BlogPostPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const { frontmatter, content } = await loadBlogPost(slug);
  const {
    title,
    abstract,
    publishedOn,
    author,
    tags,
    published,
    slug: postSlug,
    type,
  } = frontmatter;

  return (
    <article className="mx-auto mt-10 w-full md:mt-6">
      {/* Header */}
      <BlogHeader
        abstract={abstract}
        author={author}
        published={published}
        publishedOn={publishedOn}
        slug={postSlug}
        tags={tags}
        title={title}
        type={type}
      />
      {/* Content */}
      <div className="post-content">
        <MDXRemote components={components} source={content} />
      </div>
    </article>
  );
};

export default BlogPostPage;
