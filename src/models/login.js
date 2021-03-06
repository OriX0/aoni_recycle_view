import { history } from 'umi';
import { accountLogin, accountLogout } from '@/services/login';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(accountLogin, payload);
      if (response.errCode === 0) {
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        message.success('ð ð ð  ç»å½æåï¼');
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (window.routerBase !== '/') {
              redirect = redirect.replace(window.routerBase, '/');
            }
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        history.replace(redirect || '/');
      }
    },

    *logout(_, { call }) {
      const response = yield call(accountLogout);
      // å¦æéåºæå
      if (response.errCode === 0) {
        // æ¸é¤æælocalStorageæ°æ®
        localStorage.clear();
      }
      // éå®åå°ç»å½é¡µ
      history.replace('/user/login');
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      // setAuthority(payload.currentAuthority);
      localStorage.setItem('currentUser', JSON.stringify(payload.data.userInfo));
      return { ...state };
    },
  },
};
export default Model;
