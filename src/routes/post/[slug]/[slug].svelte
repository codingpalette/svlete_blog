<script context="module">
  export function preload(page, session) {
    const { path } = page;
    return { path };
  }
</script>

<script>
  export let path;
  import { goto } from "@sapper/app";
  import { onMount } from "svelte";
  import { firebase } from "@firebase/app";
  import { items } from "../../../store/homePost";

  import Header from "../../../components/Header.svelte";
  import PostPopup from "../../../components/post/PostPopup.svelte";
  import TransitionWrapper from "../../../components/TransitionWrapper.svelte";

  import Container from "sveltestrap/src/Container.svelte";
  import Spinner from "sveltestrap/src/Spinner.svelte";
  import Button from "sveltestrap/src/Button.svelte";

  let viewContent = {};
  let isViewLoading = true;
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

  onMount(async () => {
    const pathname = path.split("/");
    // console.log(pathname);
    // console.log(decodeURI(`${pathname[2]}_${pathname[3]}`));
    const metaRead = await firebase
      .firestore()
      .collection("docs")
      .doc(decodeURI(`${pathname[2]}_${pathname[3]}`))
      .get();

    const docRead = await firebase
      .firestore()
      .collection("docs")
      .doc(decodeURI(`${pathname[2]}_${pathname[3]}/content/last`))
      .get();

    viewContent = metaRead.data();
    // viewContent.content = docRead.data().content.replace(/^\t{3}/gm, "");
    isViewLoading = false;
    setTimeout(() => {
      tuiEditor = new tui.Editor.factory({
        el: document.querySelector("#editorSection"),
        viewer: true,
        height: "500px",
        initialValue: docRead.data().content
      });
    }, 0);
  });
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

  .loading_box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
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
    .loading_box {
      margin-left: 250px;
      width: calc(100% - 250px);
    }
  }
</style>

<svelte:head>
  <title>{viewContent.title}</title>
  <meta name="description" content={viewContent.description} />
  <!-- <meta name="keywords" content="{post.metadata.keywords}"/> -->

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <!-- <meta property="og:url" content="https://lacourt.dev/{post.slug}"> -->
  <meta property="og:title" content={viewContent.title} />
  <meta property="og:description" content={viewContent.description} />
  <!--
  {#if post.metadata.thumb}
  <meta property="og:image" content="{post.metadata.thumb}">
  {/if}
  -->

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <!-- <meta property="twitter:url" content="https://lacourt.dev/{post.slug}"> -->
  <meta property="twitter:title" content={viewContent.title} />
  <meta property="twitter:description" content={viewContent.description} />
  <!--
  {#if post.metadata.thumb}
  <meta property="twitter:image" content="{post.metadata.thumb}">
  {/if}
  -->

  <meta name="title" content={viewContent.title} />
  <meta name="twitter:title" content={viewContent.title} />
  <meta property="og:title" content={viewContent.title} />
</svelte:head>

<Header />

{#if !isViewLoading}
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
  <TransitionWrapper>
    <div class="view_container">
      <Container>
        <div class="view_content shadow rounded-lg">

          <div id="editorSection" />

          <!-- {@html viewContent.content} -->
        </div>
      </Container>
    </div>
  </TransitionWrapper>
{:else}
  <div class="loading_box">
    <Spinner color="primary" />
  </div>
{/if}

<PostPopup
  {modalOpen}
  {isCardLoading}
  {isCardOk}
  {isCardError}
  {submitEvent}
  {modalToggle}
  {Mode} />
