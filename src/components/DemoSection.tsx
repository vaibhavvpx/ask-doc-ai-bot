import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, Bot, Clock, CheckCircle } from "lucide-react";
import whatsappDemo from "@/assets/whatsapp-demo.jpg";

const DemoSection = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your AI assistant. How can I help you today?",
      sender: "bot",
      timestamp: "2:30 PM",
      type: "greeting"
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sampleQueries = [
    "What are your business hours?",
    "How do I cancel my subscription?",
    "Do you offer refunds?",
    "What payment methods do you accept?"
  ];

  const sampleFAQs = {
    "business hours": "We're open Monday-Friday 9am-5pm EST. Weekend support is available via email.",
    "cancel": "You can cancel your subscription anytime from your account settings. No cancellation fees apply.",
    "refund": "We offer full refunds within 30 days of purchase. Contact support to process your refund.",
    "payment": "We accept all major credit cards, PayPal, and bank transfers for enterprise customers."
  };

  const simulateResponse = (query: string) => {
    const lowerQuery = query.toLowerCase();
    let response = "";
    let responseType = "ai";

    // Check if query matches FAQ
    for (const [key, value] of Object.entries(sampleFAQs)) {
      if (lowerQuery.includes(key)) {
        response = value;
        responseType = "faq";
        break;
      }
    }

    // Fallback to AI response
    if (!response) {
      response = "I understand you're asking about something specific. While I don't have that exact information in our FAQ, I'd be happy to help! Could you provide more details, or would you like me to connect you with a human agent?";
      responseType = "ai";
    }

    return { response, responseType };
  };

  const handleSendMessage = (message = currentMessage) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: message,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: "user"
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage("");
    setIsTyping(true);

    // Simulate processing delay
    setTimeout(() => {
      const { response, responseType } = simulateResponse(message);
      
      const botMessage = {
        id: messages.length + 2,
        text: response,
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: responseType
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <section id="demo" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Live Demo</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience how the AI customer support agent works. Try asking questions 
            and see how it intelligently responds using FAQ data or AI fallback.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Sample Queries */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Try These Queries</CardTitle>
                <CardDescription>
                  Test the system with these sample questions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {sampleQueries.map((query, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left h-auto p-3"
                    onClick={() => handleSendMessage(query)}
                  >
                    <MessageCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">{query}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">System Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>Instant FAQ matching</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>AI-powered fallback</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>Context-aware responses</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>24/7 availability</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="bg-whatsapp text-whatsapp-foreground rounded-t-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">AI Support Agent</CardTitle>
                    <CardDescription className="text-whatsapp-foreground/80">
                      Online • Powered by n8n + AI
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 p-0 flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {message.sender === 'bot' && (
                            <div className="flex items-center gap-2">
                              <Bot className="w-4 h-4 flex-shrink-0 mt-0.5" />
                              {message.type === 'faq' && (
                                <Badge variant="secondary" className="text-xs">FAQ</Badge>
                              )}
                              {message.type === 'ai' && (
                                <Badge variant="outline" className="text-xs">AI</Badge>
                              )}
                            </div>
                          )}
                        </div>
                        <p className="text-sm mt-1">{message.text}</p>
                        <div className="flex items-center gap-1 mt-2 opacity-70">
                          <Clock className="w-3 h-3" />
                          <span className="text-xs">{message.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Typing indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                        <div className="flex items-center gap-2">
                          <Bot className="w-4 h-4" />
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button 
                      onClick={() => handleSendMessage()}
                      disabled={!currentMessage.trim() || isTyping}
                      size="icon"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-subtle rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Deploy?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl">
              This demo shows how your customers will interact with the AI agent. 
              The actual system will integrate with your WhatsApp Business account 
              and use your own FAQ content.
            </p>
            <Button variant="hero" size="lg" onClick={() => document.getElementById('setup')?.scrollIntoView({ behavior: 'smooth' })}>
              Start Building Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;