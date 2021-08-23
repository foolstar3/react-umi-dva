import { defineConfig } from 'umi';
import './.umirc.ts';

export default defineConfig({
  define: {
    // dev 环境变量
    'process.env.var': 'dev',
  },
});
