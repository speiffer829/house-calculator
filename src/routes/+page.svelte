<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	console.log(data);

	$: latest = data.observations.at(-1);
</script>

<div class="wrap mx-auto">
	<header class="bg-white shadow-lg p-5 mt-40">
		<h1 class="text-5xl -mt-28 font-serif font-black">
			<span class="text-5xl block font-fancy mb-6 ">Spenser's</span> Mortgage Calculator
		</h1>
	</header>
	<main class="bg-white shadow-lg p-5">
		<h2 class="text-3xl font-black">
			<span class="block text-base font-sans">Latest Rate:</span>
			<span class="font-serif text-5xl">{latest?.value}<sup class="">%</sup></span>
		</h2>
		<p class="text-neutral-400 text-sm">As of {latest?.date}</p>
	</main>
</div>
