import {Link} from 'umi'
import withBreadcrumbs from 'react-router-breadcrumbs-hoc'
import { Breadcrumb } from 'antd';
import './index.less'


const Breadcrumbs = ({ breadcrumbs }) => (
  <>
    <Breadcrumb className="breadcrumb" separator=">">
      {breadcrumbs.map((breadcrumb)=>{
        console.log(breadcrumb);
        return(
          <Link to={breadcrumb.breadcrumb.props.children} key={breadcrumb.key}>{breadcrumb.breadcrumb.props.children}</Link>
        )
      })}
    </Breadcrumb>
  </>
)

export default withBreadcrumbs()(Breadcrumbs);