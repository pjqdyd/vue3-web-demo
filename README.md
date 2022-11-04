
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

#### [扩展] 将hash路由模式的项目打包部署到github pages


需要注意的是如果你的仓库名是repo-name, 那么在vite.config.js需要<br/>
修改`base: '/repo-name'`来打包,
因此部署后的访问地址变为：https://[username].github.io/[repo-name]

```
不采用history模式来部署github pages的原因是:

如果我们使用history路由模式
在nginx部署上可以采用 try_files $uri $uri/ /index.html; 配置
来重定向所有的url页面到index上，来避免单页应用查找不到页面资源而出现404的情况。
而在github pages的静态资源服务器上没有开放配置，因此使用hash模式路由。
```
---
#### License
This project is licensed under the [MIT](https://github.com/pjqdyd/vue3-web-demo/blob/master/LICENSE) license.
