<script context="module">
	export async function preload(page, session) {
    // console.log('page: ', page);
    const {source, id} = page.query
    const res = await this.fetch(`/api/details?source=${source}&id=${id}`)
    const jsn = await res.json();
    console.log('jsn: ', jsn);

		if (res.ok) {
			return {details: jsn}
		} else {
			return {details: null}
		}
	}
</script>
<script>
  export let details
</script>

<style>
  section {
    padding: 4% 20%;
  }
  .back {
    position: relative;
    top: -14px;
    left: 0px;
  }
  .like {
    float: right;
    margin-top: -8px;
  }
</style>

<svelte:head>
	<title>{details.name || details.title} | SW API Demo</title>
</svelte:head>

<section class="container">
  <a class="back" href="/">
    <i class="fas fa-arrow-left"></i> Back
  </a>
  <!-- TODO add to favourites -->
  <a class="like" data-tooltip="Add to favourites">
    <i class="far fa-heart"></i>
  </a>
  {#if details}
    <h1>Details for {details.name || details.title}</h1>
    <pre>{JSON.stringify(details, null, 2)}</pre>
  {:else}
    <p style="color: red">Nothing found!</p>
  {/if}
</section>