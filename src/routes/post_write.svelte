<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { goto } from "@sapper/app";

  onMount(() => {
    console.log(window.location);
  });

  export let segment;
  import Header from "../components/Header.svelte";

  import Container from "sveltestrap/src/Container.svelte";
  import Row from "sveltestrap/src/Row.svelte";
  import Col from "sveltestrap/src/Col.svelte";
  import FormGroup from "sveltestrap/src/FormGroup.svelte";
  import Input from "sveltestrap/src/Input.svelte";
  import Label from "sveltestrap/src/Label.svelte";
  import Card from "sveltestrap/src/Card.svelte";
  import CardBody from "sveltestrap/src/CardBody.svelte";
  import CardText from "sveltestrap/src/CardText.svelte";
  import Button from "sveltestrap/src/Button.svelte";
  import Spinner from "sveltestrap/src/Spinner.svelte";

  import { firebase } from "@firebase/app";

  let quillEditor;

  let modalOpen = false;
  let isCardLoading = false;
  let isCardOk = false;
  let isCardError = false;

  const modalToggle = () => {
    modalOpen = !modalOpen;
    isCardLoading = false;
    isCardOk = false;
    isCardError = false;
  };

  const postOklink = () => {
    goto("/");
  };

  let formData = {
    title: "",
    category: "html",
    url: "",
    description: "",
    tags: []
  };

  const subMitEvent = async () => {
    console.log(formData);
    console.log(quillEditor.root.innerHTML);
    isCardLoading = !isCardLoading;

    const today = new Date();

    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    const yyyy = today.getFullYear();

    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }
    const date = yyyy + "-" + mm + "-" + dd;
    const createdAt = today;
    const modifiedAt = today;

    const { title, category, url, description, tags } = formData;
    const content = quillEditor.root.innerHTML;
    const id = category + "_" + url;

    try {
      // await someFuncThatThrowsAnError();
      await firebase
        .firestore()
        .collection("docs")
        .doc(id)
        .set({ title, category, url, description, tags, createdAt, date });

      const cid = id + "/content/last";

      await firebase
        .firestore()
        .collection("docs")
        .doc(cid)
        .set({ createdAt, modifiedAt, content });
      isCardOk = true;
      console.log("isCardOk", isCardOk);
    } catch (e) {
      console.log("aaa");
      console.log(e);
      isCardError = true;
    }
  };

  onMount(async () => {
    // import("quill/dist/quill.snow.css");
    const quillMoule = await import("quill/dist/quill.js");
    const Quill = quillMoule.default;
    quillEditor = new Quill("#editor-container", {
      modules: {
        toolbar: [
          [{ header: "1" }, { header: "2" }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["blockquote", "code-block", "link", "image"]
        ]
      },
      placeholder: "Compose an epic...",
      theme: "snow" // or 'bubble'
    });
  });
</script>

<style>
  .write_top_container {
    width: 100%;
    height: 50px;
    position: fixed;
    left: 0;
    top: 0;
    background-color: #fff;
    z-index: 600;
  }
  .write_top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
  }

  .write_top h1 {
    font-size: 1.1rem;
    font-weight: bold;
  }

  .write_top .btn {
    color: #000;
    outline: none;
    transition: 0.2s;
  }
  .write_top .btn:hover {
    opacity: 0.75;
  }

  .write_main_container {
    background-color: #fff;
    padding: 50px 0;
    min-height: 100vh;
  }

  .write_main_container .form_box {
    background-color: #fff;
  }

  :global(.write_main_container .label) {
    font-size: 0.8rem;
    color: #8992a3;
  }

  .form_category {
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  .form_category:focus {
    outline: none;
  }

  .modal_container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal_back {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 100;
  }

  .modal_content {
    position: relative;
    margin: auto;
    z-index: 200;
    padding: 1rem;
    max-width: 350px;
    width: 100%;
  }

  .modal_content .card_title_box {
    padding: 1.25rem;
    border-bottom: 1px solid #edf1f7;
  }

  .modal_content .card_title_box strong {
    font-size: 1.2rem;
    font-weight: bold;
    display: block;
  }

  .modal_content .card_footer_box {
    padding: 1.25rem;
    border-top: 1px solid #edf1f7;
    display: flex;
    justify-content: center;
  }

  .card_loading_text {
    margin-top: 1rem;
    font-size: 0.8rem;
  }

  :global(.card_loading_box) {
    min-height: 186.5px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  :global(.modal_content .card_footer_box button) {
    margin: 0 5px;
  }

  :global(.ql-editor) {
    min-height: 250px;
    color: #222;
  }

  @media (min-width: 768px) {
    .write_top_container {
      margin-left: 250px;
      width: calc(100% - 250px);
    }

    .write_main_container {
      padding: 70px 0 0 260px;
      background-color: transparent;
    }

    .write_main_container .form_box {
      padding: 15px;
      border-radius: 4px;
      box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1),
        0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.14);
      padding: 30px 15px 15px;
    }
  }
