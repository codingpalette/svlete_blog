<script>
  export let segment;
  import UserObserver from "../components/UserObserver.svelte";
  import { isSegment } from "../store/segment";
  import LoggedInBtn from "../components/LoggedInBtn.svelte";
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

<LoggedInBtn />
<main>
  <slot />
</main>
