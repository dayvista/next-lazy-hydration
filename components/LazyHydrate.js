// Note: the majority of this code has been copied from https://github.com/hadeeb/react-lazy-hydration...
//       credit to hadeeb and the other contributors

import { useReducer, useRef, useEffect, useLayoutEffect } from 'react'

import useStore from '../lib/store'

const isBrowser = typeof window !== 'undefined'
const isDev = process.env.NODE_ENV !== 'production'

// React currently throws a warning when using useLayoutEffect on the server.
const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect

function reducer() {
	return true
}

function LazyHydrate(props) {
	const {
		id,
		noWrapper,
		ssrOnly,
		whenIdle,
		whenVisible,
		promise, // pass a promise which hydrates
		on = [],
		children,
		didHydrate, // callback for hydration
		...rest
	} = props

	const childRef = useRef(null)

	// Always render on server
	const [hydrated, hydrate] = useReducer(reducer, !isBrowser)

	// Store the server-side HTML in state before it gets erased
	// (only relevant when using Preact) - see https://github.com/preactjs/preact/issues/2364#issuecomment-736956894
	const addToLazyComponents = useStore((state) => state.addToLazyComponents)
	const initHydrate = () => {
		id && addToLazyComponents(childRef?.current?.children?.[id])
		hydrate()
	}

	if (isDev && !ssrOnly && !whenIdle && !whenVisible && !on.length && !promise) {
		console.error(
			`LazyHydration: Enable atleast one trigger for hydration.\n` +
				`If you don't want to hydrate, use ssrOnly`
		)
	}

	useIsomorphicLayoutEffect(() => {
		// FIXME: hydrates instantly on page route changes because SSR HTML isn't present on route changes

		// No SSR Content
		if (!childRef.current.hasChildNodes()) {
			initHydrate()
		}
	}, [])

	useEffect(() => {
		if (hydrated && didHydrate) {
			didHydrate()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hydrated])

	useEffect(() => {
		if (ssrOnly || hydrated) return
		const rootElement = childRef.current

		const cleanupFns = []
		function cleanup() {
			cleanupFns.forEach((fn) => {
				fn()
			})
		}

		if (promise) {
			promise.then(initHydrate, initHydrate)
		}

		if (whenVisible) {
			const element = noWrapper
				? rootElement
				: // As root node does not have any box model, it cannot intersect.
				  rootElement.firstElementChild

			if (element && typeof IntersectionObserver !== 'undefined') {
				const observerOptions =
					typeof whenVisible === 'object'
						? whenVisible
						: {
								rootMargin: '250px'
						  }

				const io = new IntersectionObserver((entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting || entry.intersectionRatio > 0) {
							initHydrate()
						}
					})
				}, observerOptions)

				io.observe(element)

				cleanupFns.push(() => {
					io.disconnect()
				})
			} else {
				return initHydrate()
			}
		}
		if (whenIdle) {
			// @ts-ignore
			if (typeof requestIdleCallback !== 'undefined') {
				// @ts-ignore
				const idleCallbackId = requestIdleCallback(initHydrate, { timeout: 500 })
				cleanupFns.push(() => {
					// @ts-ignore
					cancelIdleCallback(idleCallbackId)
				})
			} else {
				const id = setTimeout(initHydrate, 2000)
				cleanupFns.push(() => {
					clearTimeout(id)
				})
			}
		}

		const events = [].concat(on)

		events.forEach((event) => {
			rootElement.addEventListener(event, initHydrate, {
				once: true,
				passive: true
			})
			cleanupFns.push(() => {
				rootElement.removeEventListener(event, initHydrate, {})
			})
		})

		return cleanup
	}, [hydrated, on, ssrOnly, whenIdle, whenVisible, didHydrate, promise, noWrapper])

	const WrapperElement = typeof noWrapper === 'string' ? noWrapper : 'div'

	if (hydrated) {
		if (noWrapper) {
			return children
		}
		return (
			<WrapperElement ref={childRef} style={{ display: 'contents' }} {...rest}>
				{children}
			</WrapperElement>
		)
	} else {
		return (
			<WrapperElement
				{...rest}
				ref={childRef}
				suppressHydrationWarning
				dangerouslySetInnerHTML={{ __html: '' }}
			/>
		)
	}
}

export default LazyHydrate
