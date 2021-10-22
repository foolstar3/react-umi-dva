import React, { Component } from 'react';
import { Button } from 'antd';
import Img403Web from '@/assets/svgs/img_403_web.svg';
import Styles from './index.less';

class Page403 extends Component {
  state = {};

  render() {
    const path = '/';
    return (
      <div data-page-target="403" className={Styles.Container}>
        <div className={Styles.header} />
        <div className={Styles.content}>
          <div className={Styles.mainContent}>
            <div className={Styles.LeftImage}>
              <img
                className={Styles.Img_Error_Web}
                src={Img403Web}
                alt=""
              ></img>
            </div>
            <div className={`${Styles.RightContent} FlexRow`}>
              <span className={Styles.Error_info}>糟糕 !</span>
              <span className={Styles.Error_info}>
                错误
                <span className={Styles.Error}> 403</span>…
              </span>
              <span className={Styles.Apo_Info}>抱歉 , 您无权访问此页面</span>
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

export default Page403;
