# AppHub Deployment Guide

This guide will walk you through deploying AppHub to Vercel.

## Prerequisites

- GitHub account
- Vercel account (free tier is sufficient)
- Supabase project with all tables created
- Admin account created in Supabase

## Step 1: Update Database Schema

Run the updated `supabase-schema.sql` in your Supabase SQL Editor to add the `app_suggestions` table:

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click on "SQL Editor" in the left sidebar
4. Click "New Query"
5. Copy the entire contents of `supabase-schema.sql`
6. Paste and click "Run"
7. Verify success message

The new schema includes:
- `app_suggestions` table for storing user-submitted app ideas
- RLS policies for admin access
- Indexes for performance
- Triggers for updated_at timestamps

## Step 2: Create Admin Account

You need to create an admin account that can view and manage all app suggestions.

### Option A: Sign Up Through the App

1. Run your app locally: `npm run dev`
2. Click "Sign In" in the header
3. Switch to "Sign Up" tab
4. Use email: `admin@apphub.com`
5. Create a strong password (save it securely!)
6. Complete the sign-up process

### Option B: Create Through Supabase Dashboard

1. Go to Supabase Dashboard
2. Navigate to Authentication > Users
3. Click "Add User"
4. Email: `admin@apphub.com`
5. Generate or create a strong password
6. Check "Auto Confirm User"
7. Click "Create User"

**Important**: Save the admin credentials securely. You'll need them to review app suggestions.

## Step 3: Push Code to GitHub

If you haven't already, push your code to GitHub:

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Complete AppHub with app suggestions feature"

# Create repository on GitHub and push
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

## Step 4: Deploy to Vercel

### Connect GitHub Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Vercel will detect it's a Vite project

### Configure Environment Variables

Before deploying, add these environment variables in Vercel:

1. In the import page, expand "Environment Variables"
2. Add the following variables:

| Name | Value | Where to Find |
|------|-------|---------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Supabase Dashboard → Settings → API → Project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon key | Supabase Dashboard → Settings → API → anon public key |
| `VITE_GROQ_API_KEY` | Your Groq API key | [Groq Console](https://console.groq.com/) |
| `VITE_TMDB_API_KEY` | Your TMDB API key | [TMDB Settings](https://www.themoviedb.org/settings/api) |

**Note**: All Vite environment variables must start with `VITE_` to be accessible in the browser.

### Deploy

1. Click "Deploy"
2. Wait for build to complete (usually 1-2 minutes)
3. Once complete, you'll get a URL like: `your-project.vercel.app`

## Step 5: Verify Deployment

### Test Core Functionality

1. Visit your deployed URL
2. Test authentication:
   - Click "Sign In"
   - Create a new account
   - Verify you can sign out and sign in again
3. Test each app:
   - **TD²**: Navigate to decision deck, test recommendations
   - **Budget Buddy**: Add transactions, set budgets
   - **Habit Hero**: Create habits, mark completions
4. Test app suggestions:
   - Navigate to `/apps`
   - Click "Suggest an App"
   - Fill and submit the form
   - Verify success message

### Verify Admin Access

1. Sign out from regular account
2. Sign in with admin credentials (`admin@apphub.com`)
3. Check Supabase Dashboard → Table Editor → app_suggestions
4. Verify you can see submitted suggestions

## Step 6: Custom Domain (Optional)

To use a custom domain:

1. Go to Vercel Project → Settings → Domains
2. Add your domain
3. Configure DNS records as instructed
4. Wait for DNS propagation (up to 48 hours)

## Environment Variables Management

### Local Development (.env.local)

```env
VITE_SUPABASE_URL=https://kojazqxfgugrftlnzjkh.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_GROQ_API_KEY=your_groq_key_here
VITE_TMDB_API_KEY=your_tmdb_key_here
```

### Production (Vercel)

All variables are configured in Vercel Dashboard → Project → Settings → Environment Variables

**Security Note**: Never commit `.env.local` to git. It's already in `.gitignore`.

## Troubleshooting

### Build Fails

**Error**: "Type error" during build
- **Solution**: Run `npm run build` locally to identify TypeScript errors
- Fix errors and push changes

**Error**: "Module not found"
- **Solution**: Ensure all dependencies are in `package.json`
- Run `npm install` and push `package.json` and `package-lock.json`

### Authentication Not Working

**Issue**: Can't sign in after deployment
- **Solution**: Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel
- Check Supabase Dashboard → Authentication → URL Configuration
- Add your Vercel domain to "Site URL" and "Redirect URLs"

### App Suggestions Not Saving

**Issue**: Form submits but no data in database
- **Solution**: Verify `app_suggestions` table exists in Supabase
- Check RLS policies are correctly configured
- Verify network tab shows successful API call

### Admin Can't See All Suggestions

**Issue**: Admin account only sees own suggestions
- **Solution**: Verify admin email is exactly `admin@apphub.com`
- Check RLS policies include admin email check
- Re-run the SQL schema if needed

## Continuous Deployment

Vercel automatically deploys when you push to GitHub:

1. Make changes locally
2. Commit: `git commit -m "Your changes"`
3. Push: `git push origin main`
4. Vercel automatically builds and deploys
5. Check deployment status in Vercel Dashboard

## Performance Optimization

For better performance in production:

1. **Enable Edge Functions**: Vercel automatically uses edge for API routes
2. **Image Optimization**: Already using Vite's asset optimization
3. **Caching**: Vercel handles automatic caching
4. **Analytics**: Enable Vercel Analytics in project settings

## Security Checklist

- ✅ Environment variables are in Vercel, not in code
- ✅ `.env.local` is in `.gitignore`
- ✅ Row Level Security is enabled on all tables
- ✅ Admin email is protected with RLS policies
- ✅ HTTPS is enforced by Vercel
- ✅ Supabase anon key is safe for public use (RLS protects data)

## Monitoring

### Vercel Analytics

Enable in Project Settings → Analytics to track:
- Page views
- User interactions
- Performance metrics

### Supabase Logs

Monitor in Supabase Dashboard → Logs:
- Database queries
- Authentication events
- API requests

## Support

If you encounter issues:

1. Check Vercel deployment logs
2. Check Supabase logs
3. Verify environment variables
4. Test locally with production build: `npm run build && npm run preview`

## Next Steps

After successful deployment:

1. **Create Admin Dashboard** (optional)
   - Add `/admin` route for reviewing suggestions
   - Display app_suggestions table
   - Add status update functionality

2. **Email Notifications** (optional)
   - Set up Supabase Edge Functions
   - Notify admin when new suggestion arrives
   - Notify users when their suggestion status changes

3. **Analytics Integration** (optional)
   - Add Google Analytics
   - Track app usage
   - Monitor user behavior

## Updating Your Deployment

To update your deployed app:

```bash
# Make your changes
git add .
git commit -m "Description of changes"
git push origin main

# Vercel automatically deploys the update
```

Your AppHub is now live! 🎉
