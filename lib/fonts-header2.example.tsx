/**
 * Example: How to use fonts in your layout
 * 
 * Option 1: Add to your root layout.tsx
 */

import { geologica, gabarito, headerFonts } from "@/lib/fonts-header2";
import Header2 from "@/components/landing/header-2";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={headerFonts}>
      <body className={geologica.className}>
        <Header2 />
        {children}
      </body>
    </html>
  );
}

/**
 * Option 2: Use in specific page only
 */
import { headerFonts } from "@/lib/fonts-header2";
import Header2 from "@/components/landing/header-2";

export default function LandingPage() {
  return (
    <div className={headerFonts}>
      <Header2 />
      {/* rest of your content */}
    </div>
  );
}

/**
 * Option 3: Use individual fonts
 */
import { geologica, gabarito } from "@/lib/fonts-header2";

export default function CustomComponent() {
  return (
    <div>
      <h1 className={geologica.className}>
        This uses Geologica
      </h1>
      <button className={gabarito.className}>
        This uses Gabarito
      </button>
    </div>
  );
}

/**
 * Option 4: Use CSS variables (Recommended)
 * 
 * First, add to your globals.css:
 * 
 * .font-geologica {
 *   font-family: var(--font-geologica);
 * }
 * 
 * .font-gabarito {
 *   font-family: var(--font-gabarito);
 * }
 * 
 * Then use in Tailwind classes:
 */
export function ComponentWithTailwind() {
  return (
    <div>
      <h1 className="text-4xl font-light font-geologica">
        Heading with Geologica
      </h1>
      <button className="text-lg font-bold font-gabarito">
        Button with Gabarito
      </button>
    </div>
  );
}
