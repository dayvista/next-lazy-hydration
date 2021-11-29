import Link from 'next/link'

const Issues = () => {
	return (
		<div style={{ marginRight: 'auto', marginLeft: '50px' }}>
			<ul>
				<li>
					Does not work on route changes, because the HTML does not exist on page load. Causes
					layout shift and components automatically hydrate. See{' '}
					<Link>
						<a>here</a>
					</Link>
					.
				</li>
				<li>Seems to disable HMR on the dev server in some instances.</li>
				<li>Wraps every lazy-hydrated component in a `div` with the style `display: contents`.</li>
			</ul>
		</div>
	)
}

export default Issues
