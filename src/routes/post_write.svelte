<script context="module">
  // the (optional) preload function takes a
  // `{ path, params, query }` object and turns it into
  // the data we need to render the page
  export function preload(page, session) {
    // the `slug` parameter is available because this file
    // is called [slug].svelte
    const { path, query } = page;
    return { path, query };
    // console.log(query);
  }
</script>

<script>
  export let query;

  import { goto } from "@sapper/app";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { firebase } from "@firebase/app";
  import { items, LastPost, LastScrollY } from "../store/homePost";
  import { currentUser } from "../store/user";

  import Header from "../components/Header.svelte";
  import PostPopup from "../components/post/PostPopup.svelte";

  import Row from "sveltestrap/src/Row.svelte";
  import Col from "sveltestrap/src/Col.svelte";
  import Input from "sveltestrap/src/Input.svelte";
  import Label from "sveltestrap/src/Label.svelte";
  import Container from "sveltestrap/src/Container.svelte";
  import FormGroup from "sveltestrap/src/FormGroup.svelte";

  let tuiEditor;

  // 팝업관련 변수
  let Mode;
  let modalOpen = false;
  let isCardLoading = false;
  let isCardOk = false;
  let isCardError = false;

  let formData = {
    title: "",
    category: "html",
    url: "",
    description: "",
    tags: [],
    content: ""
  };

  onMount(() => {
    const user = JSON.parse(localStorage.getItem("__palette_user__"));
    if (user.level !== 0) {
      goto("/");
    }
  });

  // Object.entries(obj).length === 0 && obj.constructor === Object
  // console.log(query);
  if (Object.entries(query).length === 0) {
    Mode = "create";
  } else {
    Mode = "modify";
  }

  const modalToggle = () => {
    modalOpen = !modalOpen;
    isCardLoading = false;
    isCardOk = false;
    isCardError = false;
  };

  let tag = "";
  const tagSubmit = () => {
    const tagText = tag.trim();
    if (!tagText) return; // 공백이라면 추가하지 않음
    if (formData.tags.includes(tagText)) return; // 이미 존재한다면 추가하지 않음
    formData.tags = [tagText, ...formData.tags];
    tag = "";
  };

  const tagRemove = tag => {
    const newTag = formData.tags.filter(i => i !== tag);
    formData.tags = newTag;
  };

  const submitEvent = async () => {
    // console.log(formData);
    // console.log(quillEditor.root.innerHTML);
    isCardLoading = !isCardLoading;
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    const yyyy = today.getFullYear();

    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }

    let date, createdAt;
    if (Mode === "create") {
      date = yyyy + "-" + mm + "-" + dd;
      createdAt = today;
    } else {
      date = formData.date;
      createdAt = formData.createdAt;
    }

    const modifiedAt = today;
    const { title, category, url, description, tags } = formData;
    const content = tuiEditor.getMarkdown();
    const id = category + "_" + url;

    try {
      // await someFuncThatThrowsAnError();
      await firebase
        .firestore()
        .collection("docs")
        .doc(id)
        .set({ title, category, url, description, tags, createdAt, date, id });

      const cid = id + "/content/last";

      await firebase
        .firestore()
        .collection("docs")
        .doc(cid)
        .set({ createdAt, modifiedAt, content });
      isCardOk = true;
      // const aa = $items.findIndex(i => i.id === id);
      // console.log(aa);
      // console.log($items);

      if ($items.length < 1) {
        const res = await firebase
          .firestore()
          .collection("docs")
          .orderBy("createdAt", "desc")
          .limit(30)
          .get();
        $items = res.docs.map(e => e.data());
        $LastPost = res.docs[res.docs.length - 1];
        $LastScrollY = 0;
        return;
      }

      if (Mode === "create") {
        $items = [
          { title, category, url, description, tags, createdAt, date, id },
          ...$items
        ];
        $LastScrollY = 0;
      } else {
        $items[$items.findIndex(i => i.id === id)] = {
          title,
          category,
          url,
          description,
          tags,
          createdAt,
          date,
          id
        };
      }

      // console.log("isCardOk", isCardOk);
    } catch (e) {
      console.log(e);
      isCardError = true;
    }
  };

  if (Mode === "modify") {
    onMount(async () => {
      const pathname = query.id;
      const metaRead = await firebase
        .firestore()
        .collection("docs")
        .doc(pathname)
        .get();

      const docRead = await firebase
        .firestore()
        .collection("docs")
        .doc(`${pathname}/content/last`)
        .get();
      formData = metaRead.data();
      // console.log(metaRead.data());
      // console.log(docRead.data());
      formData.content = docRead.data().content;
      tuiEditor = new tui.Editor({
        el: document.querySelector("#editorSection"),
        initialEditType: "wysiwyg", // 'markdown'
        previewStyle: "vertical",
        height: "500px",
        initialValue: formData.content
      });
    });
  }

  onMount(() => {
    tuiEditor = new tui.Editor({
      el: document.querySelector("#editorSection"),
      initialEditType: "wysiwyg", // 'markdown'
      previewStyle: "vertical",
      height: "500px",
      initialValue: formData.content
    });
  });
