<script>
  import { goto } from "@sapper/app";
  import { onMount, beforeUpdate, afterUpdate } from "svelte";
  // import { firebase } from "@firebase/app";
  import { currentUser } from "../store/user";

  import Header from "../components/Header.svelte";
  import TransitionWrapper from "../components/TransitionWrapper.svelte";
  import Welcome from "../components/Welcome.svelte";

  let scrollY;
  let innerHeight;
  let innerWidth;

  const handleScroll = e => {};
</script>

<style>

</style>

<svelte:head>
  <title>codingpalette</title>
  <meta
    name="description"
    content="좋은 개발자를 꿈꾸는 코딩팔레트 입니다."
    data-rh="true" />
  <meta
    property="og:image"
    content="https://firebasestorage.googleapis.com/v0/b/my-blog-7d61e.appspot.com/o/banner-image.png?alt=media&token=1dfda7d3-0a0f-4837-b682-e7d783b85908"
    data-rh="true" />
</svelte:head>

<svelte:window
  bind:scrollY
  bind:innerWidth
  bind:innerHeight
  on:scroll={handleScroll(scrollY, innerWidth, innerHeight)} />

<Header />

<div class="main_container">
  <Welcome>
    <h1 slot="title">메인 페이지 준비중입니다.</h1>
  </Welcome>
</div>
