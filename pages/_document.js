import Document, { Html, Head, Main, NextScript } from 'next/document'

// Filter out chunks specified as 'lazy' in `next.config.js`
class LazyHead extends Head {
	getDynamicChunks(files) {
		const dynamicScripts = super.getDynamicChunks(files)

		try {
			// get chunk manifest from loadable
			const loadableManifest = __non_webpack_require__('../../react-loadable-manifest.json')
			// search and filter modules based on marker ID
			const chunksToExclude = Object.values(loadableManifest).filter(
				(manifestModule) => manifestModule?.id?.startsWith?.('lazy') || false
			)
			const excludeMap = chunksToExclude?.reduce?.((acc, chunks) => {
				if (chunks.files) {
					acc.push(...chunks.files)
				}
				return acc
			}, [])
			const filteredChunks = dynamicScripts?.filter?.(
				(script) => !excludeMap?.includes(script?.key)
			)

			return filteredChunks
		} catch (e) {
			// if it fails, return the dynamic scripts that were originally sent in
			return dynamicScripts
		}
	}
}

const backupScript = NextScript.getInlineScriptSource
NextScript.getInlineScriptSource = (props) => {
	// dont let next load all dynamic IDS, let webpack manage it
	if (props?.__NEXT_DATA__?.dynamicIds) {
		const filteredDynamicModuleIds = props?.__NEXT_DATA__?.dynamicIds?.filter?.(
			(moduleID) => !moduleID?.startsWith?.('lazy')
		)

		if (filteredDynamicModuleIds) {
			// mutate dynamicIds from next data
			props.__NEXT_DATA__.dynamicIds = filteredDynamicModuleIds
		}
	}
	return backupScript(props)
}

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
	}

	render() {
		return (
			<Html>
				{/* Use the modified `<Head />` here */}
				<LazyHead />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
