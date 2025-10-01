# Deployment Guide

This guide will help you deploy your ChatGPT Clone to production.

## Prerequisites

Before deploying, ensure you have:

- ✅ All API keys and credentials
- ✅ Production MongoDB cluster
- ✅ Cloudinary account configured
- ✅ Clerk production instance set up
- ✅ GitHub repository with your code

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel provides the best experience for Next.js applications with zero configuration.

#### Step 1: Push to GitHub

\`\`\`bash
git add .
git commit -m "Ready for deployment"
git push origin main
\`\`\`

#### Step 2: Import Project to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up or log in with GitHub
3. Click "Add New Project"
4. Import your repository
5. Select "Next.js" as the framework (auto-detected)

#### Step 3: Configure Environment Variables

Add all environment variables from your \`.env\` file:

\`\`\`
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_value
CLERK_SECRET_KEY=your_value
OPENAI_API_KEY=your_value
MONGODB_URI=your_value
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_value
CLOUDINARY_API_KEY=your_value
CLOUDINARY_API_SECRET=your_value
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
\`\`\`

#### Step 4: Deploy

Click "Deploy" and wait for the build to complete.

#### Step 5: Update Clerk URLs

1. Go to your Clerk dashboard
2. Update the allowed redirect URLs to include your Vercel domain
3. Update the environment variables in Vercel if needed

### Option 2: Deploy with Vercel CLI

\`\`\`bash

# Install Vercel CLI

npm install -g vercel

# Login

vercel login

# Deploy

vercel

# For production deployment

vercel --prod
\`\`\`

## Post-Deployment Setup

### 1. Update MongoDB Network Access

In MongoDB Atlas:

1. Go to "Network Access"
2. Add Vercel's IP addresses or use \`0.0.0.0/0\` (allow all IPs)
3. Save changes

### 2. Configure Clerk

In Clerk dashboard:

1. Add your production domain to allowed URLs
2. Update redirect URLs
3. Configure social login providers (if using)

### 3. Test Your Deployment

1. Visit your deployed URL
2. Test sign up/sign in
3. Create a conversation
4. Test file upload
5. Test message editing
6. Check mobile responsiveness

## Custom Domain

### Add Custom Domain on Vercel

1. Go to your project settings on Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Wait for SSL certificate (automatic)

### Update Environment Variables

Update \`NEXT_PUBLIC_APP_URL\` to your custom domain:

\`\`\`
NEXT_PUBLIC_APP_URL=https://yourdomain.com
\`\`\`

## Monitoring & Analytics

### Enable Vercel Analytics

Add to \`app/layout.tsx\`:

\`\`\`typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
return (
<html>
<body>
{children}
<Analytics />
</body>
</html>
);
}
\`\`\`

### Error Monitoring

Consider integrating:

- **Sentry** for error tracking
- **LogRocket** for session replay
- **Vercel Logs** for server-side logs

## Performance Optimization

### 1. Enable Caching

Vercel automatically caches static assets. For API routes, add cache headers:

\`\`\`typescript
export async function GET() {
return new Response(data, {
headers: {
'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
},
});
}
\`\`\`

### 2. Optimize Images

All images should use Next.js Image component (already implemented).

### 3. Enable Edge Functions

For faster response times, consider converting API routes to Edge Functions:

\`\`\`typescript
export const runtime = 'edge';
\`\`\`

## Scaling Considerations

### Database

- Monitor MongoDB usage
- Implement database indexes for queries
- Consider sharding for very large datasets

### API Rate Limits

- Implement rate limiting for API routes
- Monitor OpenAI API usage
- Set up billing alerts

### CDN

- Cloudinary serves files via CDN (already configured)
- Consider adding CloudFront for additional caching

## Backup Strategy

### Database Backups

1. Enable MongoDB automated backups
2. Set retention period (7-30 days)
3. Test restore process regularly

### Environment Variables

Keep a secure backup of all environment variables in a password manager.

## Security Checklist

- ✅ All API keys in environment variables
- ✅ HTTPS enabled (automatic on Vercel)
- ✅ CORS configured properly
- ✅ Rate limiting implemented
- ✅ Input validation on all forms
- ✅ MongoDB network access restricted
- ✅ Clerk authentication properly configured
- ✅ File upload size limits enforced

## Troubleshooting

### Build Fails

1. Check build logs in Vercel
2. Ensure all dependencies are in \`package.json\`
3. Verify Node.js version compatibility

### Runtime Errors

1. Check Vercel function logs
2. Verify environment variables are set
3. Check MongoDB connection string
4. Verify Clerk configuration

### Performance Issues

1. Check Vercel Analytics
2. Monitor database queries
3. Check OpenAI API response times
4. Review browser console for errors

## Rolling Back

If you need to rollback:

1. Go to Vercel deployments
2. Find previous working deployment
3. Click "..." menu
4. Select "Promote to Production"

## Cost Optimization

### Vercel

- Free tier: 100GB bandwidth/month
- Pro: $20/month for more bandwidth

### MongoDB

- Free tier: 512MB storage
- Shared cluster: $9/month for 2GB

### OpenAI

- Pay as you go
- Monitor usage in OpenAI dashboard
- Set usage limits

### Cloudinary

- Free tier: 25GB storage, 25GB bandwidth
- Plus: $89/month for more

## Support

If you encounter issues:

1. Check Vercel documentation
2. Review project README
3. Open an issue on GitHub
4. Contact Vercel support (Pro plan)

---

**Congratulations on deploying your ChatGPT Clone! 🚀**
