/**
 * Created by vito on 2017/11/24.
 */

import React, { Component } from 'react';
import { Row, Col, Tooltip, Icon } from 'antd';
import numeral from 'numeral';
import { yuan, ChartCard, Field } from '../../components/Charts';
import Trend from '../../components/Trend';

import styles from './Analysis.less';

class Analysis extends Component {

  render() {
    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 24 },
    };

    return (
      <div>
        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="总销售额"
              action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
              total={yuan(126560)}
              footer={<Field label="日均销售额" value={`￥${numeral(12423).format('0,0')}`} />}
              contentHeight={46}
            >
              <Trend flag="up" style={{ marginRight: 16 }}>
                周同比<span className={styles.trendText}>12%</span>
              </Trend>
              <Trend flag="down">
                日环比<span className={styles.trendText}>11%</span>
              </Trend>
            </ChartCard>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Analysis;
