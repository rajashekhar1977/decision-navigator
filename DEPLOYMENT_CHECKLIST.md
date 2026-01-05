# Deployment Checklist

Complete these steps to deploy AppHub to Vercel.

## Pre-Deployment

- [ ] All code changes committed to git
- [ ] `.env.local` file exists locally (not committed)
- [ ] All TypeScript errors resolved (`npm run build` succeeds)

## Database Setup

- [ ] Run updated `supabase-schema.sql` in Supabase SQL Editor
- [ ] Verify `app_suggestions` table created
- [ ] Verify RLS policies exist for app_suggestions
- [ ] Check indexes and triggers are in place

## Admin Account

- [ ] Create admin account with email: `admin@apphub.com`
- [ ] Password saved securely
- [ ] Verify admin can sign in to the app
- [ ] Test admin access to app_suggestions table in Supabase

## GitHub Setup

- [ ] Repository created on GitHub
- [ ] Code pushed to main branch
- [ ] Repository is public or Vercel has access

## Vercel Configuration

- [ ] Vercel account created/logged in
- [ ] Project imported from GitHub
- [ ] Environment variables added:
  - [ ] `VITE_SUPABASE_URL`
  - [ ] `VITE_SUPABASE_ANON_KEY`
  - [ ] `VITE_GROQ_API_KEY`
  - [ ] `VITE_TMDB_API_KEY`

## Deployment

- [ ] Click "Deploy" in Vercel
- [ ] Wait for build to complete
- [ ] Deployment successful (no errors)
- [ ] Production URL obtained

## Post-Deployment Testing

### Authentication
- [ ] Visit production URL
- [ ] Sign up with new account
- [ ] Sign in with created account
- [ ] Sign out successfully
- [ ] Sign in again to verify persistence

### TD² (Decision Deck)
- [ ] Navigate to /td2
- [ ] Test FlowSurvey feature
- [ ] Verify recommendations load
- [ ] Test category filtering

### Budget Buddy
- [ ] Navigate to /budget
- [ ] Add a transaction
- [ ] Set a budget limit
- [ ] Verify data persists after refresh
- [ ] Delete a transaction

### Habit Hero
- [ ] Navigate to /habit
- [ ] Create a new habit
- [ ] Mark habit as complete for today
- [ ] Verify streak calculation
- [ ] Check achievements display

### App Suggestions
- [ ] Navigate to /apps
- [ ] Click "Suggest an App"
- [ ] Fill out the form completely
- [ ] Submit the form
- [ ] Verify success message
- [ ] Check Supabase `app_suggestions` table for submission

### Footer Pages
- [ ] Visit /about - content displays correctly
- [ ] Visit /privacy - policy is readable
- [ ] Visit /terms - terms display properly
- [ ] Visit /contact - form is functional
- [ ] All footer links work

### Admin Verification
- [ ] Sign out from regular account
- [ ] Sign in with admin@apphub.com
- [ ] Check Supabase for app suggestions
- [ ] Verify admin can see all submissions
- [ ] Update a suggestion status
- [ ] Add admin notes to a suggestion

## Supabase Configuration

- [ ] Add production URL to Supabase:
  - Go to Authentication → URL Configuration
  - Add Vercel URL to "Site URL"
  - Add Vercel URL to "Redirect URLs"
- [ ] Verify RLS policies are working
- [ ] Check API logs for errors

## Performance Checks

- [ ] Page load time < 3 seconds
- [ ] Images load properly
- [ ] No console errors in browser
- [ ] Mobile responsive design works
- [ ] Dark mode toggle functions correctly

## Optional Enhancements

- [ ] Custom domain configured
- [ ] Vercel Analytics enabled
- [ ] Monitoring set up
- [ ] Error tracking configured (e.g., Sentry)

## Documentation

- [ ] README.md updated with live URL
- [ ] DEPLOYMENT_GUIDE.md reviewed
- [ ] ADMIN_SETUP.md reviewed
- [ ] .github/copilot-instructions.md updated

## Final Verification

- [ ] All features work in production
- [ ] No TypeScript/build errors
- [ ] No runtime errors in console
- [ ] Data persists correctly in Supabase
- [ ] Admin access functions properly
- [ ] Ready for users! 🎉

## Rollback Plan

If deployment fails:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test local build: `npm run build && npm run preview`
4. Fix issues and redeploy
5. If critical: revert to previous deployment in Vercel

## Continuous Deployment

After initial deployment:
- Automatic deploys on push to main
- Preview deploys for pull requests
- Monitor Vercel dashboard for build status

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)
- Deployment logs: Vercel Dashboard → Your Project → Deployments
- Database logs: Supabase Dashboard → Logs

---

**Deployment Date**: _______________
**Production URL**: _______________
**Admin Password**: (Stored in password manager)
**Deployed By**: _______________
