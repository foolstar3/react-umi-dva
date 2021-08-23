import { defineConfig } from 'umi';
import routes from './src/routes';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  define: {
    // dev 环境变量
    'process.env.var': 'dev',
  },
  devSever: {
    port: '8003',
    host: '127.0.0.1',
    https: true,
  },
  history: {
    type: 'hash',
  },
  publicPath: './',
  routes,
  fastRefresh: {},
  proxy: {
    '/qc': {
      target: 'http://10.6.209.209:40001/mock',
      changeOrigin: true,
      pathRewrite: { '^/qc': '' },
    },
  },
  title: `千策-API测试平台`,
});
