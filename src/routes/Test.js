/**
 * Created by vito on 2017/7/10.
 */
import React from 'react';
import TestComponent from '../components/Test/Test';
import MainLayout from '../components/MainLayout/MainLayout';

function Test({ location }) {
  return (
    <MainLayout location={location}>
      <div>
        <TestComponent />
      </div>
    </MainLayout>
  );
}

export default Test;
