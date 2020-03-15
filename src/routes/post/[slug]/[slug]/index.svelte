<script context="module">
  import { firestore } from "./../../../../firebase";
  export async function preload(page, session) {
    const { path } = page;
    const pathname = path.split("/");
    let db = await firestore();
    let metaRead = await db
      .collection("docs")
      .doc(decodeURI(`${pathname[2]}_${pathname[3]}`))
      .get();
    let docRead = await db
      .collection("docs")
      .doc(decodeURI(`${pathname[2]}_${pathname[3]}/content/last`))
      .get();
    return { path, metaRead, docRead };
  }
</script>

<script>
  export let path;
  export let metaRead;
  export let docRead;
  import { goto } from "@sapper/app";
  import { onMount } from "svelte";
  import { items } from "../../../../store/homePost";

  import Header from "../../../../components/Header.svelte";
  import PostPopup from "../../../../components/post/PostPopup.svelte";
  import TransitionWrapper from "../../../../components/TransitionWrapper.svelte";

  import Container from "sveltestrap/src/Container.svelte";
  import Button from "sveltestrap/src/Button.svelte";

  let viewContent = {};
  let user = null;
  let tuiEditor;

  // 팝업관련 변수
  let Mode = "delete";
  let modalOpen = false;
  let isCardLoading = false;
  let isCardOk = false;
  let isCardError = false;

  onMount(() => {
    user = JSON.parse(localStorage.getItem("__palette_user__"));
  });

  const postLink = () => {
    // console.log(path);
    const pathname = path.split("/");
    goto(`post_write?id=${pathname[2]}_${pathname[3]}`);
  };

  const modalToggle = () => {
    modalOpen = !modalOpen;
    isCardLoading = false;
    isCardOk = false;
    isCardError = false;
  };

  const submitEvent = async () => {
    const pathname = path.split("/");
    isCardLoading = !isCardLoading;
    try {
      await firebase
        .firestore()
        .collection("docs")
        .doc(`${pathname[2]}_${pathname[3]}`)
        .delete();
      await firebase
        .firestore()
        .collection("docs")
        .doc(`${pathname[2]}_${pathname[3]}/content/last`)
        .delete();
      isCardOk = true;
      $items.splice($items.findIndex(i => i.id === viewContent.id), 1);
    } catch (e) {
      console.log(e);
      isCardError = true;
    }
  };

  viewContent = metaRead.data();
  viewContent.content = docRead.data().content.replace(/^\t{3}/gm, "");
</script>

<style>
  .view_top_container {
    width: 100%;

    background-color: #fff;
    z-index: 600;
    padding: 50px 15px 0;
  }

  .view_header_bottom {
    padding: 1rem 0;
  }
  .view_header_bottom h1 {
    font-size: 2rem;
    font-weight: bold;
    word-break: break-all;
  }
  /* .view_header_bottom .date_box {
    display: block;
    font-size: 0.9rem;
    margin-top: 0.5rem;
  } */
  .view_btn_container {
    padding-top: 1rem;
  }

  .view_container {
    padding: 1rem 0 60px 0;
  }
  .view_content {
    padding: 1rem;
    box-sizing: border-box;
    background-color: #fff;
    color: #333;
    margin-bottom: 3rem;
  }

  @media (min-width: 768px) {
    .view_top_container {
      margin-left: 250px;
      width: calc(100% - 250px);
    }
    .view_btn_container {
      padding: 1rem 0 0 250px;
    }
    .view_container {
      padding: 1rem 0 1rem 250px;
    }
  }
</style>

<svelte:head>
  {#if viewContent.title}
    <title>{viewContent.title}</title>
  {:else}
    <title>codingpalette</title>
  {/if}
  <meta name="description" content={viewContent.description} />

  <!-- <meta name="keywords" content="{post.metadata.keywords}"/> -->

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <!-- <meta property="og:url" content="https://lacourt.dev/{post.slug}"> -->
  {#if viewContent.title}
    <meta property="og:title" content={viewContent.title} />
  {:else}
    <meta property="og:title" content="codingpalette" />
  {/if}

  <meta property="og:description" content={viewContent.description} />
  <meta
    property="og:image"
    content="https://firebasestorage.googleapis.com/v0/b/my-blog-7d61e.appspot.com/o/banner-image.png?alt=media&token=1dfda7d3-0a0f-4837-b682-e7d783b85908" />
  <!--
  {#if post.metadata.thumb}
  <meta property="og:image" content="{post.metadata.thumb}">
  {/if}
  -->

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <!-- <meta property="twitter:url" content="https://lacourt.dev/{post.slug}"> -->
  {#if viewContent.title}
    <meta property="twitter:title" content={viewContent.title} />
  {:else}
    <meta property="twitter:title" content="codingpalette" />
  {/if}

  <meta property="twitter:description" content={viewContent.description} />
  <meta
    property="twitter:image"
    content="https://firebasestorage.googleapis.com/v0/b/my-blog-7d61e.appspot.com/o/banner-image.png?alt=media&token=1dfda7d3-0a0f-4837-b682-e7d783b85908" />
  <!--
  {#if post.metadata.thumb}
  <meta property="twitter:image" content="{post.metadata.thumb}">
  {/if}
  -->

</svelte:head>

<Header />

<div class="view_top_container">
  <div class="view_header_bottom">
    <h1>{viewContent.title}</h1>
    <!-- <span class="date_box">{viewContent.date}</span> -->
  </div>
</div>
{#if user && user.level === 0}
  <div class="view_btn_container">
    <Container>
      <Button color="primary" on:click={postLink}>수정</Button>
      <Button color="danger" on:click={modalToggle}>삭제</Button>
    </Container>
  </div>
{/if}

<div class="view_container">
  <Container class="ql-snow">
    <div class="view_content ql-editor shadow border-0 rounded-lg">
      {@html viewContent.content}
    </div>
  </Container>
</div>

<PostPopup
  {modalOpen}
  {isCardLoading}
  {isCardOk}
  {isCardError}
  {submitEvent}
  {modalToggle}
  {Mode} />
