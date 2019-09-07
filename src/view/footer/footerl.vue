<template>
  <div>
    <div :class="$style.f_floot">
      <p :class="$style.f_p">Copyright © www.Tsingzhou.com, All Rights Reserved.</p>
      <span :class="$style.f_s">清竹大数据 万加链战略合作平台</span>
      <img :class="$style.f_img" src="../../assets/img/万加链logo.png" alt>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' module>
.f_floot {
  margin-top: 30px;
  .f_p,
  .f_s {
    color: #ccc;
    font-size: 12px;
    vertical-align: top;
  }
  .f_img {
    vertical-align: top;
  }
}
</style>
