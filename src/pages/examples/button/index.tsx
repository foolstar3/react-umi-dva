import React, { Component } from "react";


import { Button, Radio, Row, Col, Space, Divider, Card } from 'antd';
import { DownloadOutlined, PoweroffOutlined } from '@ant-design/icons';

class ButtonSize extends Component {
  state = {
    size: 'large',
    loadings: [],
  };

  handleSizeChange = e => {
    this.setState({ size: e.target.value });
  };

  enterLoading = index => {
    this.setState(({ loadings }) => {
      const newLoadings = [...loadings];
      newLoadings[index] = true;

      return {
        loadings: newLoadings,
      };
    });
    setTimeout(() => {
      this.setState(({ loadings }) => {
        const newLoadings = [...loadings];
        newLoadings[index] = false;

        return {
          loadings: newLoadings,
        };
      });
    }, 6000);
  };

  render() {
    const { size } = this.state;
    const { loadings } = this.state;
    return (
      <Row gutter={20}>
        <Col span={10}>
        <Divider plain>基础按钮</Divider>
          <Radio.Group value={size} onChange={this.handleSizeChange}>
            <Space>
              <Radio.Button value="large">Large</Radio.Button>
              <Radio.Button value="default">Default</Radio.Button>
              <Radio.Button value="small">Small</Radio.Button>
            </Space>
          </Radio.Group>
          <br />
          <br />
          <Space>
            <Button type="primary" size={size}>
              Primary
            </Button>
            <Button size={size}>Default</Button>
            <Button type="dashed" size={size}>
              Dashed
            </Button>
            </Space>
          <br />
            <Button type="link" size={size}>
              Link
            </Button>
          <br />
          <Space>
            <Button type="primary" icon={<DownloadOutlined />} size={size} />
            <Button type="primary" shape="circle" icon={<DownloadOutlined />} size={size} />
            <Button type="primary" shape="round" icon={<DownloadOutlined />} size={size} />
            <Button type="primary" shape="round" icon={<DownloadOutlined />} size={size}>
              Download
            </Button>
            <Button type="primary" icon={<DownloadOutlined />} size={size}>
              Download
            </Button>
          </Space>
        </Col>
        <Col span={10}>
          <Divider plain>载入按钮</Divider>
          <Row>
          <Card title="Card" style={{ width: 300 }}>
          <Space>
            <Button type="primary" loading>
              Loading
            </Button>
            <Button type="primary" size="small" loading>
              Loading
            </Button>
            <Button type="primary" icon={<PoweroffOutlined />} loading />
          </Space>
          </Card>
          <Card title="Card" style={{ width: 300 }}>
          <Space>
            <Button type="primary" loading={loadings[0]} onClick={() => this.enterLoading(0)}>
              Click me!
            </Button>
            <Button
              type="primary"
              icon={<PoweroffOutlined />}
              loading={loadings[1]}
              onClick={() => this.enterLoading(1)}
            >
              Click me!
            </Button>
            <Button
              type="primary"
              icon={<PoweroffOutlined />}
              loading={loadings[2]}
              onClick={() => this.enterLoading(2)}
            />
          </Space>
          </Card>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default ButtonSize