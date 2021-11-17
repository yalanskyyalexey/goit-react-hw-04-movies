import { useParams } from 'react-router-dom';
import { NavLink, useRouteMatch, useLocation } from 'react-router-dom';

import { Route } from 'react-router-dom';

import { useState, useEffect } from 'react';
import { getMovieDetails } from '../../services/MoviesApi';
import s from './MovieDetailsPage.module.css';
import Cast from '../../components/Cast';
import Reviews from '../../components/Reviews';
import GoBackBtn from '../../components/GoBackBtn';

export default function MovieDetailsPage() {
	const { slug } = useParams();
	const movieId = slug.match(/[a-z0-9]+$/)[0];
	const [movie, setMovie] = useState('');
	const { original_title, poster_path, vote_average, genres, overview } = movie;
	const IMG_PATH = 'https://image.tmdb.org/t/p/original';
	const { url, path } = useRouteMatch();
	const location = useLocation();

	useEffect(() => {
		getMovieDetails(movieId).then(results => setMovie(results));
	}, [movieId]);

	return (
		<div className={s.page}>
			<GoBackBtn />
			<div className={s.wrapper}>
				<img className={s.img} src={`${IMG_PATH}/${poster_path}`} alt='' />
				<div className={s.rightSide}>
					<h1 className={s.header}>{original_title}</h1>
					<h2>Rating: {vote_average}</h2>
					<h3>Overview: </h3>
					<p className={s.text}>{overview}</p>
					<div className={s.genres}>
						<h3>Genres: </h3>
						{genres &&
							genres.map(genre => (
								<p key={genre.id} className={s.genresItem}>
									{genre.name}
								</p>
							))}
					</div>
				</div>
			</div>
			<NavLink
				className={s.link}
				activeClassName={s.activeLink}
				to={{
					pathname: `${url}/cast`,
					state: { from: location.state.from },
				}}
			>
				Cast
			</NavLink>
			<NavLink
				className={s.link}
				activeClassName={s.activeLink}
				exact
				to={{
					pathname: `${url}/reviews`,
					state: { from: location.state.from },
				}}
			>
				Reviews
			</NavLink>

			<Route path={`${path}/cast`}>
				<Cast />
			</Route>
			<Route exact path={`${path}/reviews`}>
				<Reviews />
			</Route>
		</div>
	);
}
