/*
Nuxt.js module for vue-waiting

Usage:
    - Install vue-waiting package
    - Add this into your nuxt.config.js file:
    {
        modules: [
            // Simple usage
            'vue-waiting/nuxt'

            // Optionally passing options in module configuration
            ['vue-waiting/nuxt', { useVuex: true }]
        ],

        // Optionally passing options in module top level configuration
        wait: { useVuex: true }
    }
*/

const {resolve} = require('path');

module.exports = function nuxtVueWaitingModule(moduleOptions) {
    const options = Object.assign({}, this.options.waiting, moduleOptions);
    // Register plugin
    this.addPlugin({
        src: resolve(__dirname, 'vue-waiting.template.js'),
        fileName: 'vue-waiting.js',
        options
    })

    // Transpile escape-string-regexp for IE11 support
    this.options.build.transpile.push(/^escape-string-regexp/)
};


// required by nuxt
module.exports.meta = require('../package.json');
