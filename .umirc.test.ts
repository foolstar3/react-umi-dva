import { defineConfig } from 'umi';
import routes from './src/routes';

export default defineConfig({
  history: {
    type: 'hash',
  },
  base: './',
  publicPath: './',
  hash: true,
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  fastRefresh: {},
  define: {
    // test 环境变量
    'process.env.var': 'test',
  },
  proxy: {
    '/qc': {
      target: 'http://10.6.209.209:40001/mock',
      changeOrigin: true,
      pathRewrite: { '^/qc': '' },
    },
  },
  title: `千策-自动化测试平台(${process.env.var})`,
});
