import React, { Component } from 'react';
import { Menu } from 'antd';
import { Link } from 'umi';
import * as Icon from '@ant-design/icons';
import './index.less';

const { SubMenu } = Menu;

// const MenuList = () => {

// }

const navMenu = {
  defaultSelectedKeys: '项目列表',
  defaultOpenKeys: '测试管理',
  children: [
    {
      key: '测试管理',
      title: '测试管理',
      icon: 'UserOutlined',
      redirect: '/testManage/projectList',
      children: [
        {
          key: '项目列表',
          route: '/testManage/projectList',
          value: '项目列表',
          icon: 'ProjectOutlined',
        },
        {
          key: 'debugtalk',
          route: '/testManage/debugtalk',
          value: 'Debugtalk',
          icon: 'BugOutlined',
        },
        {
          key: '模块列表',
          route: '/testManage/moduleList',
          value: '模块列表',
          icon: 'PartitionOutlined',
        },
        {
          key: '用例列表',
          route: '/testManage/caseList',
          value: '用例列表',
          icon: 'CalendarOutlined',
        },
        {
          key: '任务列表',
          route: '/testManage/taskList',
          value: '任务列表',
          icon: 'ContainerOutlined',
        },
      ],
    },
    {
      key: '数据管理',
      title: '数据管理',
      icon: 'LaptopOutlined',
      children: [
        {
          key: '环境列表',
          route: '/dataManage/envList',
          value: '环境列表',
          icon: 'EnvironmentOutlined',
        },
        // {
        //   key: '参数文件',
        //   route: '/dataManage/paramsFile',
        //   value: '参数文件',
        //   icon: 'FileTextOutlined',
        // },
        {
          key: '全局变量',
          route: '/dataManage/globalVar',
          value: '全局变量',
          icon: 'GlobalOutlined',
        },
      ],
    },
    {
      key: '报告管理',
      title: '报告管理',
      icon: 'NotificationOutlined',
      children: [
        {
          key: '查看报告',
          route: '/reportManage/viewReport',
          value: '查看报告',
          icon: 'FundViewOutlined',
        },
      ],
    },
  ],
};

class MySider extends Component {
  constructor(props) {
    super(props);
    this.menuState = {
      selectedKeys: localStorage.getItem('selectedKeys'),
      openKeys: localStorage.getItem('openKeys'),
    };
  }

  componentDidMount() {
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('selectedKeys', this.menuState.selectedKeys);
      localStorage.setItem('openKeys', this.menuState.openKeys);
    });
  }
  setMenuItem = (item) => {
    this.menuState = {
      selectedKeys: item.key,
      openKeys: [item.keyPath[item.keyPath.length - 1]],
    };
  };

  render() {
    const openKeys = [localStorage.getItem('openKeys')];
    const selectedKeys = localStorage.getItem('selectedKeys');
    return (
      <div
        style={{ width: 250, height: 870 }}
        className="site-layout-background"
      >
        <Menu
          mode="inline"
          theme="dark"
          style={{ height: '100vh', borderRight: 0 }}
          defaultOpenKeys={openKeys}
          defaultSelectedKeys={selectedKeys}
        >
          {navMenu.children.map((item) => {
            const icon = React.createElement(Icon[item.icon], {
              style: { fontSize: '16px' },
            });
            return (
              <SubMenu key={item.key} title={item.title} icon={icon}>
                {item.children.map((i) => {
                  const itemIcon = React.createElement(Icon[i.icon], {
                    style: { fontSize: '16px' },
                  });
                  return (
                    <Menu.Item
                      key={i.key}
                      icon={itemIcon}
                      onClick={this.setMenuItem}
                    >
                      <Link to={i.route}>{i.value}</Link>
                    </Menu.Item>
                  );
                })}
              </SubMenu>
            );
          })}
        </Menu>
      </div>
    );
  }
}
export default MySider;
