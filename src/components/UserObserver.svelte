<script>
  import { onMount } from "svelte";
  import { firebase } from "@firebase/app";
  import { currentUser } from "../store/user";

  const userState = async user => {
    try {
      const token = await user.getIdToken();
      const { claims } = await user.getIdTokenResult();
      $currentUser = [token, claims];
      // console.log($currentUser);
      if (!localStorage.getItem("__palette_user__")) {
        const { user_id, level } = $currentUser[1];
        localStorage.setItem(
          "__palette_user__",
          JSON.stringify({ user_id, level })
        );
      }
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
        localStorage.removeItem("__palette_user__");
      }
    });
  });
</script>
