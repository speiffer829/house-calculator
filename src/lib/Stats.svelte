<script lang="ts">
	import { ArrowUp, ArrowDown } from 'lucide-svelte';

	export let data;

	$: latest = data.observations.at(-1);
	$: previous = data.observations.at(-2);
	$: get_trend(latest.value, previous.value);
	let trend = {
		direction: '',
		difference: 0.0
	};

	$: console.log(trend);

	function get_trend(newer, old) {
		if (newer > old) {
			const difference = parseFloat((newer - old).toFixed(2));
			trend = {
				direction: 'up',
				difference
			};
		} else if (newer < old) {
			const difference = parseFloat((old - newer).toFixed(2));
			trend = {
				direction: 'down',
				difference
			};
		} else {
			trend = {
				direction: 'same',
				difference: 0
			};
		}
	}
</script>

<div class="flex flex-wrap border-y-2 border-black px-2 py-4 gap-y-6 text-center sm:text-left">
	<div class="text-3xl font-black flex-1 flex justify-center basis-full sm:basis-0">
		<h4>
			<span class="block text-base font-sans mb-2">Latest Rate:</span>
			<span class="font-serif text-4xl font-black">{latest?.value}<sup class="">%</sup></span>
			<span class="block text-neutral-400 text-sm font-medium">As of {latest?.date}</span>
		</h4>
	</div>
	<div class="text-3xl font-black sm:border-l-2 border-black  flex-1 flex justify-center">
		<h4>
			<span class="block text-sm sm:text-base font-sans mb-2">Previous Rate:</span>
			<span class="font-serif text-2xl sm:text-4xl font-black"
				>{previous?.value}<sup class="">%</sup></span
			>
			<span class="block text-neutral-400 text-xs sm:text-sm font-medium"
				>As of {previous?.date}</span
			>
		</h4>
	</div>
	<div
		class="text-3xl font-black sm:border-l-2 border-black  flex-1 flex justify-center"
		class:text-red-700={trend.direction === 'up'}
		class:text-green-700={trend.direction === 'down'}
	>
		<div>
			<p class="block text-sm sm:text-base font-sans capitalize mb-2">
				Trending {trend.direction}:
			</p>
			<div class="flex gap-2">
				{#if trend.direction === 'up'}
					<ArrowUp size={25} />
				{:else if trend.direction === 'down'}
					<ArrowDown size={25} />
				{/if}
				<p class="font-serif text-2xl sm:text-4xl font-black">
					{trend?.difference}<sup class="">%</sup>
				</p>
			</div>
			<p class="block text-neutral-400 text-xs sm:text-sm font-medium">
				Since {data.observations.at(-2).date}
			</p>
		</div>
	</div>
</div>
