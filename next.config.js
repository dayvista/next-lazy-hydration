const mapModuleIds = (fn) => (compiler) => {
	const { context } = compiler.options

	compiler.hooks.compilation.tap('ChangeModuleIdsPlugin', (compilation) => {
		compilation.hooks.beforeModuleIds.tap('ChangeModuleIdsPlugin', (modules) => {
			const { chunkGraph } = compilation
			for (const module of modules) {
				if (module.libIdent) {
					const origId = module.libIdent({ context })
					// eslint-disable-next-line
					if (!origId) {
						continue
					}

					const namedModuleId = fn(origId, module)

					if (namedModuleId) {
						chunkGraph.setModuleId(module, namedModuleId)
					}
				}
			}
		})
	})
}

const withNamedLazyChunks = (nextConfig = {}) =>
	Object.assign({}, nextConfig, {
		webpack: (config, options) => {
			config.plugins.push(
				mapModuleIds((id, module) => {
					// Define file names of components that you want to control the hydration of here
					if (id.includes('LazyComponent.js')) {
						return `lazy-${module.debugId}`
					}
					return false
				})
			)

			if (typeof nextConfig.webpack === 'function') {
				return nextConfig.webpack(config, options)
			}

			return config
		}
	})

module.exports = withNamedLazyChunks({
	// Compile to Preact at build time for greater performance gains - unrelated to demonstration
	webpack: (config, { dev, isServer }) => {
		if (!dev && !isServer) {
			Object.assign(config.resolve.alias, {
				react: 'preact/compat',
				'react-dom/test-utils': 'preact/test-utils',
				'react-dom': 'preact/compat'
			})
		}

		return config
	}
})
