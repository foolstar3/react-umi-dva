import React, { Component } from 'react';
import { Button } from 'antd';
import Img404Web from '@/assets/svgs/img_404_web.svg';
import Styles from './index.less';

class Page404 extends Component {
  state = {};

  render() {
    const path = '/';
    return (
      <div data-page-target="404" className={Styles.Container}>
        <div className={Styles.header} />
        <div className={Styles.content}>
          <div className={Styles.mainContent}>
            <div className={Styles.LeftImage}>
              <img
                className={Styles.Img_Error_Web}
                src={Img404Web}
                alt=""
              ></img>
            </div>
            <div className={`${Styles.RightContent} FlexRow`}>
              <span className={Styles.Error_info}>抱歉 , 页面无法访问...</span>
              <span className={Styles.Apo_Info}>可能因为</span>
              <span className={Styles.Apo_Info}>
                <span>网址有错误：</span>请检查地址是否完整或存在多余字符
              </span>
              <span className={Styles.Apo_Info}>
                <span>网址已失效：</span>可能页面已删除，活动已下线等
              </span>
              <Button type="primary" className={Styles.ReButton} href={path}>
                返回首页
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Page404;
