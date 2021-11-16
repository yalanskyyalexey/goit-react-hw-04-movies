import defaultImage from '../../../images/404-not-found.jpg';

export default function NotFoundPage() {
	return (
		<img
			style={{ margin: '0 auto', width: '100%' }}
			src={defaultImage}
			alt={'По вашему запросу ничего не найдено('}
		/>
	);
}
