/**
 * Created by vito on 2017/9/12.
 * pdf预览
 */

import React from 'react';
import { Modal, Button, Spin } from 'antd';
import { PDFJS } from 'pdfjs-dist';
import styles from './index.less';

class PDF extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pdf: null,
      scale: 1.2,
    };
  }

  getChildContext() {
    return {
      pdf: this.state.pdf,
      scale: this.state.scale,
    };
  }

  componentDidMount() {
    PDFJS.getDocument(this.props.src).then((pdf) => {
      this.setState({ pdf });
    });
  }

  render() {
    return (
      <div className={styles.pdfContext}>{this.props.children}</div>
    );
  }
}

PDF.propTypes = {
  src: React.PropTypes.string.isRequired,
};

PDF.childContextTypes = {
  pdf: React.PropTypes.object,
  scale: React.PropTypes.number,
};

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'N/A',
      page: null,
      width: 0,
      height: 0,
    };
  }

  componentDidMount() {
    this._update(this.context.pdf);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return this.context.pdf !== nextContext.pdf || this.state.status !== nextState.status;
  }

  componentDidUpdate(nextProps, nextState, nextContext) {
    this._update(nextContext.pdf);
  }

  _update(pdf) {
    if (pdf) {
      this._loadPage(pdf);
    } else {
      this.setState({
        status: 'loading',
      });
    }
  }

  _loadPage(pdf) {
    if (this.state.status === 'rendering' || this.state.page !== null) return;
    pdf.getPage(this.props.index).then(this._renderPage.bind(this));
    this.setState({
      status: 'rendering',
    });
  }

  _renderPage(page) {
    const { scale } = this.context;
    const viewport = page.getViewport(scale);
    const { width, height } = viewport;
    const canvas = this.refs.canvas;
    const context = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;

    page.render({
      canvasContext: context,
      viewport,
    });

    this.setState({
      status: 'rendered',
      page,
      width,
      height,
    });
  }

  render() {
    const { width, height } = this.state;
    return (
      <div className={styles.pdfPage} style={{ width, height }}>
        <canvas ref="canvas" />
      </div>
    );
  }
}

Page.propTypes = {
  index: React.PropTypes.number.isRequired,
};
Page.contextTypes = PDF.childContextTypes;

class Viewer extends React.Component {
  render() {
    const { pdf } = this.context;
    const numPages = pdf ? pdf.pdfInfo.numPages : 0;
    const pages = Array(...{
      length: numPages,
    }).map((v, i) => (
      <Page index={i + 1} key={i} />
    ));

    return (
      <div className={styles.pdfViewer}>
        {
          pages.length ? pages : <Spin size="large" />
        }
      </div>
    );
  }
}
Viewer.contextTypes = PDF.childContextTypes;

class PdfPreview extends React.Component {
  state = {
    visible: false,
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  showModalHandler = () => {
    this.setState({
      visible: true,
    });
  };

  render() {
    const { children, src } = this.props;

    return (
      <span>
        <span onClick={this.showModalHandler}>
          { children }
        </span>
        <Modal
          title="预览pdf"
          visible={this.state.visible}
          width={1000}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" size="large" onClick={this.handleCancel}>取消</Button>,
          ]}
        >
          <PDF src={src}>
            <Viewer />
          </PDF>
        </Modal>
      </span>
    );
  }
}

export default PdfPreview;
