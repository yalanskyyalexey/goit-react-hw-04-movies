const BASE_URL = 'https://api.themoviedb.org/3';
const KEY = '920e7c93d34db7fb7b2066451ab9bfe7';

function fetchData(url) {
	return fetch(url).then(response => {
		if (response.ok) {
			return response.json();
		}

		return Promise.reject(new Error('Not found'));
	});
}

export function getTrending() {
	return fetchData(`${BASE_URL}/trending/movie/day?api_key=${KEY}`);
}

export function getMovieByQuery(searchQuery) {
	return fetchData(
		`${BASE_URL}/search/movie?api_key=${KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
	);
}

export function getMovieDetails(movieId) {
	return fetchData(
		`${BASE_URL}/movie/${movieId}?api_key=${KEY}&language=en-US`
	);
}

export function getCastMovieInfo(movieId) {
	return fetchData(
		`${BASE_URL}/movie/${movieId}/credits?api_key=${KEY}&language=en-US`
	);
}

export function getMovieReview(movieId, page) {
	return fetchData(
		`${BASE_URL}/movie/${movieId}/reviews?api_key=${KEY}&language=en-US&page=1`
	);
}
