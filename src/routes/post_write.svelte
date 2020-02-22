<script>
  import { onMount } from "svelte";

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
  }

  .modal_back {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
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
          placeholder="제목을 입력해 주세요." />
      </FormGroup>
      <FormGroup>
        <Label for="category" class="label">카테고리</Label>
        <Input type="select" name="category" id="category">
          <option>html</option>
          <option>css</option>
          <option>javascript</option>
        </Input>
      </FormGroup>
      <div id="editor-container" />
    </div>
  </Container>
</div>

{#if modalOpen}
  <div class="modal_container">

    <div class="modal_back" />
  </div>
{/if}

<div class="main_container">
  <Container>
    <Row>
      <Col>
        <div class="write_container">sdfsdf</div>

      </Col>
    </Row>
  </Container>

</div>
