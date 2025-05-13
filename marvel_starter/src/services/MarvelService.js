import {useHttp} from '../hooks/http.hook';

const useMarvelService = () => {
	const {request, clearError, process, setProcess} = useHttp();
	const _apiBase = 'https://marvel-server-zeta.vercel.app/';
	const _apiKey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df';
	const _baseOffset = 0;

	const getAllCharacters = async (offset = _baseOffset) => {
		const res = await request(
			`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
		);
		return res.data.results.map(_transformCharacter);
	};

	const getCharacterByName = async (name) => {
		const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
		return res.data.results.map(_transformCharacter);
	};

	const getCharacter = async (id) => {
		const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
		return _transformCharacter(res.data.results[0]);
	};
	const getAllComics = async (offset = _baseOffset) => {
		const res = await request(
			`${_apiBase}comics?limit=9&offset=${offset}&${_apiKey}`
		);
		return res.data.results.map(_transformComics);
	};
	const getComic = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
		//return _transformComics(res.data.results[0]);
		if (res && res.data && res.data.results && res.data.results.length > 0) {
        return _transformComics(res.data.results[0]);
    } else {
        // Обработка случая, когда комикс не найден
        console.warn(`Comic with id ${id} not found`);
        return null; // Или выбросить ошибку, или вернуть какое-то значение по умолчанию
    }
	};
	const _transformCharacter = (char) => {
		return {
			id: char.id,
			name: char.name,
			description: char.description,
			thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			comics: char.comics.items,
		};
	};
	const _transformComics = (comics) => {
		return {
			id: comics.id,
			name: comics.name,
			description: comics.description,
			thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
			language: comics.textObjects[0]?.language || "en-us",
			// optional chaining operator
			price: comics.prices[0].price
				? `${comics.prices[0].price}$`
				: "not available",
		};
	};
	return {
		clearError,
		process,
		setProcess,
		getAllCharacters,
		getCharacterByName,
		getCharacter,
		getAllComics,
		getComic
	};
};
export default useMarvelService;
