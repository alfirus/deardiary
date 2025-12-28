"use client"

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Facebook, Github, Twitter, Send } from 'lucide-react';

export interface Category {
	id: number;
	name: string;
	slug: string;
	created_at: string;
}

export interface Profile {
	id: string;
	display_name: string | null;
	avatar_url: string | null;
	facebook_url: string | null;
	twitter_url: string | null;
	github_url: string | null;
	telegram_username: string | null;
	role: string;
}

export interface SidebarData {
	categories: Category[];
	profile: Profile | null;
}

interface SidebarContentProps {
	content: SidebarData;
	onCategoryClick?: () => void;
	className?: string;
}

export function SidebarContent({ content, onCategoryClick, className }: SidebarContentProps) {
	const { profile, categories } = content;

	return (
		<div className={cn('flex flex-col gap-8', className)}>
			{/* Profile Card */}
			{profile && (
				<Card className="overflow-hidden">
					<div className="h-24 bg-gradient-to-r from-primary/10 to-primary/30" />
					<CardContent className="relative pt-0 pb-6 text-center px-4">
						<div className="-mt-12 mb-4 flex justify-center">
							<Avatar className="h-24 w-24 border-4 border-background shadow-md">
								<AvatarImage src={profile.avatar_url || ''} alt={profile.display_name || 'Admin'} className="object-cover" />
								<AvatarFallback className="text-2xl">{profile.display_name?.charAt(0) || 'A'}</AvatarFallback>
							</Avatar>
						</div>

						<h3 className="font-bold text-lg mb-1">{profile.display_name || 'Admin'}</h3>
						<p className="text-sm text-muted-foreground mb-4">Content Creator</p>

						<div className="flex justify-center gap-3">
							{profile.facebook_url && (
								<Link href={profile.facebook_url} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
									<Facebook className="h-5 w-5" />
								</Link>
							)}
							{profile.twitter_url && (
								<Link href={profile.twitter_url} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
									<Twitter className="h-5 w-5" />
								</Link>
							)}
							{profile.github_url && (
								<Link href={profile.github_url} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
									<Github className="h-5 w-5" />
								</Link>
							)}
							{profile.telegram_username && (
								<Link href={`https://t.me/${profile.telegram_username}`} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
									<Send className="h-5 w-5" />
								</Link>
							)}
						</div>
					</CardContent>
				</Card>
			)}

			{/* Categories */}
			<div>
				<h2 className="text-2xl font-bold mb-6">Categories</h2>
				<div className="flex flex-col gap-4">
					{categories?.map((category) => (
						<Link key={category.id} href={`/categories/${category.slug || '#'}`} className="block hover:underline underline-offset-4 decoration-primary/50" onClick={onCategoryClick}>
							{category.name}
						</Link>
					))}
					{categories?.length === 0 && <div className="text-muted-foreground">No categories found.</div>}
				</div>
			</div>
		</div>
	);
}
