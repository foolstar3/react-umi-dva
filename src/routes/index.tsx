const routes = [
  { path: '/', component: '@/layout',
    routes: [
      {
        routes: [
          {path: '/', component: '@/pages'},
          {path: '/projectList', component: '@/pages/examples'},
          {path: '/moduleList', component: '@/pages/examples/alert'},
          {path: '/caseList', component: '@/pages/examples/button'},
          {path: '/taskList', component: '@/pages/examples/button'},
          {path: '/envList', component: '@/pages/examples/button'},
          {path: '/paramsFile', component: '@/pages/examples/button'},
          {path: '/globalVar', component: '@/pages/examples/button'},
          {path: '/mockList', component: '@/pages/examples/button'},
          {path: '/viewReport', component: '@/pages/examples/button'},
        ]
      }
    ],
  },
]

export default routes