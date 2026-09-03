<script lang="ts">
	import Button from './Button.svelte';
	import SectionHeading from './SectionHeading.svelte';

	let name = $state('');
	let email = $state('');
	let message = $state('');
	let submitted = $state(false);

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		// TODO: brancher un vrai envoi (email, API...) plus tard.
		submitted = true;
	}
</script>

<section class="mt-16 pb-24">
	<div class="mx-auto w-full max-w-6xl px-6">
		<SectionHeading id="contact-form" title="Let's talk" />
	</div>

	<div class="mx-auto mt-8 flex w-full max-w-6xl flex-col gap-10 px-6 md:flex-row md:justify-between">
		<form onsubmit={handleSubmit} class="flex w-full flex-col items-start md:w-[45%]">
			<input
				type="text"
				bind:value={name}
				placeholder="Your Name"
				class="mb-6 h-12 w-full rounded-lg bg-black/[0.035] px-3 text-lg outline-none placeholder:font-normal"
			/>
			<input
				type="email"
				bind:value={email}
				placeholder="Your Email"
				class="mb-6 h-12 w-full rounded-lg bg-black/[0.035] px-3 text-lg outline-none placeholder:font-normal"
			/>
			<textarea
				bind:value={message}
				placeholder="Tell me what's up!"
				class="mb-10 h-32 w-full rounded-lg bg-black/[0.035] px-3 py-2 text-lg outline-none placeholder:font-normal"
			></textarea>
			<Button type="submit">Submit</Button>
			{#if submitted}
				<p class="mt-4 text-[#5e5e5e]">Merci, on te répond vite !</p>
			{/if}
		</form>

		<div class="w-full md:w-[39%]">
			<h3 class="mb-2 text-2xl font-bold">Talk to me about your project</h3>
			<p>
				I'm always excited to hear about new and innovative ideas! Whether you're in the early
				stages of planning or have a well-defined project, I'm here to help bring your vision to
				life. Feel free to drop me a message with some details about your project, and let's start
				a conversation about how we can work together. I look forward to connecting with you and
				discussing the possibilities. Talk to you soon!
			</p>
		</div>
	</div>
</section>
