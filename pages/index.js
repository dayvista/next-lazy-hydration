import dynamic from 'next/dynamic'

import LazyHydrate from '../components/LazyHydrate'
import LoadingComponent from '../components/LoadingComponent'
const LazyComponent = dynamic(() => import('../components/LazyComponent'), {
	loading: () => <LoadingComponent id="lazy" />
})

const Home = () => {
	return (
		<div className="container">
			<LazyHydrate on="click">
				<LazyComponent />
			</LazyHydrate>
		</div>
	)
}

export default Home
