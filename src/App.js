import { Switch, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navigation from './components/Navigation/Navigation';
import Container from './components/Container/Container';
import Loader from 'react-loader-spinner';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MovieDetailsPage = lazy(() =>
	import('./pages/MovieDetailsPage/MovieDetailsPage')
);
const Movies = lazy(() => import('./pages/Movies/Movies'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

export default function App() {
	return (
		<Container>
			<Navigation />
			<Suspense
				fallback={
					<Loader
						style={{ textAlign: 'center', marginTop: '15px' }}
						type='Audio'
						color='#3f81e4'
						height={100}
						width={100}
						timeout={3000}
					/>
				}
			>
				<Switch>
					<Route path='/' exact>
						<HomePage />
					</Route>
					<Route path='/movies' exact>
						<Movies />
					</Route>
					<Route path='/movies/:slug'>
						<MovieDetailsPage />
					</Route>
					<Route path='/'>
						<NotFoundPage />
					</Route>
				</Switch>
			</Suspense>
		</Container>
	);
}
