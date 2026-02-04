# 💕 Will You Be My Valentine? 💕

A playful, romantic, and interactive single-page website featuring an animated Valentine's Day proposal with an integrated photo gallery.

## ✨ Features

- **Interactive Question Section**: Playful "Yes" and "No" buttons with unique animations
  - Yes button: Beautiful celebration with confetti
  - No button: Runs away from cursor, gets progressively harder to click, shrinks with each attempt
- **Photo Gallery**: 150 images displayed in a creative polaroid-style scattered layout
- **Floating Hearts**: Animated hearts drifting across the screen
- **Custom Cursor**: Romantic-themed cursor design
- **Background Music**: Toggle for optional romantic instrumental music
- **Love Meter**: Displays days together (customizable date)
- **Smooth Animations**: Powered by Framer Motion for delightful micro-interactions
- **Responsive Design**: Works beautifully on mobile and desktop

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or download this repository**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Add your images:**
   - Place your 150 images in the `public/images/` folder
   - Use the provided Python script to rename them sequentially:
     ```bash
     python rename_images.py
     ```
   - Or manually name them: `image 1.jpg`, `image 2.jpg`, `image 3.jpg`, etc.
   - Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.bmp`, `.svg`

4. **Add background music (optional):**
   - Place your romantic music file in `public/music/`
   - Name it `romantic-music.mp3` or `romantic-music.ogg`

5. **Customize the Love Meter:**
   - Open `components/LoveMeter.tsx`
   - Change the `START_DATE` constant to your actual relationship start date:
     ```typescript
     const START_DATE = new Date('2023-01-01'); // Change this!
     ```

6. **Run the development server:**
   ```bash
   npm run dev
   ```

7. **Open your browser:**
   - Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
project-v/
├── app/
│   ├── globals.css          # Global styles and animations
│   ├── layout.tsx           # Root layout with fonts
│   └── page.tsx             # Main page component
├── components/
│   ├── ConfettiCelebration.tsx  # Confetti animation on "Yes"
│   ├── CustomCursor.tsx         # Custom cursor component
│   ├── FloatingHearts.tsx       # Animated background hearts
│   ├── InteractiveQuestion.tsx  # Main question section
│   ├── LoveMeter.tsx           # Days together counter
│   ├── MusicToggle.tsx         # Background music toggle
│   ├── NoButton.tsx            # Playful "No" button
│   ├── PhotoGallery.tsx        # Image gallery component
│   └── YesButton.tsx           # "Yes" button component
├── public/
│   ├── images/                 # Your 150 images go here
│   └── music/                  # Background music goes here
├── rename_images.py            # Script to rename images sequentially
└── README.md                   # This file
```

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` to customize the color palette. The current theme uses:
- **Blush/Rose**: Pink and red tones
- **Lilac**: Purple tones
- **Cream**: Warm beige tones

### Fonts

The project uses Google Fonts:
- **Comic Neue**: Handwriting-style font for playful text
- **Baloo 2**: Display font for headings

Fonts are loaded in `app/layout.tsx` and can be changed there.

### Images

- The gallery automatically tries multiple file extensions (`.jpg`, `.jpeg`, `.png`, `.webp`)
- Images are lazy-loaded for performance
- Gallery loads in batches of 20 images as you scroll

### Music

- Add your music file to `public/music/`
- Supported formats: `.mp3`, `.ogg`
- The music toggle will automatically find and play it

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect Next.js

3. **Configure build settings:**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Deploy!**
   - Click "Deploy"
   - Your site will be live in minutes

### Manual Deployment

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Start production server:**
   ```bash
   npm start
   ```

## 🛠️ Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `python rename_images.py` - Rename images sequentially

## 📝 Notes

- **No Emojis**: As requested, the site uses no emojis - only custom SVG hearts and illustrations
- **Performance**: Images are lazy-loaded and optimized using Next.js Image component
- **Mobile Friendly**: Custom cursor is disabled on mobile devices
- **Browser Support**: Works on all modern browsers (Chrome, Firefox, Safari, Edge)

## 🎁 Easter Eggs

Look for hidden interactive elements throughout the site! There's at least one easter egg waiting to be discovered.

## 💝 License

This project is created with love. Feel free to use and modify it for your own romantic purposes!

## 🙏 Credits

Built with:
- [Next.js](https://nextjs.org/) - React framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Canvas Confetti](https://github.com/catdad/canvas-confetti) - Confetti effects
- [Google Fonts](https://fonts.google.com/) - Typography

---

Made with ❤️ for someone special
