<script lang="ts">
	async function loadRandomRelease() {
		const randomRelease = Math.floor(Math.random() * 16575315) + 1;
		const res = await fetch(`https://api.discogs.com/releases/${randomRelease}`);
		if(res.status !== 200) {
			return { item: undefined, releaseId: randomRelease };
		}
		const item = await res.json();

		return { item, releaseId: randomRelease };
	}

	let randomReleasePromise = loadRandomRelease();

	function handleClick() {
		randomReleasePromise = loadRandomRelease();
	}
</script>

<svelte:head>
	<title>Discogs Rand Release</title>
</svelte:head>

<section>
	<div>
		<button on:click={handleClick}>Fetch Random Release</button>
	</div>
	<div>
		{#await randomReleasePromise}
			<div>Loading...</div>
		{:then data}
		{#if !data.item}
			<div>Nothing found for id {data.releaseId}</div>
		{:else}
		<ul>
			<li>release id: {data.releaseId}</li>
			{#if data.item.artists}
				<li>
					artist(s):
					<ul>
					{#each data.item.artists as artist}
						<li><a href={"https://www.discogs.com/artist/" + artist.id} target="_blank">{artist.name}</a></li>
					{/each}
					</ul>
				</li>
			{/if}
			<li>release title: {data.item.title}</li>
			<li>release year: {data.item.year}</li>
			<li>release uri: <a href={data.item.uri} target="_blank">{data.item.uri}</a></li>
			{#if data.item.videos}
				<li>
					<div><a href={data.item.videos[0].uri} target="_blank">{data.item.videos[0].uri}</a></div>
					<div class="video-container">
						<iframe width="560" height="315" src={"https://www.youtube.com/embed/" + new URL(data.item.videos[0].uri).searchParams.get("v")} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
					</div>
				</li>
			{/if}
		</ul>
		{/if}
		{:catch error}
			<div>There was an error: {error.message}</div>
		{/await}
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	.video-container {
		position: relative;
		padding-bottom: 56.25%;
		height: 0;
		overflow: hidden;
	}

	.video-container iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	/*h1 {*/
	/*	width: 100%;*/
	/*}*/
</style>
