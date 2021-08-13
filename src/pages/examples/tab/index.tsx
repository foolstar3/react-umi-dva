import React, { useState } from 'react';
import { Tabs, Typography, Space } from 'antd';
import {
  AppleOutlined,
  AndroidOutlined,
  WindowsOutlined,
  HighlightOutlined,
  SmileOutlined,
  SmileFilled,
} from '@ant-design/icons';
import './index.less';

const { Title, Text, Link, Paragraph } = Typography;
const { TabPane } = Tabs;

export default function () {
  const [editableStr, setEditableStr] = useState('This is an editable text.');
  const [customIconStr, setCustomIconStr] = useState(
    'Custom Edit icon and replace tooltip text.',
  );
  const [hideTooltipStr, setHideTooltipStr] = useState('Hide Edit tooltip.');
  const [lengthLimitedStr, setLengthLimitedStr] = useState(
    'This is an editable text with limited length.',
  );
  return (
    <Tabs defaultActiveKey="2">
      <TabPane
        tab={
          <span>
            <AppleOutlined />
            Tab 1
          </span>
        }
        key="1"
      >
        <Space direction="vertical">
          <Text>Ant Design (default)</Text>
          <Text type="secondary">Ant Design (secondary)</Text>
          <Text type="success">Ant Design (success)</Text>
          <Text type="warning">Ant Design (warning)</Text>
          <Text type="danger">Ant Design (danger)</Text>
          <Text disabled>Ant Design (disabled)</Text>
          <Text mark>Ant Design (mark)</Text>
          <Text code>Ant Design (code)</Text>
          <Text keyboard>Ant Design (keyboard)</Text>
          <Text underline>Ant Design (underline)</Text>
          <Text delete>Ant Design (delete)</Text>
          <Text strong>Ant Design (strong)</Text>
          <Text italic>Ant Design (italic)</Text>
          <Link href="https://ant.design" target="_blank">
            Ant Design (Link)
          </Link>
        </Space>
      </TabPane>
      <TabPane
        tab={
          <span>
            <AndroidOutlined />
            Tab 2
          </span>
        }
        key="2"
      >
        <Title>h1. Ant Design</Title>
        <Title level={2}>h2. Ant Design</Title>
        <Title level={3}>h3. Ant Design</Title>
        <Title level={4}>h4. Ant Design</Title>
        <Title level={5}>h5. Ant Design</Title>
      </TabPane>
      <TabPane
        tab={
          <span>
            <WindowsOutlined />
            Tab 3
          </span>
        }
        key="3"
      >
        <div className="leftPadding">
          <Paragraph editable={{ onChange: setEditableStr }}>
            {editableStr}
          </Paragraph>
          <Paragraph
            editable={{
              icon: <HighlightOutlined />,
              tooltip: 'click to edit text',
              onChange: setCustomIconStr,
            }}
          >
            {customIconStr}
          </Paragraph>
          <Paragraph editable={{ tooltip: false, onChange: setHideTooltipStr }}>
            {hideTooltipStr}
          </Paragraph>
          <Paragraph
            editable={{
              onChange: setLengthLimitedStr,
              maxLength: 50,
              autoSize: { maxRows: 5, minRows: 3 },
            }}
          >
            {lengthLimitedStr}
          </Paragraph>
          <Paragraph copyable>This is a copyable text.</Paragraph>
          <Paragraph copyable={{ text: 'Hello, Ant Design!' }}>
            Replace copy text.
          </Paragraph>
          <Paragraph
            copyable={{
              icon: [
                <SmileOutlined key="copy-icon" />,
                <SmileFilled key="copied-icon" />,
              ],
              tooltips: ['click here', 'you clicked!!'],
            }}
          >
            Custom Copy icon and replace tooltips text.
          </Paragraph>
          <Paragraph copyable={{ tooltips: false }}>
            Hide Copy tooltips.
          </Paragraph>
        </div>
      </TabPane>
    </Tabs>
  );
}
