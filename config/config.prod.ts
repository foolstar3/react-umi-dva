import { defineConfig } from 'umi';
import routes from './router.config';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  define: {
    'process.env.var': 'prod',
    'process.env.qcFrontUrl': 'http://10.6.209.209:9999',
  },
  devServer: {
    port: 9003,
    host: '10.6.209.209',
  },
  history: {
    type: 'hash',
  },
  publicPath: './',
  routes,
  fastRefresh: {},
  title: `千策-API测试平台`,
});
