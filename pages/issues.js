import Link from 'next/link'

const Issues = () => {
	return (
		<div style={{ marginRight: 'auto', marginLeft: '50px' }}>
			<ul>
				<li>
					Does not work on route changes because the HTML is not rendered on the server when using
					`next/dynamic`. Causes layout shift and instant hydration. See{' '}
					<Link href="/route-change">
						<a>this page</a>
					</Link>
					.
				</li>
				<li>Seems to partially disable HMR.</li>
				<li>Wraps every lazy-hydrated component in a `div` with `display: contents`.</li>
			</ul>
		</div>
	)
}

export default Issues
