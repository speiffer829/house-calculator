<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	console.log(data);
	$: latest = data.observations.at(-1);
</script>

<header class="wrap">
	<h1 class="text-5xl font-serif font-black">Spenser's Big Ol' Mortgage Calculator</h1>
</header>
<main class="wrap" />
