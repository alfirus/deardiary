'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Github, Linkedin, Mail, Download, Send } from 'lucide-react';

export function ContactSection() {
  return (
    <section id="contact" className="py-12 md:py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
      
      <div className="w-full px-6 md:px-12 relative z-10">
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Let's work together on your next project
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-xl">
            <CardContent className="p-6 md:p-10">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Contact Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold mb-3">Let's Connect</h3>
                    <p className="text-sm text-muted-foreground">
                      I'm always interested in hearing about new projects and opportunities. 
                      Whether you have a question or just want to say hi, feel free to reach out!
                    </p>
                  </div>

                  {/* Social Links */}
                  <div className="space-y-2">
                    <a
                      href="mailto:contact@example.com"
                      className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-primary/10 transition-colors group"
                    >
                      <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Mail className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">Email</div>
                        <div className="text-xs text-muted-foreground">contact@example.com</div>
                      </div>
                    </a>

                    <a
                      href="https://github.com/alfirus"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-primary/10 transition-colors group"
                    >
                      <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Github className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">GitHub</div>
                        <div className="text-xs text-muted-foreground">@alfirus</div>
                      </div>
                    </a>

                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-primary/10 transition-colors group"
                    >
                      <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Linkedin className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">LinkedIn</div>
                        <div className="text-xs text-muted-foreground">Connect with me</div>
                      </div>
                    </a>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col justify-center gap-3">
                  <Button
                    size="default"
                    className="w-full group relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
                    asChild
                  >
                    <a href="mailto:contact@example.com">
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <Send className="w-4 h-4" />
                        Send Message
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </Button>

                  <Button
                    size="default"
                    variant="outline"
                    className="w-full group hover:border-primary hover:text-primary transition-all duration-300"
                    asChild
                  >
                    <a href="/resume.pdf" download>
                      <Download className="w-4 h-4 mr-2 group-hover:translate-y-1 transition-transform" />
                      Download Resume
                    </a>
                  </Button>

                  <div className="mt-2 p-3 rounded-lg bg-muted/50 border border-border/50">
                    <p className="text-xs text-center text-muted-foreground">
                      Available for freelance work and full-time opportunities
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
