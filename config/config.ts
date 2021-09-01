import { defineConfig } from 'umi';
import routes from './router.config';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  fastRefresh: {},

  define: {
    'process.env.var': '',
    'process.env.qcFrontUrl': 'http://10.6.209.209:40001/mock/24',
  },
  devServer: {
    port: 9000,
    host: 'localhost',
  },
  publicPath: './',
  title: `千策-API测试平台`,
});
