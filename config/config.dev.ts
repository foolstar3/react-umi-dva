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
    'process.env.qcFrontUrl': 'http://10.6.209.209:40001/mock/24',
  },
  devServer: {
    port: 9999,
    host: '10.5.65.24',
  },
  history: {
    type: 'hash',
  },
  publicPath: './',
  routes,
  fastRefresh: {},
  title: `千策-API测试平台-dev`,
});
