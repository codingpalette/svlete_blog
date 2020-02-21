<script>
  import { onMount } from "svelte";
  export let segment;
  import Header from "../components/Header.svelte";

  import Container from "sveltestrap/src/Container.svelte";
  import Row from "sveltestrap/src/Row.svelte";
  import Col from "sveltestrap/src/Col.svelte";
</script>

<style>
  .write_top_container {
    width: 100%;
    height: 50px;
    position: fixed;
    left: 0;
    top: 0;
    background-color: #fff;
    z-index: 1100;
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

  @media (min-width: 768px) {
    .write_top_container {
      margin-left: 250px;
      width: calc(100% - 250px);
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
      <button class="btn">
        <i class="fas fa-check fa-lg" />
      </button>
    </div>
  </Container>

</div>

<div class="main_container">
  <Container>
    <Row>
      <Col>
        <div class="write_container">sdfsdf</div>

      </Col>
    </Row>
  </Container>

</div>
