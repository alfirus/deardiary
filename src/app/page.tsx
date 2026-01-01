import { createClient } from "@/lib/supabase/server"
import PublicLayout from "@/components/public-layout"
import { HeroSection } from '@/components/portfolio/hero-section';
import { SkillsSection } from '@/components/portfolio/skills-section';
import { PostsSection } from '@/components/portfolio/posts-section';
import { GitHubSection } from '@/components/portfolio/github-section';
import { ExperienceSection } from '@/components/portfolio/experience-section';
import { ContactSection } from '@/components/portfolio/contact-section';

export default async function Home() {
	const supabase = await createClient();
	const { data: posts } = await supabase.from('posts').select('*, categories(name)').eq('published', true).order('created_at', { ascending: false });

	return (
		<PublicLayout>
			<div className="scroll-smooth">
				<HeroSection />
				<SkillsSection />
				<PostsSection posts={posts || []} />
				<GitHubSection />
				<ExperienceSection />
				<ContactSection />
			</div>
		</PublicLayout>
	);
}
