<script>
  import UserObserver from "../components/UserObserver.svelte";
  export let segment;
  import { isSegment } from "../store/segment";
  $: $isSegment = segment;
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
