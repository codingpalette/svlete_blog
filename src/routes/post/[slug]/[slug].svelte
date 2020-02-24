<script>
  import { onMount } from "svelte";
  import Header from "../../../components/Header.svelte";
  export let segment;

  import Container from "sveltestrap/src/Container.svelte";

  import { firebase } from "@firebase/app";

  let viewContent = {};
  let isViewLoading = true;

  onMount(async () => {
    // console.log(window.location);
    const pathname = window.location.pathname.split("/");
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
    viewContent.content = docRead.data().content.replace(/^\t{3}/gm, "");
    isViewLoading = false;
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
    height: inherit;
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
  .view_header_bottom .date_box {
    display: block;
    font-size: 0.9rem;
    margin-top: 0.5rem;
  }

  .view_container {
    padding: 10px 0 60px 0;
  }
  .view_content {
    padding: 1rem;
    box-sizing: border-box;
    background-color: #fff;
  }

  @media (min-width: 768px) {
    .view_top_container {
      margin-left: 250px;
      width: calc(100% - 250px);
    }
    .view_container {
      padding: 1rem 0 1rem 250px;
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
      <span class="date_box">{viewContent.date}</span>
    </div>

  </div>

  <div class="view_container ql-snow">
    <Container>
      <div class="view_content ql-editor shadow rounded-lg">
        {@html viewContent.content}
      </div>
    </Container>
  </div>
{/if}
