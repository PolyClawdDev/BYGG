# FINTHEM.NU Landing Page

A modern, minimal landing page for FINTHEM construction company built with Next.js 14 and Tailwind CSS.

## Features

- **Video Mask Effect**: Dynamic video texture playing inside the FINTHEM logo letters
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Modern Typography**: Montserrat for logo, Playfair Display for navigation
- **Minimal Design**: Clean, professional aesthetic with light beige background
- **Interactive Elements**: Animated hamburger menu and hover effects

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Fonts**: Google Fonts (Montserrat, Playfair Display)
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies: 
   ```bash
   npm install
   ```

3. Add your video file:
   - Place your background video as `/public/bg.mp4`
   - Recommended: 1920x1080 resolution, under 10MB, 10-30 seconds duration

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles and font imports
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main landing page
├── public/
│   ├── bg.mp4              # Background video (add your file here)
│   └── README.md           # Asset requirements
├── tailwind.config.js      # Tailwind configuration
├── next.config.js          # Next.js configuration
└── package.json            # Dependencies and scripts
```

## Customization

### Colors
- Background: `#f8f6f2` (light beige)
- Navigation text: `#9c7a6d` (soft brown)
- Defined in `tailwind.config.js`

### Fonts
- Logo: Montserrat (Bold/Black)
- Navigation: Playfair Display (Light)
- Imported via Google Fonts in `globals.css`

### Video Mask
The video mask effect uses CSS `mask-image` with SVG text. The mask is responsive and adjusts for different screen sizes.

## Browser Support

The video mask effect works in modern browsers that support CSS masking:
- Chrome 8+
- Firefox 3.5+
- Safari 4+
- Edge 12+

Fallback text is provided for older browsers.

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms
```bash
npm run build
npm start
```

## License

This project is private and proprietary to FINTHEM.NU.

## Credits

Inspired by the design aesthetic of martinkempdesign.com
