import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import { Breadcrumb } from 'antd';
import './index.less';
const routes = [
  { path: '/', breadcrumb: '首页' },
  {
    path: '/testManage',
    breadcrumb: '测试管理',
  },
  {
    path: '/testManage/projectList',
    breadcrumb: '项目列表',
  },
  {
    path: '/testManage/moduleList',
    breadcrumb: '模块列表',
  },
  {
    path: '/testManage/caseList',
    breadcrumb: '用例列表',
  },
  {
    path: '/testManage/taskList',
    breadcrumb: '任务列表',
  },
  {
    path: '/dataManage',
    breadcrumb: '数据管理',
  },
  {
    path: '/dataManage/envList',
    breadcrumb: '环境列表',
  },
  {
    path: '/dataManage/paramsFile',
    breadcrumb: '参数文件',
  },
  {
    path: '/dataManage/globalVar',
    breadcrumb: '全局变量',
  },
  {
    path: '/dataManage/mockList',
    breadcrumb: 'Mock列表',
  },
  {
    path: '/reportManage',
    breadcrumb: '报告管理',
  },
  {
    path: '/reportManage/viewReport',
    breadcrumb: '查看报告',
  },
  {
    path: '/reportManage/reportDetail',
    breadcrumb: '报告详情',
  },
];

const Breadcrumbs = ({ breadcrumbs }) => (
  <>
    <Breadcrumb className="breadcrumb" separator=">">
      {breadcrumbs.map((breadcrumb: any) => {
        if (breadcrumb.key === '/') {
          return <Breadcrumb.Item key="home"></Breadcrumb.Item>;
        }
        return (
          <Breadcrumb.Item key={breadcrumb.key}>
            <span className="title">
              {breadcrumb.breadcrumb.props.children}
            </span>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  </>
);

export default withBreadcrumbs(routes)(Breadcrumbs);
