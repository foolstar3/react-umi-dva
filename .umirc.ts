import { defineConfig } from 'umi';
import routes from './src/routes';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  base: './',
  routes,
  fastRefresh: {},
  define: {
    'process.env.var': 'local',
  },
  proxy: {
    '/qc': {
      target: 'http://10.6.209.209:40001/mock',
      changeOrigin: true,
      pathRewrite: { '^/qc': '' },
    },
  },
  title: `千策-API测试平台`,
});
