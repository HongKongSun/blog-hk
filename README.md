## 安装 Perfect UI Pro

### 1.首先切换下载源

```javascript
NPM :    npm config set registry http://jnpm.cbpmgt.com/
YARN :   yarn config set registry http://jnpm.cbpmgt.com/
```

### 2.执行安装命令

```javascript
npm i @jdd/perfect-ui 或 yarn add @jdd/perfect-ui
```

## 在 main.js 中写入以下内容：

```javascript
import Perfect from "@jdd/perfect-ui";

Vue.use(Perfect);
```
