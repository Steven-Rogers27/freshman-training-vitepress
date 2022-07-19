# 开发框架

## 客户端框架

### [Vue](https://vuejs.org/guide/introduction.html)

![Vue渲染机制](/vue-render-pipeline.png)

### 简单示例

```vue
<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
```

```js
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')
```
#### Vue周边

状态管理

[Pinia](https://pinia.vuejs.org/introduction.html)

前端路由

[VueRouter](https://router.vuejs.org/guide/)

脚手架工具

[Vite](https://vitejs.dev/guide/)

[VueCli](https://cli.vuejs.org/guide/)

SSR

[Nuxtjs](https://v3.nuxtjs.org/guide/concepts/introduction)

<br>
<br>

### [React](https://reactjs.org/docs/getting-started.html)

![React生命周期](/react-lifecycle.png)

#### 简单示例

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

```html
<div id="root">
    <!-- This element's contents will be replaced with your component. -->
</div>
```

输出

```
Hello, Sara
Hello, Cahal
Hello, Edite
```

#### React周边

状态管理

[Redux](https://redux.js.org/introduction/getting-started)

前端路由

[ReactRouter](https://reactrouter.com/docs/en/v6)

脚手架工具

[Create React App](https://create-react-app.dev/)

SSR

[Nextjs](https://nextjs.org/learn/foundations/about-nextjs/what-is-nextjs)

[Remix](https://remix.run/docs/en/v1/tutorials/blog)

<br>
<br>

### [Svelte](https://svelte.dev/tutorial/basics)

