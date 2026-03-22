# 📱 Cloudflare Tunnel Setup Guide

## Quick Setup (Easiest Method)

### Step 1: Install Cloudflare Tunnel (cloudflared)

**Windows Installation:**
1. Download cloudflared from: https://github.com/cloudflare/cloudflared/releases
2. Download `cloudflared-windows-amd64.exe`
3. Rename it to `cloudflared.exe`
4. Move it to a folder in your PATH, or just keep it in your project folder

**Or use winget (if you have it):**
```cmd
winget install --id Cloudflare.cloudflared
```

**Or use Chocolatey:**
```cmd
choco install cloudflared
```

### Step 2: Start Your Dev Server
Make sure your Next.js dev server is running:
```cmd
cd creatisocial
npm run dev
```

Your site should be running on `http://localhost:3000`

### Step 3: Start Cloudflare Tunnel

Open a NEW terminal/command prompt and run:
```cmd
cloudflared tunnel --url http://localhost:3000
```

You'll see output like:
```
2024-03-22 10:30:45 INF Thank you for trying Cloudflare Tunnel. Doing so, without a Cloudflare account, is a quick way to experiment and try it out. However, be aware that these account-less Tunnels have no uptime guarantee. If you intend to use Tunnels in production you should use a pre-created named tunnel by following: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps
2024-03-22 10:30:45 INF Requesting new quick Tunnel on trycloudflare.com...
2024-03-22 10:30:46 INF +--------------------------------------------------------------------------------------------+
2024-03-22 10:30:46 INF |  Your quick Tunnel has been created! Visit it at (it may take some time to be reachable):  |
2024-03-22 10:30:46 INF |  https://random-words-1234.trycloudflare.com                                               |
2024-03-22 10:30:46 INF +--------------------------------------------------------------------------------------------+
```

### Step 4: Access on Your Phone
1. Copy the URL (e.g., `https://random-words-1234.trycloudflare.com`)
2. Open it on your phone's browser
3. Your website should load!

## Important Notes

- The tunnel URL is temporary and changes each time you restart cloudflared
- Keep both terminals running (dev server + cloudflared)
- The tunnel is public - anyone with the URL can access it
- Perfect for testing, but don't share sensitive data
- The URL expires when you close cloudflared

## Troubleshooting

**"cloudflared: command not found"**
- Make sure cloudflared is installed
- Try running from the folder where cloudflared.exe is located
- Add cloudflared to your PATH

**Tunnel connects but site doesn't load:**
- Make sure your dev server is running on port 3000
- Check if localhost:3000 works in your browser first
- Try restarting both the dev server and cloudflared

**"Connection refused"**
- Verify your dev server is running
- Check the port number (default is 3000)
- Make sure no firewall is blocking the connection

**Site loads but looks broken:**
- This is normal for the first load, refresh the page
- Check browser console for errors
- Some features might not work due to CORS or security policies

## Alternative: Using a Named Tunnel (More Stable)

If you want a permanent URL that doesn't change:

1. Create a Cloudflare account (free)
2. Install cloudflared (same as above)
3. Login:
   ```cmd
   cloudflared tunnel login
   ```
4. Create a tunnel:
   ```cmd
   cloudflared tunnel create my-dev-tunnel
   ```
5. Create a config file at `%USERPROFILE%\.cloudflared\config.yml`:
   ```yaml
   tunnel: YOUR_TUNNEL_ID
   credentials-file: C:\Users\YOUR_USERNAME\.cloudflared\YOUR_TUNNEL_ID.json

   ingress:
     - hostname: your-subdomain.yourdomain.com
       service: http://localhost:3000
     - service: http_status:404
   ```
6. Run the tunnel:
   ```cmd
   cloudflared tunnel run my-dev-tunnel
   ```

## Quick Commands Reference

**Start tunnel (quick/temporary):**
```cmd
cloudflared tunnel --url http://localhost:3000
```

**Start tunnel on different port:**
```cmd
cloudflared tunnel --url http://localhost:3001
```

**Check cloudflared version:**
```cmd
cloudflared --version
```

**Stop tunnel:**
Press `Ctrl+C` in the cloudflared terminal

## Tips for Mobile Testing

1. **Test on same WiFi:** Your phone should be on the same network (but it works on any network with Cloudflare Tunnel)
2. **Use DevTools:** Open Chrome DevTools on desktop and use device emulation first
3. **Test touch interactions:** Cloudflare Tunnel lets you test real touch events
4. **Check responsive design:** Test different screen sizes and orientations
5. **Test form submissions:** Make sure your contact form works on mobile

## Security Notes

- Quick tunnels are public and temporary
- Don't expose sensitive development data
- Don't use for production
- The tunnel URL is random and hard to guess, but not secret
- Consider using authentication if testing sensitive features

## When You're Done

1. Press `Ctrl+C` in the cloudflared terminal to stop the tunnel
2. The URL will stop working immediately
3. Your dev server can keep running for local development

---

**Need help?** Check the official docs: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/
