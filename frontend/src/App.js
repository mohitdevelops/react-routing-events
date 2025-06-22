import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import HomePage from "./pages/HomePage";
import EventsPage, { loader as eventLoader } from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import NewEventPage from "./pages/NewEventPage";
import EditEventPage from "./pages/EditEventPage";
// import NotFound from "./pages/NotFound";
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
						path: "new",
						element: <NewEventPage />,
					},
					{
						path: ":eventId",
						element: <EventDetailPage />,
					},
					{
						path: ":eventId/edit",
						element: <EditEventPage />,
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
