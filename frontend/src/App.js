import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import HomePage from "./pages/HomePage";
import EventsPage, { loader as eventLoader } from "./pages/EventsPage";
import EventDetailPage, {
	loader as eventDetailLoader,
	action as deleteEventAction,
} from "./pages/EventDetailPage";
import NewEventPage, { action as actionEventForm } from "./pages/NewEventPage";
import EditEventPage from "./pages/EditEventPage";
import RoutLayoutEvent from "./components/RoutLayoutEvent";
import Error from "./pages/Error";

const routes = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		errorElement: <Error />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: "events",
				element: <RoutLayoutEvent />,
				children: [
					{
						index: true,
						element: <EventsPage />,
						loader: eventLoader,
					},
					{
						path: ":eventId",
						id: "event-detail",
						loader: eventDetailLoader,
						children: [
							{
								index: true,
								element: <EventDetailPage />,
								action: deleteEventAction,
							},
							{
								path: "edit",
								element: <EditEventPage />,
							},
						],
					},
					{
						path: "new",
						element: <NewEventPage />,
						action: actionEventForm,
					},
				],
			},
		],
	},
]);

function App() {
	return <RouterProvider router={routes} />;
}

export default App;
