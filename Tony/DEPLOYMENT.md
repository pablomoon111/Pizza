# Deployment Guide

## Quick Deploy Options

### 1. Netlify (Recommended for static hosting)

1. Build the project:
   ```bash
   npm run build
   ```

2. Go to [netlify.com](https://netlify.com) and sign up
3. Drag and drop your `dist` folder to Netlify
4. Or connect your GitHub repository for automatic deployments

### 2. Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel --prod
   ```

### 3. GitHub Pages

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to package.json scripts:
   ```json
   {
     "scripts": {
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. Build and deploy:
   ```bash
   npm run build
   npm run deploy
   ```

### 4. Local Network Access

To access on other devices in your network:

1. Find your local IP address
2. Start the dev server:
   ```bash
   npm run dev -- --host
   ```
3. Access via `http://YOUR_IP_ADDRESS:5173`

## Environment Variables

Create a `.env` file for sensitive configurations:

```env
VITE_RESTAURANT_NAME="Tony's Pizza Palace"
VITE_PHONE_NUMBER="(517) 555-PIZZA"
VITE_ADDRESS="123 Main Street, Lansing, MI 48906"
VITE_TAX_RATE=0.085
VITE_DELIVERY_FEE=3.99
```

## Production Considerations

- Set up SSL certificate for secure transactions
- Configure proper backup systems
- Set up monitoring and logging
- Consider using a real database instead of local state
- Implement proper user authentication
- Add payment processing integration