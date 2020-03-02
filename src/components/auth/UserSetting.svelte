<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { currentUser } from "../../store/user";
  import { firebase } from "@firebase/app";

  import Button from "sveltestrap/src/Button.svelte";

  let user = false;
  let photoURL = "";
  let isLoading = true;
  let modalActive = false;

  onMount(async () => {
    user = JSON.parse(localStorage.getItem("__palette_user__"));
    await firebase.auth().onAuthStateChanged(data => {
      if (data) {
        photoURL = data.photoURL;
      }
    });
    isLoading = false;
  });
  const UserWrapClick = () => {
    modalActive = !modalActive;
  };
  const logoutClick = async () => {
    try {
      await firebase.auth().signOut();
      modalActive = false;
      user = "";
      goto("/");
    } catch (e) {
      console.log(e);
    }
  };
</script>

<style>
  .user_setting_container {
    position: absolute;
    right: 15px;
    top: 5px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    z-index: 1000;
  }
  .login_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #ffa420;
    color: #fff;
    font-size: 0.8rem;
    transition: 0.2s;
  }
  .login_btn:hover {
    opacity: 0.75;
  }
  .user_wrap {
    display: block;
    width: 100%;
    height: 100%;
  }
  .user_wrap:focus {
    outline: none;
  }
  .user_wrap img {
    display: block;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  .setting_modal_container {
    position: fixed;
    z-index: 1000;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    box-sizing: border-box;
  }
  .setting_modal_container .back {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
  }
  .modal_content {
    background-color: #fff;
    padding: 1rem;
    max-width: 600px;
    width: 100%;
    position: relative;
    z-index: 100;
  }
  .modal_header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  .modal_body {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .modal_body .photo_box {
    max-width: 100px;
    max-height: 100px;
    border-radius: 50%;
    overflow: hidden;
    width: 100%;
    border: 1px solid #fafafa;
    box-sizing: border-box;
  }
  .modal_body .photo_box button {
    display: block;
    width: 100%;
    height: 100%;
  }
  .modal_body .photo_box button:focus {
    outline: none;
  }
  .modal_body .photo_box label {
    margin-bottom: 0;
  }
  .modal_body .photo_box img {
    display: block;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  .modal_body .photo_box input {
    display: none;
  }
  .modal_body .profile_box {
    width: 100%;
    margin-left: 2rem;
  }
  .modal_body .profile_box > div {
    border-bottom: 1px solid rgba(35, 35, 35, 0.1);
    padding: 1rem 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .modal_body .profile_box .title {
    color: #000;
    width: 100%;
    font-weight: bold;
  }
  @media (min-width: 768px) {
    .user_setting_container {
      left: 15px;
      bottom: 15px;
      top: auto;
      transform: translateY(0);
    }

    .modal_content {
      padding: 2rem;
    }
    .modal_body .photo_box {
      max-width: 120px;
      max-height: 120px;
    }
    .modal_body .profile_box .title {
      width: 20%;
    }
  }
</style>

{#if !isLoading}
  <div class="user_setting_container">
    {#if !user}
      <a href="/login" class="login_btn">
        <i class="fas fa-sign-in-alt fa-lg" />
      </a>
    {:else}
      <button class="user_wrap" on:click={UserWrapClick}>
        {#if photoURL && photoURL.length > 1}
          <img src={photoURL} alt="profile_img" />
        {:else}
          <img src="image/not_profile_img.png" alt="not_profile_img" />
        {/if}
      </button>
    {/if}
  </div>
{/if}

{#if modalActive}
  <div class="setting_modal_container">
    <div
      class="modal_content shadow border-0 rounded-lg"
      in:fly={{ y: -50, duration: 1000 }}
      out:fly={{ y: 50, duration: 700 }}>
      <div class="modal_itme">
        <div class="modal_header">
          <h3>Settings</h3>
          <Button color="danger" outline size="sm" on:click={logoutClick}>
            Logout
          </Button>
        </div>
        <ul class="modal_body">
          <li class="photo_box">
            <button>
              <label for="photo">
                {#if photoURL && photoURL.length > 1}
                  <img src={photoURL} alt="profile_img" />
                {:else}
                  <img src="image/not_profile_img.png" alt="not_profile_img" />
                {/if}
                <input id="photo" type="file" />
              </label>
            </button>
          </li>
          <li class="profile_box">
            <div class="name">
              <span class="title">이름</span>
              <span class="content">홍길동</span>
            </div>
            <div class="email">
              <span class="title">이메일</span>
              <span class="content">adff22r@nacv.com</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="back" on:click={UserWrapClick} />
  </div>
{/if}
