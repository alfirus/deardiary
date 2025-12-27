"use client"

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PostForm from '@/components/post-form';
import ActionButtons from '@/components/action-buttons';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function PostsClient({ posts, categories }: { posts: any[]; categories: any[] }) {
	const [open, setOpen] = useState(false);
	const router = useRouter();
	const supabase = createClient();

	async function handleDelete(id: number) {
		if (!confirm('Are you sure?')) return;

		const { error } = await supabase.from('posts').delete().eq('id', id);

		if (error) {
			toast.error(error.message);
			return;
		}

		toast.success('Post deleted');
		router.refresh();
	}

	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<h1 className="font-bold">Posts</h1>
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<Button>Add Post</Button>
					</DialogTrigger>
					<DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
						<DialogHeader>
							<DialogTitle>Add Post</DialogTitle>
						</DialogHeader>
						<PostForm categories={categories} onSuccess={() => setOpen(false)} />
					</DialogContent>
				</Dialog>
			</div>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Title</TableHead>
						<TableHead>Slug</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{posts?.map((post) => (
						<TableRow key={post.id}>
							<TableCell>{post.title}</TableCell>
							<TableCell>{post.slug}</TableCell>
							<TableCell>{post.published ? 'Published' : 'Draft'}</TableCell>
							<TableCell>
								<ActionButtons viewUrl={`/posts/${post.slug}`} editUrl={`/admin/posts/${post.id}`} onDelete={() => handleDelete(post.id)} />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
