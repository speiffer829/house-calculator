<script lang="ts">
	import Chart from '$lib/Chart.svelte';
	import Input from '$lib/Input.svelte';
	import Stats from '$lib/Stats.svelte';
	import type { ResultType } from '$lib/types';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const numberize = (value) => parseFloat(value.replace(/\D/g, ''));

	let home_price = '$350,000';
	let down_payment = '$20,000';
	let interest_rate = data.observations.at(-1).value;

	$: principal_loan_amount = numberize(home_price) - numberize(down_payment);

	let results: ResultType = {
		principal_and_interest: '$0.00',
		property_tax: '$0.00'
	};

	function do_some_math() {
		let r = parseFloat(interest_rate) / 100 / 12;

		// Get the principal_and_interest
		const over = r * (1 + r) ** 360;
		const under = (1 + r) ** 360 - 1;
		const monthly_total = principal_loan_amount * (over / under);
		const principal_and_interest = monthly_total.toLocaleString('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		});

		// Get the property tax this number is for Annville but can be changed
		const property_tax = ((numberize(home_price) * 0.0165) / 12).toLocaleString('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		});

		results = {
			principal_and_interest,
			property_tax
		};
	}

	onMount(() => {
		do_some_math();
	});
</script>

<div class="wrap mx-auto">
	<header class="bg-white shadow-lg p-5 mt-40">
		<h1 class="text-5xl -mt-28 font-serif font-black">
			<span class="text-5xl block font-fancy mb-6 ">Spenser's</span> Mortgage Calculator
		</h1>
	</header>
	<main class="bg-white shadow-lg p-5">
		<Stats {data} />

		<Chart data={data.chart_data} />

		<div class="grid md:grid-cols-3 lg:grid-cols-4 mt-9">
			<form class="block py-3">
				<Input bind:value={home_price} label="Home Price" format_number on:input={do_some_math} />
				<Input
					bind:value={down_payment}
					label="Down Payment"
					format_number
					class="mt-4"
					on:input={do_some_math}
				/>
				<Input
					bind:value={interest_rate}
					label="Interest Rate"
					class="mt-4"
					percent
					on:input={do_some_math}
				/>
			</form>

			<section class="md:col-span-2 lg:col-span-3">
				<h2 class="text-4xl font-serif font-black">{results?.principal_and_interest}</h2>
				<h2 class="text-4xl font-serif font-black">{results?.property_tax}</h2>
			</section>
		</div>
	</main>
</div>
