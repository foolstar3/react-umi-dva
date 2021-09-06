import { defineConfig } from 'umi';
import routes from './router.config';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  favicon: './images/favicon.png',
  history: {
    type: 'hash',
  },
  routes,
  fastRefresh: {},
  define: {
    'process.env.var': 'local',
    'process.env.qcFrontUrl': 'http://10.6.209.209:40001/mock/24',
  },
  devServer: {
    port: 9090,
    host: 'localhost',
  },
  publicPath: './',
  title: `千策-API测试平台-local`,
});
