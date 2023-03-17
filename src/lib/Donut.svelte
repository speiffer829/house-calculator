<script lang="ts">
	import 'chartist/dist/index.css';
	import { PieChart } from 'chartist';
	import { onMount } from 'svelte';
	import type { ResultType } from './types';

	let chart;
	export let numberize, results: ResultType;
	$: update_chart(results);

	function update_chart(results: ResultType) {
		if (!chart) return;
		const new_stuff = {
			series: [
				{
					value: numberize(results.principal_and_interest),
					className: 'stroke-blue-400',
					name: 'Principal & Interest'
				},
				{
					value: numberize(results.property_tax),
					className: 'stroke-green-400',
					name: 'Property Tax'
				},
				{ value: numberize(results.pmi), className: 'stroke-purple-400', name: 'PMI' },
				{ value: 0, className: 'stroke-rose-400', name: 'Homeowners Insurance' },
				{ value: 0, className: 'stroke-amber-400', name: 'HOA' }
			]
		};
		chart.update(new_stuff);
	}

	// TODO grab colors from chart.js version

	onMount(() => {
		chart = new PieChart(
			'#chart',
			{
				series: [
					{
						value: numberize(results.principal_and_interest),
						className: 'stroke-blue-400',
						name: 'Principal & Interest'
					},
					{
						value: numberize(results.property_tax),
						className: 'stroke-green-400',
						name: 'Property Tax'
					},
					{ value: numberize(results.pmi), className: 'stroke-purple-400', name: 'PMI' },
					{ value: 0, className: 'stroke-rose-400', name: 'Homeowners Insurance' },
					{ value: 0, className: 'stroke-amber-400', name: 'HOA' }
				]
			},
			{
				donut: true,
				startAngle: 270,
				donutWidth: 50,
				showLabel: false
			}
		);
	});
</script>

<div id="chart" class="flex-1" />

<style lang="postcss">
	#chart {
		height: 300px;
	}

	:global(.principal_and_interest .ct-slice-donut) {
		@apply stroke-secondary;
	}
</style>
