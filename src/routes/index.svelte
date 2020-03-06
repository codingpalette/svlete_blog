<script context="module">
  export function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    return this.fetch(`https://my-blog-7d61e.firebaseio.com/words.json`)
      .then(r => r.json())
      .then(slugWithPostObject => {
        let posts = Object.keys(slugWithPostObject) // ["slug1","slug2"...]
          .map(slug => slugWithPostObject[slug]);
        console.log(posts);
        return { posts };
      });
    // console.log(res.json());
    // const data = res.json();
    // console.log(data);
    // return { post: data };
    // if (res.status === 200) {

    // } else {
    //   this.error(res.status, data.message);
    // }
  }
</script>

<script>
  export let posts;
  console.log(posts);
  import { goto } from "@sapper/app";
  import { onMount, beforeUpdate, afterUpdate } from "svelte";
  import { firebase } from "@firebase/app";
  import { items, LastPost } from "../store/homePost";
  import { currentUser } from "../store/user";

  import Header from "../components/Header.svelte";
  import TransitionWrapper from "../components/TransitionWrapper.svelte";
  import Welcome from "../components/Welcome.svelte";
  import Skeleton from "../components/Skeleton.svelte";

  // sveltestrap
  import Button from "sveltestrap/src/Button.svelte";
  import Container from "sveltestrap/src/Container.svelte";
  import Row from "sveltestrap/src/Row.svelte";
  import Col from "sveltestrap/src/Col.svelte";
  import Card from "sveltestrap/src/Card.svelte";
  import CardBody from "sveltestrap/src/CardBody.svelte";
  import CardText from "sveltestrap/src/CardText.svelte";

  let scrollY;
  let innerHeight;
  let innerWidth;
  let scrollStart = true;
  let notPage = false;
  let getNum = 20;
  let isLoading = false;
  const Skeletons = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20
  ];

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
        .limit(getNum)
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

  onMount(async () => {
    try {
      if (innerWidth >= 2500) {
        getNum = 30;
      }

      // console.log(res);
      if ($items.length < 1) {
        const res = await firebase
          .firestore()
          .collection("docs")
          .orderBy("createdAt", "desc")
          .limit(getNum)
          .get();
        $items = res.docs.map(e => e.data());
        $LastPost = res.docs[res.docs.length - 1];
      }
      isLoading = false;

      if ($items.length === 0) {
        notPage = true;
      }
      // console.log($items);
    } catch (e) {
      // console.log(e);
    }
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

  :global(.main_card_box) {
    transition: 0.2s;
  }
  :global(.main_card_box:hover) {
    transform: translateY(-5px);
  }
  :global(.main_card_box .main_card) {
    height: 300px;
  }

  @media (min-width: 1500px) {
    :global(.main_card_box) {
      flex: 0 0 25%;
      max-width: 25%;
    }
  }
  @media (min-width: 2000px) {
    :global(.main_card_box) {
      flex: 0 0 20%;
      max-width: 20%;
    }
  }
  @media (min-width: 2500px) {
    :global(.main_card_box) {
      flex: 0 0 16.66%;
      max-width: 16.66%;
    }
  }
  @media (min-width: 3000px) {
    :global(.main_card_box) {
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

{#if isLoading}
  <div class="main_container home_container">
    {#each Skeletons as item}
      <Skeleton />
    {/each}
  </div>
{:else if !notPage}
  <div class="main_container home_container">
    {#each posts as post}
      <div>{post}</div>
    {/each}
    {#each $items as item}
      <Col sm="12" md="12" lg="6" xl="4" class="main_card_box">
        <Card class="mb-4 shadow border-0 rounded-lg ">
          <a href={`post/${item.category}/${item.url}`} class="main_card">
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
            <CardBody>
              <CardText class="text-dark">{item.description}</CardText>
            </CardBody>
          </a>
        </Card>
      </Col>
    {/each}
  </div>
{:else}
  <div class="main_container">
    <Welcome>
      <h1 slot="title">포스트 준비중입니다.</h1>
    </Welcome>
  </div>
{/if}
