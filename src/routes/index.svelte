<script context="module">
	export async function preload(page, session) {
		// `this.fetch` is a wrapper around `fetch` that allows
		// you to make credentialled requests on both
		// server and client
		const res = await this.fetch(`/api`);
    const searchOptions = Object.keys(await res.json())

		return { searchOptions }
	}
</script>
<script>
	import {goto} from '@sapper/app'
  import _ from 'lodash'

  export let searchOptions

  let searchResults = []
  let selectedOption = searchOptions[0]
  let searchCount = null
  let filterText = ''

  const search = async (text) => {
    if (!text) return
    const res = await fetch(`/api/search?query=${text}&source=${selectedOption}`)
    const resJson = await res.json()
    console.log(resJson);
    searchResults = resJson.results
    searchCount = resJson.count
  }
  const searchDebounced = _.debounce(search, 500)

  const resultClick = res => {
    const [_, _id] = res.url.split(`${selectedOption}/`)
    const id = _id.replace('/', '')
    goto(`/details?source=${selectedOption}&id=${id}`)
  }

  const onOptionChange = () => {
    filterText = ''
    searchResults = []
    searchCount = null
  }
  
  $: {
    searchDebounced(filterText)
  }
</script>

<style>
  section {
    --main-dark-color: #363636;
  }
  input {
    min-width: 400px;
  }
  ul {
    padding: 4% 20%;
  }
  li {
    border: 1px solid;
    border-radius: 8px;
    padding: 8px;
    margin-top: 8px;
    background: ghostwhite;
    transition: all .5s;
    cursor: pointer;
    position: relative;
  }
  li:hover {
    background: var(--main-dark-color);
    color: ghostwhite;
  }
  li > i {
    float: right;
    margin-top: 5px;
    color: ghostwhite;
  }
  .heart {
    position: absolute;
    left: -35px;
    color: var(--main-dark-color)
  }
  .control-left {
    border: 2px solid var(--main-dark-color);
    border-top: none;
    border-right: none;
  }
  .control-right {
    border: 2px solid var(--main-dark-color);
    border-top: none;
    border-left: none;
  }
</style>

<svelte:head>
	<title>SW API Demo</title>
</svelte:head>

<section class="container">
  <div class="field has-addons has-addons-centered">
    <p class="control control-left">
      <span class="select is-medium">
        <select bind:value={selectedOption} on:change={onOptionChange}>
        {#each searchOptions as searchOption}
          <option value={searchOption}>{searchOption}</option>
        {/each}
        </select>
      </span>
    </p>
    <p class="control control-right">
      <input bind:value={filterText} class="input is-medium" type="text" placeholder="Start typing name...">
    </p>
  </div>
  <!-- <ul><li>TEST 1 <i class="fas fa-arrow-right"></i></li></ul> -->
  <!-- Results List -->
  {#if searchResults.length}
    <ul>
      <span>Top 10 hits from {searchCount} total</span>
      {#each searchResults as searchRes}
        <li on:click={resultClick(searchRes)}>
          <span class="has-text-weight-semibold">{searchRes.name || searchRes.title}</span>
          <i class="fas fa-arrow-right"></i>
          <i class="fas fa-heart heart"></i>
        </li>
      {/each}
    </ul>
  {/if}
  {#if searchCount === 0}
    <h3 data-tooltip="No results found" class=" has-tooltip-bottom has-text-centered">These are not the droids you are looking for...</h3>
  {/if}
</section>