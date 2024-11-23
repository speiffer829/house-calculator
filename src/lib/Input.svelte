<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();


	let input_value = value;

	

	interface Props {
		value?: string;
		placeholder?: string;
		disabled?: boolean;
		label?: string;
		format_number?: boolean;
		type?: string;
		other?: any;
		dot?: string;
		percent?: boolean;
		force_number_keyboard?: boolean;
		class?: string;
		name?: string;
	}

	let {
		value = $bindable(''),
		placeholder = '',
		disabled = false,
		label = null,
		format_number = false,
		type = 'text',
		other = {},
		dot = '',
		percent = false,
		force_number_keyboard = false,
		class: classes = '',
		name = label.replace(' ', '-').toLowerCase()
	}: Props = $props();

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
				<span class="dot {dot}"></span>
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
			onblur={handle_format}
			oninput={() => dispatch('input')}
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
