import { defineConfig } from 'umi';
import routes from './router.config';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  favicon: './images/favicon.png',
  define: {
    // dev 环境变量
    'process.env.var': 'dev',
    'process.env.qcFrontUrl': 'http://10.6.209.209:9999',
  },
  devServer: {
    port: 9001,
    host: '10.6.209.209',
  },
  history: {
    type: 'hash',
  },
  publicPath: './',
  routes,
  fastRefresh: {},
  title: `千策-dev`,
});
