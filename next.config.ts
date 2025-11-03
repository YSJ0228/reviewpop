import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  turbopack: {
    resolveAlias: {
      '@styles': path.join(__dirname, 'src/styles'),
    },
  },
};

export default nextConfig;
