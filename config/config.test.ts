import { defineConfig } from 'umi';
import routes from './router.config';

export default defineConfig({
  history: {
    type: 'hash',
  },
  favicon: './images/favicon.png',
  base: './',
  publicPath: './',
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  fastRefresh: {},
  define: {
    // test 环境变量
    'process.env.var': 'test',
    'process.env.qcFrontUrl': 'http://10.6.209.209:9999',
  },

  devServer: {
    port: 9002,
    host: '10.6.209.209',
  },
  hash: true,

  title: `千策-API测试平台-test`,
});
