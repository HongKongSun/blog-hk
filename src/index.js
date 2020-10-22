import FinD from '@weus/fuc-design'
import '@weus/fuc-design/lib/theme-default/index.css';
import vuescroll from 'vuescroll'


import Robot from './components/business/robot/index'
import MenuConfig from './components/business/menuconfig/index'
import Tinymce from './components/business/Tinymce/index.vue'
import UploadExcel from './components/business/UploadExcel/index.vue'
import SelectSlot from './components/business/selectSlot/index.vue'
import ProTable from './components/business/ProTable/ProTable.vue'
import SCurrency from './components/business/SCurrency/SCurrency.vue'
import Swiper from './components/business/Swiper/Swiper.vue'

import MultipleSelect from './components/business/multipleSelect/index.js'
import ShortList from './components/business/ShortList/index.js'
import SvgIcon from './components/business/svgIcon/index.js'
import Upfiles from './components/business/upfiles/index.js'



const components = {

    install(Vue) {

        Vue.component('frd-Robot', Robot);

        Vue.component('frd-MenuConfig', MenuConfig);
        Vue.component('frd-Tinymce', Tinymce);
        Vue.component('frd-UploadExcel', UploadExcel);
        Vue.component('frd-SelectSlot', SelectSlot);
        Vue.component('frd-ProTable', ProTable);
        Vue.component('frd-SCurrency', SCurrency);
        Vue.component('frd-Swiper', Swiper);

        Vue.component('frd-MultipleSelect', MultipleSelect);
        Vue.component('frd-ShortList', ShortList);
        Vue.component('frd-SvgIcon', SvgIcon);
        Vue.component('frd-Upfiles', Upfiles);

        Vue.use(FinD);

        Vue.use(vuescroll, {
            ops: {
                vuescroll: {},
                scrollPanel: {
                    speed: 100,
                    scrollingX: false,
                },
                rail: {},
                bar: {
                    keepShow: true,
                    background: '#E4E5EA',
                    size: '4px',
                }
            },
        })


    }

};

// 这里的判断很重要

if (typeof window !== 'undefined' && window.Vue) {

    window.Vue.use(components);

}



export default components;