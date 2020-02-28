<script>
  import { onMount } from "svelte";
  import Header from "../../components/Header.svelte";
  import { test, user } from "../../api";

  import Container from "sveltestrap/src/Container.svelte";
  import Table from "sveltestrap/src/Table.svelte";

  let items = [];
  let offset = 0;
  let limit = 3;
  let nowPageLists = [];
  let nowPageNum = 1;
  let prevActive = false;
  let nextActive = false;

  const Paging = (totalCnt, dataSize, pageSize, pageNo) => {
    let html = [];
    if (totalCnt == 0) {
      return "";
    }

    // 페이지 카운트
    let pageCnt = totalCnt % dataSize;
    if (pageCnt == 0) {
      pageCnt = parseInt(totalCnt / dataSize);
    } else {
      pageCnt = parseInt(totalCnt / dataSize) + 1;
    }

    let pRCnt = parseInt(pageNo / pageSize);
    if (pageNo % pageSize == 0) {
      pRCnt = parseInt(pageNo / pageSize) - 1;
    }

    //이전 화살표
    if (pageNo > pageSize) {
      prevActive = false;
    } else {
      prevActive = true;
    }

    //다음 화살표
    if (pageCnt > (pRCnt + 1) * pageSize) {
      nextActive = false;
    } else {
      nextActive = true;
    }

    for (
      let index = pRCnt * pageSize + 1;
      index < (pRCnt + 1) * pageSize + 1;
      index++
    ) {
      html.push(index);
      if (index == pageCnt) {
        break;
      }
    }
    nowPageLists = html;
  };

  const getList = async v => {
    offset = (v - 1) * limit;
    const res = await user.Get(offset, limit);
    // console.log(res);
    // console.log(offset);
    items = res.data.items;
    Paging(res.data.totalCount, limit, 5, nowPageNum);
  };

  const movePage = i => {
    getList(i);
  };

  const movePrev = () => {
    nowPageNum -= 5;
    getList(nowPageNum);
  };

  const moveNext = () => {
    nowPageNum += 5;
    getList(nowPageNum);
  };

  onMount(() => {
    getList(1);
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
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item" class:disabled={prevActive}>
            <a
              class="page-link"
              href="."
              aria-label="Previous"
              on:click|preventDefault={() => movePrev()}>
              <span aria-hidden="true">
                <i class="fas fa-chevron-left" />
              </span>
            </a>
          </li>
          {#each nowPageLists as nowPageList}
            <li class="page-item">
              <a
                class="page-link"
                href="."
                on:click|preventDefault={() => movePage(nowPageList)}>
                {nowPageList}
              </a>
            </li>
          {/each}
          <li class="page-item" class:disabled={nextActive}>
            <a
              class="page-link"
              href="."
              aria-label="Next"
              on:click|preventDefault={() => moveNext()}>
              <span aria-hidden="true">
                <i class="fas fa-chevron-right" />
              </span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </Container>
</div>
