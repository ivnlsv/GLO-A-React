/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charList.scss';

const setContent = (process, Component, newItemLoading) => {
	switch (process) {
		case 'waiting':
			return <Spinner />;

		case 'loading':
			return newItemLoading ? <Component /> : <Spinner />;

		case 'confirmed':
			return <Component/>;

		case 'error':
			return <ErrorMessage />;

		default:
			throw new Error('Unexpected process state');
	}
};

const CharList = (props) => {
	const [charList, setCharList] = useState([]);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, setOffset] = useState(0);
	const [charEnded, setCharEnded] = useState(false);

	const {getAllCharacters, process, setProcess} = useMarvelService();

	useEffect(() => {
		onRequest(offset, true);
	}, []);

	const onRequest = (offset, initial) => {
		initial ? setNewItemLoading(false) : setNewItemLoading(true);
		getAllCharacters(offset)
			.then(onCharListLoaded)
			.then(()=>setProcess('confirmed'))
			
	};
	
	const onCharListLoaded = (newCharList) => {
		let ended = false;
		if (newCharList.length < 9) {
			ended = true;
		}

		setCharList((charList) => [...charList, ...newCharList]);
	//	setLoading((loading) => false);
		setNewItemLoading((newItemLoading) => false);
		setOffset((offset) => offset + 9);
		setCharEnded((charEnded) => ended);
	};
	/* const onError = () => {
		setError(true);
		setLoading(false);
	}; */

	const itemRefs = useRef([]);

	const focusOnItem = (id) => {
		// Я реализовал вариант чуть сложнее, и с классом и с фокусом
		// Но в теории можно оставить только фокус, и его в стилях использовать вместо класса
		// На самом деле, решение с css-классом можно сделать, вынеся персонажа
		// в отдельный компонент. Но кода будет больше, появится новое состояние
		// и не факт, что мы выиграем по оптимизации за счет бОльшего кол-ва элементов

		// По возможности, не злоупотребляйте рефами, только в крайних случаях
		itemRefs.current.forEach((item) =>
			item.classList.remove('char__item_selected')
		);
		itemRefs.current[id].classList.add('char__item_selected');
		itemRefs.current[id].focus();
	};

	// Этот метод создан для оптимизации,
	// чтобы не помещать такую конструкцию в метод render

	function renderItems(arr) {
		const items = arr.map((item, i) => {
			let imgStyle = {objectFit: 'cover'};
			if (
				item.thumbnail ===
				'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
			) {
				imgStyle = {objectFit: 'unset'};
			}

			return (
				<li
					className="char__item"
					tabIndex={0}
					ref={(el) => (itemRefs.current[i] = el)}
					key={item.id}
					onClick={() => {
						props.onCharSelected(item.id);
						focusOnItem(i);
					}}
					onKeyUp={(e) => {
						if (e.key === ' ' || e.key === 'Enter') {
							props.onCharSelected(item.id);
							focusOnItem(i);
						}
					}}
				>
					<img src={item.thumbnail} alt={item.name} style={imgStyle} />
					<div className="char__name">{item.name}</div>
				</li>
			);
		});

		return <ul className="char__grid">{items}</ul>;
	}

	//const items = renderItems(charList);

	//const errorMessage = error ? <ErrorMessage /> : null;
	//const spinner = loading && !newItemLoading ? <Spinner /> : null;
	//const content = !(loading || error) ? items : null; убирает перерисовку компонента

	return (
		<div className="char__list">
			{setContent(process, ()=> renderItems(charList, newItemLoading))}
			<button
				className="button button__main button__long"
				disabled={newItemLoading}
				style={{display: charEnded ? 'none' : 'block'}}
				onClick={() => onRequest(offset)}
			>
				<div className="inner">load more</div>
			</button>
		</div>
	);
};

CharList.propTypes = {
	onCharSelected: PropTypes.func.isRequired,
};
export default CharList;
