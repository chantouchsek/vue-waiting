import Vue from 'vue';
import VueWaiting from 'vue-waiting';

Vue.use(VueWaiting); // add VueWaiting as Vue plugin

export default ({app}) => {
    // inject options from module
    const pluginOptions = [<%= serialize(options) %>][0]
    app.waiting = new VueWaiting(pluginOptions)
}
