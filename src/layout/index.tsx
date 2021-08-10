import { Layout, PageHeader } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import Header from '@/layout/header';
import Sider from '@/layout/sider';
import './index.less';
import NewBreadcrumb from './breadcrumb';
import { Link } from 'umi';
import { render } from 'react-dom';

export default function IndexPage(props) {
  return (
    <Layout>
      <Header></Header>
      <Layout className="layout">
        <Sider></Sider>
        <Layout style={{ padding: '15px 24px 24px' }}>
          <PageHeader
            title={<NewBreadcrumb></NewBreadcrumb>}
            extra={
              <Link to="/">
                <HomeOutlined style={{ fontSize: '20px' }} />
              </Link>
            }
          ></PageHeader>
          <div className="padding">{props.children}</div>
        </Layout>
      </Layout>
    </Layout>
  );
}
