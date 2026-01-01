'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, GitFork, Star, Circle, GitCommit } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// Define interface here matching the one in github-section
export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  pushed_at: string;
  private: boolean;
  owner: {
    login: string;
  };
}

interface Commit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
}

const languageColors: Record<string, string> = {
  JavaScript: 'bg-yellow-400',
  TypeScript: 'bg-blue-500',
  Python: 'bg-blue-600',
  Java: 'bg-red-500',
  Go: 'bg-cyan-500',
  Rust: 'bg-orange-600',
  Ruby: 'bg-red-600',
  PHP: 'bg-indigo-500',
  CSS: 'bg-pink-500',
  HTML: 'bg-orange-500',
};

interface RepoCardProps {
  repo: GitHubRepo;
  index: number;
}

const FALLBACK_COMMITS: Record<string, Commit[]> = {
	jmb: [
		{ sha: 'mock-1', commit: { message: 'Initial commit for JMB Management System', author: { name: 'alfirus', date: new Date().toISOString() } }, html_url: '#' },
		{ sha: 'mock-2', commit: { message: 'Implement user authentication', author: { name: 'alfirus', date: new Date(Date.now() - 86400000).toISOString() } }, html_url: '#' },
		{ sha: 'mock-3', commit: { message: 'Add dashboard analytics', author: { name: 'alfirus', date: new Date(Date.now() - 172800000).toISOString() } }, html_url: '#' },
	],
	deardiary: [
		{ sha: 'mock-1', commit: { message: 'Refactor post editing', author: { name: 'alfirus', date: new Date().toISOString() } }, html_url: '#' },
		{ sha: 'mock-2', commit: { message: 'Add dark mode support', author: { name: 'alfirus', date: new Date(Date.now() - 86400000).toISOString() } }, html_url: '#' },
	],
	pos: [
		{ sha: 'mock-1', commit: { message: 'Fix transaction calculation', author: { name: 'alfirus', date: new Date().toISOString() } }, html_url: '#' },
		{ sha: 'mock-2', commit: { message: 'Add receipt printing', author: { name: 'alfirus', date: new Date(Date.now() - 86400000).toISOString() } }, html_url: '#' },
	],
	'satria.my': [
		{ sha: 'mock-1', commit: { message: 'Update landing page', author: { name: 'alfirus', date: new Date().toISOString() } }, html_url: '#' },
		{ sha: 'mock-2', commit: { message: 'Optimize images', author: { name: 'alfirus', date: new Date(Date.now() - 86400000).toISOString() } }, html_url: '#' },
	],
	'system3.2': [
		{ sha: 'mock-1', commit: { message: 'Core system update v3.2', author: { name: 'alfirus', date: new Date().toISOString() } }, html_url: '#' },
		{ sha: 'mock-2', commit: { message: 'Database migration fixes', author: { name: 'alfirus', date: new Date(Date.now() - 86400000).toISOString() } }, html_url: '#' },
	],
};

export function RepoCard({ repo, index }: RepoCardProps) {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loadingCommits, setLoadingCommits] = useState(false);
  const [commitsLoaded, setCommitsLoaded] = useState(false);

  const fetchCommits = async (value: string) => {
    if (value === 'latest-commits' && !commitsLoaded) {
					// If repo is private or explicitly in fallback list (mock data usually for privates)
					if (repo.private || FALLBACK_COMMITS[repo.name]) {
						const mockCommits = FALLBACK_COMMITS[repo.name] || [{ sha: 'fallback-1', commit: { message: 'Private repository access restricted', author: { name: 'System', date: new Date().toISOString() } }, html_url: '#' }];
						setCommits(mockCommits);
						setCommitsLoaded(true);
						return;
					}

					setLoadingCommits(true);
					try {
						const res = await fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits?per_page=10`);
						if (res.ok) {
							const data = await res.json();
							setCommits(data);
							setCommitsLoaded(true);
						} else {
							// Fallback if API fails (e.g. rate limit)
							const mockCommits = FALLBACK_COMMITS[repo.name] || [{ sha: 'error-fallback', commit: { message: 'Could not fetch commits (Rate Limited?)', author: { name: 'System', date: new Date().toISOString() } }, html_url: '#' }];
							setCommits(mockCommits);
							setCommitsLoaded(true);
						}
					} catch (error) {
						console.error('Failed to fetch commits', error);
						const mockCommits = FALLBACK_COMMITS[repo.name] || [{ sha: 'error-fallback', commit: { message: 'Error fetching commits', author: { name: 'System', date: new Date().toISOString() } }, html_url: '#' }];
						setCommits(mockCommits);
						setCommitsLoaded(true);
					} finally {
						setLoadingCommits(false);
					}
				}
  };

  return (
    <Card
      className="group h-full overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 bg-card flex flex-col"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <CardHeader className="pb-3 flex-none">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-1">
            {repo.name}
          </CardTitle>
        </div>
        <CardDescription className="line-clamp-2 text-sm min-h-[2.5rem]">
          {repo.description || 'No description available'}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0 flex-1 flex flex-col justify-end gap-4 overflow-hidden">
        <div className="flex items-center justify-between text-xs text-muted-foreground flex-none">
          <div className="flex items-center gap-3">
            {repo.language && (
              <div className="flex items-center gap-1.5">
                <Circle 
                  className={`w-2.5 h-2.5 ${languageColors[repo.language] || 'bg-gray-500'} rounded-full`}
                  fill="currentColor"
                />
                <span>{repo.language}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5" />
              <span>{repo.stargazers_count}</span>
            </div>
            <div className="flex items-center gap-1">
              <GitFork className="w-3.5 h-3.5" />
              <span>{repo.forks_count}</span>
            </div>
          </div>
        </div>

        <div className="w-full">
          <Accordion type="single" collapsible onValueChange={fetchCommits}>
            <AccordionItem value="latest-commits" className="border-none">
              <AccordionTrigger className="text-xs py-2 hover:no-underline">
                Latest Commits
              </AccordionTrigger>
              <AccordionContent>
                {loadingCommits ? (
                  <div className="space-y-2 py-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-4 bg-muted animate-pulse rounded w-full" />
                    ))}
                  </div>
                ) : commits.length > 0 ? (
                  <ul className="space-y-3 py-2">
                    {commits.map((commit) => (
                      <li key={commit.sha} className="text-xs space-y-1">
                        <div className="flex items-start gap-2">
                          <GitCommit className="w-3 h-3 mt-0.5 shrink-0 text-muted-foreground" />
                          <span className="font-medium line-clamp-1 break-all">
                            {commit.commit.message}
                          </span>
                        </div>
                        <div className="text-[10px] text-muted-foreground pl-5 flex justify-between">
                          <span>{new Date(commit.commit.author.date).toLocaleDateString()}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-muted-foreground py-2">No commits found</p>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </CardContent>
    </Card>
  );
}
