<script context="module">
  import { firestore } from "./../../firebase";
  export async function preload(page, session) {
    let db = await firestore();
    let res = await db
      .collection("docs")
      .orderBy("createdAt", "desc")
      .limit(20)
      .get();
    return {
      list: res.docs.map(e => e.data()),
      last: res.docs[res.docs.length - 1]
    };
  }
</script>

<script>
  export let list;
  export let last;
  import { goto } from "@sapper/app";
  import { onMount, beforeUpdate, afterUpdate } from "svelte";
  // import { firebase } from "@firebase/app";
  import { items, LastPost } from "./../../store/homePost";

  import Header from "./../../components/Header.svelte";
  import TransitionWrapper from "./../../components/TransitionWrapper.svelte";
  import Welcome from "./../../components/Welcome.svelte";

  let scrollY;
  let innerHeight;
  let innerWidth;
  let scrollStart = true;
  let notPage = false;
  let isLoading = true;

  const handleScroll = e => {
    // console.log(scrollY);
    // console.log(innerHeight);
    // console.log(window.innerHeight);
    // console.log(document.body.scrollHeight);
    if (
      (document.body.scrollHeight - innerHeight) * 0.8 < scrollY &&
      scrollStart
    ) {
      scrollStart = false;
      scorollPost($LastPost);
    }
  };

  const scorollPost = async data => {
    try {
      const res = await firebase
        .firestore()
        .collection("docs")
        .orderBy("createdAt", "desc")
        .startAfter(data)
        .limit(20)
        .get();
      // console.log(res);
      const plusItems = res.docs.map(e => e.data());
      $items = [...$items, ...plusItems];
      $LastPost = res.docs[res.docs.length - 1];
      scrollStart = true;
    } catch (e) {
      // console.log(e);
    }
  };

  if ($items.length < 1) {
    $items = list;
    $LastPost = last;
  }
  if ($items.length === 0) {
    notPage = true;
  }

  onMount(() => {
    isLoading = false;
  });
</script>

<style>
  .home_container {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
  }
  .card_title_box {
    padding: 1.25rem;
    border-bottom: 1px solid #edf1f7;
  }
  .card_title_box h2 {
    font-size: 1.2rem;
    font-weight: bold;
  }
  .card_title_box .sub_box {
    display: flex;
    align-items: center;
  }
  .card_title_box .sub_content {
    display: block;
    padding-top: 1rem;
    font-size: 0.8rem;
  }

  .card_title_box .sub_content + div {
    margin-left: 1rem;
  }

  .main_card_box {
    transition: 0.2s;
    flex: 0 0 100%;
    max-width: 100%;
    padding-right: 15px;
    padding-left: 15px;
  }
  .main_card_box:hover {
    transform: translateY(-5px);
  }
  .main_card_box .card_item {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
  }
  .main_card_box .main_card {
    height: 300px;
  }
  .main_card_box .card_body {
    flex: 1 1 auto;
    padding: 1.25rem;
  }
  .main_card_box .card_body .card_text:last-child {
    margin-bottom: 0;
  }
  @media (min-width: 992px) {
    .main_card_box {
      flex: 0 0 50%;
      max-width: 50%;
    }
  }
  @media (min-width: 1200px) {
    .main_card_box {
      flex: 0 0 33.33%;
      max-width: 33.33%;
    }
  }
  @media (min-width: 1500px) {
    .main_card_box {
      flex: 0 0 25%;
      max-width: 25%;
    }
  }
  @media (min-width: 2000px) {
    .main_card_box {
      flex: 0 0 20%;
      max-width: 20%;
    }
  }
  @media (min-width: 2500px) {
    .main_card_box {
      flex: 0 0 16.66%;
      max-width: 16.66%;
    }
  }
  @media (min-width: 3000px) {
    .main_card_box {
      flex: 0 0 14.28%;
      max-width: 14.28%;
    }
  }
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

<div class="main_container home_container">
  {#each $items as item}
    <div class="main_card_box">
      <div class="card_item shadow border-0 rounded-lg mb-4">
        <a rel="prefetch" href={item.slug} class="main_card">
          <div class="card_title_box">
            <h2>{item.title}</h2>
            <div class="sub_box">
              <div class="sub_content">
                <i class="far fa-calendar" />
                <span>작성일 {item.date}</span>
              </div>
              <div class="sub_content">
                <i class="fas fa-th-list" />
                <span>카테고리 {item.category}</span>
              </div>
            </div>
          </div>
          <div class="card_body">
            <div class="text-dark card_text">{item.description}</div>
          </div>
        </a>
      </div>
    </div>
  {/each}
</div>
