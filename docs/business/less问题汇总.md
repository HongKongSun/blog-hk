---
sidebarDepth: 2
---

# less中设置全局变量


> Less的全局引入方案：
1. 首先安装依赖：npm i style-resources-loader vue-cli-plugin-style-resources-loader -D
2. 在配置根目录下vue.config.js

```html

	module.exports = {
	     ...
	     pluginOptions: {
	        "style-resources-loader": {
	            preProcessor: "less",
	            patterns: [
	              //这个是加上自己的路径，
	              //注意：试过不能使用别名路径
	              path.resolve(__dirname, "./src/assets/variable.less")
	             ]
	         }
	     }
	     ...
    }
```

</details>

