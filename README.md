这是一个将vue中行内样式的px转换为vw的vite插件。  
为什么会有这个插件？ 因为使用postcss-px-to-viewport不会去转行内样式。已经有前辈弄了一个postcss-style-px-to-viewport，但是vite没法使用，所以学着vite官方插件教程修改成了vite可以使用的插件。
使用方式：
```
//在vite.config.js中添加插件

import stylepxtoviewport from 'vite-plugin-vue-style-px-to-viewport'


export default defineConfig({
	base: './',
	plugins: [
		vue(),
		stylepxtoviewport()
	]
})
```

stylepxtoviewport中可以传入的参数参考postcss-px-to-viewport的参数。
```
defaultsProp = {
	unitToConvert: 'px',
	ignoreUnitCase: true, // 转换单位是否忽略大小写
	viewportWidth: 750,
	unitPrecision: 5,
	viewportUnit: 'vw',
	fontViewportUnit: 'vw',
	minPixelValue: 1
};
```