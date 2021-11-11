import { useState, useEffect } from 'react'
import Image from 'next/image'

const LazyComponent = () => {
	const [isHydrated, setIsHydrated] = useState(false)
	useEffect(() => setIsHydrated(true), [])

	// Basic timer to illustrate hydration state
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

			<div style={{ width: '700px', height: '400px', position: 'relative' }}>
				<Image
					src="https://www.businessinsider.in/photo/81878541/5-reasons-why-your-dog-is-constantly-scratching-themself.jpg?imgsize=180883"
					layout="fill"
					objectFit="cover"
					objectPosition="center"
					placeholder="blur"
					blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAADBAMAAACpGNjLAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAC1QTFRFjo9da2FMloZyj5hXiJBTf49IWmExY1hFoaFtjp1PdYVENjQjYlFEl4tri51RsxswjwAAABRJREFUeJxjYFR2YAirmMCw+uwDABAqBBv1nMdJAAAAAElFTkSuQmCC"
				/>
			</div>
		</button>
	)
}

export default LazyComponent
