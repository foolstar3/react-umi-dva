import { Layout, PageHeader, ConfigProvider } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import MyHeader from '@/layout/header';
import MySider from '@/layout/sider';
import './index.less';
import NewBreadcrumb from './breadcrumb';
import { Link } from 'umi';
import zhCN from 'antd/lib/locale/zh_CN';

const { Content } = Layout;

export default function IndexPage(props) {
  return (
    <ConfigProvider locale={zhCN}>
      <Layout>
        <MyHeader></MyHeader>
        <Layout className="layout">
          <MySider></MySider>
          <Layout className="LayoutPadding">
            <Content className="padding">
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
              {props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
