<script>
  import { goto } from "@sapper/app";
  import { onMount, beforeUpdate, afterUpdate } from "svelte";
  import { firebase } from "@firebase/app";
  import { items, LastPost, LastScrollY } from "../store/homePost";
  import { currentUser } from "../store/user";

  import Header from "../components/Header.svelte";
  import TransitionWrapper from "../components/TransitionWrapper.svelte";
  import LoggedInBtn from "../components/LoggedInBtn.svelte";

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

  if ($items.length < 1) {
    onMount(async () => {
      try {
        if (innerWidth >= 2500) {
          getNum = 30;
        }
        const res = await firebase
          .firestore()
          .collection("docs")
          .orderBy("createdAt", "desc")
          .limit(getNum)
          .get();
        // console.log(res);
        $items = res.docs.map(e => e.data());
        $LastPost = res.docs[res.docs.length - 1];
        if (res.docs.length === 0) {
          notPage = true;
        }
        // console.log($items);
      } catch (e) {
        // console.log(e);
      }
    });
  } else {
    onMount(() => {
      // console.log(scrollY);
      setTimeout(() => {
        window.scrollTo({ top: $LastScrollY, left: 0, behavior: "smooth" });
        //  behavior 값에  auto, instant, smooth
      }, 500);
      // scrollY = $LastScrollY;
    });
  }

  const linkEvent = i => {
    $LastScrollY = scrollY;
    goto(i);
  };
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
  .notpage_container {
    text-align: center;
    position: relative;
    min-height: calc(100vh - 120px);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .notpage_container img {
    width: 100%;
    height: auto;
    max-width: 400px;
  }
  .notpage_container strong {
    font-size: 1.5rem;
    margin-top: 0.5rem;
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
</svelte:head>

<svelte:window
  bind:scrollY
  bind:innerWidth
  bind:innerHeight
  on:scroll={handleScroll(scrollY, innerWidth, innerHeight)} />

<Header />

<TransitionWrapper>
  <div class="main_container home_container">
    {#if !notPage}
      {#each $items as item}
        <Col sm="12" md="12" lg="6" xl="4" class="main_card_box">
          <Card class="mb-4 shadow border-0 rounded-lg ">
            <a
              href={`post/${item.category}/${item.url}`}
              on:click|preventDefault={() => linkEvent(`post/${item.category}/${item.url}`)}
              class="main_card">
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
    {:else}
      <Col xs="12">
        <div class="notpage_container">
          <img src="image/notpage.svg" alt="notpage" />
          <strong>포스트가 없습니다.</strong>
        </div>
      </Col>
    {/if}
  </div>
</TransitionWrapper>

{#if $currentUser}
  <LoggedInBtn />
{/if}