</script>

<style>
  .write_top_container {
    width: 100%;
    height: 50px;
    position: fixed;
    left: 0;
    top: 0;
    background-color: #fff;
    z-index: 600;
  }
  .write_top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
  }

  .write_top h1 {
    font-size: 1.1rem;
    font-weight: bold;
  }

  .write_top .btn {
    color: #000;
    outline: none;
    transition: 0.2s;
  }
  .write_top .btn:hover {
    opacity: 0.75;
  }

  .write_main_container {
    background-color: #fff;
    padding: 50px 0;
    min-height: 100vh;
  }

  .write_main_container .form_box {
    background-color: #fff;
    margin-bottom: 1rem;
  }

  :global(.write_main_container .label) {
    font-size: 0.8rem;
    color: #8992a3;
  }

  .form_category {
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  .form_category:focus {
    outline: none;
  }
  .tag_btn {
    padding: 10px 15px;
    background-color: #edf2f7;
    font-size: 1rem;
    color: #4a5568;
    line-height: 1;
    border-radius: 15px;
    margin-right: 10px;
    margin-top: 10px;
    cursor: pointer;
  }
  .tag_btn:hover {
    opacity: 0.8;
  }

  @media (min-width: 768px) {
    .write_top_container {
      margin-left: 250px;
      width: calc(100% - 250px);
    }

    .write_main_container {
      padding: 70px 0 0 260px;
      background-color: transparent;
    }

    .write_main_container .form_box {
      padding: 15px;
      border-radius: 4px;
      box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1),
        0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.14);
      padding: 30px 15px 15px;
    }
  }
</style>

<Header />

<div class="write_top_container">
  <Container>
    <div class="write_top">
      <a href="/" class="btn">
        <i class="fas fa-times fa-lg" />
      </a>
      <h1>
        {#if Mode === 'create'}포스트 작성{:else}포스트 수정{/if}
      </h1>
      <button class="btn" on:click={modalToggle}>
        <i class="fas fa-check fa-lg" />
      </button>
    </div>
  </Container>
</div>

<div class="write_main_container">
  <Container>
    <div class="form_box">
      <FormGroup>
        <Label for="title" class="label">제목*</Label>
        <Input
          type="text"
          name="title"
          id="title"
          bind:value={formData.title}
          placeholder="제목을 입력해주세요." />
      </FormGroup>
      <FormGroup>
        <Label for="category" class="label">카테고리</Label>
        <select
          type="select"
          name="category"
          id="category"
          class="form_category"
          bind:value={formData.category}>
          <option value="html">html</option>
          <option value="css">css</option>
          <option value="javascript">javascript</option>
        </select>
      </FormGroup>
      <FormGroup>
        <Label for="url" class="label">URL*</Label>
        {#if Mode === 'create'}
          <Input
            type="text"
            name="url"
            id="url"
            bind:value={formData.url}
            placeholder="url을 입력해주세요." />
        {:else}
          <Input
            class="active"
            type="text"
            name="url"
            id="url"
            bind:value={formData.url}
            placeholder="url을 입력해주세요." />
        {/if}
      </FormGroup>
      <FormGroup>
        <Label for="description" class="label">포스트 소개*</Label>
        <Input
          type="textarea"
          name="description"
          id="description"
          rows="3"
          maxlength="150"
          bind:value={formData.description}
          placeholder="포스트를 짧게 작성해주세요." />
      </FormGroup>
      <FormGroup>
        <Label for="tag" class="label">태그</Label>
        <form on:submit|preventDefault={tagSubmit}>
          <Input
            type="text"
            name="tag"
            id="tag"
            bind:value={tag}
            placeholder="태그를 입력해주세요." />
        </form>
        <ul>
          <li>
            {#each formData.tags as tags}
              <button class="tag_btn" on:click={() => tagRemove(tags)}>
                {tags}
              </button>
            {/each}
          </li>
        </ul>
      </FormGroup>
      <div id="editorSection" />
    </div>
  </Container>
</div>

<PostPopup
  {modalOpen}
  {isCardLoading}
  {isCardOk}
  {isCardError}
  {submitEvent}
  {modalToggle}
  {Mode} />
