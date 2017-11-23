/**
 * Created by vito on 2017/11/23.
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Icon, Input, AutoComplete } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

export default class HeaderSearch extends PureComponent {
  static defaultProps = {
    onPressEnter: () => {},
    onSearch: () => {},
    className: '',
    placeholder: '',
    dataSource: [],
    defaultActiveFirstOption: false,
  };

  static propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    onSearch: PropTypes.func,
    onPressEnter: PropTypes.func,
    dataSource: PropTypes.array,
    defaultActiveFirstOption: PropTypes.bool,
  };

  state = {
    searchMode: false,
    value: '',
  };

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  onChange(value) {
    this.setState({ value });
    if (this.props.onChange) {
      this.props.onChange();
    }
  }

  onKeyDown(e) {
    if (e.key === 'Enter') {
      this.timeout = setTimeout(() => {
        this.props.onPressEnter(this.state.value); // Fix duplicate onPressEnter
      }, 0);
    }
  }

  enterSearchMode() {
    this.setState({
      searchMode: true,
    }, () => {
      if (this.state.searchMode) {
        this.input.focus();
      }
    });
  }

  leaveSearchMode() {
    this.setState({
      searchMode: false,
      value: '',
    });
  }

  render() {
    const { className, placeholder, ...restProps } = this.props;
    const inputClass = classNames(styles.input, {
      [styles.show]: this.state.searchMode,
    });

    return (
      <span
        className={classNames(className, styles.headerSearch)}
        onClick={this.enterSearchMode.bind(this)}
      >
        <Icon type="search" />
        <AutoComplete
          {...restProps}
          className={inputClass}
          value={this.state.value}
          onChange={this.onChange.bind(this)}
        >
          <Input
            ref={(node) => { this.input = node; }}
            placeholder={placeholder}
            onKeyDown={this.onKeyDown.bind(this)}
            onBlur={this.leaveSearchMode.bind(this)}
          />
        </AutoComplete>
      </span>
    );
  }
}
