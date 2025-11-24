#!/usr/bin/env node

/**
 * CLI Script to display letter counters
 * Usage: npm run letter-counters
 * or: node scripts/show-letter-counters.js
 */

import { displayCounterReport } from '../lib/letter-counter';

async function main() {
  try {
    await displayCounterReport();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();
