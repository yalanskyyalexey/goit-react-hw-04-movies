import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getMovieReview } from '../../services/MoviesApi';
import smoothScroll from '../../utils/smoothScroll';

import s from './Reviews.module.css';

export default function ReviewsView() {
	const [reviews, setReviews] = useState([]);
	const { slug } = useParams();
	const movieId = slug.match(/[a-z0-9]+$/)[0];

	useEffect(() => {
		getMovieReview(movieId)
			.then(data => setReviews(data.results))
			.then(() => smoothScroll());
	}, [movieId]);

	if (reviews.length === 0) {
		return <p>Nothing to render yet</p>;
	}

	return (
		<div className={s.reviewContainer}>
			{reviews &&
				reviews.map(review => (
					<li className={s.reviewList} key={review.id}>
						<span className={s.reviewAuthor}>{review.author}</span>
						<p className={s.reviewText}>{review.content}</p>
					</li>
				))}
		</div>
	);
}
