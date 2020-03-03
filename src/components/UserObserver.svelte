<script>
  import { onMount } from "svelte";
  import { firebase } from "@firebase/app";
  import { currentUser, isLoadComplete } from "../store/user";

  const userState = async user => {
    try {
      const token = await user.getIdToken();
      const { claims } = await user.getIdTokenResult();
      const { photoURL, email } = user;
      $currentUser = { token, claims, photoURL, email };
      $isLoadComplete = true;
      // console.log($currentUser);
      // console.log(token);
      const { user_id, level } = $currentUser.claims;
      localStorage.setItem(
        "__palette_user__",
        JSON.stringify({ user_id, level, token })
      );
    } catch (e) {
      // console.log(e);
    }
  };

  // Client 환경에서 동작하도록 `onMount` 훅에서 실행합니다.
  onMount(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        userState(user);
      } else {
        $currentUser = null;
        $isLoadComplete = true;
        localStorage.removeItem("__palette_user__");
      }
    });
  });
</script>
