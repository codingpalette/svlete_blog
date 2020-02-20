<script>
  import { onMount } from "svelte";

  export let segment;
  import Button from "sveltestrap/src/Button.svelte";
  import Container from "sveltestrap/src/Container.svelte";
  import Row from "sveltestrap/src/Row.svelte";
  import Col from "sveltestrap/src/Col.svelte";
  let innerWidth;

  onMount(() => {
    // console.log(innerWidth); // 실제 innerWidth 값이 출력됨
  });
  const handleScroll = e => {
    // console.log(innerWidth);
  };
</script>

<style>
  header,
  footer {
    background-color: #fff;
    z-index: 1000;
  }

  .modile_header,
  .modile_footer {
    position: fixed;
    left: 0;
    width: 100%;
    height: 50px;
  }
  .modile_header {
    top: 0;
    border-bottom: 1px solid #edf1f7;
  }
  .modile_footer {
    bottom: 0;
    border-top: 1px solid #edf1f7;
  }

  .modile_header .logo {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .modile_header .logo a {
    color: #2a44ec;
    font-weight: bold;
    font-size: 1rem;
  }

  .modile_footer ul {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modile_footer ul li {
    flex: 1;
  }

  .modile_footer ul li a {
    display: flex;
    width: 100%;
    height: 50px;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-around;
    text-align: center;
    padding: 5px;
    box-sizing: border-box;
  }

  .modile_footer ul li a.selected {
    color: #2a44ec;
  }

  .modile_footer ul li a i,
  .modile_footer ul li a span {
    width: 100%;
  }

  .modile_footer ul li a span {
    line-height: 1;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .desk_nav_box {
    display: none;
  }

  @media (min-width: 768px) {
    .modile_header,
    .modile_footer {
      display: none;
    }

    .desk_nav_box {
      display: block;
      position: fixed;
      left: 0;
      top: 0;
      width: 250px;
      background-color: #fff;
      border-right: 1px solid #edf1f7;
      z-index: 1000;
      height: 100%;
      padding: 15px 0;
      box-sizing: border-box;
    }

    .desk_nav_box .logo_box {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .desk_nav_box .logo_box a {
      color: #2a44ec;
      font-weight: bold;
      font-size: 1rem;
    }

    .desk_nav_box nav {
      margin-top: 30px;
    }

    .desk_nav_box nav li a {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      padding: 15px;
      padding-right: 0;
      box-sizing: border-box;
    }

    .desk_nav_box nav li a.selected {
      color: #2a44ec;
    }
    .desk_nav_box nav li a span {
      margin-left: 10px;
      font-size: 1rem;
      font-weight: 600;
      line-height: 1;
    }
  }
</style>

<svelte:window bind:innerWidth on:resize={handleScroll(innerWidth)} />
<div class="header_box">
  <header class="modile_header">
    <Container>
      <Row>
        <Col>
          <h1 class="logo">
            <a class:selected={segment === undefined} href=".">Codingpalette</a>
          </h1>
        </Col>
      </Row>
    </Container>
  </header>
  <footer class="modile_footer">
    <nav>
      <ul>
        <li>
          <a class:selected={segment === undefined} href=".">
            <i class="fas fa-home fa-lg" />
            <span>Home</span>
          </a>
        </li>
        <li>
          <a class:selected={segment === 'about'} href="about">
            <i class="fas fa-address-card fa-lg" />
            <span>About</span>
          </a>
        </li>
        <li>
          <a class:selected={segment === 'blog'} href="blog">
            <i class="fas fa-clone fa-lg" />
            <span>Post</span>
          </a>
        </li>
        <li>
          <a class:selected={segment === 'blog'} href="blog">
            <i class="fas fa-tag fa-lg" />
            <span>Tag</span>
          </a>
        </li>
      </ul>
    </nav>
  </footer>
  <div class="desk_nav_box">
    <h1 class="logo_box">
      <a class:selected={segment === undefined} href=".">Codingpalette</a>
    </h1>
    <nav>
      <ul>
        <li>
          <a class:selected={segment === undefined} href=".">
            <i class="fas fa-home fa-lg" />
            <span>Home</span>
          </a>
        </li>
        <li>
          <a class:selected={segment === 'about'} href="about">
            <i class="fas fa-address-card fa-lg" />
            <span>About</span>
          </a>
        </li>
        <li>
          <a class:selected={segment === 'login'} href="login">
            <i class="fas fa-address-card fa-lg" />
            <span>login</span>
          </a>
        </li>
        <li>
          <a class:selected={segment === 'blog'} href="blog">
            <i class="fas fa-clone fa-lg" />
            <span>Post</span>
          </a>
        </li>
        <li>
          <a class:selected={segment === 'blog'} href="blog">
            <i class="fas fa-tag fa-lg" />
            <span>Tag</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</div>
