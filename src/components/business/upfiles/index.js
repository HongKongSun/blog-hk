import UpFiles from './src/UpFiles';
import FileList from './src/FileList';

/* istanbul ignore next */
UpFiles.install = function (Vue) {
    Vue.component(UpFiles.name, UpFiles);
    Vue.component(FileList.name, FileList);
};

export default {UpFiles,FileList};
