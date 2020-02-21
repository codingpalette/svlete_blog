<script>
  import Header from "../components/Header.svelte";
  export let segment;

  import Button from "sveltestrap/src/Button.svelte";
  import Container from "sveltestrap/src/Container.svelte";
  import Row from "sveltestrap/src/Row.svelte";
  import Col from "sveltestrap/src/Col.svelte";
  import Card from "sveltestrap/src/Card.svelte";
  import CardBody from "sveltestrap/src/CardBody.svelte";
  import CardText from "sveltestrap/src/CardText.svelte";
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

<Header {segment} />

<div class="main_container">
  <Container>
    <Row>
      <Col xs="12">
        <Card class="mb-3 shadow border-0 rounded-lg">
          <a href="/">
            <div class="card_title_box">
              <h2>코드 잘 짜는 방법</h2>
            </div>
            <CardBody>
              <CardText>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Pariatur nesciunt harum incidunt expedita, quis a, esse et cum
                hic assumenda sequi dignissimos exercitationem inventore cumque
                libero beatae fuga suscipit labore!
              </CardText>
            </CardBody>
          </a>
        </Card>
      </Col>
    </Row>
  </Container>

</div>
