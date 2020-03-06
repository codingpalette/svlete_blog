<script>
  import { goto } from "@sapper/app";
  import { onMount, onDestroy } from "svelte";
  import { fly } from "svelte/transition";
  import { firebase } from "@firebase/app";
  import { currentUser, isLoadComplete } from "../store/user";

  let active = false;

  const postWriteClick = () => {
    active = false;
    goto("/post_write");
  };
  const adminClick = () => {
    active = false;
    goto("/admin");
  };

  // console.log($currentUser);

  const btnClick = () => (active = !active);
</script>

<style>
  .logged_in_btn_container {
    position: fixed;
    right: 10px;
    bottom: 60px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    z-index: 600;
  }

  .logged_in_btn_container ul {
    text-align: right;
  }

  .logged_in_btn_container ul li + li {
    margin-top: 0.5rem;
  }

  .logged_in_btn_container ul li a {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  /* .logged_in_btn_container ul li a, */
  .logged_in_btn_container ul li a span {
    font-size: 1rem;
    font-weight: bold;
    margin-right: 0.5rem;
  }
  .logged_in_btn_container ul li button {
    background-color: #ff7545;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    color: #fff;
    font-size: 1.2rem;
  }

  .toggle_btn {
    background-color: #ffa420;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    outline: none;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s;
    margin-top: 1rem;
  }
  .toggle_btn.active {
    transform: rotate(45deg);
  }

  @media (min-width: 768px) {
    .logged_in_btn_container {
      bottom: 10px;
    }
  }
</style>

{#if $currentUser}
  <div class="logged_in_btn_container">
    {#if active}
      <ul in:fly={{ y: 10, duration: 500 }} out:fly={{ y: 10, duration: 500 }}>
        <!-- <ul > -->
        {#if $currentUser && $currentUser.claims.level === 0}
          <li>
            <a href="/admin" on:click|preventDefault={adminClick}>
              <span>관리자</span>
              <button class="shadow-sm">
                <i class="fas fa-user-cog fa-lg" />
              </button>
            </a>
          </li>
          <li>
            <a href="/post_write" on:click|preventDefault={postWriteClick}>
              <span>포스트 작성</span>
              <button class="shadow-sm">
                <i class="fas fa-clone fa-lg" />
              </button>
            </a>
          </li>
        {/if}
      </ul>
    {/if}
    <button class:active class="toggle_btn" on:click={btnClick}>
      <i class="fas fa-plus fa-2x" />
    </button>
  </div>
{/if}
