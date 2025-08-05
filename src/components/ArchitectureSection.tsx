import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, FileText, MessageSquare, Brain, Database } from "lucide-react";
import workflowImage from "@/assets/workflow-diagram.jpg";

const ArchitectureSection = () => {
  const components = [
    {
      icon: MessageSquare,
      title: "WhatsApp Cloud API",
      description: "Receive and send messages via Meta's official API",
      color: "text-whatsapp"
    },
    {
      icon: FileText,
      title: "Google Docs",
      description: "Dynamic FAQ source that admins can easily update",
      color: "text-blue-600"
    },
    {
      icon: Brain,
      title: "OpenAI/Gemini",
      description: "AI fallback for complex queries not in documentation",
      color: "text-purple-600"
    },
    {
      icon: Database,
      title: "n8n Automation",
      description: "No-code workflow orchestration and logic",
      color: "text-red-500"
    }
  ];

  return (
    <section id="architecture" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">System Architecture</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A seamless integration of industry-leading tools that work together 
            to deliver intelligent customer support automation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img 
              src={workflowImage} 
              alt="n8n Workflow Architecture"
              className="rounded-xl shadow-elegant w-full"
            />
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">How It Works</h3>
            <div className="space-y-4">
              {[
                "Customer sends message via WhatsApp",
                "Webhook triggers n8n workflow",
                "Google Doc is searched for relevant FAQ",
                "If match found, reply from documentation",
                "If no match, AI generates contextual response",
                "Response sent back through WhatsApp API"
              ].map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </div>
                  <p className="text-muted-foreground">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {components.map((component, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 rounded-full bg-accent flex items-center justify-center mb-4">
                  <component.icon className={`w-6 h-6 ${component.color}`} />
                </div>
                <CardTitle className="text-lg">{component.title}</CardTitle>
                <CardDescription>{component.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-gradient-subtle rounded-2xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Data Flow Overview</h3>
            <div className="flex flex-wrap justify-center items-center gap-4 text-sm">
              <span className="bg-whatsapp text-whatsapp-foreground px-3 py-1 rounded-full">WhatsApp</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <span className="bg-red-500 text-white px-3 py-1 rounded-full">n8n</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full">Google Docs</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <span className="bg-purple-600 text-white px-3 py-1 rounded-full">AI</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <span className="bg-whatsapp text-whatsapp-foreground px-3 py-1 rounded-full">Response</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureSection;