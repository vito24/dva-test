/**
 * Created by vito on 2017/11/24.
 */

import numeral from 'numeral';
import ChartCard from './ChartCard';
import Field from './Field';
import MiniArea from './MiniArea';
import MiniBar from './MiniBar';
import MiniProgress from './MiniProgress';

const yuan = val => `&yen; ${numeral(val).format('0,0')}`;

export {
  yuan,
  ChartCard,
  Field,
  MiniArea,
  MiniBar,
  MiniProgress,
};
