import PageContent from "../components/PageContent";
import MainNavigation from "../components/MainNavigation";
import { useRouteError } from "react-router-dom";

function Error() {
	const error = useRouteError();

	let title = "Something went wrong!";
	let message = "Could not fetch events!";

	if (error.status === 500) {
		message = error.data.message;
	}
	if (error.status === 404) {
		title = "404 Not Found!";
		message = "Could not found the page or resource";
	}

	console.log(error);

	return (
		<>
			<MainNavigation />
			<PageContent title={title}>
				<p>{message}</p>
			</PageContent>
		</>
	);
}

export default Error;
