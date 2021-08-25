import { defineConfig } from 'umi';
import routes from './src/routes';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  define: {
    // dev 环境变量
    'process.env.var': 'dev',
    'process.env.qcFrontUrl': 'QC_FRONT_URL_DEV',
  },
  devServer: {
    port: 9002,
    host: '127.0.0.1',
  },
  history: {
    type: 'hash',
  },
  publicPath: './',
  routes,
  fastRefresh: {},
  title: `千策-API测试平台`,
});
