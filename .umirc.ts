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
    'process.env.apiURL': '',
  },
  devServer: {
    port: 9000,
    host: '127.0.0.1',
  },
  publicPath: './',
  proxy: {
    '/qc': {
      target: 'http://10.6.209.209:40001/mock/24',
      changeOrigin: true,
      pathRewrite: { '^/qc': '' },
    },
  },
  title: `千策-API测试平台`,
});
