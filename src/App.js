import './App.css';
import { Switch, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navigation from './components/Navigation/Navigation';
import Container from './components/Container/Container';
import Loader from 'react-loader-spinner';

const HomePage = lazy(() => import('./components/pages/HomePage/HomePage'));
const MovieDetailsPage = lazy(() =>
	import('./components/pages/MovieDetailsPage/MovieDetailsPage')
);
const Movies = lazy(() => import('./components/pages/Movies/Movies'));
// const NotFoundPage = lazy(() =>
// 	import('./components/pages/NotFoundPage/NotFoundPage')
// );

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
						timeout={3000} //3 secs
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
					{/* <Route>
						<NotFoundPage />
					</Route> */}
				</Switch>
			</Suspense>
		</Container>
	);
}
