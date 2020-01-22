<script>
	// import Nav from '../components/Nav.svelte';
	// export let segment;
</script>

<style>
  .sub-brand {
		line-height: 1;
    margin-right: 8px;
  }
</style>

<!-- <Nav {segment}/> -->

<section class="hero is-dark">
  <!-- Hero head: will stick at the top -->
  <div class="hero-head">
    <nav class="navbar">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
            <img src="https://dummyimage.com/400x200" alt="Logo">
          </a>
          <!-- <span class="navbar-burger burger" data-target="navbarMenuHeroA">
            <span></span>
            <span></span>
            <span></span>
          </span> -->
        </div>
        <div id="navbarMenuHeroA" class="navbar-menu">
          <div class="navbar-end">
            <span class="navbar-item">
              <a class="navbar-item" href="https://bulma.io/">
                <span class="is-size-7 sub-brand">Made <br/> with</span>
                <img src="https://bulma.io/images/bulma-type-white.png" alt="Logo">
              </a>
            </span>
            <a class="navbar-item" href="https://swapi.co">
              SW API
            </a>
            <span class="navbar-item">
              <a class="button is-primary" href="/">
                <span class="icon">
                  <i class="fab fa-github"></i>
                </span>
                <span>GitHub</span>
              </a>
            </span>
          </div>
        </div>
      </div>
    </nav>
  </div>

  <!-- Hero content: will be in the middle -->
  <div class="hero-body">
    <div class="container">
      <div class="columns">
        <div class="column has-text-centered">
          <h1 class="title">
            Title
          </h1>
          <h2 class="subtitle">
            Subtitle
          </h2>
        </div>
        <div class="column has-text-centered">
            <img src="https://dummyimage.com/100" alt='ship' />
        </div>
      </div>
    </div>
  </div>
</section>

<main>
	<slot></slot>
</main>