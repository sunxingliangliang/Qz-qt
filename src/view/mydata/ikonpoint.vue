<template>
  <div :class="$style.f_bj">
    <!--数据画像分析-订单名称 -->
    <div :class="$style.f_cjdd">
      <el-row :class="$style.f_row" style="text-align: left;">
        <!-- <el-col :span="1" :class="{'f_fy2':xz,'f_fy3':xz1}" @click.native="qb">用户画像</el-col>
        <el-col :span="1" :class="{'f_fy2':xz2,'f_fy3':xz3}" @click.native="ywc">应用分析</el-col>
        <el-col :span="1" :class="{'f_fy2':xz4,'f_fy3':xz5}" @click.native="wwc">区域画像</el-col>
        <el-col :span="1" :class="{'f_fy2':xz6,'f_fy3':xz7}" @click.native="zzrw">服饰画像</el-col>
        <el-col :span="1" :class="{'f_fy2':xz8,'f_fy3':xz9}" @click.native="ptrw">酒旅画像</el-col>
        <el-col :span="1" :class="{'f_fy2':xz10,'f_fy3':xz11}" @click.native="dghx">饮食画像</el-col> -->
        <router-link to="/index/ikonpoint.vue/userikon.vue" :class="{'f_fy2':xz,'f_fy3':xz1}" @click.native="qb">用户画像</router-link>
        <router-link to="/index/ikonpoint.vue/appanalysis.vue" :class="{'f_fy2':xz2,'f_fy3':xz3}" @click.native="ywc">应用分析</router-link>
        <router-link to="/index/ikonpoint.vue/regionikon.vue" :class="{'f_fy2':xz4,'f_fy3':xz5}" @click.native="wwc">区域画像</router-link>
        <router-link to="/index/ikonpoint.vue/fineryikon.vue" :class="{'f_fy2':xz6,'f_fy3':xz7}" @click.native="zzrw">服饰画像</router-link>
        <router-link to="/index/ikonpoint.vue/winetourikon.vue" :class="{'f_fy2':xz8,'f_fy3':xz9}" @click.native="ptrw">酒旅画像</router-link>
        <router-link to="/index/ikonpoint.vue/dietikon.vue" :class="{'f_fy2':xz10,'f_fy3':xz11}" @click.native="dghx">饮食画像</router-link>
      </el-row>
      <router-view></router-view>
    </div>
    <div :class="$style.f_jz">
      <footerl/>
    </div>
  </div>
</template>

<script>
import footerl from '../footer/footerl'
export default {
  components: {
    footerl,
  },
  data () {
    return {
      xz: false,
      xz1: true,
      xz2: true,
      xz3: false,
      xz4: true,
      xz5: false,
      xz6: true,
      xz7: false,
      xz8: true,
      xz9: false,
      xz10: true,
      xz11: false,
      btname: '数据画像分析-订单名称',
    }
  },
  mounted () {
  },
  methods: {
    // 用户画像
    qb () {
      this.xz1 = true
      this.xz = false
      this.xz2 = true
      this.xz3 = false
      this.xz4 = true
      this.xz5 = false
      this.xz6 = true
      this.xz7 = false
      this.xz8 = true
      this.xz9 = false
      this.xz10 = true
      this.xz11 = false
    },
    // 应用分析
    ywc () {
      this.xz1 = false
      this.xz = true
      this.xz2 = false
      this.xz3 = true
      this.xz4 = true
      this.xz5 = false
      this.xz6 = true
      this.xz7 = false
      this.xz8 = true
      this.xz9 = false
      this.xz10 = true
      this.xz11 = false
    },
    // 区域画像
    wwc () {
      this.xz1 = false
      this.xz = true
      this.xz2 = true
      this.xz3 = false
      this.xz4 = false
      this.xz5 = true
      this.xz6 = true
      this.xz7 = false
      this.xz8 = true
      this.xz9 = false
      this.xz10 = true
      this.xz11 = false
    },
    // 服饰画像
    zzrw () {
      this.xz1 = false
      this.xz = true
      this.xz2 = true
      this.xz3 = false
      this.xz4 = true
      this.xz5 = false
      this.xz6 = false
      this.xz7 = true
      this.xz8 = true
      this.xz9 = false
      this.xz10 = true
      this.xz11 = false
    },
    // 酒旅画像
    ptrw () {
      this.xz1 = false
      this.xz = true
      this.xz2 = true
      this.xz3 = false
      this.xz4 = true
      this.xz5 = false
      this.xz6 = true
      this.xz7 = false
      this.xz8 = false
      this.xz9 = true
      this.xz10 = true
      this.xz11 = false
    },
    // 饮食画像
    dghx () {
      this.xz1 = false
      this.xz = true
      this.xz2 = true
      this.xz3 = false
      this.xz4 = true
      this.xz5 = false
      this.xz6 = true
      this.xz7 = false
      this.xz8 = true
      this.xz9 = false
      this.xz10 = false
      this.xz11 = true
    },
  }
}
</script>

<style  lang='scss' module>
.f_bj {
  width: 1200px;
  margin: 0 auto;
}
.f_cjdd {
  margin-top: 35px;
  background: #fff;
  .f_bgnr {
    padding-top: 39px;
    padding-left: 34px;
    padding-right: 34px;
  }
  .f_row {
    line-height: 54px;
    padding-top: 38px;
    padding-left: 20px;
  }
}
.f_jz {
  margin-top: 20px;
  text-align: center;
}
</style>
