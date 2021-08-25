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
    'process.env.qcFrontUrl': 'QC_FRONT_URL_TEST',
  },
  devServer: {
    port: 9000,
    host: '127.0.0.1',
  },
  hash: true,
  history: {
    type: 'hash',
  },
  publicPath: './',
  fastRefresh: {},
  title: `千策-API测试平台`,
});
