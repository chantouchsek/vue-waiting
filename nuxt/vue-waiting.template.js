import Vue from 'vue';
import VueWaiting from 'vue-waiting';

Vue.use(VueWaiting);

export default ({ app }, inject) => {
    const pluginOptions = <%= serialize(options) %>
    app.waiting = new VueWaiting(pluginOptions)
    inject('wait', app.waiting)
}
