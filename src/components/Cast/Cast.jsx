import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getCastMovieInfo } from '../../services/MoviesApi';
import smoothScroll from '../../utils/smoothScroll';
import s from './Cast.module.css';
import shortid from 'shortid';
// import NotFoundActor from '../../images/not-found-actor.png';
const IMG_PATH = 'https://image.tmdb.org/t/p/original';

export default function Cast() {
	const [cast, setCast] = useState([]);
	const { slug } = useParams();
	const movieId = slug.match(/[a-z0-9]+$/)[0];

	useEffect(() => {
		getCastMovieInfo(movieId)
			.then(data => setCast(data.cast))
			.then(() => smoothScroll());
	}, [movieId]);

	return (
		<>
			{cast && (
				<div>
					<ul className={s.castList}>
						{cast.map(actor => (
							<div className={s.itemWrapper} key={shortid.generate()}>
								{actor.profile_path ? (
									<img
										src={`${IMG_PATH + actor.profile_path}`}
										alt={actor.name}
										width='135'
									/>
								) : (
									<img
										className={s.defaultImg}
										// src={NotFoundActor}
										alt='Not found'
										width='135'
									/>
								)}
								<li className={s.castName}>{actor.name}</li>
							</div>
						))}
					</ul>
				</div>
			)}
		</>
	);
}
