import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const KNOWLEDGE_BASE = `
MONOGAMY SERVICES AND OFFERINGS:

We help modern law firms manage their digital assets with consolidated, fully customizable dashboard infrastructure and deploy robust workflow automation systems tailored to your law practice's goals and requirements.

OUR SERVICES:
1. Workflow Automation: Optimize business processes and streamline operations to significantly minimize costs and maximize overall efficiency.

2. Chatbot Development: Enhance customer interactions by automating responses with intelligent chatbots, providing seamless service.

3. Content Creation: Effortlessly generate high-quality, engaging content tailored to your audience using AI-powered tools.

4. Client Intake: Strengthen your sales pipeline by identifying, targeting, and attracting high-quality prospects with precision.

5. Custom Dashboards: Extract actionable insights from complex data sets to drive informed decisions and accelerate business growth.

6. Conversational AI: Work with our experts to develop personalized AI strategies that streamline operations and deliver impactful results.

PRICING PLANS:

Standard Plan - $480/month
- Basic workflow automation
- Basic chatbot development
- 60 content requests
- Email support
- 1 consultation per month

Professional Plan - $960/month
- Advanced workflow automation
- Advanced chatbot development
- 150 content requests
- Email support
- 2 consultations per month

Enterprise Plan - Custom pricing
- Custom workflow automation
- Custom chatbot development
- Unlimited content requests
- 24hr priority support
- Unlimited consultations per month

CONTACT INFORMATION:
- Email: support@monogamy.legal
- South Africa: +27 12 880 6560
- US: +1 (510) 777-6719
- Serving clients across South Africa & the US

KEY BENEFITS:
- Cost reduction through optimized processes
- Improved outcomes with data-driven insights
- Increased productivity by automating redundant tasks

PLATFORM FEATURES:
Users can access a self-service client portal to:
- Manage their accounts
- Register and manage domains
- Manage websites
- Configure AI chatbots
- View invoices and transaction history
- Process payments (PayFast and PayPal)
- Enable/disable services
- Manage their law practice profile
- Get AI-powered support
`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, history } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are Monogamy AI, a friendly and professional AI assistant for Monogamy, a platform that helps law firms with digital asset management and AI-powered workflow automation.

Your role is to:
1. Answer questions about Monogamy's services, pricing, and platform features
2. Help users understand how to use the client portal
3. Provide support for common issues
4. Be conversational and helpful, using natural language
5. Format your responses using markdown for better readability, but avoid using asterisks for emphasis
6. If you cannot answer a question or if the user requests human support, politely let them know they can create a support ticket for assistance from the team

Use the following knowledge base to answer questions:

${KNOWLEDGE_BASE}

Always be professional, friendly, and helpful. If you're unsure about something, be honest and suggest contacting the support team.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...history.map((msg: any) => ({ role: msg.role, content: msg.content })),
          { role: "user", content: message },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("Failed to get AI response");
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || "I apologize, I couldn't process that request.";

    return new Response(
      JSON.stringify({ response: aiResponse }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in monogamy-ai function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});