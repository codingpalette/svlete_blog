<script>
  import UserObserver from "../components/UserObserver.svelte";
</script>

<style>
  /* main {
    position: relative;
    padding: 50px 0;
    box-sizing: border-box;
  }

  @media (min-width: 768px) {
    main {
      padding: 0;
      padding-left: 250px;
    }
  } */
</style>

<UserObserver />
<main>
  <slot />
</main>
