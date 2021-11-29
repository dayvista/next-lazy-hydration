import useStore from '../lib/store'

const LoadingComponent = ({ id }) => {
	const lazyComponent = useStore((state) => state.lazyComponents[id])

	return <>{lazyComponent ? <div dangerouslySetInnerHTML={{ __html: lazyComponent }} /> : null}</>
}

export default LoadingComponent
