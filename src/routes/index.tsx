const routes = [
  { path: '/', component: '@/layout',
    routes: [
      {
        routes: [
          {path: '/', component: '@/pages'},
          {path: '/testManage/projectList', component: '@/pages/examples', },
          {path: '/testManage/moduleList', component: '@/pages/examples/alert', },
          {path: '/testManage/caseList', component: '@/pages/examples/button', },
          {path: '/testManage/taskList', component: '@/pages/examples/message', },
          {path: '/dataManage/envList', component: '@/pages/examples/radio', },
          {path: '/dataManage/paramsFile', component: '@/pages/examples/button', },
          {path: '/dataManage/globalVar', component: '@/pages/examples/button', },
          {path: '/dataManage/mockList', component: '@/pages/examples/button', },
          {path: '/reportManage/viewReport', component: '@/pages/examples/button', },
        ]
      }
    ],
  },
]

export default routes