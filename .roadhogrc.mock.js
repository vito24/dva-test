import { format, delay } from 'roadhog-api-doc';
import { getFakeChartData } from './mock/chart';

const proxy = {
  'GET /api/currentUser': {
    $desc: "获取当前用户接口",
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: {
      name: 'vito',
      avatar: 'https://avatars0.githubusercontent.com/u/13133596?s=460&v=4',
      userid: '00000001',
      notifyCount: 12,
    },
  },

  'GET /api/fake_chart_data': getFakeChartData,
};

export default delay(proxy, 1000);
