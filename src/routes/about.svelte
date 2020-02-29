<script>
  import Header from "../components/Header.svelte";
  import Welcome from "../components/Welcome.svelte";

  import Container from "sveltestrap/src/Container.svelte";
</script>

<style>
  .about_container {
    padding: 1rem;
  }
  .about_container .image_box {
    max-width: 400px;
    margin: 0 auto;
  }
  .about_container .image_box img {
    display: block;
    width: 100%;
    height: auto;
  }
  .about_container > h1 {
    font-size: 1.8rem;
    color: #000;
    margin-bottom: 0.5rem;
    text-align: center;
  }
  .about_container > strong {
    display: block;
    border-left: 4px solid #ccc;
    text-indent: 1rem;
    margin-top: 1rem;
  }
</style>

<svelte:head>
  <title>About</title>
</svelte:head>

<Header />

<div class="main_container">
  <Container>
    <div class="shadow border-0 rounded-lg about_container">
      <h1>Profile</h1>
      <div class="image_box">
        <img src="image/profile.svg" alt="profile" />
      </div>
      <strong>좋은 개발자를 꿈꾸는 블로그 입니다.</strong>
    </div>
  </Container>
  <!-- <Welcome>
    <h1 slot="title">어바웃 페이지 준비중입니다.</h1>
  </Welcome> -->
</div>
