import htmr from 'htmr'

const LoadingComponent = ({ id }) => {
	const html = document.getElementById(id)?.outerHTML

	// Use `htmr` to parse the HTML rather than use `dangerouslySetInnerHTML` on a wrapper `div` with `display: contents;`
	return <>{html ? htmr(html) : null}</>
}

export default LoadingComponent
