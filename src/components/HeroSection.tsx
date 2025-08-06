import { Button } from "@/components/ui/button";
import { ArrowRight, User, Award, Target, BarChart3 } from "lucide-react";
import portfolioHero from "@/assets/portfolio-hero.jpg";

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
                <User className="w-5 h-5" />
                <span>Product Manager Portfolio</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Strategic Product
                <span className="block text-primary">Leadership</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Experienced product manager with a proven track record of driving growth,
                leading cross-functional teams, and delivering user-centric solutions that 
                create meaningful business impact.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="lg" 
                onClick={() => scrollToSection('projects')}
                className="group"
              >
                View Projects
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => scrollToSection('experience')}
              >
                <User className="w-5 h-5" />
                My Experience
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Strategic Vision</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Data-Driven</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Results-Oriented</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-primary rounded-2xl opacity-20 blur-xl animate-glow"></div>
            <img 
              src={portfolioHero} 
              alt="Product Manager Portfolio"
              className="relative rounded-2xl shadow-elegant w-full animate-float"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;