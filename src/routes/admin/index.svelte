<script>
  import Header from "../../components/Header.svelte";
  import { test, user } from "../../api";

  import Container from "sveltestrap/src/Container.svelte";
  import Table from "sveltestrap/src/Table.svelte";

  let items = [];

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
      items = res.data.items;
    } catch (e) {
      console.log(e.message);
    }
  };
</script>

<Header />

<div class="main_container">
  <button on:click={click}>api 테스트</button>
  <button on:click={userClick}>유저 테스트</button>
  <Container>
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>이메일</th>
          <th>아이디</th>
          <th>사진</th>
        </tr>
      </thead>
      <tbody>
        {#each items as { email, uid, photoURL }, i}
          <tr>
            <th scope="row">{i + 1}</th>
            <td>{email}</td>
            <td>{uid}</td>
            <td>{photoURL}</td>
          </tr>
        {/each}

      </tbody>
    </Table>
  </Container>
</div>
