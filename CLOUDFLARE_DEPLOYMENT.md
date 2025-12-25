# 🚀 Cloudflare Pages Deployment Guide

## Prerequisites
- Cloudflare account (free tier supported)
- GitHub repository connected
- Environment variables ready

## Setup Steps

### 1. Connect GitHub Repository to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select **Pages** > **Connect to Git**
3. Authorize GitHub and select your `cipeng` repository
4. Choose deployment settings:
   - **Framework**: Next.js
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Root directory**: `/` (default)

### 2. Configure Environment Variables

In Cloudflare Pages dashboard, add these environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
NEXT_PUBLIC_RESEND_API_KEY=your_resend_api_key
RESEND_API_KEY=your_resend_api_key
```

**Important**: 
- Variables starting with `NEXT_PUBLIC_` are exposed to browser
- Keep sensitive keys like `SUPABASE_SERVICE_ROLE_KEY` private

### 3. Build Configuration

The following files have been added/updated for Cloudflare compatibility:

#### `wrangler.toml`
- Configuration for Cloudflare Workers/Pages
- Specifies build command and output
- Enables Node.js compatibility

#### `public/_headers`
- Security headers configuration
- Cache control rules
- CSP (Content Security Policy)

#### `next.config.js`
- Removed Vercel-specific headers() function
- Kept all other optimizations intact

### 4. Deploy

After pushing changes to GitHub, Cloudflare will:
1. Detect the build configuration
2. Run `npm run build`
3. Deploy to Cloudflare's global network
4. Provide a `.pages.dev` domain

You can also manually deploy using Wrangler CLI:

```bash
# Install Wrangler globally
npm install -g @cloudflare/wrangler

# Build the project
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy
```

## Architecture

### How It Works
- **Static Pages**: Served from Cloudflare's global CDN
- **API Routes**: Run on Cloudflare Workers (edge runtime)
- **Database**: Supabase (external)
- **Email Service**: Resend API (external)
- **Storage**: Supabase Storage (external)

### Edge Runtime Compatibility ✅
- The `/api/send-email` route uses `export const runtime = 'edge'`
- Compatible with Cloudflare Workers
- No Node.js-only APIs detected
- All external services are HTTP-based

## Features Still Supported

✅ **Fully Compatible:**
- Next.js App Router
- Server Components
- API Routes with Edge Runtime
- Image Optimization (via Cloudflare Images)
- Authentication (Supabase)
- Database queries (Supabase)
- Email sending (Resend)
- File uploads (Supabase Storage)

⚠️ **Limitations:**
- Incremental Static Regeneration (ISR) works differently
- Server-side rendering caching varies
- Max request timeout: 30 seconds (Cloudflare limit)

## Testing Before Production

```bash
# 1. Build locally
npm run build

# 2. Test the build
npm start

# 3. Test API endpoint
curl -X POST http://localhost:3000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "templateName": "booking-confirmation",
    "recipientEmail": "test@example.com",
    "variables": {}
  }'
```

## Monitoring & Debugging

### Cloudflare Dashboard
- Check deployment logs
- View analytics
- Monitor error rates
- Track performance metrics

### Access Logs
View real-time logs in Cloudflare:
```bash
wrangler tail --project-name=stayinubud
```

## Troubleshooting

### Build Fails
- Check Node.js version compatibility
- Verify `package.json` scripts
- Review build logs in dashboard

### API Errors
- Verify environment variables are set
- Check Supabase connection
- Test API endpoint directly

### Performance Issues
- Review Cloudflare Analytics
- Check Supabase query performance
- Optimize images further if needed

## Rollback

If you need to rollback:
1. Go to Cloudflare Pages dashboard
2. Select deployment history
3. Redeploy a previous version

## Next Steps

1. **Push these changes**: All config files are ready
2. **Connect GitHub**: Follow step 1 above
3. **Set environment variables**: Follow step 2
4. **Deploy**: Cloudflare will automatically build on push
5. **Monitor**: Check deployment status and logs

## Support

For issues:
- Check [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- Check [Next.js Deployment Guide](https://nextjs.org/docs/app/building-your-application/deploying)
- Review [Supabase Documentation](https://supabase.com/docs)
