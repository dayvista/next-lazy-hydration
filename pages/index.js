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
const LazyScroll = dynamic(() => import('../components/lazy-components/LazyScroll'), {
	loading: () => {
		const html = typeof window !== 'undefined' && document.getElementById('scroll')?.outerHTML

		return <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: html }} />
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
			<h1>Lazy loading/on-demand hydration demo</h1>
			<p>
				Bad news first:{' '}
				<Link href="/issues">
					<a>outstanding issues</a>
				</Link>
			</p>

			<div style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
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
						<p>Open the 'Network' tab in dev tools to see the chunks lazy load.</p>

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
						<p>Open the 'Network' tab in dev tools to see the chunks lazy load.</p>

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
