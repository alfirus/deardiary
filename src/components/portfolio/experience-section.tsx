'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Calendar } from 'lucide-react';

const experiences = [
  {
    role: 'Senior Full Stack Developer',
    company: 'Tech Company',
    period: '2022 - Present',
    description: 'Leading development of scalable web applications using Next.js, TypeScript, and cloud infrastructure. Mentoring junior developers and architecting solutions.',
    achievements: [
      'Improved application performance by 40%',
      'Led team of 5 developers',
      'Implemented CI/CD pipeline',
    ],
  },
  {
    role: 'Full Stack Developer',
    company: 'Startup Inc',
    period: '2020 - 2022',
    description: 'Developed and maintained multiple client projects using React, Node.js, and MongoDB. Collaborated with designers and product managers.',
    achievements: [
      'Built 10+ production applications',
      'Reduced bug count by 60%',
      'Introduced automated testing',
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'Digital Agency',
    period: '2018 - 2020',
    description: 'Created responsive and accessible web interfaces. Worked closely with UX designers to implement pixel-perfect designs.',
    achievements: [
      'Delivered 20+ client websites',
      'Improved accessibility scores',
      'Optimized page load times',
    ],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-12 md:py-16 bg-muted/30">
      <div className="w-full px-6 md:px-12">
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Experience
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            My professional journey and accomplishments
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary" />

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row gap-6 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  style={{
                    animationDelay: `${index * 200}ms`,
                  }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 w-3 h-3 -ml-1.5 rounded-full bg-primary border-4 border-background shadow-lg z-10" />

                  {/* Spacer for desktop */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Content card */}
                  <div className="md:w-1/2 ml-16 md:ml-0">
                    <Card className="group border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 bg-card">
                      <CardHeader className="pb-3">
                        <div className="flex items-start gap-2 mb-2">
                          <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <Briefcase className="w-4 h-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-1 group-hover:text-primary transition-colors">
                              {exp.role}
                            </CardTitle>
                            <div className="flex flex-col gap-0.5 text-xs text-muted-foreground">
                              <span className="font-medium text-foreground">{exp.company}</span>
                              <span className="inline-flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {exp.period}
                              </span>
                            </div>
                          </div>
                        </div>
                        <CardDescription className="text-sm">
                          {exp.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ul className="space-y-1.5">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                              <span className="text-primary mt-0.5">•</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
