'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { RepoCard, type GitHubRepo } from './repo-card';

export function GitHubSection() {
	const [repos, setRepos] = useState<GitHubRepo[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const SELECTED_REPOS = ['alfirus/deardiary', 'alfirus/pos', 'alfirus/satria.my', 'alfirus/jmb', 'AerosGeotech/system3.2'];

	const FALLBACK_REPOS: Record<string, Partial<GitHubRepo>> = {
		'alfirus/jmb': {
			id: 9991,
			name: 'jmb',
			description: 'JMB Management System (Private)',
			html_url: 'https://github.com/alfirus/jmb',
			stargazers_count: 0,
			forks_count: 0,
			language: 'TypeScript',
			updated_at: new Date().toISOString(),
			pushed_at: new Date().toISOString(),
			private: true,
			owner: { login: 'alfirus' },
		},
		'alfirus/deardiary': {
			id: 9992,
			name: 'deardiary',
			description: 'Personal Diary Application',
			html_url: 'https://github.com/alfirus/deardiary',
			stargazers_count: 0,
			forks_count: 0,
			language: 'TypeScript',
			updated_at: new Date().toISOString(),
			pushed_at: new Date().toISOString(),
			private: true,
			owner: { login: 'alfirus' },
		},
		'alfirus/pos': {
			id: 9993,
			name: 'pos',
			description: 'Point of Sale System',
			html_url: 'https://github.com/alfirus/pos',
			stargazers_count: 0,
			forks_count: 0,
			language: 'TypeScript',
			updated_at: new Date().toISOString(),
			pushed_at: new Date().toISOString(),
			private: true,
			owner: { login: 'alfirus' },
		},
		'alfirus/satria.my': {
			id: 9994,
			name: 'satria.my',
			description: 'Satria My Project',
			html_url: 'https://github.com/alfirus/satria.my',
			stargazers_count: 0,
			forks_count: 0,
			language: 'TypeScript',
			updated_at: new Date().toISOString(),
			pushed_at: new Date().toISOString(),
			private: true,
			owner: { login: 'alfirus' },
		},
		'AerosGeotech/system3.2': {
			id: 9995,
			name: 'system3.2',
			description: 'Aeros Geotech System 3.2',
			html_url: 'https://github.com/AerosGeotech/system3.2',
			stargazers_count: 0,
			forks_count: 0,
			language: 'TypeScript',
			updated_at: new Date().toISOString(),
			pushed_at: new Date().toISOString(),
			private: true,
			owner: { login: 'AerosGeotech' },
		},
	};

	useEffect(() => {
		const fetchRepos = async () => {
			try {
				const repoPromises = SELECTED_REPOS.map((repoName) =>
					fetch(`https://api.github.com/repos/${repoName}`)
						.then((res) => {
							if (!res.ok) {
								if (FALLBACK_REPOS[repoName]) {
									return { ...FALLBACK_REPOS[repoName], name: repoName.split('/')[1] } as GitHubRepo;
								}
								return null;
							}
							return res.json();
						})
						.catch(() => {
							if (FALLBACK_REPOS[repoName]) {
								return { ...FALLBACK_REPOS[repoName], name: repoName.split('/')[1] } as GitHubRepo;
							}
							return null;
						})
				);

				const results = await Promise.all(repoPromises);
				// Filter out nulls (failed fetches)
				const validRepos = results.filter((repo): repo is GitHubRepo => repo !== null);

				setRepos(validRepos);
				setLoading(false);
			} catch (err) {
				console.error('Error fetching GitHub repos:', err);
				setError(true);
				setLoading(false);
			}
		};

		fetchRepos();
	}, []);

	return (
		<section id="github" className="py-12 md:py-16 relative">
			<div className="w-full px-6 md:px-12">
				<div className="text-center mb-10 space-y-2">
					<h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">GitHub Projects</h2>
					<p className="text-base text-muted-foreground max-w-2xl mx-auto">Open source contributions and personal projects</p>
				</div>

				{loading ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
						{[...Array(6)].map((_, i) => (
							<Card key={i} className="h-full animate-pulse">
								<CardHeader className="pb-3">
									<div className="h-5 bg-muted rounded w-3/4 mb-2" />
									<div className="h-4 bg-muted rounded w-full" />
								</CardHeader>
								<CardContent className="pt-0">
									<div className="space-y-2">
										<div className="h-3 bg-muted rounded w-full" />
										<div className="h-3 bg-muted rounded w-5/6" />
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				) : error ? (
					<div className="text-center py-12">
						<p className="text-muted-foreground">Unable to load GitHub repositories</p>
					</div>
				) : repos.length === 0 ? (
					<div className="text-center py-12">
						<p className="text-muted-foreground">No repositories found</p>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto mb-8">
						{repos.map((repo, index) => (
							<RepoCard key={repo.id} repo={repo} index={index} />
						))}
					</div>
				)}
			</div>
		</section>
	);
}
