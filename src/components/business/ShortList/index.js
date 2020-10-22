import ShortList from './src/index';


ShortList.install = function (Vue) {
    Vue.component(ShortList.name, ShortList);
};

export default ShortList;
