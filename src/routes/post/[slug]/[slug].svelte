<script>
  import { onMount } from "svelte";
  import Header from "../../../components/Header.svelte";
  export let segment;

  onMount(async () => {
    import("quill/dist/quill.snow.css");
    const quillMoule = await import("quill/dist/quill.js");
    const Quill = quillMoule.default;
    var quill = new Quill("#editor-container", {
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          ["image", "code-block"]
        ]
      },
      placeholder: "Compose an epic...",
      theme: "snow" // or 'bubble'
    });
  });
  // import { Viewer } from "tui-editor/dist/tui-editor-Viewer";
</script>

<Header {segment} />

<div class="main_container">
  <div id="editor-container" />
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum magni
  numquam expedita, quas eius iste porro neque aperiam. Quam ea rerum sed saepe
  culpa tempora doloremque debitis fugiat dolorum minus. Lorem ipsum dolor sit
  amet, consectetur adipisicing elit. Nostrum magni numquam expedita, quas eius
  iste porro neque aperiam. Quam ea rerum sed saepe culpa tempora doloremque
  debitis fugiat dolorum minus.
</div>
