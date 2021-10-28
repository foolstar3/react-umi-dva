import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { Link, history } from 'umi';
import classnames from 'classnames';
import * as Icon from '@ant-design/icons';
import styles from './index.less';

const { SubMenu } = Menu;
const { Sider } = Layout;
// const MenuList = () => {

// }

const navMenu = {
  defaultSelectedKeys: '项目列表',
  defaultOpenKeys: '测试管理',
  children: [
    {
      key: '测试管理',
      title: '测试管理',
      icon: 'ReconciliationOutlined',
      redirect: '/testManage/projectList',
      children: [
        {
          key: '项目列表',
          route: '/testManage/projectList',
          value: '项目列表',
          icon: 'ProjectOutlined',
        },
        {
          key: 'Debugtalk',
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
        {
          key: '参数文件',
          route: '/dataManage/paramsFile',
          value: '参数文件',
          icon: 'FileTextOutlined',
        },
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
    this.state = {
      collapsed: false,
    };
    this.menuState = {
      selectedKeys: localStorage.getItem('selectedKeys'),
      openKeys: localStorage.getItem('openKeys'),
    };
  }

  UNSAFE_componentWillUpdate() {
    if (location.hash == '#/') {
      this.menuState = {
        selectedKeys: '',
      };
    } else {
      navMenu.children.forEach((item) => {
        item.children.forEach((child) => {
          if (`#${child.route}` === location.hash) {
            this.menuState = {
              selectedKeys: child.value,
            };
          }
        });
      });
    }
    localStorage.setItem('openKeys', this.menuState.openKeys);
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  setMenuItem = (item) => {
    localStorage.setItem('selectedKeys', item.key);
    this.menuState = {
      selectedKeys: item.key,
      openKeys: [item.keyPath[item.keyPath.length - 1]],
    };
  };

  render() {
    const openKeys = [localStorage.getItem('openKeys')];
    const { collapsed } = this.state;
    const selectedKeys = this.menuState.selectedKeys;
    return (
      <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
        <div
          className={classnames(
            styles.siteLayoutBackground,
            collapsed ? styles.folded : styles.unfolded,
          )}
        >
          <Menu
            mode="inline"
            theme="dark"
            style={{ height: '100vh', borderRight: 0 }}
            defaultOpenKeys={openKeys}
            selectedKeys={selectedKeys}
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
      </Sider>
    );
  }
}
export default MySider;
