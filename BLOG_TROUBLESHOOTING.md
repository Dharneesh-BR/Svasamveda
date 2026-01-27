# Blog Troubleshooting Guide

## Issue Fixed
The blog page was showing a routing error: `No routes matched location "/blog"`

## Root Cause
The blog routes were missing from the React Router configuration in `src/App.jsx`, even though the blog components were imported.

## Solution Applied
Added the missing blog routes to the Routes section in `src/App.jsx`:

```jsx
<Route path="/blog" element={<Blog />} />
<Route path="/blog/:slug" element={<BlogPost />} />
<Route path="/all-articles" element={<AllArticles />} />
```

## Current Blog Setup

### Components Structure
- **Blog.jsx** - Main blog page component
- **BlogPosts.jsx** - Component that fetches and displays blog posts from Sanity
- **BlogPost.jsx** - Individual blog post page
- **AllArticles.jsx** - All articles listing page

### Sanity Integration
- **Project ID**: `n5smwbzi`
- **Dataset**: `production1`
- **API Version**: `2023-05-03`
- **Content Type**: `blogPost`

### Blog Post Schema
The blog posts should have the following fields in Sanity:
- `_id`
- `title`
- `slug` (slug.current)
- `excerpt`
- `publishedAt`
- `thumbnail` or `mainImage`

## Testing the Blog

### 1. Check Sanity Content
Make sure you have blog posts in your Sanity studio with the correct schema:
1. Go to your Sanity Studio
2. Navigate to the blogPost content type
3. Create or verify you have blog posts with:
   - Title
   - Slug (required for routing)
   - Published date
   - Excerpt (optional)
   - Thumbnail image (optional)

### 2. Check Network Requests
Open browser dev tools and check the Network tab when visiting `/blog`:
- Look for requests to Sanity API
- Check if the GROQ query is being executed
- Verify the response contains blog post data

### 3. Console Debugging
The blog components include detailed console logging:
- Check browser console for Sanity query logs
- Look for any error messages
- Verify the API response data

## Common Issues & Solutions

### Issue: "No blog posts found"
**Possible Causes:**
- No blog posts in Sanity dataset
- Incorrect dataset name in configuration
- Blog posts don't have the required `slug` field

**Solutions:**
1. Add blog posts in Sanity Studio
2. Verify dataset name in `.env` file
3. Ensure all blog posts have slugs

### Issue: Sanity API Error
**Possible Causes:**
- Incorrect project ID or dataset
- Network connectivity issues
- API version mismatch

**Solutions:**
1. Verify Sanity credentials in `.env`
2. Check network connectivity
3. Update API version if needed

### Issue: Images not loading
**Possible Causes:**
- Missing `thumbnail` or `mainImage` fields
- Incorrect image URL builder configuration

**Solutions:**
1. Add images to blog posts in Sanity
2. Verify `urlFor` function is working correctly

## Blog URLs Structure
- **Main Blog Page**: `/blog`
- **Individual Post**: `/blog/{slug}`
- **All Articles**: `/all-articles`

## Next Steps
1. **Deploy the changes** - The routing fix has been applied and builds successfully
2. **Test in production** - Visit `/blog` on your deployed site
3. **Add blog content** - Create blog posts in Sanity Studio
4. **Monitor performance** - Check if blog posts load correctly

## Additional Features You Might Want
- Blog pagination
- Blog categories/tags
- Blog search functionality
- Blog post comments
- Related posts section

## Support
If you continue to experience issues:
1. Check browser console for errors
2. Verify Sanity Studio configuration
3. Test the Sanity API directly
4. Review the network requests in browser dev tools
