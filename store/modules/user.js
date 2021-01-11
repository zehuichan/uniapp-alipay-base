// utils
import {
  saveToLocal,
  loadFromLocal,
  removeFromLocal
} from '@/utils/index.js'

const state = {
  avatar: loadFromLocal('avatar') || 'https://img.yzcdn.cn/vant/cat.jpeg',
  mobile: loadFromLocal('mobile') || '',
  email: loadFromLocal('email') || '',

  userId: loadFromLocal('userId') || '',
  name: loadFromLocal('name') || '欢迎注册！',
}

const mutations = {
  SET_AVATAR(state, avatar) {
    state.avatar = avatar;
    saveToLocal('avatar', avatar);
  },
  SET_MOBILE(state, mobile) {
    state.mobile = mobile;
    saveToLocal('mobile', mobile);
  },

  SET_USERID(state, userId) {
    state.userId = userId;
    saveToLocal('userId', userId);
  },
  SET_NANE(state, name) {
    state.name = name;
    saveToLocal('name', name);
  },

  LOGOUT(state) {
    state.avatar = 'https://img.yzcdn.cn/vant/cat.jpeg';
    state.mobile = '';

    state.userId = '';
    state.name = '欢迎注册！';

    removeFromLocal('avatar')
    removeFromLocal('mobile')

    removeFromLocal('userId')
    removeFromLocal('name')
  }
}

const actions = {

}

export default {
  state,
  mutations,
  actions
}
