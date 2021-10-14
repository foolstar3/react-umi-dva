import { defineConfig } from 'umi';
import routes from './router.config';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  favicon: './images/favicon.png',
  define: {
    'process.env.var': 'prod',
    'process.env.qcFrontUrl': 'http://10.6.209.209:9998',
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
  title: `千策`,
});
