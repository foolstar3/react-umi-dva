import { defineConfig } from 'umi';
import routes from './src/routes';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  define: {
    'process.env.ENV': 'prod',
    'process.env.qcFrontUrl': 'QC_FRONT_URL_PROD',
  },
  devServer: {
    port: 9001,
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
