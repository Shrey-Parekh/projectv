# 🎯 Quick Setup Guide

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Add Your Images

1. Place all 150 images in the `public/images/` folder
2. Run the rename script to automatically rename them:
   ```bash
   python rename_images.py
   ```
   
   Or manually rename them to:
   - `image 1.jpg`
   - `image 2.jpg`
   - `image 3.jpg`
   - ... up to `image 150.jpg`

   **Note:** The script preserves file extensions, so if your images are `.png` or `.webp`, they'll keep those extensions.

## Step 3: Customize Your Love Meter

Open `components/LoveMeter.tsx` and change line 6:

```typescript
const START_DATE = new Date('2023-01-01'); // Change this to your actual date!
```

## Step 4: Add Background Music (Optional)

1. Place your romantic music file in `public/music/`
2. Name it `romantic-music.mp3` or `romantic-music.ogg`
3. The music toggle button will automatically find and play it

## Step 5: Test Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 6: Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" and import your repository
4. Click "Deploy" - that's it!

---

## Troubleshooting

### Images not showing?
- Make sure images are in `public/images/` (not `images/` in root)
- Check that filenames match: `image 1.jpg`, `image 2.jpg`, etc. (with spaces!)
- Try different file extensions (.jpg, .jpeg, .png, .webp)

### Music not playing?
- Make sure the file is named exactly `romantic-music.mp3` or `romantic-music.ogg`
- Check browser console for errors
- Some browsers require user interaction before playing audio

### Build errors?
- Make sure all dependencies are installed: `npm install`
- Check Node.js version (requires 18+)
- Try deleting `node_modules` and `.next` folder, then `npm install` again

---

Need help? Check the main README.md for more details!
