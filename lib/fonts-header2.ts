/**
 * Font Configuration for Header 2 Component
 * 
 * This file contains the Google Fonts configuration needed for the EduLearn header.
 * Import this in your layout.tsx or where you need the fonts.
 */

import { Geologica, Gabarito } from 'next/font/google';

// Geologica font - Used for body text, headings, and descriptions
export const geologica = Geologica({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'], // Light, Regular, SemiBold, Bold
  variable: '--font-geologica',
  display: 'swap',
});

// Gabarito font - Used for logo and buttons
export const gabarito = Gabarito({
  subsets: ['latin'],
  weight: ['600', '700'], // SemiBold, Bold
  variable: '--font-gabarito',
  display: 'swap',
});

// Export combined className for easy use
export const headerFonts = `${geologica.variable} ${gabarito.variable}`;
