import type { SeriesType } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const res = await fetch(
		`https://api.stlouisfed.org/fred/series/observations?series_id=MORTGAGE30US&api_key=${
			import.meta.env.VITE_FRED_KEY
		}&file_type=json&observation_start=2010-01-01`
	);
	const stuff: SeriesType = await res.json();
	return {
		...stuff
	};
}) satisfies PageServerLoad;
