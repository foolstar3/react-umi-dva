import { defineConfig } from 'umi';
import './.umirc.ts';

export default defineConfig({
  define: {
    // test 环境变量
    'process.env.var': 'test',
  },
});
