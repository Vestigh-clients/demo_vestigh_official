ALTER TABLE public.orders
ALTER COLUMN currency SET DEFAULT 'GHS';

UPDATE public.orders
SET currency = 'GHS'
WHERE currency IS NULL OR currency = 'NGN';
