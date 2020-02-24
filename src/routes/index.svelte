<script>
  import { onMount, beforeUpdate, afterUpdate } from "svelte";
  import { goto } from "@sapper/app";
  import { items, LastPost, LastScrollY } from "../store/homePost";

  import Header from "../components/Header.svelte";
  import TransitionWrapper from "../components/TransitionWrapper.svelte";

  export let segment;

  import Button from "sveltestrap/src/Button.svelte";
  import Container from "sveltestrap/src/Container.svelte";
  import Row from "sveltestrap/src/Row.svelte";
  import Col from "sveltestrap/src/Col.svelte";
  import Card from "sveltestrap/src/Card.svelte";
  import CardBody from "sveltestrap/src/CardBody.svelte";
  import CardText from "sveltestrap/src/CardText.svelte";

  import { firebase } from "@firebase/app";

  let scrollY;
  let innerHeight;
  let scrollStart = true;

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
        .limit(10)
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

  if ($items.length === 0) {
    onMount(async () => {
      try {
        const res = await firebase
          .firestore()
          .collection("docs")
          .orderBy("createdAt", "desc")
          .limit(10)
          .get();
        // console.log(res);
        $items = res.docs.map(e => e.data());
        $LastPost = res.docs[res.docs.length - 1];
        // console.log(items);
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
  .card_title_box {
    padding: 1.25rem;
    border-bottom: 1px solid #edf1f7;
  }
  .card_title_box h2 {
    font-size: 1.2rem;
    font-weight: bold;
  }
</style>

<svelte:head>
  <title>codingpalette</title>
</svelte:head>

<svelte:window
  bind:scrollY
  bind:innerHeight
  on:scroll={handleScroll(scrollY, innerHeight)} />

<Header {segment} />

<TransitionWrapper>
  <div class="main_container">
    <Container>
      <Row>
        <Col xs="12">
          {#each $items as item}
            <Card class="mb-4 shadow border-0 rounded-lg">
              <a
                href={`post/${item.category}/${item.url}`}
                on:click|preventDefault={() => linkEvent(`post/${item.category}/${item.url}`)}>
                <div class="card_title_box">
                  <h2>{item.title}</h2>
                </div>
                <CardBody>
                  <CardText>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Pariatur nesciunt harum incidunt expedita, quis a, esse et
                    cum hic assumenda sequi dignissimos exercitationem inventore
                    cumque libero beatae fuga suscipit labore!
                  </CardText>
                </CardBody>
              </a>
            </Card>
          {/each}
        </Col>
      </Row>
    </Container>
  </div>
</TransitionWrapper>
