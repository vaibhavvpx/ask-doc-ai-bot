import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Bot, Zap } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-subtle overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary font-semibold">
                <Bot className="w-5 h-5" />
                <span>AI-Powered Customer Support</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                WhatsApp AI Agent
                <span className="block text-primary">That Never Sleeps</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Build a no-code AI customer support agent using n8n, WhatsApp Cloud API, 
                Google Docs, and OpenAI. Automate 80% of customer queries while keeping 
                human oversight for complex cases.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="lg" 
                onClick={() => scrollToSection('setup')}
                className="group"
              >
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => scrollToSection('demo')}
              >
                <MessageCircle className="w-5 h-5" />
                See Demo
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">No Code Required</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-whatsapp" />
                <span className="text-sm font-medium">WhatsApp Integration</span>
              </div>
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">AI Powered</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-primary rounded-2xl opacity-20 blur-xl animate-glow"></div>
            <img 
              src={heroImage} 
              alt="WhatsApp AI Customer Support System"
              className="relative rounded-2xl shadow-elegant w-full animate-float"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;