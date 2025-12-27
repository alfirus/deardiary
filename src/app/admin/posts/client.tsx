"use client"

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

import PostForm from '@/components/post-form';
import ActionButtons from '@/components/action-buttons';
import DataTable from '@/components/data-table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

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

	const columns = [
		{
			name: 'Title',
			selector: (row: any) => row.title,
			sortable: true,
		},
		{
			name: 'Slug',
			selector: (row: any) => row.slug,
			sortable: true,
		},
		{
			name: 'Status',
			selector: (row: any) => (row.published ? 'Published' : 'Draft'),
			sortable: true,
		},
		{
			name: 'Actions',
			cell: (row: any) => (
				<div className="flex justify-end w-full">
					<ActionButtons viewUrl={`/posts/${row.slug}`} editUrl={`/admin/posts/${row.id}`} onDelete={() => handleDelete(row.id)} />
				</div>
			),
		},
	];

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

			{/* Desktop View */}
			<div className="hidden md:block rounded-md border">
				<DataTable columns={columns} data={posts} pagination persistTableHead />
			</div>

			{/* Mobile View */}
			<div className="grid gap-4 md:hidden">
				{posts?.map((post) => (
					<Card key={post.id}>
						<CardHeader>
							<CardTitle>{post.title}</CardTitle>
						</CardHeader>
						<CardContent className="space-y-2">
							<div className="flex justify-between text-sm">
								<span className="text-muted-foreground">Slug:</span>
								<span className="font-mono">{post.slug}</span>
							</div>
							<div className="flex justify-between text-sm">
								<span className="text-muted-foreground">Status:</span>
								<span>{post.published ? 'Published' : 'Draft'}</span>
							</div>
						</CardContent>
						<CardFooter>
							<div className="flex justify-end w-full">
								<ActionButtons viewUrl={`/posts/${post.slug}`} editUrl={`/admin/posts/${post.id}`} onDelete={() => handleDelete(post.id)} />
							</div>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
}
