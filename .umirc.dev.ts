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
    'process.env.PORT': 9000,
    'process.env.HOST': 127.0.0.1
  },
  devSever: {
    port: process.env.PORT,
    host: process.env.HOST,
  },
  proxy: {
    '/qc': {
      target: 'http://10.6.209.209:40001/mock',
      changeOrigin: true,
      pathRewrite: { '^/qc': '' },
    },
  },
  title: `千策-API测试平台(${process.env.var})`,
});
