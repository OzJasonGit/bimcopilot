const fs = require('fs');
const path = require('path');

const shimPath = path.join(__dirname, '..', 'node_modules', 'next', 'config.js');
const shim = `/**
 * Shim for next-video compatibility with Next.js 16.
 * Next.js 16 no longer exposes config.js at package root; this allows
 * next-video to fall back to loading next.config.mjs directly.
 */
module.exports = {
  default: function getConfig() {
    return {};
  },
};
`;

try {
  fs.writeFileSync(shimPath, shim);
  console.log('Patched node_modules/next/config.js for next-video');
} catch (err) {
  // Ignore if next not installed yet (e.g. pre-install)
}
