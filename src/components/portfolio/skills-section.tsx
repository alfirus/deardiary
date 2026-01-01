'use client';

import { Code2, Database, Palette, Rocket, Server, Smartphone } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const skills = [
  {
    icon: Code2,
    title: 'Frontend Development',
    description: 'React, Next.js, TypeScript, Tailwind CSS',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Server,
    title: 'Backend Development',
    description: 'Node.js, Express, REST APIs, GraphQL',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Database,
    title: 'Database & Storage',
    description: 'PostgreSQL, MongoDB, Supabase, Redis',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    description: 'React Native, Expo, Cross-platform',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Figma, Responsive Design, Accessibility',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Rocket,
    title: 'DevOps & Tools',
    description: 'Git, Docker, CI/CD, Cloud Platforms',
    color: 'from-indigo-500 to-purple-500',
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-12 md:py-16 relative">
      <div className="w-full px-6 md:px-12">
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <Card
                key={index}
                className="group relative overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 backdrop-blur-sm bg-card/50"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Glassmorphic effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Animated gradient border */}
                <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`} />
                
                <CardHeader className="pb-3">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${skill.color} p-2.5 mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {skill.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-sm">
                    {skill.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
