import { Layout, PageHeader, ConfigProvider } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import Header from '@/layout/header';
import Sider from '@/layout/sider';
import './index.less';
import NewBreadcrumb from './breadcrumb';
import { Link } from 'umi';
import zhCN from 'antd/lib/locale/zh_CN';

export default function IndexPage(props) {
  return (
    <ConfigProvider locale={zhCN}>
      <Layout>
        <Header></Header>
        <Layout className="layout">
          <Sider></Sider>
          <Layout className="LayoutPadding">
            <PageHeader
              className="pageHeaderPadding"
              title={
                <div className="flex">
                  <Link to="/">
                    <HomeOutlined className="iconFontSize" />
                  </Link>
                </div>
              }
              subTitle={<NewBreadcrumb></NewBreadcrumb>}
            ></PageHeader>
            <div className="padding">{props.children}</div>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
