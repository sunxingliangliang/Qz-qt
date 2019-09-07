<template>
  <div :class="$style.f_bj">
    <!--创建订单 -->
    <div :class="$style.f_cjdd">
      <div v-for="(item,i) in content" :key="i" style="margin-right: 3%;    display: inline-block;">
        <div :class="$style.f_hx1">
          <div @click="h1(item)">
            <div>
              <img
                src="../../assets/img/WX20190708-093540.png"
                style="width:100%; max-width: 100%;max-height: 100%;"
                alt
              >
            </div>
            <div style="height:60px;">
              <p
                :class="$style.f_mc"
                style="width:60%;text-align: left; display: inline-block;"
              >{{item.name}}</p>
              <div v-if="item.status===1" style="float:right;">
                <i class="iconfont iconshenpi2"></i>
                <br>
                <div style="font-size:14px;color: #8998ac;margin-right: 10px;">审批</div>
              </div>
              <div v-if="item.status===2" style="float:right; ">
                <i class="iconfont iconjinhangzhong" style="font-size:25px;"></i>
                <br>
                <div style="font-size:14px;color: #8998ac;margin-right: 10px;">分析</div>
              </div>
              <div v-if="item.status===3" style="float:right;">
                <i class="iconfont iconic_detail_telx" style="font-size:25px;"></i>
                <br>
                <div style="font-size:14px;color: #8998ac;margin-right: 10px;">驳回</div>
              </div>
              <div v-if="item.status===4" style="float:right;">
                <i class="iconfont iconguoqi1" style="font-size:25px;"></i>
                <br>
                <div style="font-size:14px;color: #8998ac;margin-right: 10px;">取消</div>
              </div>
              <div v-if="item.status===5" style="float:right; ">
                <i class="iconfont iconjinhangzhong" style="font-size:25px;"></i>
                <br>
                <div style="font-size:14px;color: #8998ac;margin-right: 10px;">分析</div>
              </div>
              <div v-if="item.status===6" style="float:right;">
                <i class="iconfont iconquerenyuanzhengqueduigoutijiaochenggongwancheng" style="font-size:25px;"></i>
                <br>
                <div style="font-size:14px;color: #8998ac;margin-right: 10px;">完成</div>
              </div>
            </div>
          </div>
          <div :class="$style.f_db">
            <i class="iconfont iconchakan" style="float:left;padding-left:5%;font-size:24px;"></i>
            <span :class="$style.f_z" @click="ddxq1(item,i)">{{dd}}</span>
            <span :class="$style.f_y">{{item.createTime}}</span>
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <div style="text-align: right;margin-top:20px;padding-bottom: 20px;padding-right:10px;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[6, 12, 18, 24]"
          :page-size="6"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <div :class="$style.f_footer">
      <footerl/>
    </div>
  </div>
</template>

<script>
import footerl from '../footer/footerl'
export default {
  components: {
    footerl
  },
  data () {
    return {
      content: [],
      dd: '画像订单',
      date: '2017-2-1',
      btname: '数据画像分析-订单名称',
      btndd: '数据画像订单',
      currentPage4: 1,
      total: null,
      id: '',
      sizes: 6,
    }
  },
  mounted () {
    this.getList();
  },
  methods: {
    getList () {
      this.$http.get(`pc/OrderPersona`,{params:{
        size:
      }}).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          this.content = data.content
          this.total = data.total
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      });
    },
    h1 (item) {
      // this.$http.get(`modules/persona/dataView?orderId=${item.id}&type=basic`).then(res => {
      //   var { code, data } = res.data
      //   if (code === 1000) {
      //     // console.log(data)
      //     this.id = item.id 
      //     window.sessionStorage.setItem('id',JSON.stringify(this.id))
      //     this.$store.commit('myval1', this.btname)
      //     this.$router.push({path:'/index/ikonpoint.vue/userikon.vue',income:data.income})
      //   }
      // }).catch((err) => {
      //   console.log('错误信息' + err)
      // })
      this.id = item.id
      this.$store.commit('myval1', this.btname)
      this.$store.commit('myid', this.id)
      this.$router.push({ path: '/index/ikonpoint.vue/userikon.vue' })
    },
    h2 () {
      console.log(6)
    },
    h3 () {
      console.log(6)
    },
    h4 () {
      console.log(6)
    },
    h5 () {
      console.log(6)
    },
    h6 () {
      console.log(6)
    },
    ddxq1 (item) {
      let id = item.id
      let createTime = item.createTime
      // console.log(createTime)
      this.$http.get(`modules/order/detail/${id}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          this.$store.commit('myval1', this.btndd)
          this.$router.push({ path: '/index/dataikonpoint.vue', query: { row: data, time: createTime } })
        }
      }).catch(function (err) {
        console.log('错误信息' + err)
      })

    },
    dj1 () {
      console.log(1)
    },
    dj2 () {
      console.log(1)
    },
    handleSizeChange (val) {
      this.sizes = val
      this.$http.get(`pc/OrderPersona?size=${val}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          this.content = data.content
          this.total = data.total
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      this.$http.get(`pc/OrderPersona?page=${val - 1}&size=${this.sizes}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          this.content = data.content
          this.total = data.total
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
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
  .f_hx1 {
    width: 300px;
    border: 1px solid #e6e9f0;
    display: inline-block;
    margin-top: 20px;
    margin-right: 2%;
    margin-bottom: 30px;
    .f_mc {
      float: left;
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
      height: 30px;
      line-height: 30px;
      span {
        font-size: 15px;
        color: #1f2e4d;
        letter-spacing: 0;
        text-align: center;
      }
      .f_z {
        float: left;
        padding-left: 2%;
        cursor: pointer;
      }
      .f_y {
        float: right;
        padding-right: 2%;
        font-size: 14px;
        color: #8998ac;
        letter-spacing: 0;
        text-align: center;
      }
    }
  }
}
.f_footer {
  position: relative;
  bottom: 0;
}
</style>
