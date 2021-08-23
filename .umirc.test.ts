import { defineConfig } from 'umi';
import routes from './src/routes';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  define: {
    // test 环境变量
    'process.env.var': 'test',
    'process.env.apiURL': 'http://10.6.209.209:9999/env/8',
  },
  hash: true,
  history: {
    type: 'hash',
  },
  publicPath: './',
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
