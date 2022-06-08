import Vue from 'vue';
import VueWaiting from 'vue-waiting';

const pluginOptions = <%= serialize(options) %>

Vue.use(VueWaiting);

export default ({ app }, inject) => {
    app.waiting = new VueWaiting(pluginOptions)
    inject('wait', app.waiting)
}
