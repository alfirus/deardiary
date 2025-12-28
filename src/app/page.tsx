import { createClient } from "@/lib/supabase/server"
import PublicLayout from "@/components/public-layout"
import { MobileCategoriesDrawer } from '@/components/mobile-categories-drawer';
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { DatabaseStatusCheck } from '@/components/database-status-check';

export default async function Home() {
	const supabase = await createClient();
	const { data: posts } = await supabase.from('posts').select('*, categories(name)').eq('published', true).order('created_at', { ascending: false });

	/* Fetch categories */
	const { data: categories } = await supabase.from('categories').select('*').order('name');

	return (
		<PublicLayout>
			<DatabaseStatusCheck />

			<MobileCategoriesDrawer categories={categories || []} />

			<div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
				{/* Categories Grid - Desktop Only */}
				<section className="hidden md:block">
					<h2 className="text-2xl font-bold mb-6">Categories</h2>
					<div className="flex flex-col gap-4">
						{categories?.map((category) => (
							<Link key={category.id} href={`/categories/${category.slug || '#'}`} className="block">
								{category.name}
							</Link>
						))}
						{categories?.length === 0 && <div className="col-span-full text-center py-4 text-muted-foreground">No categories found.</div>}
					</div>
				</section>

				{/* Posts Grid */}
				<section>
					<h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{posts?.map((post) => (
							<Link href={`/posts/${post.slug}`} key={post.id} className="group">
								<Card className="h-full transition-colors hover:bg-muted/50">
									{post.featured_image && <img src={post.featured_image} alt={post.title} className="w-full h-48 object-cover rounded-t-xl" />}
									<CardHeader>
										<div className="text-muted-foreground mb-2 text-sm">
											{post.categories?.name} • {new Date(post.created_at).toLocaleDateString()}
										</div>
										<CardTitle className="group-hover:text-primary transition-colors">{post.title}</CardTitle>
										<CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
									</CardHeader>
								</Card>
							</Link>
						))}
						{posts?.length === 0 && <div className="col-span-full text-center py-12 text-muted-foreground">No posts found.</div>}
					</div>
				</section>
			</div>
		</PublicLayout>
	);
}
