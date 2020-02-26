<script>
  import Header from "../components/Header.svelte";
  import Welcome from "../components/Welcome.svelte";
</script>

<svelte:head>
  <title>About</title>
</svelte:head>

<Header />

<div class="main_container">
  <Welcome>
    <h1 slot="title">어바웃 페이지 준비중입니다.</h1>
  </Welcome>
</div>
