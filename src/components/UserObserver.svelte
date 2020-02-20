<script>
  import { onMount } from "svelte";
  import { currentUser } from "../store/user";
  import { firebase } from "@firebase/app";

  const userState = async user => {
    try {
      const token = await user.getIdToken();
      const { claims } = await user.getIdTokenResult();
      $currentUser = [token, claims];
      // console.log($currentUser);
    } catch (e) {
      // console.log(e);
    }
  };

  // Client 환경에서 동작하도록 `onMount` 훅에서 실행합니다.
  onMount(() => {
    // 로그인 사용자의 상태 변환(로그인, 로그아웃)에 따라 콜백을 실행합니다.
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        userState(user);
        // 쓰기 가능한 객체이기 때문에 바로 사용자를 할당할 수 있습니다.
      } else {
        // 사용자가 없는 경우 초기화합니다.
        $currentUser = null;
      }
    });
  });
</script>
