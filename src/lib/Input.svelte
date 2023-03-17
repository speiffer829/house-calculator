<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let value = '';
	export let placeholder: string = '';
	export let disabled: boolean = false;
	export let label: string = null;
	export let format_number: boolean = false;
	export let type = 'text';
	export let other = {};
	export let dot = '';
	export let percent: boolean = false;
	export let force_number_keyboard: boolean = false;

	let input_value = value;

	let classes = '';
	export { classes as class };

	export let name: string = label.replace(' ', '-').toLowerCase();

	function handle_format(e) {
		if (format_number && value !== '') {
			// const sanitized_string = value.replace('$', '');
			const sanitized_string = value.replace(/\D/g, '');
			if (!isNaN(parseFloat(sanitized_string))) {
				const thing = parseFloat(sanitized_string).toLocaleString('en-US', {
					style: 'currency',
					currency: 'USD',
					minimumFractionDigits: 0,
					maximumFractionDigits: 2
				});
				value = thing;
				input_value = thing;
			}
		}
	}
</script>

<div class="input-contain {classes} w-full">
	{#if label}
		<label for={name}>
			{#if dot}
				<span class="dot {dot}" />
			{/if}
			<span>{label}</span>
		</label>
	{/if}
	<div class="relative" class:percent>
		<input
			id={name}
			{name}
			type="text"
			bind:value
			{placeholder}
			{disabled}
			title={label}
			class="text-base font-sans w-full"
			on:blur={handle_format}
			on:input={() => dispatch('input')}
			{...other}
			pattern="\d*"
		/>
	</div>
</div>

<style lang="postcss">
	.percent {
		input {
			@apply pr-6;
		}
		&::after {
			content: '%';
			@apply text-base absolute right-3 top-1/2 -translate-y-1/2;
		}
	}
</style>
