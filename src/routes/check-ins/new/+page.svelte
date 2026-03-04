<script lang="ts">
	import IconChevronLeft from '@lucide/svelte/icons/chevron-left';
	import IconCheck from '@lucide/svelte/icons/check';
	import IconAngry from '@lucide/svelte/icons/angry';
	import IconFrown from '@lucide/svelte/icons/frown';
	import IconMeh from '@lucide/svelte/icons/meh';
	import IconSmile from '@lucide/svelte/icons/smile';
	import IconLaugh from '@lucide/svelte/icons/laugh';
	import type { Component } from 'svelte';
	import * as ToggleGroup from '$lib/components/ui/toggle-group';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';
	import { Toggle } from '$lib/components/ui/toggle';
</script>

<div class="relative flex flex-col gap-6 bg-green-200 p-6 w-full h-dvh">
	<div class="relative flex justify-between items-center w-full">
		<Button href="/check-ins" variant="ghost" size="icon">
			<IconChevronLeft />
		</Button>
		<h1 class="font-semibold">Check-in quotidien</h1>
		<Button title="Create" size="icon">
			<IconCheck class="text-white" />
		</Button>
	</div>
	<h2>Ton humeur</h2>
	<ToggleGroup.Root type="single" class="relative flex justify-around items-center w-full">
		{@render moodButton('angry', IconAngry)}
		{@render moodButton('frown', IconFrown)}
		{@render moodButton('meh', IconMeh)}
		{@render moodButton('smile', IconSmile)}
		{@render moodButton('laugh', IconLaugh)}
	</ToggleGroup.Root>
	<h2>Tes émotions</h2>
	<div class="relative flex flex-wrap gap-3 w-full">
		<Toggle class="bg-white opacity-50 px-2 py-1 rounded-md text-sm">Calme</Toggle>
		<Toggle class="bg-white px-2 py-1 rounded-md text-sm">Confiant</Toggle>
		<Toggle class="bg-white px-2 py-1 rounded-md text-sm">Content</Toggle>
		<Toggle class="bg-white px-2 py-1 rounded-md text-sm">Excité</Toggle>
		<Toggle class="bg-white opacity-50 px-2 py-1 rounded-md text-sm">Heureux</Toggle>
		<Toggle class="bg-white px-2 py-1 rounded-md text-sm">Motivé</Toggle>
		<Toggle class="bg-white opacity-50 px-2 py-1 rounded-md text-sm">En paix</Toggle>
		<Toggle class="bg-white opacity-50 px-2 py-1 rounded-md text-sm">Fier</Toggle>
	</div>
	<h2>Ta journée</h2>
	<Textarea placeholder="Comment s'est passé ta journée ?" class="h-40 text-sm" />
</div>

{#snippet moodButton(value: string, Icon: Component)}
	<ToggleGroup.Item {value}>
		<Icon class="size-5" />
	</ToggleGroup.Item>
{/snippet}
