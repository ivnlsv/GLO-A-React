import {useState, useCallback, useEffect, useMemo} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

const countTotal = (num) => {
	console.log('counting');
	return num + 10;
};

const Slider = (props) => {
	const [slide, setSlide] = useState(0);
	const [autoplay, setAutoplay] = useState(false);
	//const [state, setState] = useState({slide: 0, autoplay: false})

	const getSomeImage = useCallback(() => {
		console.log('fetching');
		return [
			'https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg',
			'https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg',
		];
	}, [slide]);

	const changeSlide = (i) => {
		setSlide((slide) => slide + i);
		//setState(state => ({...state, slide: state.slide + 1}))
	};

	const toggleAutoplay = () => {
		setAutoplay((autoplay) => !autoplay);
		//setState(state => ({...state, autoplay: !state.autoplay}))
	};

	const total = useMemo(() => {
		return countTotal(slide);
	}, [slide]);

	const style = useMemo(() => ({
		color: slide > 4 ? 'red' : 'black'
	}), [slide]);

	useEffect(() => {
		console.log('styles!');
	}, [style]);

	return (
		<Container>
			<div className="slider w-50 m-auto">
				<Slide getSomeImage={getSomeImage} />
				<div className="text-center mt-5">
					Active slide {slide} <br />
					{autoplay ? 'auto' : null}
				</div>
				<div style={style} className="text-center mt-5">
					Total slides: {total}
				</div>
				<div className="buttons mt-3">
					<button
						className="btn btn-primary me-2"
						onClick={() => changeSlide(-1)}
					>
						-1
					</button>
					<button
						className="btn btn-primary me-2"
						onClick={() => changeSlide(1)}
					>
						+1
					</button>
					<button className="btn btn-primary me-2" onClick={toggleAutoplay}>
						toggle autoplay
					</button>
				</div>
			</div>
		</Container>
	);
};

const Slide = ({getSomeImage}) => {
	const [images, setImages] = useState([]);

	useEffect(() => {
		setImages(getSomeImage());
	}, [getSomeImage]);

	return (
		<>
			{images.map((url, i) => (
				<img key={i} className="d-block w-100" src={url} alt="slide" />
			))}
		</>
	);
};

function App() {
	return <Slider />;
}

export default App;
