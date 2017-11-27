import dva from 'dva';
import createLoading from 'dva-loading';
import createHistory from 'history/createBrowserHistory';
import { message } from 'antd';
import './g2';
import './index.css';

const ERROR_MSG_DURATION = 3; // 3 秒

// 1. Initialize
const app = dva({
  // history: createHistory(),
  // onError(e) {
  //   message.error(e.message, ERROR_MSG_DURATION);
  // },
});

// 2. Plugins
// app.use({});
app.use(createLoading());

// 3. Register global model
app.model(require('./models/global'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
