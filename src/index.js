import dva from 'dva';
import createLoading from 'dva-loading';
import createHistory from 'history/createBrowserHistory';
import './g2';
import './index.css';

// 1. Initialize
const app = dva({
  // history: createHistory(),
});

// 2. Plugins
// app.use({});
app.use(createLoading());

// 3. Register global model
app.model(require('./models/global').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
