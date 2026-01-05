-- ============================================
-- APP SUGGESTIONS TABLE MIGRATION
-- ============================================
-- Run this if you already have the other tables set up
-- This adds ONLY the app_suggestions table and its policies

-- Create app suggestions table
CREATE TABLE IF NOT EXISTS app_suggestions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_email TEXT NOT NULL,
  app_name TEXT NOT NULL,
  description TEXT NOT NULL,
  features TEXT,
  use_case TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'implemented')),
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE app_suggestions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (just in case)
DROP POLICY IF EXISTS "Anyone can insert app suggestions" ON app_suggestions;
DROP POLICY IF EXISTS "Users can view own suggestions" ON app_suggestions;
DROP POLICY IF EXISTS "Admins can view all suggestions" ON app_suggestions;
DROP POLICY IF EXISTS "Admins can update all suggestions" ON app_suggestions;
DROP POLICY IF EXISTS "Admins can delete suggestions" ON app_suggestions;

-- Create policies
CREATE POLICY "Anyone can insert app suggestions"
  ON app_suggestions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view own suggestions"
  ON app_suggestions FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Admins can view all suggestions"
  ON app_suggestions FOR SELECT
  USING (
    auth.jwt() ->> 'email' = 'admin@apphub.com'
  );

CREATE POLICY "Admins can update all suggestions"
  ON app_suggestions FOR UPDATE
  USING (
    auth.jwt() ->> 'email' = 'admin@apphub.com'
  );

CREATE POLICY "Admins can delete suggestions"
  ON app_suggestions FOR DELETE
  USING (
    auth.jwt() ->> 'email' = 'admin@apphub.com'
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_app_suggestions_status ON app_suggestions(status);
CREATE INDEX IF NOT EXISTS idx_app_suggestions_created_at ON app_suggestions(created_at DESC);

-- Create updated_at trigger
CREATE TRIGGER update_app_suggestions_updated_at BEFORE UPDATE ON app_suggestions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- MIGRATION COMPLETE!
-- ============================================
-- App suggestions table is now ready.
-- Admin account (admin@apphub.com) can view and manage all suggestions.
