<p align="center">
 Multiple Process Loader Management for <a href="http://vuejs.org/" rel="nofollow" class="rich-diff-level-one">Vue</a> and (optionally) <a href="http://vuex.vuejs.org/" rel="nofollow" class="rich-diff-level-one">Vuex</a>.
</p>

[![npm version](https://badge.fury.io/js/vue-waiting.svg)](https://badge.fury.io/js/vue-waiting)

---

![vue-waiting](https://user-images.githubusercontent.com/196477/42170484-4d91e36a-7e1f-11e8-9cee-816bfe857db2.gif)

> [Play with demo above](https://f.github.io/vue-wait/).

**vue-waiting** helps to manage multiple loading states on the page without any conflict. It's based on a **very simple
idea** that manages an array (or Vuex store optionally) with multiple loading states. The **built-in loader component**
listens its registered loader and immediately become loading state.

# ⏩Quick Start

If you are a **try and learn** developer, you can start trying the **vue-waiting** now
using [codesandbox.io](https://codesandbox.io).

[![Edit VueWaiting Sandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/85q3vpm42?autoresize=1&hidenavigation=1&module=%2Fsrc%2Fcomponents%2FMyList.vue)

### Note:

This is a copy of work from [VueWait](https://f.github.io/vue-wait), just add more features, and support typescript.

### 1. Install:

```bash
yarn add vue-waiting
```

### 2. Require:

```js
import VueWaiting from 'vue-waiting'

Vue.use(VueWaiting)

new Vue({
    // your vue config
    waiting: new VueWaiting(),
})
```

### 3. Use in Your Components

```vue

<template>
  <v-waiting for="my list is to load">
    <template slot="waiting">
      <div>
        <img src="loading.gif"/>
        Loading the list...
      </div>
    </template>
    <ul>
      <li v-for="item in myList">{{ item }}</li>
    </ul>
  </v-waiting>
</template>

<script>
export default {
  data() {
    return {
      myList: []
    }
  },
  async created() {
    // start waiting
    this.$waiting.start('my list is to load');

    this.myList = await fetch('/my-list-url');

    // stop waiting
    this.$waiting.end('my list is to load');
  },
};
</script>
```

> **vue-waiting has more abilities to make the management easier, please read the complete documentation.**

# ▶️Detailed Start

## 📦 Requirements

- [Vue.js](https://vuejs.org) (v2.0.0+) < 3.x

## 🚀 Power Supplies

- [Vuex](http://vuex.vuejs.org), optionally (v2.0.0+)

## 🔧 Installation

via CLI:

```bash
$ yarn add vue-waiting
# or if you using npm
$ npm install vue-waiting
```

## 📖 Usage

```js
import VueWaiting from 'vue-waiting'

Vue.use(VueWaiting) // add VueWaiting as Vue plugin
```

Then you should register `waiting` property (`VueWaiting` instance) to the Vue instance:

```js
new Vue({
    el: '#app',
    store,
    waiting: new VueWaiting({
        // Defaults values are following:
        useVuex: true,              // Uses Vuex to manage waiting state
        vuexModuleName: 'waiting',      // Vuex module name

        registerComponent: true,     // Registers `v-waiting` component
        componentName: 'v-waiting',     // <v-waiting> component name, you can set `my-loader` etc.

        registerDirective: true,     // Registers `v-waiting` directive
        directiveName: 'waiting',       // <span v-waiting /> directive name, you can set `my-loader` etc.

    }),
});
```

## ♻️ Usage with Vuex

Simply set `useVuex` parameter to `true` and optionally override
`vuexModuleName`

```js
import VueWaiting from 'vue-waiting'

Vue.use(Vuex)
Vue.use(VueWaiting) // add VueWaiting as Vue plugin
```

Then you should register `VueWaiting` module:

```js
new Vue({
    el: '#app',
    store,
    waiting: new VueWaiting({
        useVuex: true, // You must pass this option `true` to use Vuex
        vuexModuleName: 'vuex-example-module' // It's optional, `waiting` by default.
    }),
});
```

Now `VueWaiting` will use `Vuex` store for data management which can be traced in `Vue DevTools > Vuex`

## ♻️ Usage with Nuxt.js

Add `vue-waiting/nuxt` to modules section of `nuxt.config.js`

```js
export default {
    modules: [
        // Simple usage
        'vue-waiting/nuxt',
        // Optionally passing options in module configuration
        ['vue-waiting/nuxt', { useVuex: true }]
    ],
    // Optionally passing options in module top level configuration
    waiting: { useVuex: true }
}
```

## 🔁 `VueWaiting` Options

You can use this options for customize VueWaiting behavior.

| Option Name | Type | Default | Description |
| ----------- | ---- | ------- | ----------- |
| `accessorName` | `String` | `"$waiting"` | You can change this value to rename the accessor. E.g. if you rename this to `$w`, your `VueWaiting` methods will be accessible by `$w.waits(..)` etc. |
| `useVuex` | `Boolean` | `false` | Use this value for enabling integration with `Vuex` store. When this value is true `VueWaiting` will store data in `Vuex` store and all changes to this data will be made by dispatching actions to store |
| `vuexModuleName` | `String` | `"waiting"` | Name for `Vuex` store if `useVuex` set to true, otherwise not used. |
| `registerComponent` | `Boolean` | `true` | Registers `v-waiting` component. |
| `componentName` | `String` | `"v-waiting"` | Changes `v-waiting` component name. |
| `registerDirective` | `Boolean` | `true` | Registers `v-waiting` directive. |
| `directiveName` | `String` | `"v-waiting"` | Changes `v-waiting` directive name. |

## 🌈 Global Template Helpers

**vue-waiting** provides some helpers to you to use in your templates. All features can be obtained from $waiting
property in Vue components.

#### `.any`

Returns boolean value if any loader exists in page.

```vue

<template>
  <progress-bar v-if="$waiting.any">Please waiting...</progress-bar>
</template>
```

#### `.is(loader String | Matcher)` or `.waiting(loader String | Matcher)`

Returns boolean value if given loader exists in page.

```vue

<template>
  <progress-bar v-if="$waiting.is('creating user')">Creating User...</progress-bar>
</template>
```

You can use **`waiting`** alias instead of **`is`**.

```vue

<template>
  <div v-if="$waiting.waiting('fetching users')">
    Fetching users...
  </div>
</template>
```

Also you can use matcher to make it more flexible:

Please see [matcher](https://github.com/sindresorhus/matcher/) library to see how to use matchers.

```vue

<template>
  <progress-bar v-if="$waiting.is('creating.*')">Creating something...</progress-bar>
</template>
```

#### `.is(loaders Array<String | Matcher>)` or `.waiting(loaders Array<String | Matcher>)`

Returns boolean value if some of given loaders exists in page.

```vue

<template>
  <progress-bar v-if="$waiting.is(['creating user', 'page loading'])">Creating User...</progress-bar>
</template>
```

#### `.start(loader String)`

Starts the given loader.

```vue

<template>
  <button @click="$waiting.start('creating user')">Create User</button>
</template>
```

#### `.end(loader String)`

Stops the given loader.

```vue

<template>
  <button @click="$waiting.end('creating user')">Cancel</button>
</template>
```

#### `.progress(loader String, current [, total = 100])`

Sets the progress of the given loader.

```vue

<template>
  <progress min="0" max="100" :value="$waiting.percent('downloading')"/>
  <button @click="$waiting.progress('downloading', 10)">Set progress to 10</button>
  <button @click="$waiting.progress('downloading', 50)">Set progress to 50</button>
  <button @click="$waiting.progress('downloading', 50, 200)">Set progress to 50 of 200 (25%)</button>
</template>
```

##### Completing the Progress

To complete the progress, `current` value should be set bigger than `100`. If you `total` is given, `current` must be
bigger than `total`.

```vue

<button @click="$waiting.progress('downloading', 101)">Set as downloaded (101 of 100)</button>
```

or

```vue

<button @click="$waiting.progress('downloading', 5, 6)">Set as downloaded (6 of 5)</button>
```

#### `.percent(loader String)`

Returns the percentage of the given loader.

```vue

<template>
  <progress min="0" max="100" :value="$waiting.percent('downloading')"/>
</template>
```

## 🏹 Directives

You can use directives to make your template cleaner.

#### `v-waiting:visible='"loader name"'`

Shows if the given loader is loading.

```vue

<template>
  <progress-bar v-waiting:visible='"creating user"'>Creating User...</progress-bar>
</template>
```

#### `v-waiting:hidden='"loader name"'` or `v-waiting:visible.not='"loader name"'`

Hides if the given loader is loading.

```vue

<template>
  <main v-waiting:hidden='"creating *"'>Some Content</main>
</template>
```

#### `v-waiting:disabled='"loader name"'`

Sets `disabled="disabled"` attribute to element if the given loader is loading.

```vue

<template>
  <input v-waiting:disabled="'*'" placeholder="Username"/>
  <input v-waiting:disabled="'*'" placeholder="Password"/>
</template>
```

#### `v-waiting:enabled='"loader name"'` or `v-waiting:disabled.not='"loader name"'`

Removes `disabled="disabled"` attribute to element if the given loader is loading.

```vue

<template>
  <button v-waiting:enabled='"creating user"'>Abort Request</button>
</template>
```

#### `v-waiting:click.start='"loader name"'`

Starts given loader on click.

```vue

<template>
  <button v-waiting:click.start='"create user"'>Start loader</button>
</template>
```

#### `v-waiting:click.end='"loader name"'`

Ends given loader on click.

```vue

<template>
  <button v-waiting:click.end='"create user"'>End loader</button>
</template>
```

#### `v-waiting:toggle='"loader name"'`

Toggles given loader on click.

```vue

<template>
  <button v-waiting:toggle='"flip flop"'>Toggles the loader</button>
</template>
```

#### `v-waiting:click.progress='["loader name", 80]'`

Sets the progress of given loader on click.

```vue

<template>
  <button v-waiting:click.progress='["downloading", 80]'>Set the "downloading" loader to 80</button>
</template>
```

## 🔌 Loading Action and Getter Mappers

**vue-waiting** provides `mapWaitingActions` and `mapWaitingGetters` mapper to be used with your Vuex stores.

Let's assume you have a store and async **action**s called `createUser` and `updateUser`. It will call the methods you
map and will start loaders while action is resolved.

```js
import {mapWaitingActions, mapWaitingGetters} from 'vue-waiting'

export default {
    methods: {
        ...mapWaitingActions('users', {
            getUsers: 'loading users',
            createUser: 'creating user',
            updateUser: 'updating user',
        }),
    },
    computed: {
        ...mapWaitingGetters({
            somethingWithUsers: [
                'loading users',
                'creating user',
                'updating user',
            ],
            deletingUser: 'deleting user',
        }),
    }
}
// ...
```

You can also map **action** to custom method and customize loader name like in example below:

```js
import {mapWaitingActions, mapWaitingGetters} from 'vue-waiting'

// ...
export default {
    methods: {
        ...mapWaitingActions('users', {
            getUsers: { action: 'getUsers', loader: 'loading users' },
            createUser: { action: 'createUser', loader: 'creating user' },
            createSuperUser: { action: 'createUser', loader: 'creating super user' },
        }),
    },
}
// ...
```

There is also possibility to use array as a second argument to mapWaitingActions:

```js
// ...
export default {
    methods: {
        ...mapWaitingActions('users', [
            'getUsers',
            { method: 'createUser', action: 'createUser', loader: 'creating user' },
            { method: 'createSuperUser', action: 'createUser', loader: 'creating super user' },
        ]),
    },
}
// ...


```

### ☢️Advanced Getters and Actions Usage

> The Vuex module name is `waiting` by default. If you've changed on config, you should get it by `rootGetters['<vuex module name>/is']` or `rootGetters['<vuex module name>/any']`.

You can access `vue-waiting`'s Vuex getters using `rootGetters` in Vuex.

```js
export default {
    getters: {
        cartOperationInProgress(state, getters, rootState, rootGetters) {
            return rootGetters['waiting/is']('cart.*');
        }
    },
}
```

And you can start and end loaders using `waiting` actions. You must pass `root: true` option to the `dispatch` method.

```js
export default {
    actions: {
        async addItemToCart({ dispatch }, item) {
            dispatch('waiting/start', 'cart.addItem', { root: true });
            await CartService.addItem(item);
            dispatch('waiting/end', 'cart.addItem', { root: true });
        }
    },
}
```

#### `waitFor(loader String, func Function [,forceSync = false])`

Decorator that wraps function, will trigger a loading and will end loader after the original function (`func` argument)
is finished.

By default `waitFor` return async function, if you want to wrap default sync function pass `true` in last argument

_Example using with async function_

```js
import {waitFor} from 'vue-waiting';

// ...
export default {
    methods: {
        fetchDataFromApi: waitFor('fetch data', async function () {
            function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }

            // do work here
            await sleep(3000);
            // simulate some api call
            this.fetchResponse = Math.random()
        })
    }
}
// ...
```

See also `examples/wrap-example`

## 💧 Using `v-waiting` Component

If you disable `registerComponent` option then import and add `v-waiting` into components

```js
import vLoading from 'vue-waiting/src/components/v-waiting.vue'

export default {
    components: {
        'v-waiting': vLoading
    }
}
```

In template, you should wrap your content with `v-waiting` component to show loading on it.

```vue

<template>
  <v-waiting for='fetching data'>
    <template slot='waiting'>
      This will be shown when "fetching data" loader starts.
    </template>

    This will be shown when "fetching data" loader ends.
  </v-waiting>
</template>
```

Better example for a `button` with loading state:

```vue

<template>
  <button :disabled='$waiting.is("creating user")'>
    <v-waiting for='creating user'>
      <template slot='waiting'>Creating User...</template>
      Create User
    </v-waiting>
  </button>
</template>
```

## 🔁 Transitions

You can use transitions with `v-waiting` component.

Just pass `<transition>` props and listeners to the `v-waiting` with `transition` prop.

```vue

<template>
  <v-waiting for="users"
             transition="fade"
             mode="out-in"
             :duration="1000"
             enter-active-class="enter-active"
             @leave='someAwesomeFinish()'
  >
    <template slot="waiting">
      <p>Loading...</p>
    </template>
    My content
  </v-waiting>
</template>
```

## ⚡️ Making Reusable Loader Components

With reusable loader components, you will be able to use custom loader components as example below. This will allow you
to create better **user loading experience**.

<img src="./resources/vue-waiting-2.gif" width="480">

In this example above, the **tab gets data from back-end**, and the **table loads data from back-end at the same time**.
With **vue-waiting**, you will be able to manage these two seperated loading processes easily:

```vue

<template>
  <div>
    <v-waiting for="fetching tabs">
      <template slot="waiting">
        <b-tabs>
          <template slot="tabs">
            <b-nav-item active="active" disabled>
              <v-icon name="circle-o-notch" spin="spin"/>
            </b-nav-item>
          </template>
        </b-tabs>
      </template>
      <b-tabs>
        <template slot="tabs">
          <b-nav-item v-for="tab in tabs">{{ tab.name }}</b-nav-item>
        </template>
      </b-tabs>
    </v-waiting>
    <v-waiting for="fetching data">
      <table-gradient-spinner slot="waiting"/>
      <table>
        <tr v-for="row in data">
          <!-- ...-->
        </tr>
      </table>
    </v-waiting>
  </div>
</template>
```

You may want to design your own reusable loader for your project. You better create a wrapper component
called `my-waiter`:

```vue
<!-- MySpinner.vue -->
<i18n>
  kh:
    loading: កុំពុងទាញ...
  en:
    loading: Loading...

</i18n>

<template>
  <div class="loading-spinner">
    <v-icon name="refresh" spin="spin"/>
    <span>{{ $t('loading') }}</span>
  </div>
</template>

<style scoped lang="scss">
.loading-spinner {
  opacity: 0.5;
  margin: 50px auto;
  text-align: center;

  .fa-icon {
    vertical-align: middle;
    margin-right: 10px;
  }
}
</style>
```

Now you can use your spinner everywhere using `slot='waiting'` attribute:

```vue

<template>
  <v-waiting for="fetching data">
    <my-waiter slot="waiting"/>
    <div>
      <p>My main content after fetching data...</p>
    </div>
  </v-waiting>
</template>
```

## 📦 Using with external spinner libraries

You can use `vue-waiting` with another spinner libraries
like [epic-spinners](https://github.com/epicmaxco/epic-spinners) or other libraries. You just need to
add `slot="waiting"` to the component and Vue handles rest of the work.

First register the component,

```js
import { OrbitSpinner } from 'epic-spinners';

Vue.component('orbit-spinner', OrbitSpinner);
```

Then use it in your as a `v-waiting`'s `waiting` slot.

```vue

<template>
  <v-waiting for='something to load'>
    <orbit-spinner
        slot='waiting'
        :animation-duration="1500"
        :size="64"
        :color="'#ff1d5e'"
    />
  </v-waiting>
</template>
```

... and done!

For other libraries you can use, please see [Loaders section of **
vuejs/awesome-vue**](https://github.com/vuejs/awesome-vue#loader).

## 🚌 Run example

Use `npm run vuex:dev`, `npm run vue:dev` or `npm run wrap:dev` or `npm run transition:dev` commands. for running examples locally.

## ✔ Testing components

You can test components using `vue-waiting` but it requires the configuration. Let's take a basic component for
instance:

```vue

<template>
  <v-waiting for="loading">
    <Spinner slot="waiting"/>
    <ul class="suggestions">
      <li v-for="suggestion in suggestions">{{ suggestion.name }}</li>
    </ul>
  </v-waiting>
</template>
<script>
export default {
  data() {
    return {
      suggestions: [{ name: 'Suggest 1' }]
    }
  },
}
</script>
```

```js
const localVue = createLocalVue();
localVue.use(Vuex); // optionally when you use Vuex integration

it('uses vue-waiting component', () => {
    const wrapper = shallowMount(Suggestions, {localVue});
    expect(wrapper.find('.suggestions').exists()).toBeTruthy();
});
```

`vue-test-utils` will replace `v-waiting` component with an empty `div`, making it difficult to test correctly.

First, make your local Vue instance use `vue-waiting`,

```js
const localVue = createLocalVue();
localVue.use(Vuex); // optionally when you use Vuex integration
localVue.use(VueWaiting);
```

Then inject the `waiting` property using `VueWaiting` constructor,

```js
it('uses vue-waiting component', () => {
    const wrapper = shallowMount(SuggestedAddresses, {
        localVue,
        waiting: new VueWaiting()
    });
    expect(wrapper.find('.suggestions').exists()).toBeTruthy(); // it works!
});
```

## 🎯 Contributors

- Chantouch Sek, (writer)

## 🔑 License

MIT © [Chantouch Sek](https://github.com/Chantouch/vue-waiting/blob/main/LICENSE)
