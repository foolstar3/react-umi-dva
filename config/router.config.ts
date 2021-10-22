// antd组件实例路由
const example_routes = [
  {
    path: '/',
    component: '@/layout',
    routes: [
      {
        routes: [
          { path: '/', component: '@/pages' },
          { path: '/user/:id', component: '@/pages/examples/alert' },
          { path: '/testManage/projectList', component: '@/pages/examples' },
          {
            path: '/testManage/moduleList',
            component: '@/pages/examples/alert',
          },
          {
            path: '/testManage/caseList',
            component: '@/pages/examples/button',
          },
          { path: '/dataManage/envList', component: '@/pages/examples/radio' },
          { path: '/dataManage/paramsFile', component: '@/pages/examples/tab' },
          {
            path: '/dataManage/globalVar',
            component: '@/pages/examples/button',
          },
          // {path: '/dataManage/mockList', component: '@/pages/examples/button', },
          {
            path: '/reportManage/viewReport',
            component: '@/pages/examples/editor',
          },
        ],
      },
    ],
  },
];

// 项目实际路由
const routes = [
  { path: '/login', component: '@/pages/login' },

  {
    path: '/',
    component: '@/layout',
    routes: [
      {
        routes: [
          { path: '/', component: '@/pages' },
          {
            path: '/testManage/projectList',
            component: '@/pages/testManage/projectList',
          },
          {
            path: '/testManage/debugtalk',
            component: '@/pages/testManage/debugTalk',
          },
          {
            path: '/testManage/moduleList',
            component: '@/pages/testManage/moduleList',
          },
          {
            path: '/testManage/caseList',
            component: '@/pages/testManage/caseList',
          },
          {
            path: '/testManage/taskList',
            component: '@/pages/testManage/taskList',
          },
          {
            path: '/dataManage/envList',
            component: '@/pages/dataManage/envList',
          },
          {
            path: '/dataManage/paramsFile',
            component: '@/pages/dataManage/paramsFile',
          },
          {
            path: '/dataManage/globalVar',
            component: '@/pages/dataManage/globalVar',
          },
          {
            path: '/reportManage/viewReport',
            component: '@/pages/reportManage',
          },
          {
            path: '/reportManage/reportDetail',
            component: '@/pages/reportManage/reportDetail',
          },
          {
            path: '/error/403',
            component: '@/pages/errorPages/Page_403',
          },
          {
            path: '/error/404',
            component: '@/pages/errorPages/Page_404',
          },
          {
            path: '/error/500',
            component: '@/pages/errorPages/Page_500',
          },
        ],
      },
    ],
  },
];

export default routes;
