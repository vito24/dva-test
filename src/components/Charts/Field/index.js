/**
 * Created by vito on 2017/11/24.
 */

import React, { Component } from 'react';
import styles from './index.less';

const Field = ({ label, value, ...rest }) => (
  <div className={styles.field} {...rest}>
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

export default Field;
