import Image from 'next/image'

const LazyScroll2 = () => {
	return (
		<div style={{ width: '100vw', height: '50vh', marginTop: '150vh' }}>
			<div id="scroll2" style={{ width: '700px', height: '400px', position: 'relative' }}>
				<Image
					src="https://www.businessinsider.in/photo/81878541/5-reasons-why-your-dog-is-constantly-scratching-themself.jpg?imgsize=180883"
					layout="fill"
					objectFit="cover"
					objectPosition="center"
					placeholder="blur"
					blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAADBAMAAACpGNjLAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAC1QTFRFjo9da2FMloZyj5hXiJBTf49IWmExY1hFoaFtjp1PdYVENjQjYlFEl4tri51RsxswjwAAABRJREFUeJxjYFR2YAirmMCw+uwDABAqBBv1nMdJAAAAAElFTkSuQmCC"
				/>
			</div>
		</div>
	)
}

export default LazyScroll2
