import { Layout, PageHeader, ConfigProvider } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import MyHeader from '@/layout/header';
import MySider from '@/layout/sider';
import './index.less';
import NewBreadcrumb from './breadcrumb';
import { Link, history } from 'umi';
import moment from 'moment';
import 'moment/locale/zh-cn';
import zhCN from 'antd/lib/locale/zh_CN';

const { Content } = Layout;

export default function IndexPage(props: any) {
  if (localStorage.getItem('qc_user')) {
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
                <div>{props.children}</div>
              </Content>
            </Layout>
          </Layout>
          {process.env.var}
        </Layout>
      </ConfigProvider>
    );
  } else {
    history.push('/login');
    return null;
  }
}
