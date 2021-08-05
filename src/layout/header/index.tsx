import React, { Component } from 'react'
import './index.less'
import ImagesUrl from '@/constant/imagesUrl.ts'
// 通过
import logo from "../../assets/logo.png"
class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="header_left">
          <div className="header_left_content">
            <div className="header_logo">
              {/* todo
                本地图片不显示
              */}
              <img src={ImagesUrl.Logo} alt="" width="80" height="40" />
            </div>
            {/* <div className="header_title">
              <span className="title_text">千策</span>
            </div> */}
          </div>
        </div>
        <div className="header_center"></div>
        <div className="header_right">
          <div className="header_right_content">
            <div className="user_icon">
              <div className="user_icon_content">
                <a href="#" className="">
                  <img src="https://avatar-static.segmentfault.com/163/899/1638994763-5e2cf97a8dbc7_huge128" width="38"></img>
                </a>
              </div>
            </div>
            <div className="user_info">
              <div className="user_info_content">
                  <a href="#" className="">
                    <img src="https://avatar-static.segmentfault.com/163/899/1638994763-5e2cf97a8dbc7_huge128" width="38"></img>
                  </a>
              </div>
            </div>
            <div className="user_home">
              <div className="user_home_content">
                  <a href="#" className="">
                    <img src="https://s1.aigei.com/src/img/png/86/86f7586ce00b4417910888ff01d70998.png?imageMogr2/auto-orient/thumbnail/!500x500r/gravity/Center/crop/500x500/quality/85/imageView2/2/w/500/|watermark/3/text/54ix57uZ572R57Sg5p2Q57yW5Y-3IzQyODgyNTEy/font/5b6u6L2v6ZuF6buR/fontsize/293/fill/cmVk/dissolve/43/gravity/SouthEast/dx/23/dy/23/text/57ul5a6BKOe7peWugSk=/font/5b6u6L2v6ZuF6buR/fontsize/293/fill/cmVk/dissolve/43/gravity/NorthWest/dx/23/dy/23/text/NTEyw5c1MTI=/font/5b6u6L2v6ZuF6buR/fontsize/293/fill/cmVk/dissolve/43/gravity/SouthWest/dx/23/dy/23/text/6aaW6aG1/font/5b6u6L2v6ZuF6buR/fontsize/293/fill/cmVk/dissolve/43/gravity/NorthEast/dx/23/dy/23//text/54ix57uZ572RIGFpZ2VpLmNvbQ==/font/5b6u6L2v6ZuF6buR/fontsize/300/fill/bmF2eQ==/dissolve/60/gravity/NorthWest/dx/203/dy/238&e=1735488000&token=P7S2Xpzfz11vAkASLTkfHN7Fw-oOZBecqeJaxypL:pW_13msIiLU9oh8zChTeWFerUhw=" width="38"></img>
                  </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Header