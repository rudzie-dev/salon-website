@font-face {
  font-family: 'IvyMode';
  src: url('/fonts/fonntscom-IvyModeRegular.woff2') format('woff2'),
       url('/fonts/fonntscom-IvyModeRegular.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    font-family: 'Inter', sans-serif;
    @apply antialiased text-zinc-900 bg-white;
  }
  .font-serif {
    font-family: 'IvyMode', serif !important;
  }
}

@layer utilities {
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }

  /* SVG Drawing Animation */
  .animate-draw {
    stroke-dasharray: 500;
    stroke-dashoffset: 500;
    animation: draw 3s ease-in-out infinite alternate;
  }

  @keyframes draw {
    to {
      stroke-dashoffset: 0;
    }
  }

  /* Strip Block Exit Animation */
  .exit-strip {
    animation: stripUp 0.8s cubic-bezier(0.7, 0, 0.3, 1) forwards;
  }

  @keyframes stripUp {
    0% { transform: translateY(0); }
    100% { transform: translateY(-100%); }
  }

  /* ... keep other previous utilities (snap, nav-link-grow, etc) ... */
  .snap-x-mandatory { scroll-snap-type: x mandatory; }
  .snap-center { scroll-snap-align: center; }
  
  .nav-link-grow::after {
    content: '';
    position: absolute;
    width: 0;
    height: 1px;
    bottom: -4px;
    left: 50%;
    background-color: currentColor;
    transition: all 0.3s ease-in-out;
    transform: translateX(-50%);
  }
  .nav-link-grow:hover::after { width: 100%; }
}
