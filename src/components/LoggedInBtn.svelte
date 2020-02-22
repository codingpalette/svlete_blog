<script>
  import { goto } from "@sapper/app";
  import { firebase } from "@firebase/app";
  import { currentUser } from "../store/user";

  let active = false;
  async function logoutClick() {
    try {
      await firebase.auth().signOut();
      goto("/");
    } catch (e) {
      console.log(e);
    }
  }

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
    opacity: 0;
    transform: translateY(10px);
    pointer-events: none;
    transition: 0.2s;
    text-align: right;
  }

  .logged_in_btn_container ul.active {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  .logged_in_btn_container ul li a,
  .logged_in_btn_container ul li button {
    display: block;
    outline: none;
    color: inherit;
    padding: 3px 0;
    width: 100%;
    text-align: right;
  }

  .logged_in_btn_container ul li button:hover {
    opacity: 0.75;
  }

  .toggle_btn {
    background-color: #17a2b8;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    border: 0;
    outline: none;
    color: #fff;
    margin: 0;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s;
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

<div class="logged_in_btn_container">
  <ul class:active>
    <li>
      <a href="/">관리자</a>
    </li>
    <li>
      <a href="/post_write">포스트 작성</a>
    </li>
    <li>
      <button on:click={logoutClick}>로그아웃</button>
    </li>
  </ul>
  <button class:active class="toggle_btn" on:click={btnClick}>
    <i class="fas fa-plus fa-2x" />
  </button>
</div>
