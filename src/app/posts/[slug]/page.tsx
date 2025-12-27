import { createClient } from "@/lib/supabase/server"
import PublicLayout from "@/components/public-layout"
import { notFound } from "next/navigation"
import Comments from "@/components/comments"
import PostContent from '@/components/post-content';

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const supabase = await createClient();

	const { data: post } = await supabase.from('posts').select('*, categories(name), profiles(display_name)').eq('slug', slug).single();

	if (!post) {
		notFound();
	}

	return (
		<PublicLayout>
			<article className="max-w-3xl mx-auto">
				{post.featured_image && <img src={post.featured_image} alt={post.title} className="w-full h-64 md:h-96 object-cover rounded-xl mb-8" />}
				<div className="text-center mb-8">
					<h1 className="font-bold mb-0">{post.title}</h1>
					<div className="text-muted-foreground mb-2">
						{post.categories?.name} • {new Date(post.created_at).toLocaleDateString()} • By {post.profiles?.display_name || 'Unknown'}
					</div>
				</div>

				<div className="max-w-none mb-12">
					<PostContent content={post.content} />
				</div>

				<hr className="my-8" />

				<Comments postId={post.id} />
			</article>
		</PublicLayout>
	);
}
