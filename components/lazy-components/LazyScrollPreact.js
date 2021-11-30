import Image from 'next/image'

const LazyScrollPreact = () => {
	return (
		<div
			id="scroll-preact"
			style={{
				width: '100%',
				marginTop: '150vh'
			}}>
			<div className="img-wrapper">
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

export default LazyScrollPreact
