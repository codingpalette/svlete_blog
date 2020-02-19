<script>
  import { goto } from "@sapper/app";
  import { currentUser } from "../store/user";
  import { firebase } from "@firebase/app";
  import FormGroup from "sveltestrap/src/FormGroup.svelte";
  import Input from "sveltestrap/src/Input.svelte";
  import Button from "sveltestrap/src/Button.svelte";

  if ($currentUser) goto("/");

  const authForm = {
    email: "",
    password: ""
  };
  // console.log(location);

  async function handleSubmit(event) {
    try {
      const res = await firebase
        .auth()
        .signInWithEmailAndPassword(authForm.email, authForm.password);
      console.log(res);
      location.href = "/";
    } catch (e) {
      console.log(e);
    }
  }
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
      <form on:submit|preventDefault={handleSubmit}>
        <FormGroup>
          <Input
            type="email"
            id="email"
            placeholder="이메일"
            bind:value={authForm.email} />
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            id="password"
            placeholder="비밀번호"
            bind:value={authForm.password} />
        </FormGroup>
        <FormGroup>
          <Button color="primary" block type="submit">로그인</Button>
        </FormGroup>
      </form>
    </div>
  </div>
{/if}
