import create from 'zustand'

const useStore = create((set) => ({
	lazyComponents: {},
	addToLazyComponents: (lazyComponent) =>
		set((state) => ({
			lazyComponents: {
				...state.lazyComponents,
				...(lazyComponent?.id && lazyComponent?.outerHTML
					? { [lazyComponent.id]: lazyComponent.outerHTML }
					: {})
			}
		}))
}))
export default useStore
