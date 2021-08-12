import { defineConfig } from 'umi';
import routes from './src/routes';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  fastRefresh: {},
  define: {
    // dev 环境变量
    'process.env.var': 'dev',
  },
  proxy: {
    '/qc': {
      target: 'http://10.6.209.209:40001/mock',
      changeOrigin: true,
      pathRewrite: { '^/qc': '' },
    },
  },
  title: `千策-自动化测试平台(${process.env.var})`,
});
