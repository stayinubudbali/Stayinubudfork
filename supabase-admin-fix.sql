-- ============================================
-- FIX ADMIN LOGIN - Run this in Supabase SQL Editor
-- ============================================

-- Drop existing restrictive policy
DROP POLICY IF EXISTS "Admins can view admin users" ON admin_users;

-- Create policy that allows authenticated users to read their own entry
-- This is needed for login verification
CREATE POLICY "Users can check if they are admin" ON admin_users
  FOR SELECT USING (
    auth.jwt()->>'email' = email
  );

-- Create policy for admins to view all admin users
CREATE POLICY "Admins can view all admin users" ON admin_users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_users au 
      WHERE au.email = auth.jwt()->>'email'
      AND au.role IN ('admin', 'super_admin')
    )
  );

-- Admins can insert new admin users
CREATE POLICY "Admins can insert admin users" ON admin_users
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users au 
      WHERE au.email = auth.jwt()->>'email'
    )
  );

-- Admins can delete admin users (except themselves)
CREATE POLICY "Admins can delete admin users" ON admin_users
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM admin_users au 
      WHERE au.email = auth.jwt()->>'email'
    )
    AND email != auth.jwt()->>'email'
  );

-- ============================================
-- INSERT YOUR FIRST ADMIN USER
-- Replace with YOUR email that you registered in Supabase Auth
-- ============================================

INSERT INTO admin_users (email, role) 
VALUES ('your-email@example.com', 'super_admin')
ON CONFLICT (email) DO NOTHING;

-- ============================================
-- VERIFICATION QUERIES
-- Run these to check if everything is set up correctly
-- ============================================

-- Check if admin_users table exists and has data
SELECT * FROM admin_users;

-- Check current policies on admin_users
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'admin_users';
