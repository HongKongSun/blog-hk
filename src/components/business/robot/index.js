import Robot from './src/robot';

/* istanbul ignore next */
Robot.install = function (Vue) {
    Vue.component(Robot.name, Robot);
};

export default Robot;
