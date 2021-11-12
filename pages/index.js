import dynamic from 'next/dynamic'

import LazyHydrate from '../components/LazyHydrate'
import LoadingComponent from '../components/LoadingComponent'

const LazyComponent = dynamic(() => import('../components/LazyComponent'), {
	loading: () => <LoadingComponent id="lazy" />
})

const LazyScroll1 = dynamic(() => import('../components/scroll/LazyScroll1'), {
	loading: () => <LoadingComponent id="scroll1" />
})
const LazyScroll2 = dynamic(() => import('../components/scroll/LazyScroll2'), {
	loading: () => <LoadingComponent id="scroll2" />
})
const LazyScroll3 = dynamic(() => import('../components/scroll/LazyScroll3'), {
	loading: () => <LoadingComponent id="scroll3" />
})

const Home = () => {
	return (
		<div className="container">
			{/* TODO: remove the no-longer-needed html from the store using the `onHydrate` callback prop? */}
			<LazyHydrate on="click" id="lazy">
				<LazyComponent />
			</LazyHydrate>

			<LazyHydrate whenVisible id="scroll1">
				<LazyScroll1 />
			</LazyHydrate>
			<LazyHydrate whenVisible id="scroll2">
				<LazyScroll2 />
			</LazyHydrate>
			<LazyHydrate whenVisible id="scroll3">
				<LazyScroll3 />
			</LazyHydrate>
		</div>
	)
}

export default Home
