import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import s from './Movies.module.css';
import { FcSearch } from 'react-icons/fc';
import { getMovieByQuery } from '../../services/MoviesApi';

export default function Movies() {
	const [searchQuery, setSearchQuery] = useState('');
	const [movies, setMovies] = useState([]);
	const location = useLocation();
	const history = useHistory();
	const { url } = useRouteMatch();
	const query = new URLSearchParams(location.search).get('query');
	var slugify = require('slugify');

	useEffect(() => {
		if (!query) return;

		getMovieByQuery(query).then(({ results }) => setMovies(results));
	}, [query]);

	const handleInputChange = e => {
		setSearchQuery(e.target.value);
	};

	const handleSubmit = e => {
		e.preventDefault();
		searchQuery.trim().length > 0 &&
			getMovieByQuery(searchQuery).then(({ results }) => setMovies(results));
		history.push({
			...location,
			search: `query=${searchQuery}`,
		});
		setSearchQuery('');
	};

	return (
		<>
			<header className={s.Searchbar}>
				<form className={s.SearchForm} onSubmit={handleSubmit}>
					<button type='submit' className={s.SearchForm__button}>
						<span className={s.SearchForm__button_label}>
							<FcSearch />
						</span>
					</button>

					<input
						className={s.SearchForm__input}
						type='text'
						autoComplete='off'
						autoFocus
						placeholder='Search movies'
						onChange={handleInputChange}
						value={searchQuery}
					/>
				</form>
			</header>
			{movies && (
				<ul>
					{movies.map(({ original_title, id }) => (
						<li className={s.listItem} key={id}>
							<Link
								to={{
									pathname: `${url}/${slugify(`${original_title} ${id}`, {
										lower: true,
									})}`,
									state: { from: location },
								}}
							>
								{original_title}
							</Link>
						</li>
					))}
				</ul>
			)}
		</>
	);
}
