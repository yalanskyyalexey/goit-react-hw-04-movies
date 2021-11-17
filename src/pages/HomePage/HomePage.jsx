import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import { getTrending } from '../../services/MoviesApi';
import s from './HomePage.module.css';
export default function HomePage() {
	const [movies, setMovies] = useState(null);
	const { url } = useRouteMatch();
	const location = useLocation();
	var slugify = require('slugify');

	useEffect(() => {
		getTrending().then(({ results }) => setMovies(results));
	}, []);

	return (
		<div className={s.homePage}>
			<h1 className={s.header}>Trending today</h1>
			{movies &&
				movies.map(({ id, title }) => (
					<li className={s.item} key={id}>
						<Link
							to={{
								pathname: `${url}movies/${slugify(`${title} ${id}`, {
									lower: true,
								})}`,
								state: { from: location },
							}}
						>
							{title}
						</Link>
					</li>
				))}
		</div>
	);
}
