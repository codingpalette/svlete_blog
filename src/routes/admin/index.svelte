<script>
  import Header from "../../components/Header.svelte";
  import Welcome from "../../components/Welcome.svelte";
  import { test, user } from "../../api";

  const click = async () => {
    try {
      const { data } = await test.Get();
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const userClick = async () => {
    try {
      const res = await user.Get();
      console.log(res);
    } catch (e) {
      console.log(e.message);
    }
  };
</script>

<Header />

<div class="main_container">
  <button on:click={click}>api 테스트</button>
  <button on:click={userClick}>유저 테스트</button>
  <Welcome>
    <h1 slot="title">어드민 페이지 준비중입니다.</h1>
  </Welcome>
</div>
