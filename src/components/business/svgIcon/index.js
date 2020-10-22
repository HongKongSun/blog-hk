
import SvgIcon from './src/main.vue';

/* istanbul ignore next */
SvgIcon.install = function (Vue) {
  Vue.component(SvgIcon.name, SvgIcon);
};


// 引入/src/icons/svg/下所有的svg图片
const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('../../../assets/svg', true, /\.svg$/);
requireAll(req);

export default SvgIcon;
