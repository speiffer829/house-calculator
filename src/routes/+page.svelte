<script lang="ts">
	import Chart from '$lib/Chart.svelte';
	import Donut from '$lib/Donut.svelte';
	import Input from '$lib/Input.svelte';
	import Stats from '$lib/Stats.svelte';
	import type { ResultType } from '$lib/types';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const numberize = (value) => parseFloat(value.replace(/\D/g, ''));
	const dollarize = (value) =>
		value.toLocaleString('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		});

	let home_price = '$350,000';
	let down_payment = '$20,000';
	let interest_rate = data.observations.at(-1).value;

	$: principal_loan_amount = numberize(home_price) - numberize(down_payment);

	let results: ResultType = {
		principal_and_interest: '$0.00',
		property_tax: '$0.00',
		homeowners_insurance: '$0.00',
		pmi: '$0.00',
		hoa: '$0.00'
	};

	function do_some_math() {
		let r = parseFloat(interest_rate) / 100 / 12;

		// Get the principal_and_interest
		const over = r * (1 + r) ** 360;
		const under = (1 + r) ** 360 - 1;
		const monthly_total = principal_loan_amount * (over / under);
		const principal_and_interest = dollarize(monthly_total);

		// Get the property tax this number is for Anville but can be changed
		const property_tax = dollarize((numberize(home_price) * 0.0165) / 12);
		//Tina helped immensely with this part
		const pmi = dollarize((((numberize(home_price) - numberize(down_payment)) / 30) * 0.0058) / 12);

		results = {
			principal_and_interest,
			property_tax,
			pmi,
			homeowners_insurance: '$0.00',
			hoa: '$0.00'
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

		<!-- <div class="grid md:grid-cols-3 lg:grid-cols-4 mt-9">
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
				<div class="grid grid-cols-2">
					<Donut {results} {numberize} />
					<div>
						<div class="line-item">
							<span class="dot bg-blue-400" />
							<h4>Principal &amp; Interest</h4>
							<h4 class="font-serif">
								{results?.principal_and_interest}
							</h4>
						</div>
						<div class="line-item">
							<span class="dot bg-green-400" />
							<h4>Property Tax</h4>
							<Input
								class="w-20"
								name="property_tax"
								bind:value={results.property_tax}
								format_number
							/>
						</div>
						<div class="line-item">
							<span class="dot bg-green-400" />
							<h4>PMI</h4>
							<Input
								class="w-20"
								name="property_tax"
								bind:value={results.property_tax}
								format_number
							/>
						</div>
					</div>
				</div>
			</section>
		</div> -->
	</main>
</div>

<style lang="postcss">
	.line-item {
		@apply grid items-center gap-3 border-b-2 border-neutral-300 py-2;
		grid-template-columns: 10px 1fr auto;

		h4 {
			@apply text-base font-black text-left;
		}

		h4:nth-of-type(2),
		input {
			@apply font-serif text-lg justify-self-end font-black;
		}

		input {
			@apply block w-20 text-right border-2 border-black px-2 py-1 rounded-md;
		}
	}
	.dot {
		width: 15px;
		height: 15px;
		@apply rounded-full inline-block flex-grow-0;
	}
</style>
