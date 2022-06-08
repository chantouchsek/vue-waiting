import Vue from 'vue';
import VueWaiting from 'vue-waiting';

Vue.use(VueWaiting);

const pluginOptions = <%= serialize(options) %>
const waiting = new VueWaiting(pluginOptions)

export default ({ app }, inject) => {
    inject('waiting', waiting)
}
