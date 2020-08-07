import React from 'react';
import { List, Card } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const FollowList = ({ header, data }) => (
  <List
    style={{ marginBottom: 20 }}
    grid={{ gutter: 4, xs: 2, md: 3 }}
    size="small"
    header={<div>{header}</div>}
    loadMore={<div style={{ textAlign: 'center', margin: '10px 0' }} />}
    bordered
    dataSource={data}
    renderItem={(item) => (
      <List.Item style={{ marginTop: 20 }}>
        <Card actions={[<StopOutlined key="stop" />]}>
          <Card.Meta description={item.nickname} />
        </Card>
      </List.Item>
    )}
  />
);

FollowList.prototypes = {
  header: PropTypes.string.isRequirerd,
  data: PropTypes.array.isRequirerd,
};

export default FollowList;
