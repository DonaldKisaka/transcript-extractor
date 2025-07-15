# Supabase Setup Guide

This guide will help you connect your existing Supabase project to this Next.js application.

## Prerequisites

- An existing Supabase project
- Your Supabase project URL and API keys

## Setup Steps

### 1. Get Your Supabase Credentials

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **API**
4. Copy the following values:
   - **Project URL** (e.g., `https://your-project.supabase.co`)
   - **anon public** key
   - **service_role** key (keep this secret!)

### 2. Create Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

**Important:** 
- Replace the placeholder values with your actual Supabase credentials
- The `NEXT_PUBLIC_` prefix makes variables available in the browser
- The `SUPABASE_SERVICE_ROLE_KEY` should never be exposed to the client

### 3. Update TypeScript Types (Optional but Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **API**
3. Copy the TypeScript types
4. Replace the content in `types/supabase.ts` with your actual database schema

### 4. Usage Examples

#### Client-side usage:
```typescript
import { supabase } from '@/lib/supabase'

// Example: Fetch data
const { data, error } = await supabase
  .from('your_table')
  .select('*')
```

#### Server-side usage (with admin privileges):
```typescript
import { supabaseAdmin } from '@/lib/supabase'

// Example: Insert data with admin privileges
const { data, error } = await supabaseAdmin
  .from('your_table')
  .insert([{ column: 'value' }])
```

## Security Notes

- Never expose the `SUPABASE_SERVICE_ROLE_KEY` to the client
- Use Row Level Security (RLS) policies in Supabase for data protection
- The `supabaseAdmin` client bypasses RLS - use it carefully

## Next Steps

1. Test your connection by making a simple query
2. Set up authentication if needed
3. Configure Row Level Security policies
4. Add your specific database schema to the types file

## Troubleshooting

- Ensure your environment variables are correctly set
- Check that your Supabase project is active
- Verify your API keys are correct
- Make sure your database tables exist and are accessible 