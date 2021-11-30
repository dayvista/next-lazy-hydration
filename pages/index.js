import Link from 'next/link'
import dynamic from 'next/dynamic'

import LazyHydrate from '../components/LazyHydrate'
import LoadingComponent from '../components/LoadingComponent'

// React way
const Counter = dynamic(() => import('../components/lazy-components/Counter'), {
	loading: () => {
		const html = typeof window !== 'undefined' && document.getElementById('counter')?.outerHTML

		return <div dangerouslySetInnerHTML={{ __html: html }} />
	}
})

// Preact way
const CounterPreact = dynamic(() => import('../components/lazy-components/CounterPreact'), {
	loading: () => <LoadingComponent id="counter-preact" />
})
const LazyScrollPreact = dynamic(() => import('../components/lazy-components/LazyScrollPreact'), {
	loading: () => <LoadingComponent id="scroll-preact" />
})

const Home = () => {
	return (
		<div>
			{/* Explanation */}
			<h1>Lazy loading/on-demand hydration demo</h1>

			<div
				style={{
					paddingLeft: '2rem',
					paddingRight: '2rem',
					textAlign: 'left',
					alignItems: 'flex-start'
				}}>
				<p>
					This is an example of selective hydration for individual components inspired by a{' '}
					<a
						href="https://scriptedalchemy.medium.com/next-js-and-lazy-hydration-keep-the-html-but-drop-the-javascript-846feb2da1f"
						rel="noopener noreferrer"
						target="_blank">
						blog post
					</a>{' '}
					by Zack Jackson.
				</p>
				<p>
					<a
						href="https://next-no-js-git-main-shaneosbourne8.vercel.app/"
						rel="noopener noreferrer"
						target="_blank">
						Here's another approach
					</a>{' '}
					(with{' '}
					<a
						href="https://github.com/shakyShane/next-no-js"
						rel="noopener noreferrer"
						target="_blank">
						a repo
					</a>
					) from Shane Osbourne that opts out of JS completely until the page contains a component
					that opts into hydration.
				</p>
				<p>
					I believe these 2 approaches (selective hydration + completely static pages by default)
					could be used together to create an approach to static site generation similar to{' '}
					<a href="https://astro.build" rel="noopener noreferrer" target="_blank">
						Astro
					</a>
					. This would expand upon the range of Next.js even further to allow the development of
					fully static sites with embedded JS functionality.
				</p>
			</div>

			<hr />

			<Link href="/issues">
				<a style={{ fontWeight: 600 }}>Known issues/limitations</a>
			</Link>

			<p>
				<span style={{ fontWeight: 600 }}>
					This page is currently using React, so both examples will work.
				</span>
				<br />
				Clone this repo and modify next.config.js to test it out with Preact.
			</p>

			<p>Open the 'Network' tab in dev tools to see the chunks lazy load.</p>

			{/* Example code begins */}
			<div className="container">
				<div>
					<h2 style={{ textDecoration: 'underline' }}>React example</h2>
					<div>
						<p
							style={{
								fontWeight: 600,
								textAlign: 'center',
								paddingLeft: '25px',
								paddingRight: '25px'
							}}>
							This will cause a flicker when using Preact. Make sure Preact compilation is disabled
							in next.config.js.
						</p>

						<LazyHydrate on="click">
							<Counter />
						</LazyHydrate>
					</div>
				</div>

				<div style={{ marginTop: 0 }}>
					<h2 style={{ textDecoration: 'underline' }}>Preact example</h2>
					<div>
						<p style={{ fontWeight: 600, textAlign: 'center' }}>
							Make sure to disable React in next.config.js for an accurate test.
						</p>

						<LazyHydrate on="click" id="counter-preact">
							<CounterPreact />
						</LazyHydrate>

						<p>Scroll down to lazy load a next/image component.</p>

						<LazyHydrate whenVisible id="scroll-preact">
							<LazyScrollPreact />
						</LazyHydrate>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home
