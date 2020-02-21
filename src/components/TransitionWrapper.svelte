<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";

  let show = false;
  onMount(() => {
    show = true;
  });
</script>

<style>
  div {
    position: relative;
  }
</style>

{#if show}
  <div in:fly={{ y: 200, duration: 1500 }}>
    <slot />
  </div>
{/if}
