<script>
  import { goto } from "@sapper/app";
  import { currentUser } from "../store/user";

  import FormBox from "../components/auth/FormBox.svelte";
  import LinkBox from "../components/auth/LinkBox.svelte";

  if ($currentUser) goto("/");
  const MyUrl = "signup";
  const Link = "login";
</script>

<style>
  .auth_container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    box-sizing: border-box;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .auth_content {
    border-radius: 4px;
    background-color: #fff;
    width: 100%;
    max-width: 350px;
    margin: auto;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1),
      0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.14);
    padding: 30px 15px 15px;
    box-sizing: border-box;
  }
</style>

<svelte:head>
  <title>회원가입</title>
</svelte:head>

{#if !$currentUser}
  <div class="auth_container">
    <div class="auth_content">
      <FormBox {MyUrl} />
      <LinkBox {Link} />

    </div>
  </div>
{/if}
