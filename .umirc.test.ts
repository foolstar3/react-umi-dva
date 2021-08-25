import { defineConfig } from 'umi';
import routes from './src/routes';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  define: {
    // test 环境变量
    'process.env.var': 'test',
    'process.env.qcFrontUrl': 'http://10.6.209.209:9999',
  },
  devServer: {
    port: 9003,
    host: '10.6.209.209',
  },
  hash: true,
  history: {
    type: 'hash',
  },
  publicPath: './',
  fastRefresh: {},
  title: `千策-API测试平台`,
});
