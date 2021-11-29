import { useState, useEffect } from 'react'

const CounterPreact = () => {
	const [isHydrated, setIsHydrated] = useState(false)
	useEffect(() => setIsHydrated(true), [])

	// Basic timer to illustrate hydration status
	const [seconds, setSeconds] = useState(0)
	useEffect(() => {
		const timer = setTimeout(() => {
			setSeconds(seconds + 1)
		}, 1000)

		return () => clearTimeout(timer)
	}, [seconds])

	return (
		<button id="counter-preact">
			<p>
				{isHydrated ? 'Hydrated successfully.' : 'Click to hydrate. There should be no flicker.'}
			</p>
			<p>
				Upon hydration, the following number will increment every second:
				<br />
				{seconds}
			</p>
		</button>
	)
}

export default CounterPreact
