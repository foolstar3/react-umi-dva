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
    'process.env.apiURL': 'http://10.6.209.209:40001/mock/24',
  },
  devServer: {
    port: 9003,
    host: 'localhost',
  },
  hash: true,
  history: {
    type: 'hash',
  },
  publicPath: './',
  fastRefresh: {},
  proxy: {
    '/qc': {
      target: process.env.apiURL,
      changeOrigin: true,
      pathRewrite: { '^/qc': '' },
    },
  },
  title: `千策-API测试平台`,
});
