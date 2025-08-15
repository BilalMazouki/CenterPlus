"use client"

import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let browserClient: SupabaseClient | null = null

export function getSupabaseClient(): SupabaseClient {
  if (browserClient) return browserClient
  if (typeof window === 'undefined') {
    throw new Error('Supabase client is only available in the browser.')
  }
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    throw new Error('Missing Supabase environment variables')
  }
  browserClient = createClient(url, key)
  return browserClient
}
