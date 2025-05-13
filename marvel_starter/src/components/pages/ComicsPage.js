import {Helmet} from 'react-helmet';
import AppBanner from '../appBanner/AppBanner';
import ComicsList from '../comicsList/ComicsList';

const ComicsPage = () => {
	return (
		<>
			
			<Helmet>
				<meta name="description" content="Page with Comics list" />
				<title>Comics Page</title>
			</Helmet>
			<AppBanner />
			<ComicsList />
		</>
	);
};

export default ComicsPage;
