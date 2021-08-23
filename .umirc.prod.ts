import { defineConfig } from 'umi';
import './.umirc.ts';

export default defineConfig({
  define: {
    'process.env.ENV': 'prod',
  },
});
