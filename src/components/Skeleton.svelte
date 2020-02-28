<style>
  .skeleton_container {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    flex: 0 0 100%;
    max-width: 100%;
  }

  .skeleton_content {
    height: 300px;
    position: relative;
    overflow: hidden;
    background-color: #fff;
    margin-bottom: 1.5rem;
  }

  .title {
    padding: 1.25rem;
  }
  .title .top {
    display: block;
    height: 20px;
  }
  .title .btm {
    display: block;
    height: 11px;
    margin-top: 1rem;
  }

  .body {
    padding: 1.25rem;
  }

  .body .content {
    display: block;
    height: 180px;
  }

  .list {
    background-image: linear-gradient(#f1f3f5 172px, transparent 0),
      linear-gradient(#f1f3f5 16px, transparent 0),
      linear-gradient(#f1f3f5 10px, transparent 0),
      linear-gradient(#f1f3f5 10px, transparent 0),
      linear-gradient(#f1f3f5 28px, transparent 0),
      linear-gradient(#f1f3f5 14px, transparent 0),
      linear-gradient(#f1f3f5 8px, transparent 0),
      linear-gradient(#f1f3f5 14px, transparent 0),
      linear-gradient(#f1f3f5 8px, transparent 0);
  }

  .bar {
    width: 100%;
    position: absolute;
    animation-name: skeleton;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in;
  }

  .indicator {
    width: 0;
    box-shadow: 0 0 75px 75px white;
  }

  .bar,
  .indicator {
    height: 100vh;
  }

  @keyframes skeleton {
    0% {
      transform: translateX(0);
      opacity: 0;
    }

    20% {
      opacity: 0.25;
    }

    50% {
      opacity: 1;
    }

    80% {
      opacity: 0.5;
    }

    100% {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  @media (min-width: 576px) {
    .skeleton_container {
      flex: 0 0 100%;
      max-width: 100%;
    }
  }

  @media (min-width: 768px) {
    .skeleton_container {
      flex: 0 0 100%;
      max-width: 100%;
    }
  }
  @media (min-width: 992px) {
    .skeleton_container {
      flex: 0 0 50%;
      max-width: 50%;
    }
  }
  @media (min-width: 1200px) {
    .skeleton_container {
      flex: 0 0 33.33%;
      max-width: 33.33%;
    }
  }
  @media (min-width: 1500px) {
    .skeleton_container {
      flex: 0 0 25%;
      max-width: 25%;
    }
  }
  @media (min-width: 2000px) {
    .skeleton_container {
      flex: 0 0 20%;
      max-width: 20%;
    }
  }
  @media (min-width: 2500px) {
    .skeleton_container {
      flex: 0 0 16.66%;
      max-width: 16.66%;
    }
  }
  @media (min-width: 3000px) {
    .skeleton_container {
      flex: 0 0 14.28%;
      max-width: 14.28%;
    }
  }
</style>

<div class="skeleton_container">
  <div class="skeleton_content border-0 rounded-lg">
    <div class="bar">
      <div class="indicator" />
    </div>
    <div class="title">
      <span class="top list" />
      <span class="btm list" />
    </div>
    <div class="body">
      <span class="content list" />
    </div>
  </div>
</div>
