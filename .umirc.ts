import { defineConfig } from 'umi';
import routes from './src/routes'


export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  fastRefresh: {},

  proxy: {
    '/qc': {
      target: 'http://10.6.209.209:40001/mock/24',
      changeOrigin: true,
      pathRewrite: { '^/qc': '' },
    },
  },
  title: `千策-API测试平台`,
});
