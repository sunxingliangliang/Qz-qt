<template>
  <div class="bj">
    <!--数据画像分析-订单名称 -->
    <div :class="$style.f_cjdd">
      <el-row :class="$style.f_row" style="text-align: left;">
        <router-link
          to="/index/fiexpoint.vue/user.vue"
          :class="{'f_fy6':xz,'f_fy7':xz1}"
          @click.native="dj"
        >用户画像</router-link>
        <router-link
          to="/index/fiexpoint.vue/app.vue"
          :class="{'f_fy6':xz2,'f_fy7':xz3}"
          @click.native="dj1"
        >应用分析</router-link>
        <router-link
          to="/index/fiexpoint.vue/caddress.vue"
          :class="{'f_fy6':xz4,'f_fy7':xz5}"
          @click.native="dj2"
        >常住地址</router-link>
        <router-link
          to="/index/fiexpoint.vue/kequn.vue"
          :class="{'f_fy6':xz6,'f_fy7':xz7}"
          @click.native="dj3"
        >客群来源</router-link>
        <router-link
          to="/index/fiexpoint.vue/jiaju.vue"
          :class="{'f_fy6':xz8,'f_fy7':xz9}"
          @click.native="dj4"
        >家居画像</router-link>
        <router-link
          to="/index/fiexpoint.vue/fushi.vue"
          :class="{'f_fy6':xz10,'f_fy7':xz11}"
          @click.native="dj5"
        >服饰画像</router-link>
        <router-link
          to="/index/fiexpoint.vue/canyin.vue"
          :class="{'f_fy6':xz12,'f_fy7':xz13}"
          @click.native="dj6"
        >餐饮画像</router-link>
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
      xz12: true,
      xz13: false,
    }
  },
  methods: {
    dj () {
      this.xz=false,
      this.xz1= true,
      this.xz2= true,
      this.xz3= false,
      this.xz4= true,
      this.xz5= false,
      this.xz6= true,
      this.xz7= false,
      this.xz8= true,
      this.xz9= false,
      this.xz10= true,
      this.xz11= false,
      this.xz12= true,
      this.xz13= false
    },
    dj1 () {
      this.xz=true,
      this.xz1= false,
      this.xz2= false,
      this.xz3= true,
      this.xz4= true,
      this.xz5= false,
      this.xz6= true,
      this.xz7= false,
      this.xz8= true,
      this.xz9= false,
      this.xz10= true,
      this.xz11= false,
      this.xz12= true,
      this.xz13= false
    },
    dj2() {
      this.xz=true,
      this.xz1= false,
      this.xz2= true,
      this.xz3= false,
      this.xz4= false,
      this.xz5= true,
      this.xz6= true,
      this.xz7= false,
      this.xz8= true,
      this.xz9= false,
      this.xz10= true,
      this.xz11= false,
      this.xz12= true,
      this.xz13= false
    },
    dj3 () {
      this.xz=true,
      this.xz1= false,
      this.xz2= true,
      this.xz3= false,
      this.xz4= true,
      this.xz5= false,
      this.xz6= false,
      this.xz7= true,
      this.xz8= true,
      this.xz9= false,
      this.xz10= true,
      this.xz11= false,
      this.xz12= true,
      this.xz13= false
    },
    dj4 () {
      this.xz=true,
      this.xz1= false,
      this.xz2= true,
      this.xz3= false,
      this.xz4= true,
      this.xz5= false,
      this.xz6= true,
      this.xz7= false,
      this.xz8= false,
      this.xz9= true,
      this.xz10= true,
      this.xz11= false,
      this.xz12= true,
      this.xz13= false
    },
    dj5 () {
      this.xz=true,
      this.xz1= false,
      this.xz2= true,
      this.xz3= false,
      this.xz4= true,
      this.xz5= false,
      this.xz6= true,
      this.xz7= false,
      this.xz8= true,
      this.xz9= false,
      this.xz10= false,
      this.xz11= true,
      this.xz12= true,
      this.xz13= false
    },
    dj6 () {
      this.xz=true,
      this.xz1= false,
      this.xz2= true,
      this.xz3= false,
      this.xz4= true,
      this.xz5= false,
      this.xz6= true,
      this.xz7= false,
      this.xz8= true,
      this.xz9= false,
      this.xz10= true,
      this.xz11= false,
      this.xz12= false,
      this.xz13= true
    },
  }
}
</script>

