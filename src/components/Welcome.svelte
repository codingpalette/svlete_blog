<style>
  .welcome_container {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 1rem;
    box-sizing: border-box;
  }
  .welcome_container img {
    display: block;
    width: 100%;
    max-width: 500px;
  }
  .welcome_container :global(h1) {
    margin-top: 1rem;
    font-size: 1.5rem;
    font-weight: bold;
  }

  @media (min-width: 768px) {
    .welcome_container {
      height: calc(100vh - 30px);
      padding-left: 250px;
    }
  }
</style>

<div class="welcome_container">
  <img src="image/welcome_cats.svg" alt="welcome_cats" />
  <slot name="title">
    <!-- optional fallback -->
  </slot>
</div>
