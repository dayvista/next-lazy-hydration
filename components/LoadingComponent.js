import htmr from 'htmr'

import useStore from '../lib/store'

const LoadingComponent = ({ id }) => {
	const lazyComponent = useStore((state) => state.lazyComponents[id])

	// Use `htmr` to parse the HTML rather than use `dangerouslySetInnerHTML` on a wrapper `div` with `display: contents;`
	return <>{lazyComponent ? htmr(lazyComponent) : null}</>
}

export default LoadingComponent
