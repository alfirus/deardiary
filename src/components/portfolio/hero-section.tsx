'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';

export function HeroSection() {
  const [displayedText, setDisplayedText] = useState('');
  const roles = ['Full Stack Developer', 'Software Engineer', 'Problem Solver', 'Tech Enthusiast'];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentRole.length) {
          setDisplayedText(currentRole.slice(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentRoleIndex((currentRoleIndex + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentRoleIndex, roles]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 animate-gradient-shift" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float-delayed" />
      
      <div className="w-full px-6 md:px-12 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          {/* Profile Image */}
          <div className="relative w-24 h-24 mx-auto mb-6 group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity animate-pulse" />
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-background shadow-2xl">
              <div className="w-full h-full bg-gradient-to-br from-primary/50 to-accent/50 flex items-center justify-center text-3xl font-bold">
                A
              </div>
            </div>
          </div>

          {/* Main heading */}
          <div className="space-y-3">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">
              Hi, I'm Alfirus
            </h1>
            <div className="h-10 md:h-14 flex items-center justify-center">
              <h2 className="text-xl md:text-3xl font-semibold text-muted-foreground">
                {displayedText}
                <span className="inline-block w-1 h-6 md:h-8 bg-primary ml-1 animate-blink" />
              </h2>
            </div>
          </div>

          {/* Description */}
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Passionate about building elegant solutions to complex problems. 
            I create beautiful, performant web applications that make a difference.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 justify-center pt-4">
            <Button 
              size="default" 
              className="group relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
              onClick={() => scrollToSection('contact')}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Get In Touch
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
            <Button 
              size="default" 
              variant="outline"
              className="group hover:border-primary hover:text-primary transition-all duration-300"
              onClick={() => scrollToSection('posts')}
            >
              View My Work
              <ArrowDown className="w-4 h-4 ml-2 group-hover:translate-y-1 transition-transform" />
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex gap-3 justify-center pt-6">
            <a 
              href="https://github.com/alfirus" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-card hover:bg-primary/10 border border-border hover:border-primary transition-all duration-300 group"
            >
              <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-card hover:bg-primary/10 border border-border hover:border-primary transition-all duration-300 group"
            >
              <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
            <a 
              href="mailto:contact@example.com"
              className="p-2.5 rounded-full bg-card hover:bg-primary/10 border border-border hover:border-primary transition-all duration-300 group"
            >
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-5 h-5 text-muted-foreground" />
      </div>
    </section>
  );
}
