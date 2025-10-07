-- Add language and currency preferences to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS preferred_language TEXT DEFAULT 'en',
ADD COLUMN IF NOT EXISTS preferred_currency TEXT DEFAULT 'USD';

-- Add check constraints for valid values
ALTER TABLE public.profiles
ADD CONSTRAINT valid_language CHECK (preferred_language IN ('en', 'af', 'zu', 'xh', 'es', 'fr')),
ADD CONSTRAINT valid_currency CHECK (preferred_currency IN ('USD', 'ZAR', 'EUR', 'GBP'));
