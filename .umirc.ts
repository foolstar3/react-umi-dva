import { defineConfig } from 'umi';
import routes from './src/routes';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  fastRefresh: {},
  define: {
    'process.env.var': 'local',
    'process.env.apiURL': 'http://10.6.209.209:40001/mock/24',
  },
  devServer: {
    port: 9000,
    host: '127.0.1.1',
  },
  // proxy: {
  //   '/qc': {
  //     target: process.env.apiURL,
  //     changeOrigin: true,
  //     pathRewrite: { '^/qc': '' },
  //   },
  // },
  title: `千策-API测试平台`,
});