</style>

<Header {segment} />

<div class="write_top_container">
  <Container>
    <div class="write_top">
      <a href="/" class="btn">
        <i class="fas fa-times fa-lg" />
      </a>
      <h1>포스트 작성</h1>
      <button class="btn" on:click={modalToggle}>
        <i class="fas fa-check fa-lg" />
      </button>
    </div>
  </Container>
</div>

<div class="write_main_container">
  <Container>
    <div class="form_box">
      <FormGroup>
        <Label for="title" class="label">제목*</Label>
        <Input
          type="text"
          name="title"
          id="title"
          bind:value={formData.title}
          placeholder="제목을 입력해주세요." />
      </FormGroup>
      <FormGroup>
        <Label for="category" class="label">카테고리</Label>
        <select
          type="select"
          name="category"
          id="category"
          class="form_category"
          bind:value={formData.category}>
          <option value="html">html</option>
          <option value="css">css</option>
          <option value="javascript">javascript</option>
        </select>
      </FormGroup>
      <FormGroup>
        <Label for="url" class="label">URL*</Label>
        <Input
          type="text"
          name="url"
          id="url"
          bind:value={formData.url}
          placeholder="url을 입력해주세요." />
      </FormGroup>
      <FormGroup>
        <Label for="description" class="label">포스트 소개*</Label>
        <Input
          type="textarea"
          name="description"
          id="description"
          rows="3"
          maxlength="150"
          bind:value={formData.description}
          placeholder="포스트를 짧게 작성해주세요." />
      </FormGroup>
      <div id="editor-container" />
    </div>
  </Container>
</div>

{#if modalOpen}
  <div class="modal_container">
    <div
      class="modal_content"
      in:fly={{ y: -50, duration: 1000 }}
      out:fly={{ y: 50, duration: 700 }}>
      <Card class="shadow border-0 rounded-lg">
        {#if !isCardLoading}
          <div class="card_title_box">
            <strong>포스트 작성</strong>
          </div>
          <CardBody class="text-center">
            <CardText>포스트를 작성 하시겠습니까?</CardText>
          </CardBody>
          <div class="card_footer_box">
            <Button color="danger" on:click={modalToggle}>취소</Button>
            <Button color="primary" on:click={subMitEvent}>확인</Button>
          </div>
        {:else if !isCardOk && !isCardError}
          <CardBody class="text-center card_loading_box">
            <CardText>
              <Spinner color="primary" />
            </CardText>
            <p class="card_loading_text">포스트 작성중...</p>
          </CardBody>
        {:else if isCardOk && !isCardError}
          <div class="card_title_box">
            <strong>포스트 작성</strong>
          </div>
          <CardBody class="text-center">
            <CardText class="text-success">포스트작성을 완료했습니다.</CardText>
          </CardBody>
          <div class="card_footer_box">
            <Button color="primary" on:click={postOklink}>확인</Button>
          </div>
        {:else if !isCardOk && isCardError}
          <div class="card_title_box">
            <strong>포스트 작성</strong>
          </div>
          <CardBody class="text-center">
            <CardText class="text-danger">
              포스트가 등록되지 않았습니다.
            </CardText>
            <CardText class="text-danger">다시 시도해주세요.</CardText>
          </CardBody>
          <div class="card_footer_box">
            <Button color="danger" on:click={modalToggle}>확인</Button>
          </div>
        {/if}
      </Card>

    </div>
    <div class="modal_back" />
  </div>
{/if}

<div class="main_container">
  <Container>
    <Row>
      <Col>
        <div class="write_container">asdsadad</div>
      </Col>
    </Row>
  </Container>

</div>
