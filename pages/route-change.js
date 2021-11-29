import dynamic from 'next/dynamic'

import LazyHydrate from '../components/LazyHydrate'
import LoadingComponent from '../components/LoadingComponent'

// React way
// const Counter = dynamic(() => import('../components/lazy-components/Counter'), {
// 	loading: () => {
// 		const html = typeof window !== 'undefined' && document.getElementById('counter')?.outerHTML

// 		return <div dangerouslySetInnerHTML={{ __html: html }} />
// 	}
// })

// Preact way
const CounterPreact = dynamic(() => import('../components/lazy-components/CounterPreact'), {
	loading: () => <LoadingComponent id="counter-preact" />
})

const RouteChangeExample = () => {
	return (
		<div>
			{/* <LazyHydrate on="click">
							<Counter />
						</LazyHydrate> */}
			<LazyHydrate on="click" id="counter-preact">
				<CounterPreact />
			</LazyHydrate>
		</div>
	)
}

export default RouteChangeExample
