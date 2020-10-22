import MenuConfig from './src/menuconfig';

/* istanbul ignore next */
MenuConfig.install = function (Vue) {
    Vue.component(MenuConfig.name, MenuConfig);
};

export default MenuConfig;
