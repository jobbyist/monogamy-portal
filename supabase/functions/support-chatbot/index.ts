import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, history } = await req.json();

    console.log('Received support request:', message);

    // System prompt for the support chatbot
    const systemPrompt = `You are a helpful customer support AI assistant for Monogamy, a web development and digital services company. 

Our services include:
- Domain registration and management
- Website development and hosting
- AI chatbot configuration and deployment
- Custom web applications
- SEO and digital marketing
- Technical support and maintenance

You can help with:
- Answering questions about our services
- Explaining pricing and packages
- Troubleshooting common technical issues
- Guiding users through our client portal features
- General inquiries about domain registration, website management, chatbot setup, billing, and invoices

If a user asks about something you cannot confidently answer, or if they explicitly request human support, politely let them know they should create a support ticket or ask to speak with a human agent.

Be friendly, professional, and concise in your responses.`;

    // Prepare messages for the AI
    const messages = [
      { role: "system", content: systemPrompt },
      ...history.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: "user", content: message },
    ];

    // Call the Lovable AI Gateway
    const aiResponse = await fetch('https://api.lovable.app/v1/ai-gateway/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('LOVABLE_API_KEY')}`,
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!aiResponse.ok) {
      console.error('AI Gateway error:', await aiResponse.text());
      throw new Error('Failed to get AI response');
    }

    const aiData = await aiResponse.json();
    const assistantMessage = aiData.choices[0]?.message?.content || 
      "I apologize, but I'm having trouble processing your request right now. Please try creating a support ticket for assistance from our team.";

    console.log('AI response:', assistantMessage);

    return new Response(
      JSON.stringify({ response: assistantMessage }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error in support-chatbot function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        response: "I'm having trouble connecting right now. Please create a support ticket for help from our team."
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});
