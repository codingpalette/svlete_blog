<script>
  import UserObserver from "../components/UserObserver.svelte";
  import { currentUser } from "../store/user";
  import LoggedInBtn from "../components/LoggedInBtn.svelte";
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
{#if $currentUser}
  <LoggedInBtn />
{/if}
