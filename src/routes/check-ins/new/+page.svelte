<script lang="ts">
	import IconChevronLeft from '@lucide/svelte/icons/chevron-left';
	import IconCheck from '@lucide/svelte/icons/check';
	import IconAngry from '@lucide/svelte/icons/angry';
	import IconFrown from '@lucide/svelte/icons/frown';
	import IconMeh from '@lucide/svelte/icons/meh';
	import IconSmile from '@lucide/svelte/icons/smile';
	import IconLaugh from '@lucide/svelte/icons/laugh';

	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { Button, Textarea, Toggle, ToggleGroup } from '$lib/components/ui';
	import { checkInStorage } from '$lib/services/check-ins.svelte';
	import { cn } from '$lib/utils';
	import type { Component } from 'svelte';

	const emotions = [
		'Calme',
		'Confiant',
		'Content',
		'Excité',
		'Heureux',
		'Motivé',
		'En paix',
		'Fier'
	];

	let mood = $state('');
	let selectedEmotions = $state<string[]>([]);
	let note = $state('');

	function toggleEmotion(emotion: string) {
		if (selectedEmotions.includes(emotion)) {
			selectedEmotions = selectedEmotions.filter((current) => current !== emotion);
		} else {
			selectedEmotions.push(emotion);
		}
	}

	function createCheckIn() {
		if (!mood) return;

		checkInStorage.add({
			mood,
			emotions: $state.snapshot(selectedEmotions),
			note
		});

		goto(resolve('/check-ins'));
	}
</script>

<svelte:head>
	<title>Nouveau check-in | Check-ins - Mindly</title>
</svelte:head>

<div class="relative flex h-dvh w-full flex-col gap-8 overflow-y-auto bg-green-50 p-6">
	<header class="flex w-full items-center justify-between">
		<Button href="/check-ins" variant="ghost" size="icon">
			<IconChevronLeft />
		</Button>
		<h1 class="text-lg font-bold text-primary">Nouveau Check-in</h1>
		<Button onclick={createCheckIn} disabled={!mood} size="icon">
			<IconCheck class="text-white" />
		</Button>
	</header>
	<div>
		<h2 class="mb-4 text-sm font-semibold tracking-widest text-primary/80 uppercase">Ton humeur</h2>
		<ToggleGroup.Root
			bind:value={mood}
			type="single"
			class="flex justify-between rounded-2xl bg-white p-3 shadow-sm"
		>
			{@render moodButton('angry', IconAngry)}
			{@render moodButton('frown', IconFrown)}
			{@render moodButton('meh', IconMeh)}
			{@render moodButton('smile', IconSmile)}
			{@render moodButton('laugh', IconLaugh)}
		</ToggleGroup.Root>
	</div>
	<div class="relative flex flex-col gap-4">
		<h2 class="text-sm font-semibold tracking-widest text-primary/80 uppercase">Tes émotions</h2>
		<div class="flex flex-wrap gap-2">
			{#each emotions as emotion (emotion)}
				{@const isSelected = selectedEmotions.includes(emotion)}
				<Toggle
					pressed={isSelected}
					onPressedChange={() => toggleEmotion(emotion)}
					class={cn(
						'rounded-full border-none px-4 py-2 text-sm transition-all',
						isSelected ? 'bg-green-600 text-white' : 'bg-white text-green-900 shadow-sm'
					)}
				>
					{emotion}
				</Toggle>
			{/each}
		</div>
	</div>
	<div class="relative flex flex-col gap-4">
		<h2 class="text-sm font-semibold tracking-widest text-primary/80 uppercase">Ta journée</h2>
		<Textarea
			bind:value={note}
			placeholder="Comment s'est passé ta journée ?"
			class="min-h-30 resize-none border-none shadow-sm"
		/>
	</div>
</div>

{#snippet moodButton(value: string, Icon: Component)}
	<ToggleGroup.Item
		{value}
		class="size-12 rounded-full transition-all hover:bg-green-100 data-[state=on]:bg-green-600 data-[state=on]:text-white"
	>
		<Icon class="size-6" />
	</ToggleGroup.Item>
{/snippet}
