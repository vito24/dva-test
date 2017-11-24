/**
 * Created by vito on 2017/11/24.
 */

import React from 'react';
import { Card, Spin } from 'antd';

import styles from './index.less';


const ChartCard = ({
  loading = false,
  contentHeight,
  title,
  action,
  children,
  total,
  footer,
  ...rest,
}) => (
  <Card
    bodyStyle={{ padding: '20px 24px 8px 24px' }}
    {...rest}
  >
    <Spin spinning={loading}>
      <div className={styles.chartCard}>
        <div className={styles.meta}>
          <span className={styles.title}>{title}</span>
          <span className={styles.action}>{action}</span>
        </div>
        {
          total && <div className={styles.total} dangerouslySetInnerHTML={{ __html: total }} />
        }
        <div className={styles.content} style={{ height: contentHeight || 'auto' }}>
          <div className={contentHeight && styles.contentFixed}>
            {children}
          </div>
        </div>
        {
          footer && <div className={styles.footer}>{footer}</div>
        }
      </div>
    </Spin>
  </Card>
);

export default ChartCard;
