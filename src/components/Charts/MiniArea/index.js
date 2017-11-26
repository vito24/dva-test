/**
 * Created by vito on 2017/11/26.
 */

import React, { PureComponent } from 'react';
import G2 from 'g2';

class MiniArea extends PureComponent {

  render() {
    const { height } = this.props;

    return (
     <div>
       <div>
         <div ref={this.handleRef} />
       </div>
     </div>
    );
  }
}45

export default MiniArea;
