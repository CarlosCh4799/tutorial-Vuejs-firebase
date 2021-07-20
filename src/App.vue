<template>
  <div id="nav">
    <header class="head">
      <div class="divimgv">
        <img class="vueimg" src="./assets/logo.png">
      </div>
    </header>
  </div>
  <router-view/>
</template>

<style lang="scss">
  @import './scss/index.scss';
</style>

<style scoped>
.head{
  background-color: rgb(41, 130, 189);
}
.vueimg{
  width: 48px;
}
.divimgv{
  padding: 4px 0 0 28px;
}

</style>
