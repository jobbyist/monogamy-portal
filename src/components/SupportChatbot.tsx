import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SupportChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI support assistant. I can help you with questions about our services, domain registration, website management, chatbot configuration, and billing. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Check if user wants human support
      const wantsHumanSupport = input.toLowerCase().includes("human") || 
                                 input.toLowerCase().includes("real person") ||
                                 input.toLowerCase().includes("speak to someone");

      if (wantsHumanSupport) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "I understand you'd like to speak with a human support agent. Please create a support ticket using the 'New Ticket' button above, and our team will get back to you as soon as possible.",
          },
        ]);
        setLoading(false);
        return;
      }

      // Call AI for response
      const response = await fetch("https://zjtujfpmosxyqzegzspj.supabase.co/functions/v1/support-chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          history: messages,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.response || "I apologize, but I couldn't process your request. Please try creating a support ticket for human assistance.",
        },
      ]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again or create a support ticket.",
        variant: "destructive",
      });
      
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm having trouble connecting right now. Please create a support ticket using the button above for help from our team.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Bot className="h-6 w-6 text-primary" />
          <div>
            <CardTitle>AI Support Assistant</CardTitle>
            <CardDescription>Get instant help with common questions</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <Bot className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                )}
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                {message.role === "user" && (
                  <User className="h-6 w-6 text-muted-foreground mt-1 flex-shrink-0" />
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-3 justify-start">
                <Bot className="h-6 w-6 text-primary mt-1" />
                <div className="bg-muted rounded-lg px-4 py-2">
                  <p className="text-sm">Thinking...</p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask a question..."
            disabled={loading}
          />
          <Button onClick={handleSend} disabled={loading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupportChatbot;
