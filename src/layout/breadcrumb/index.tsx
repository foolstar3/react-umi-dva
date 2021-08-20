import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import './index.less';
import { Link } from 'react-router-dom';
const routes = [
  { path: '/', component: '@/pages', breadcrumb: '首页' },
  {
    path: '/testManage',
    redirect: '/testManage/projectList',
    breadcrumb: '测试管理',
  },
  {
    path: '/testManage/projectList',
    component: '@/pages/examples',
    breadcrumb: '项目列表',
  },
  {
    path: '/testManage/moduleList',
    component: '@/pages/examples/alert',
    breadcrumb: '模块列表',
  },
  {
    path: '/testManage/caseList',
    component: '@/pages/examples/button',
    breadcrumb: '用例列表',
  },
  {
    path: '/testManage/taskList',
    component: '@/pages/examples/button',
    breadcrumb: '任务列表',
  },
  {
    path: '/dataManage',
    redirect: '/dataManage/envList',
    breadcrumb: '数据管理',
  },
  {
    path: '/dataManage/envList',
    component: '@/pages/examples/button',
    breadcrumb: '环境列表',
  },
  {
    path: '/dataManage/paramsFile',
    component: '@/pages/examples/button',
    breadcrumb: '参数文件',
  },
  {
    path: '/dataManage/globalVar',
    component: '@/pages/examples/button',
    breadcrumb: '全局变量',
  },
  {
    path: '/dataManage/mockList',
    component: '@/pages/examples/button',
    breadcrumb: 'Mock列表',
  },
  {
    path: '/reportManage',
    redirect: '/reportManage/viewReport',
    breadcrumb: '报告管理',
  },
  {
    path: '/reportManage/viewReport',
    component: '@/pages/examples/button',
    breadcrumb: '查看报告',
  },
];

const Breadcrumbs = ({ breadcrumbs }) => (
  <>
    <Breadcrumb className="breadcrumb" separator=">">
      {breadcrumbs.map((breadcrumb) => {
        // console.log(breadcrumb);
        if (breadcrumb.key === '/') {
          return (
            <Breadcrumb.Item key="home">
              {/* <Link to='/'>
                <HomeOutlined className="iconFontSize" style={{ fontSize: '20px' }} />
              </Link> */}
            </Breadcrumb.Item>
          );
        }
        return (
          <Breadcrumb.Item key={breadcrumb.key}>
            <span>{breadcrumb.breadcrumb.props.children}</span>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  </>
);

export default withBreadcrumbs(routes)(Breadcrumbs);
