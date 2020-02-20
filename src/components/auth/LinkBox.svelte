<script>
  export let Link;
</script>

<style>
  .link_box {
    text-align: center;
    font-size: 0.8rem;
    color: #8f9bb3;
    font-weight: bold;
  }

  .link_box a {
    color: #17a2b8;
  }
</style>

<div class="link_box">
  <span>
    {#if Link === 'signup'}계정이 없으신가요?{:else}계정이 있으신가요?{/if}
  </span>
  <a href={Link}>
    {#if Link === 'signup'}가입하기{:else}로그인하기{/if}
  </a>
</div>
