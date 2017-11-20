/**
 * Created by vito on 2017/7/10.
 */
import React from 'react';
import { connect } from 'dva';
import { Layout, Breadcrumb } from 'antd';
import PdfPreview from '../PdfPreview/PdfPreview';

const { Content } = Layout;
const pdfUrl = 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf';

function Test() {
  return (
    <div>
      <Breadcrumb style={{ margin: '12px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Test</Breadcrumb.Item>
      </Breadcrumb>
      <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: '86vh' }}>
        <PdfPreview src={pdfUrl}>
          <a>预览PDF</a>
        </PdfPreview>
      </Content>
    </div>
  );
}

function mapStateToProps(state) {
  return state.test;
}

export default connect(mapStateToProps)(Test);

