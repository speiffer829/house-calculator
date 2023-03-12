<script lang="ts">
	import { Doughnut } from 'svelte-chartjs';
	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale,
		ArcElement
	} from 'chart.js';

	ChartJS.register(
		Title,
		Tooltip,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale,
		ArcElement
	);

	export let results, numberize;

	const data = {
		labels: ['Principal & Interest', 'Property Tax', 'Homeowners Insurance', 'PMI', 'HOA'],
		datasets: [
			{
				data: [
					numberize(results.principal_and_interest),
					numberize(results.property_tax),
					500,
					500,
					300
				],
				backgroundColor: ['#666EAC', '#3ACB98', '#DFB8AC', '#E9C376', '#2F4858']
			}
		]
	};
</script>

<Doughnut
	{data}
	options={{
		responsive: true,
		plugins: {
			legend: {
				display: false
			}
		}
	}}
/>
