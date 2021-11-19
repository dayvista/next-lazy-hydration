import { useState, useEffect } from 'react'

const LazyComponent = () => {
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
		<button className="lazy-button" id="lazy">
			<p>
				{isHydrated
					? 'Hydrated successfully.'
					: "Click to hydrate. There shouldn't be a flicker now!"}
			</p>
			<p>
				If JavaScript is enabled, the following number will increment every second:
				<br />
				{seconds}
			</p>
		</button>
	)
}

export default LazyComponent
