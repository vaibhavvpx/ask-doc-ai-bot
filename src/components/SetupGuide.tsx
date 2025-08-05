import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Download, ExternalLink, Copy, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SetupGuide = () => {
  const { toast } = useToast();
  const [copiedStep, setCopiedStep] = useState<string | null>(null);

  const copyToClipboard = (text: string, stepId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepId);
    toast({
      title: "Copied to clipboard",
      description: "Configuration copied successfully",
    });
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const downloadWorkflow = () => {
    const workflow = {
      "name": "WhatsApp AI Customer Support",
      "nodes": [
        {
          "name": "Webhook",
          "type": "n8n-nodes-base.webhook",
          "position": [240, 300],
          "parameters": {
            "httpMethod": "POST",
            "path": "whatsapp-webhook"
          }
        },
        {
          "name": "Google Docs",
          "type": "n8n-nodes-base.googleDocs",
          "position": [460, 300],
          "parameters": {
            "operation": "get",
            "documentId": "YOUR_GOOGLE_DOC_ID"
          }
        },
        {
          "name": "Text Search",
          "type": "n8n-nodes-base.function",
          "position": [680, 300],
          "parameters": {
            "functionCode": "// Search FAQ content for user query\nconst userMessage = items[0].json.entry[0].changes[0].value.messages[0].text.body;\nconst docContent = items[0].json.body.content;\n\n// Simple keyword matching - enhance as needed\nconst keywords = userMessage.toLowerCase().split(' ');\nlet bestMatch = null;\nlet bestScore = 0;\n\n// Search through document sections\ndocContent.forEach(section => {\n  if (section.paragraph) {\n    const text = section.paragraph.elements.map(e => e.textRun?.content || '').join('');\n    const score = keywords.filter(keyword => text.toLowerCase().includes(keyword)).length;\n    if (score > bestScore) {\n      bestScore = score;\n      bestMatch = text;\n    }\n  }\n});\n\nreturn [{\n  json: {\n    userMessage,\n    foundAnswer: bestMatch,\n    confidence: bestScore\n  }\n}];"
          }
        },
        {
          "name": "IF Answer Found",
          "type": "n8n-nodes-base.if",
          "position": [900, 300],
          "parameters": {
            "conditions": {
              "string": [
                {
                  "value1": "={{$json.foundAnswer}}",
                  "operation": "isNotEmpty"
                }
              ]
            }
          }
        },
        {
          "name": "OpenAI",
          "type": "n8n-nodes-base.openAi",
          "position": [1120, 400],
          "parameters": {
            "operation": "text",
            "model": "gpt-4",
            "prompt": "You are a helpful customer support agent. Based on this context: {{$json.docContent}} and this customer question: {{$json.userMessage}}, provide a helpful response."
          }
        },
        {
          "name": "WhatsApp Reply",
          "type": "n8n-nodes-base.httpRequest",
          "position": [1340, 300],
          "parameters": {
            "method": "POST",
            "url": "https://graph.facebook.com/v17.0/YOUR_PHONE_ID/messages",
            "authentication": "predefinedCredentialType",
            "nodeCredentialType": "whatsAppApi",
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "messaging_product": "whatsapp",
              "to": "={{$json.from}}",
              "text": {
                "body": "={{$json.foundAnswer || $json.aiResponse}}"
              }
            }
          }
        }
      ],
      "connections": {
        "Webhook": {
          "main": [
            [
              {
                "node": "Google Docs",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Google Docs": {
          "main": [
            [
              {
                "node": "Text Search",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Text Search": {
          "main": [
            [
              {
                "node": "IF Answer Found",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "IF Answer Found": {
          "main": [
            [
              {
                "node": "WhatsApp Reply",
                "type": "main",
                "index": 0
              }
            ],
            [
              {
                "node": "OpenAI",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "OpenAI": {
          "main": [
            [
              {
                "node": "WhatsApp Reply",
                "type": "main",
                "index": 0
              }
            ]
          ]
        }
      }
    };

    const blob = new Blob([JSON.stringify(workflow, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'whatsapp-ai-support-workflow.json';
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Workflow Downloaded",
      description: "Import this JSON file into your n8n instance",
    });
  };

  return (
    <section id="setup" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Setup Guide</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Follow these step-by-step instructions to deploy your WhatsApp AI customer support agent.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="prerequisites" className="space-y-8">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="prerequisites">Prerequisites</TabsTrigger>
              <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
              <TabsTrigger value="google">Google Docs</TabsTrigger>
              <TabsTrigger value="n8n">n8n Setup</TabsTrigger>
              <TabsTrigger value="ai">AI Config</TabsTrigger>
            </TabsList>

            <TabsContent value="prerequisites">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Prerequisites
                  </CardTitle>
                  <CardDescription>
                    What you'll need before getting started
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold">Required Accounts</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-primary" />
                          <span>Meta Developer Account</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-primary" />
                          <span>Google Cloud Account</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-primary" />
                          <span>n8n Cloud or Self-hosted</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-primary" />
                          <span>OpenAI or Gemini API</span>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold">Estimated Costs</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• WhatsApp Business API: Free tier available</li>
                        <li>• Google Docs API: Free for basic usage</li>
                        <li>• n8n: €20/month (cloud) or self-hosted</li>
                        <li>• OpenAI API: Pay per usage (~$0.002/1K tokens)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="whatsapp">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge className="bg-whatsapp text-whatsapp-foreground">1</Badge>
                    WhatsApp Cloud API Setup
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">1. Create Meta Developer Account</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Visit Meta for Developers and create an app with WhatsApp product.
                      </p>
                      <Button variant="outline" size="sm" asChild>
                        <a href="https://developers.facebook.com" target="_blank" rel="noopener">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Open Meta Developers
                        </a>
                      </Button>
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">2. Configure Webhook</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Set up webhook URL in your WhatsApp Business Account
                      </p>
                      <div className="bg-background p-3 rounded border font-mono text-sm">
                        https://your-n8n-instance.com/webhook/whatsapp-webhook
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => copyToClipboard("https://your-n8n-instance.com/webhook/whatsapp-webhook", "webhook")}
                        className="mt-2"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        {copiedStep === "webhook" ? "Copied!" : "Copy URL"}
                      </Button>
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">3. Get Access Tokens</h4>
                      <p className="text-sm text-muted-foreground">
                        Copy your Phone Number ID and Permanent Access Token from the WhatsApp Business Account.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="google">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge className="bg-blue-600 text-white">2</Badge>
                    Google Docs Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">1. Create FAQ Document</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Create a Google Doc with your FAQs in a structured format.
                      </p>
                      <div className="bg-background p-3 rounded border text-sm">
                        <strong>Sample FAQ Structure:</strong><br />
                        <br />
                        <strong>Q: What are your hours?</strong><br />
                        A: We're open Monday-Friday 9am-5pm EST.<br />
                        <br />
                        <strong>Q: How do I cancel my subscription?</strong><br />
                        A: You can cancel anytime from your account settings.
                      </div>
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">2. Enable Google Docs API</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Enable the Google Docs API in your Google Cloud Console.
                      </p>
                      <Button variant="outline" size="sm" asChild>
                        <a href="https://console.cloud.google.com/apis/library/docs.googleapis.com" target="_blank" rel="noopener">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Enable API
                        </a>
                      </Button>
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">3. Share Document</h4>
                      <p className="text-sm text-muted-foreground">
                        Share your Google Doc with your service account email or make it publicly readable.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="n8n">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge className="bg-red-500 text-white">3</Badge>
                    n8n Workflow Import
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">1. Download Workflow</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Download our pre-built n8n workflow JSON file.
                      </p>
                      <Button onClick={downloadWorkflow} className="gap-2">
                        <Download className="w-4 h-4" />
                        Download Workflow
                      </Button>
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">2. Import to n8n</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Open your n8n instance and import the downloaded workflow.
                      </p>
                      <ol className="text-sm space-y-1 text-muted-foreground">
                        <li>1. Go to n8n dashboard</li>
                        <li>2. Click "New" → "Import from file"</li>
                        <li>3. Select the downloaded JSON file</li>
                        <li>4. Configure node credentials</li>
                      </ol>
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">3. Configure Credentials</h4>
                      <p className="text-sm text-muted-foreground">
                        Add your API keys and tokens to the respective nodes in the workflow.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ai">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge className="bg-purple-600 text-white">4</Badge>
                    AI Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">OpenAI Setup</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Get your OpenAI API key and configure the AI node.
                      </p>
                      <div className="bg-background p-3 rounded border font-mono text-sm">
                        Model: gpt-4<br />
                        Temperature: 0.7<br />
                        Max Tokens: 500
                      </div>
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Gemini Alternative</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Or use Google's Gemini API for AI responses.
                      </p>
                      <div className="bg-background p-3 rounded border font-mono text-sm">
                        Model: gemini-pro<br />
                        Temperature: 0.8<br />
                        Safety: BLOCK_MEDIUM_AND_ABOVE
                      </div>
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Custom Prompt Template</h4>
                      <div className="bg-background p-3 rounded border text-sm">
                        You are a helpful customer support agent for [BUSINESS_NAME]. 
                        Based on this documentation: {`{docs_content}`} and this customer question: {`{user_message}`}, 
                        provide a helpful, concise response. If you cannot answer based on the documentation, 
                        politely ask them to contact human support.
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => copyToClipboard("You are a helpful customer support agent for [BUSINESS_NAME]. Based on this documentation: {{docs_content}} and this customer question: {{user_message}}, provide a helpful, concise response. If you cannot answer based on the documentation, politely ask them to contact human support.", "prompt")}
                        className="mt-2"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        {copiedStep === "prompt" ? "Copied!" : "Copy Prompt"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default SetupGuide;