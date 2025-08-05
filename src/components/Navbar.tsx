import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-b z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">WhatsApp AI</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('architecture')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Architecture
            </button>
            <button 
              onClick={() => scrollToSection('setup')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Setup Guide
            </button>
            <button 
              onClick={() => scrollToSection('demo')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Demo
            </button>
            <Button variant="hero" onClick={() => scrollToSection('setup')}>
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => scrollToSection('architecture')}
                className="text-left text-muted-foreground hover:text-foreground transition-colors"
              >
                Architecture
              </button>
              <button 
                onClick={() => scrollToSection('setup')}
                className="text-left text-muted-foreground hover:text-foreground transition-colors"
              >
                Setup Guide
              </button>
              <button 
                onClick={() => scrollToSection('demo')}
                className="text-left text-muted-foreground hover:text-foreground transition-colors"
              >
                Demo
              </button>
              <Button variant="hero" onClick={() => scrollToSection('setup')} className="w-full">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;