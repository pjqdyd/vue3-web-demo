
## Vue3 web demo 项目的简单案例模板

<h2 align="middle">vue3 web demo</h2>
<p align="middle">
    <img src="https://badgen.net/badge/vue/3.2.25/2dd160/"/>
    <img src="https://badgen.net/badge/vite/2.7.2/5dadfe/"/>
    <img src="https://badgen.net/badge/language/typescript/cyan"/>
    <img src="https://badgen.net/badge/package/pnpm/blue"/>
    <img src="https://badgen.net/badge/license/MIT/green"/>
    <img src="https://badgen.net/badge/contributors/1/blue"/>
    <img src="https://badgen.net/badge/package size/119kb/blue"/>
</p>

#### 访问地址：[https://pjqdyd.github.io/vue3-web-demo](https://pjqdyd.github.io/vue3-web-demo)

#### 相关技术
```
Node v14.18.0
Typescript 4.0.5

Vue3 | Pinia | TSX | Sass | Vite
```

#### 项目启动
项目采用 pnpm 包管理器,如果没有请先安装 pnpm
```npm
npm i -g pnpm // 全局安装 pnpm

pnpm install  // 安装依赖
pnpm dev      // 开发
pnpm build    // 打包
pnpm preview  // 本地打包预览

注意：如果下载慢请先设置各自的镜像
npm config set registry https://registry.npmmirror.com/
pnpm config set registry https://registry.npmmirror.com/
```

---

#### [扩展] 如何将history路由模式的项目打包部署到github pages

在nginx部署上我们采用 `try_files $uri $uri/ /index.html;` 来重定所有的url页面
到index上，来避免单页应用查找不到页面资源而出现404的情况，这是history路由的配置方式。

在github pages上部署则可以使用重定404.html到index.html来hack解决:
即在public下新建404.html 添加以下内容:
```javascript
<script>
  (function(){
    let redirect = sessionStorage.redirect;
    delete sessionStorage.redirect;
    if (redirect && redirect !== location.href) {
      history.replaceState(null, null, redirect);
    }
  })();
</script>
```

在index.html添加以下内容：
```javascript
<script>
  sessionStorage.redirect = location.href;
</script>
```
并且需要注意的是如果你的仓库名是repo-name, 那么在vite.config.js需要
修改`base: '/repo-name'`来打包,
因此部署后的访问地址变为：https://[username].github.io/[repo-name]

---
#### License
This project is licensed under the [MIT](https://github.com/pjqdyd/vue3-web-demo/blob/master/LICENSE) license.
