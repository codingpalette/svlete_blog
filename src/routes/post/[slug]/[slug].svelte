<script context="module">
  export function preload(page, session) {
    const { path } = page;
    return { path };
  }
</script>

<script>
  export let path;
  export let segment;
  import { goto } from "@sapper/app";
  import { onMount } from "svelte";
  import { firebase } from "@firebase/app";

  import Header from "../../../components/Header.svelte";
  import TransitionWrapper from "../../../components/TransitionWrapper.svelte";

  import Container from "sveltestrap/src/Container.svelte";
  import Spinner from "sveltestrap/src/Spinner.svelte";
  import Button from "sveltestrap/src/Button.svelte";

  let viewContent = {};
  let isViewLoading = true;
  let user = null;
  let tuiEditor;

  onMount(() => {
    user = JSON.parse(localStorage.getItem("__palette_user__"));
  });

  const postLink = () => {
    // console.log(path);
    const pathname = path.split("/");
    goto(`post_write?id=${pathname[2]}_${pathname[3]}`);
  };

  onMount(async () => {
    const pathname = path.split("/");
    // console.log(pathname);
    const metaRead = await firebase
      .firestore()
      .collection("docs")
      .doc(`${pathname[2]}_${pathname[3]}`)
      .get();

    const docRead = await firebase
      .firestore()
      .collection("docs")
      .doc(`${pathname[2]}_${pathname[3]}/content/last`)
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
    position: sticky;
    left: 0;
    top: 0;
    background-color: #fff;
    z-index: 600;
    padding: 0 15px;
  }
  .view_header_top {
    height: 50px;
  }
  .view_header_top a {
    display: flex;
    width: 50px;
    height: 50px;
    align-items: center;
    color: #000;
  }
  .view_header_bottom {
    padding-bottom: 1rem;
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

<Header {segment} />

{#if !isViewLoading}
  <div class="view_top_container">
    <div class="view_header_top">
      <a href="/">
        <i class="fas fa-arrow-left fa-lg" />
      </a>
    </div>
    <div class="view_header_bottom">
      <h1>{viewContent.title}</h1>
      <!-- <span class="date_box">{viewContent.date}</span> -->
    </div>
  </div>
  {#if user && user.level === 0}
    <div class="view_btn_container">
      <Container>
        <Button color="primary" on:click={postLink}>수정</Button>
        <Button color="danger">삭제</Button>
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
