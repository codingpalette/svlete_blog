<script>
  export let modalOpen;
  export let isCardLoading;
  export let isCardOk;
  export let isCardError;
  export let submitEvent;
  export let modalToggle;
  export let Mode;

  import { goto } from "@sapper/app";
  import { fly } from "svelte/transition";

  // sveltestrap
  import Card from "sveltestrap/src/Card.svelte";
  import Button from "sveltestrap/src/Button.svelte";
  import Spinner from "sveltestrap/src/Spinner.svelte";
  import CardBody from "sveltestrap/src/CardBody.svelte";
  import CardText from "sveltestrap/src/CardText.svelte";

  // console.log(Mode);

  const postOklink = () => {
    window.location.href = "/";
  };
</script>

<style>
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
</style>

{#if modalOpen}
  <div class="modal_container">
    <div
      class="modal_content"
      in:fly={{ y: -50, duration: 1000 }}
      out:fly={{ y: 50, duration: 700 }}>
      <Card class="shadow border-0 rounded-lg">
        {#if !isCardLoading}
          <div class="card_title_box">
            <strong>
              {#if Mode === 'create'}
                포스트 작성
              {:else if Mode === 'modify'}
                포스트 수정
              {:else if Mode === 'delete'}포스트 삭제{/if}
            </strong>
          </div>
          <CardBody class="text-center">
            <CardText>
              {#if Mode === 'create'}
                포스트를 작성 하시겠습니까?
              {:else if Mode === 'modify'}
                포스트를 수정 하시겠습니까?
              {:else if Mode === 'delete'}포스트를 삭제 하시겠습니까?{/if}
            </CardText>
          </CardBody>
          <div class="card_footer_box">
            <Button color="light" on:click={modalToggle}>취소</Button>
            {#if Mode !== 'delete'}
              <Button color="primary" on:click={submitEvent}>확인</Button>
            {:else}
              <Button color="danger" on:click={submitEvent}>삭제</Button>
            {/if}
          </div>
        {:else if !isCardOk && !isCardError}
          <CardBody class="text-center card_loading_box">
            <CardText>
              <Spinner color="primary" />
            </CardText>
            <p class="card_loading_text">
              {#if Mode === 'create'}
                포스트 작성중...
              {:else if Mode === 'modify'}
                포스트 수정중...
              {:else if Mode === 'delete'}포스트 삭제중...{/if}
            </p>
          </CardBody>
        {:else if isCardOk && !isCardError}
          <div class="card_title_box">
            <strong>
              {#if Mode === 'create'}
                포스트 작성
              {:else if Mode === 'modify'}
                포스트 수정
              {:else if Mode === 'delete'}포스트 삭제{/if}
            </strong>
          </div>
          <CardBody class="text-center">
            <CardText class="text-success">
              {#if Mode === 'create'}
                포스트작성을 완료했습니다.
              {:else if Mode === 'modify'}
                포스트수정을 완료했습니다.
              {:else if Mode === 'delete'}포스트삭제를 완료했습니다.{/if}
            </CardText>
          </CardBody>
          <div class="card_footer_box">
            <Button color="primary" on:click={postOklink}>확인</Button>
          </div>
        {:else if !isCardOk && isCardError}
          <div class="card_title_box">
            <strong>
              {#if Mode === 'create'}
                포스트 작성
              {:else if Mode === 'modify'}
                포스트 수정
              {:else if Mode === 'delete'}포스트 삭제{/if}
            </strong>
          </div>
          <CardBody class="text-center">
            <CardText class="text-danger">
              {#if Mode === 'create'}
                포스트가 등록되지 않았습니다.
              {:else if Mode === 'modify'}
                포스트가 수정되지 않았습니다.
              {:else if Mode === 'delete'}포스트가 삭제되지 않았습니다.{/if}
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
