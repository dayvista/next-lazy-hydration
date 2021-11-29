// Modify the ID assigned to specific component chunks
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

// Add a `lazy` prefix to all chunks we want to lazy-load
const withNamedLazyChunks = (nextConfig = {}) =>
	Object.assign({}, nextConfig, {
		webpack: (config, options) => {
			config.plugins.push(
				mapModuleIds((id, module) => {
					// Add the file names/paths of any components you want to lazy hydrate here
					if (id.includes('/components/lazy-components')) {
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
	// Support the random doggo image
	images: { domains: ['www.businessinsider.in'] },

	// COMMENT OUT LINES 55 - 65 TO DISABLE PREACT
	// Compile to Preact to demonstrate lazy hydration in that framework vs. React.
	// ===
	// This requires a global state tool like Zustand to store server-side HTML during the hydration phase (prevents layout shift/flickering).
	// (see https://github.com/preactjs/preact/issues/2364#issuecomment-736956894 for why this is required with Preact but not React)
	webpack: (config, { isServer }) => {
		if (!isServer) {
			Object.assign(config.resolve.alias, {
				react: 'preact/compat',
				'react-dom/test-utils': 'preact/test-utils',
				'react-dom': 'preact/compat'
			})
		}

		return config
	}
})
