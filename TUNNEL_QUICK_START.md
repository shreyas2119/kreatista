# 🚀 Quick Start: Cloudflare Tunnel

## ✅ Cloudflared is Installed!

I've installed cloudflared on your system at: `C:\Program Files (x86)\cloudflared\`

## 🚀 Quick Start (Easiest Way)

### Option 1: Use the Batch File (Recommended - No Setup Needed!)

1. Make sure your dev server is running:
   ```cmd
   cd creatisocial
   npm run dev
   ```

2. Double-click `start-tunnel.bat` in the creatisocial folder
   
   OR run in terminal:
   ```cmd
   cd creatisocial
   start-tunnel.bat
   ```

3. Copy the URL that appears (like `https://something.trycloudflare.com`)

4. Open it on your phone!

### Option 2: Add to PATH (For using `cloudflared` command anywhere)

Run this in PowerShell (as Administrator):
```powershell
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\Program Files (x86)\cloudflared", "Machine")
```

Then restart your terminal and you can use:
```cmd
cloudflared tunnel --url http://localhost:3000
```

### Option 3: Use Full Path

```cmd
"C:\Program Files (x86)\cloudflared\cloudflared.exe" tunnel --url http://localhost:3000
```

---

## Troubleshooting

### "cloudflared: command not found" after restarting terminal

Try these locations manually:

```cmd
# Try 1
"C:\Program Files\cloudflared\cloudflared.exe" tunnel --url http://localhost:3000

# Try 2
"%LOCALAPPDATA%\Microsoft\WinGet\Packages\Cloudflare.cloudflared_*\cloudflared.exe" tunnel --url http://localhost:3000

# Try 3 - Just use the batch file
start-tunnel.bat
```

### Dev server not running

Make sure you started it first:
```cmd
cd creatisocial
npm run dev
```

### Tunnel connects but site doesn't load

- Wait 10-20 seconds after the tunnel starts
- Refresh the page on your phone
- Check if localhost:3000 works in your desktop browser first

---

## What You'll See

When the tunnel starts successfully, you'll see:
```
INF Thank you for trying Cloudflare Tunnel...
INF Requesting new quick Tunnel on trycloudflare.com...
INF +--------------------------------------------------------------------------------------------+
INF |  Your quick Tunnel has been created! Visit it at (it may take some time to be reachable):  |
INF |  https://your-unique-url.trycloudflare.com                                                 |
INF +--------------------------------------------------------------------------------------------+
```

Copy that URL and open it on your phone!

---

## Tips

- Keep both terminals open (dev server + tunnel)
- The URL changes each time you restart the tunnel
- The tunnel is public but the URL is random
- Press Ctrl+C to stop the tunnel
- Perfect for testing on real mobile devices!

---

## Need More Help?

Check the full guide: `CLOUDFLARE_TUNNEL_SETUP.md`
