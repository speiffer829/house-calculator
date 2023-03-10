import type { SeriesType } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const res = await fetch(
		`https://api.stlouisfed.org/fred/series/observations?series_id=MORTGAGE30US&api_key=${
			import.meta.env.VITE_FRED_KEY
		}&file_type=json&observation_start=2010-01-01`
	);
	const stuff: SeriesType = await res.json();
	const chart_data = {
		labels: stuff.observations
			.map((i) => i.date)
			.slice(Math.max(stuff.observations.length - 104, 1)),
		datasets: [
			{
				label: 'Interest Rate',
				fill: true,
				lineTension: 0.3,
				backgroundColor: 'rgba(225, 204,230, .3)',
				borderColor: 'rgb(205, 130, 158)',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: 'rgb(205, 130,1 58)',
				pointBackgroundColor: 'rgb(255, 255, 255)',
				pointBorderWidth: 0,
				pointHoverRadius: 0,
				pointHoverBackgroundColor: 'rgb(0, 0, 0)',
				pointHoverBorderColor: 'rgba(220, 220, 220,1)',
				pointHoverBorderWidth: 0,
				pointRadius: 0,
				pointHitRadius: 10,
				data: stuff.observations
					.map((i) => parseFloat(i.value))
					.slice(Math.max(stuff.observations.length - 104, 1))
			}
		]
	};
	return {
		...stuff,
		chart_data
	};
}) satisfies PageServerLoad;
