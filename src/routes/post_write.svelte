<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";

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

  let modalOpen = false;

  const modalToggle = () => (modalOpen = !modalOpen);

  onMount(async () => {
    import("quill/dist/quill.snow.css");
    const quillMoule = await import("quill/dist/quill.js");
    const Quill = quillMoule.default;
    var quill = new Quill("#editor-container", {
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          ["image", "code-block"]
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
    width: 320px;
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

  :global(.modal_content .card_footer_box button) {
    margin: 0 5px;
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
          placeholder="제목을 입력해주세요." />
      </FormGroup>
      <FormGroup>
        <Label for="category" class="label">카테고리</Label>
        <Input type="select" name="category" id="category">
          <option>html</option>
          <option>css</option>
          <option>javascript</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="url" class="label">URL*</Label>
        <Input
          type="text"
          name="url"
          id="url"
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
        <div class="card_title_box">
          <strong>포스트 작성</strong>
        </div>
        <CardBody>
          <CardText>포스트를 작성 하시겠습니까?</CardText>
        </CardBody>
        <div class="card_footer_box">
          <Button color="danger" on:click={modalToggle}>취소</Button>
          <Button color="primary">확인</Button>
        </div>
      </Card>

    </div>
    <div class="modal_back" on:click={modalToggle} />
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
