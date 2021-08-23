import { defineConfig } from 'umi';
import routes from './src/routes';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  define: {
    'process.env.ENV': 'prod',
    'process.env.apiURL': 'http://10.6.209.209:9999/env/8',
  },
  history: {
    type: 'hash',
  },
  publicPath: './',
  routes,
  fastRefresh: {},
  proxy: {
    '/qc/24/env': {
      target: process.env.apiURL,
      changeOrigin: true,
      pathRewrite: { '^/qc/24/env': '' },
    },
  },
  title: `千策-API测试平台`,
});
