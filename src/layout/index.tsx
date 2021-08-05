
import { Layout, Breadcrumb } from 'antd';
import Header from '@/layout/header'
import Sider from '@/layout/sider'
import './index.less'
import NewBreadcrumb from './breadcrumb';
// import { Route, Router } from 'umi';
import { render } from 'react-dom';

export default function IndexPage(props) {
  return (
    <Layout>
      <Header></Header>
      <Layout className="layout">
        <Sider></Sider>
        <Layout style={{ padding: '15px 24px 24px' }}>
          <NewBreadcrumb></NewBreadcrumb>
          { props.children }
        </Layout>
      </Layout>
    </Layout>
  )
}
