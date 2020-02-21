<script>
  import { goto } from "@sapper/app";
  import FormGroup from "sveltestrap/src/FormGroup.svelte";
  import Input from "sveltestrap/src/Input.svelte";
  import Button from "sveltestrap/src/Button.svelte";

  import { firebase } from "@firebase/app";

  export let MyUrl;

  const authForm = {
    email: "",
    password: "",
    password2: ""
  };

  const handleSubmit = async event => {
    try {
      if (authForm.email === "") {
        alert("이메일 주소를 입력해 주세요.");
        return false;
      }
      if (authForm.password.length < 6) {
        alert("비밀번호를 6자리 이상 입력해주세요.");
        return false;
      }
      if (MyUrl === "signup" && authForm.password !== authForm.password2) {
        alert("비밀번호가 서로 맞지 않습니다.");
        return false;
      }
      if (MyUrl === "login") {
        await firebase
          .auth()
          .signInWithEmailAndPassword(authForm.email, authForm.password);
      } else if (MyUrl === "signup") {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(authForm.email, authForm.password);
        await firebase.auth().currentUser.getIdToken();
      }

      // console.log(res);
      goto("/");
    } catch (e) {
      console.log(e);
    }
  };
</script>

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
  {#if MyUrl === 'signup'}
    <FormGroup>
      <Input
        type="password"
        id="password2"
        placeholder="비밀번호 확인"
        bind:value={authForm.password2} />
    </FormGroup>
  {/if}
  <FormGroup>
    <Button color="primary" block type="submit">
      {#if MyUrl === 'login'}로그인{:else}회원가입{/if}
    </Button>
  </FormGroup>
</form>
