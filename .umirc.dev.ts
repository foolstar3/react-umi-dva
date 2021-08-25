import { defineConfig } from 'umi';
import routes from './src/routes';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  define: {
    // dev 环境变量
    'process.env.var': 'dev',
    'process.env.apiURL': 'http://10.6.209.209:40001/mock/24',
  },
  devServer: {
    port: 9001,
    host: 'localhost',
  },
  history: {
    type: 'hash',
  },
  publicPath: './',
  routes,
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
