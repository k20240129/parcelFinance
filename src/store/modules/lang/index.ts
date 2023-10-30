const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? Boolean(Number(Cookies.get('sidebarStatus'))) : true,
    withoutAnimation: false
  },
  device: 'desktop',
  realRoutes: []
};

const mutations = {};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
