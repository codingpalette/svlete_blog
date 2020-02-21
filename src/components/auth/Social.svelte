<script>
  import { goto } from "@sapper/app";
  import { Button } from "sveltestrap";
  import { firebase } from "@firebase/app";

  const googleLogin = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().languageCode = "ko";
      await firebase.auth().signInWithPopup(provider);
      await firebase.auth().currentUser.getIdToken();
      goto("/");
    } catch (e) {
      console.log(e);
    }
  };
</script>

<style>
  .social_container {
    margin-top: 1rem;
  }
</style>

<div class="social_container">
  <Button color="dark" block outline on:click={googleLogin}>구글로그인</Button>
</div>
