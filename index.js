module.exports = function vitePluginTemplate(options) {
	// 匹配到 template 标签
	const template = /<template>([\s\S]+)<\/template>/gi;
	const stylePXRegExp = /(\d+)px/;

	let defaultsProp = {
		unitToConvert: 'px',
		ignoreUnitCase: true, // 转换单位是否忽略大小写
		viewportWidth: 750,
		unitPrecision: 5,
		viewportUnit: 'vw',
		fontViewportUnit: 'vw',
		minPixelValue: 1
	};

	function createPxReplace(viewportSize, minPixelValue, unitPrecision, viewportUnit) {
		return function ($0, $1) {
			if (!$1) return
			const pixels = parseFloat($1)
			if (pixels <= minPixelValue) return
			return toFixed((pixels / viewportSize * 100), unitPrecision) + viewportUnit
		}
	}
	function toFixed(number, precision) {
		const multiplier = Math.pow(10, precision + 1),
			wholeNumber = Math.floor(number * multiplier)
		return Math.round(wholeNumber / 10) * 10 / multiplier
	}

	return {
		// 插件名称
		name: 'style-px-to-viewport',

		// pre 会较于 post 先执行
		enforce: 'pre', // post

		config(config, { command }) {
		},

		configResolved(resolvedConfig) {
		},

		configureServer(server) {
		},

		transform(code, id) {
			if (!/\.(vue)$/.test(id)) {
				return;
			}
			const dpo = { ...defaultsProp, ...options };
			let newSource = '';
			if (template.test(code)) {
				newSource = code.match(template)[0];
			}

			const pxReg = new RegExp(stylePXRegExp.source, dpo.ignoreUnitCase ? 'ig' : 'g');
			if (pxReg.test(newSource)) {
				const _source = newSource.replace(pxReg, createPxReplace(dpo.viewportWidth, dpo.minPixelValue, dpo.unitPrecision, dpo.viewportUnit))
				newSource = code.replace(template, _source)
			}
			return {
				code: newSource,
				map: null // 如果可行将提供 source map
			  }
		},
	}
}