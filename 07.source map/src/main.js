// import "./component/cpns"
import { createApp } from 'vue'
import App from '@/vue-demo/App.vue'
import 'utils/demo.js'
// import { sum } from './utils/math'
// import "./component/cpns"

// const message = "Hello World"

// console.log(sum(20, 30))
// console.log(sum(10, 12))

// console.log(message.length)
// console.log(sum(100, message.length))

// const bar = () => {
//   console.log("bar function execution~")
// }

// bar()
// bar()

createApp(App).mount("#app")

// 使用通过DefinePlugin注入的变量
console.log(aaron)
console.log(counter)

console.log(count)

console.log(process.env.NODE_ENV)

if (module.hot) {
  module.hot.accept("./utils/demo.js", () => {
    console.log("demo模块发生了更新")
  })
}