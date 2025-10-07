-- Add pricing plan enum
CREATE TYPE pricing_plan AS ENUM ('standard', 'professional', 'enterprise');

-- Add service type enum  
CREATE TYPE service_type AS ENUM ('workflow_automation', 'chatbot_development', 'content_creation', 'client_intake', 'custom_dashboards', 'conversational_ai');

-- Update profiles table with additional fields
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS law_firm_name TEXT,
ADD COLUMN IF NOT EXISTS practice_area TEXT,
ADD COLUMN IF NOT EXISTS registration_number TEXT,
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS state TEXT,
ADD COLUMN IF NOT EXISTS country TEXT,
ADD COLUMN IF NOT EXISTS postal_code TEXT,
ADD COLUMN IF NOT EXISTS pricing_plan pricing_plan DEFAULT 'standard',
ADD COLUMN IF NOT EXISTS plan_start_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS plan_renewal_date TIMESTAMP WITH TIME ZONE;

-- Create services table
CREATE TABLE IF NOT EXISTS public.user_services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  service_type service_type NOT NULL,
  is_enabled BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, service_type)
);

ALTER TABLE public.user_services ENABLE ROW LEVEL SECURITY;

-- RLS policies for user_services
CREATE POLICY "Users can view own services"
  ON public.user_services
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own services"
  ON public.user_services
  FOR ALL
  USING (auth.uid() = user_id);

-- Create payment_methods table
CREATE TABLE IF NOT EXISTS public.payment_methods (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  provider TEXT NOT NULL, -- 'payfast' or 'paypal'
  is_active BOOLEAN DEFAULT true,
  provider_customer_id TEXT,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.payment_methods ENABLE ROW LEVEL SECURITY;

-- RLS policies for payment_methods
CREATE POLICY "Users can view own payment methods"
  ON public.payment_methods
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own payment methods"
  ON public.payment_methods
  FOR ALL
  USING (auth.uid() = user_id);

-- Update trigger for user_services
CREATE TRIGGER update_user_services_updated_at
  BEFORE UPDATE ON public.user_services
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Update trigger for payment_methods
CREATE TRIGGER update_payment_methods_updated_at
  BEFORE UPDATE ON public.payment_methods
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();