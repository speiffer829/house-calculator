<script lang="ts">
	export let data;

	$: latest = data.observations.at(-1);
	$: get_trend(latest.value, data.observations.at(-2).value);
	let trend = {
		direction: '',
		difference: 0.0
	};

	$: console.log(trend);

	function get_trend(newer, old) {
		if (newer > old) {
			const difference = ((newer - old) / old) * 100;
			trend = {
				direction: 'up',
				difference
			};
		} else if (newer < old) {
			const difference = ((old - newer) / old) * 100;
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

<h2 class="text-3xl font-black">
	<span class="block text-base font-sans">Latest Rate:</span>
	<span class="font-serif text-5xl">{latest?.value}<sup class="">%</sup></span>
</h2>
<p class="text-neutral-400 text-sm">As of {latest?.date}</p>