<style  lang='scss' module>
.f_cjdd {
  margin-top: 35px;
  background: #fff;
  .f_hx1 {
    width: 30%;
    border: 1px solid #e6e9f0;
    display: inline-block;
    margin-top: 20px;
    margin-right: 2%;
    margin-bottom: 30px;
    height: 330px;
    .f_mc {
      float: left;
      padding-top: 10px;
      padding-left: 10px;
      font-size: 15px;
      color: #1f2e4d;
      letter-spacing: 0;
    }
    .f_bgnr {
      padding-top: 39px;
      padding-left: 34px;
      padding-right: 34px;
      padding-bottom: 20px;
    }
    .f_db {
      background: #f7f9fc;
      height: 60px;
      line-height: 60px;
      span {
        font-size: 15px;
        color: #1f2e4d;
        letter-spacing: 0;
        text-align: center;
      }
      .f_z {
        float: left;
        padding-left: 2%;
      }
      .f_y {
        float: right;
        padding-right: 7%;
      }
    }
  }
  .f_hx2 {
    border: 1px solid #e6e9f0;
    display: block;
    margin-top: 20px;
    margin-right: 2%;
    margin-left: 2%;
    margin-bottom: 30px;
    height: 330px;
    .f_mc {
      float: left;
      padding-top: 10px;
      padding-left: 10px;
      font-size: 15px;
      color: #1f2e4d;
      letter-spacing: 0;
    }
    .f_bgnr {
      padding-top: 39px;
      padding-left: 34px;
      padding-right: 34px;
      padding-bottom: 20px;
    }
    .f_db {
      background: #f7f9fc;
      height: 60px;
      line-height: 60px;
      span {
        font-size: 15px;
        color: #1f2e4d;
        letter-spacing: 0;
        text-align: center;
      }
      .f_z {
        float: left;
        padding-left: 2%;
      }
      .f_y {
        float: right;
        padding-right: 7%;
      }
    }
  }
  .f_hx3 {
    width: 44%;
    border: 1px solid #e6e9f0;
    display: block;
    margin-top: 10px;
    margin-right: 1%;
    margin-bottom: 30px;
    height: 330px;
    display: inline-block;
    .f_mc {
      float: left;
      padding-top: 10px;
      padding-left: 10px;
      font-size: 15px;
      color: #1f2e4d;
      letter-spacing: 0;
    }
    .f_bgnr {
      padding-top: 39px;
      padding-left: 34px;
      padding-right: 34px;
      padding-bottom: 20px;
    }
    .f_db {
      background: #f7f9fc;
      height: 60px;
      line-height: 60px;
      span {
        font-size: 15px;
        color: #1f2e4d;
        letter-spacing: 0;
        text-align: center;
      }
      .f_z {
        float: left;
        padding-left: 2%;
      }
      .f_y {
        float: right;
        padding-right: 7%;
      }
    }
  }
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
.map {
  display: inline-block;
  width: 50%;
  height: 300px;
}
.f_row1 {
  margin: 20px;
  border-bottom: 1px solid #edf1f9;

  .f_xb {
    float: left;
    font-size: 14px;
    color: #3b4859;
    letter-spacing: 0;
    text-align: center;
    line-height: 41px;
    margin: 0;
  }
  .f_dx {
    float: left;
    margin-left: 20px;
    line-height: 41px;
  }
}
.f_btn {
  display: inline-block;
  height: 36px;
  background: #d9b4fa;
  border: 1px solid #9013fe;
  color: #5800a0;
  border-radius: 4px;
  margin-right: 10px;
  text-align: center;
  font-size: 14px;
  letter-spacing: 0;
  cursor: pointer;
}
.f_btn:hover {
  background: #9013fe;
  color: #fff;
  border: 1px solid #9013fe;
}
</style>
