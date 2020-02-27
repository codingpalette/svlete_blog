<script>
  import { onMount } from "svelte";
  import Header from "../../components/Header.svelte";
  import { test, user } from "../../api";

  import Container from "sveltestrap/src/Container.svelte";
  import Table from "sveltestrap/src/Table.svelte";
  import Pagination from "sveltestrap/src/Pagination.svelte";
  import PaginationItem from "sveltestrap/src/PaginationItem.svelte";
  import PaginationLink from "sveltestrap/src/PaginationLink.svelte";

  let items = [];
  let offset = 0;
  let limit = 3;
  let nowPageLists = [];
  let stateNum = 5;

  // const click = async () => {
  //   try {
  //     const { data } = await test.Get();
  //     console.log(data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const userClick = async () => {
  //   try {
  //     const res = await user.Get();
  //     console.log(res);
  //     items = res.data.items;
  //   } catch (e) {
  //     console.log(e.message);
  //   }
  // };

  const getList = async v => {
    offset = (v - 1) * limit;
    const res = await user.Get(offset, limit);
    console.log(res);
    items = res.data.items;
    const listLength = Math.ceil(res.data.totalCount / limit);
    let list = [];
    for (let i = 1; listLength >= i; i += 1) {
      list.push(i);
    }
    console.log(list);
    nowPageLists = list;
  };

  const movePage = i => {
    getList(i);
  };

  onMount(() => {
    getList(1);
    // console.log(nowPageLists);
  });
</script>

<style>
  .user_table_container {
    background-color: #fff;
    box-sizing: border-box;
  }
  .img_box {
    max-width: 40px;
    border-radius: 50%;
    overflow: hidden;
  }
  .img_box img {
    width: 100%;
    height: auto;
    display: block;
  }
  .img_box span {
    display: block;
    width: 40px;
    height: 40px;
    background-color: #ccc;
  }
</style>

<Header />

<div class="main_container">
  <!-- <button on:click={click}>api 테스트</button>
  <button on:click={userClick}>유저 테스트</button> -->
  <Container>
    <div class="user_table_container shadow rounded-lg ">
      <Table hover borderless>
        <thead>
          <tr>
            <th>#</th>
            <th>이메일</th>
            <th>이름</th>
            <!-- <th>아이디</th> -->
            <th>사진</th>
          </tr>
        </thead>
        <tbody>
          {#each items as { email, displayName, uid, photoURL }, i}
            <tr>
              <th scope="row">{i + 1}</th>
              <td>{email}</td>
              <td>{displayName}</td>
              <!-- <td>{uid}</td> -->
              <td>
                <div class="img_box">

                  {#if photoURL === null}
                    <span />
                  {:else}
                    <img src={photoURL} alt="프로필 사진" />
                  {/if}
                </div>
              </td>
            </tr>
          {/each}

        </tbody>
      </Table>
    </div>
    <div class="Pagination_container">
      <Pagination ariaLabel="Page navigation example">
        <PaginationItem disabled>
          <PaginationLink previous href="#" />
        </PaginationItem>
        {#each nowPageLists as nowPageList}
          <PaginationItem>
            <a
              href="."
              class="page-link"
              class:active={nowPageList === offset + 1}
              on:click|preventDefault={() => movePage(nowPageList)}>
              {nowPageList}
            </a>
          </PaginationItem>
        {/each}
        <PaginationItem>
          <PaginationLink next href="#" />
        </PaginationItem>
      </Pagination>
    </div>
  </Container>
</div>
