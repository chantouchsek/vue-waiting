import Vue from 'vue';
import VueWaiting from 'vue-waiting';

export default ({app}) => {
    Vue.use(VueWaiting); // add VueWaiting as Vue plugin
    // inject options from module
    const pluginOptions = [<%= serialize(options) %>][0]
    app.waiting = new VueWaiting(pluginOptions)
}
