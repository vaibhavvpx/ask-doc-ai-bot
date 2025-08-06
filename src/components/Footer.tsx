import { Button } from "@/components/ui/button";
import { MessageCircle, Github, ExternalLink, Heart } from "lucide-react";
const Footer = () => {
  return <footer className="bg-muted py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl">WhatsApp AI</span>
            </div>
            <p className="text-muted-foreground max-w-md mb-6">
              No-code AI-powered WhatsApp customer support agent using n8n, 
              WhatsApp Cloud API, Google Docs, and OpenAI/Gemini.
            </p>
            <div className="flex gap-4">
              <Button variant="outline" size="sm" asChild>
                <a href="https://github.com" target="_blank" rel="noopener">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="https://n8n.io" target="_blank" rel="noopener">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  n8n
                </a>
              </Button>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="https://developers.facebook.com/docs/whatsapp" target="_blank" rel="noopener" className="hover:text-foreground transition-colors">
                  WhatsApp API Docs
                </a>
              </li>
              <li>
                <a href="https://docs.n8n.io" target="_blank" rel="noopener" className="hover:text-foreground transition-colors">
                  n8n Documentation
                </a>
              </li>
              <li>
                <a href="https://developers.google.com/docs" target="_blank" rel="noopener" className="hover:text-foreground transition-colors">
                  Google Docs API
                </a>
              </li>
              <li>
                <a href="https://platform.openai.com/docs" target="_blank" rel="noopener" className="hover:text-foreground transition-colors">
                  OpenAI API
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#setup" className="hover:text-foreground transition-colors">
                  Setup Guide
                </a>
              </li>
              <li>
                <a href="#demo" className="hover:text-foreground transition-colors">
                  Live Demo
                </a>
              </li>
              <li>
                <a href="#architecture" className="hover:text-foreground transition-colors">
                  Architecture
                </a>
              </li>
              <li>
                <a href="mailto:support@example.com" className="hover:text-foreground transition-colors">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 WhatsApp AI Support Agent. Built for small businesses.
          </p>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>using n8n automation &a Vaibhav</span>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;