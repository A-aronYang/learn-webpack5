import "../css/div_style.css"

// 创建div元素
const divEl = document.createElement("div")
divEl.textContent = "Hello World"
divEl.classList.add("content")
document.body.append(divEl)

// 