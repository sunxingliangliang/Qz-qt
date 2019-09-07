<template>
  <div class="bj">
    <el-row :gutter="12">
      <el-col :span="7" :class="$style.f_s">
        <el-card shadow="always" :class="$style.f_kp">
          <p :class="$style.f_p">全部任务</p>
          <p :class="$style.f_num">{{allnum}}</p>
          <el-progress :percentage="percentageallnum" :class="$style.f_jd" :format="format"></el-progress>
        </el-card>
      </el-col>
      <el-col :span="7" :class="$style.f_s6">
        <el-card shadow="always" :class="$style.f_kp">
          <p :class="$style.f_p">进行中</p>
          <p :class="$style.f_num1">{{getonnum}}</p>
          <el-progress :percentage="percentagenum" class="f_jd1" :format="format"></el-progress>
        </el-card>
      </el-col>
      <el-col :span="7" :class="$style.f_s6">
        <el-card shadow="always" :class="$style.f_kp">
          <p :class="$style.f_p">已结束</p>
          <p :class="$style.f_num4">{{endnum}}</p>
          <el-progress :percentage="percentageendnum" class="f_jd4" :format="format"></el-progress>
        </el-card>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <div :class="$style.f_table">
      <div :class="$style.f_row" style="padding-top:39px;">
        <div :span="1" style="margin-top: 5px;" :class="{'f_fy':xz,'f_fy1':xz1}" @click="qb">全部</div>
        <div :span="1" style="margin-top: 5px;" :class="{'f_fy':xz2,'f_fy1':xz3}" @click="ywc">领取</div>
        <div :span="1" style="margin-top: 5px;" :class="{'f_fy':xz4,'f_fy1':xz5}" @click="wwc">已领取</div>
      </div>
      <!-- 全部 -->
      <div v-show="xz1===true" class="infinite-list-wrapper">
        <ul
          class="list"
          v-infinite-scroll="load"
          infinite-scroll-disabled="disabled"
          style="padding:0px;"
        >
          <li v-for="(item,i) in list" :key="i" :class="$style.f_list">
            <div :class="$style.f_ysj" v-if="item.status===1">
              <div :class="$style.f_yjxz">进行中</div>
            </div>
            <div :class="$style.f_ysj" v-if="item.status===2">
              <div :class="$style.f_yyjs">已结束</div>
            </div>
            <div :class="$style.f_top">
              <div :class="$style.f_wz">{{item.name}}</div>
              <div :class="$style.f_wz">{{item.code}}</div>
            </div>
            <img
              src="../../assets/img/WX20190708-093540.png"
              style="min-width: 100%;position: relative;"
              alt
            >
            <div :class="$style.f_content">
              <div>{{item.from_date}}至{{item.to_date}}</div>
              <el-progress
                :percentage="currentprogress"
                class="f_jd4"
                :class="$style.f_jd4"
                :format="format"
              ></el-progress>
              <span :class="$style.f_sz">当前进度{{item.progress}}%</span>
              <span :class="$style.f_sy">{{item.data_num}}/{{item.amount_count}}</span>
            </div>
            <div style="margin-top:20px">
              <div style="display: inline-block; margin-right: 4px; width: 30%;">{{item.price}}</div>
              <div
                style="display: inline-block; margin-right: 4px; width: 30%;"
              >{{item.bonus_count}}</div>
            </div>
            <div style="margin-bottom:10px">
              <div style="display: inline-block; margin-right: 4px; width: 30%;">单条奖励</div>
              <div style="display: inline-block; margin-right: 4px; width: 30%;">全部奖励</div>
            </div>
            <el-button
              type="primary"
              style="width:100%"
              @click="receive(item)"
              v-if="item.isreceive===1"
              :class="$style.f_btn1"
            >领取</el-button>
            <el-button
              type="primary"
              style="width:100%"
              @click="received(item)"
              v-if="item.isreceive===0"
              :class="$style.f_btn2"
            >已领取</el-button>
            <el-button type="info" disabled style="width:100%" v-if="item.status===2">领取</el-button>
          </li>
        </ul>
        <p :class="$style.f_jz1" v-if="loading">加载中...</p>
        <p :class="$style.f_jz" v-if="noMore">没有更多了</p>
      </div>
      <!-- 领取 -->
      <div v-show="xz3===true" class="infinite-list-wrapper">
        <ul
          class="list"
          v-infinite-scroll="load1"
          infinite-scroll-disabled="disabled"
          style="padding:0px;"
        >
          <li v-for="(item,i) in list" :key="i" :class="$style.f_list">
            <div :class="$style.f_ysj" v-if="item.status===1">
              <div :class="$style.f_yjxz">进行中</div>
            </div>
            <div :class="$style.f_ysj" v-if="item.status===2">
              <div :class="$style.f_yyjs">已结束</div>
            </div>
            <div :class="$style.f_top">
              <div :class="$style.f_wz">{{item.name}}</div>
              <div :class="$style.f_wz">{{item.code}}</div>
            </div>
            <img
              src="../../assets/img/WX20190708-093540.png"
              style="min-width: 100%;position: relative;"
              alt
            >
            <div :class="$style.f_content">
              <div>{{item.from_date}}至{{item.to_date}}</div>
              <el-progress
                :percentage="currentprogress"
                class="f_jd4"
                :class="$style.f_jd4"
                :format="format"
              ></el-progress>
              <span :class="$style.f_sz">当前进度{{item.progress}}%</span>
              <span :class="$style.f_sy">{{item.data_num}}/{{item.amount_count}}</span>
            </div>
            <div style="margin-top:20px">
              <div style="display: inline-block; margin-right: 4px; width: 30%;">{{item.price}}</div>
              <div
                style="display: inline-block; margin-right: 4px; width: 30%;"
              >{{item.bonus_count}}</div>
            </div>
            <div style="margin-bottom:10px">
              <div style="display: inline-block; margin-right: 4px; width: 30%;">单条奖励</div>
              <div style="display: inline-block; margin-right: 4px; width: 30%;">全部奖励</div>
            </div>
            <el-button
              type="primary"
              style="width:100%"
              @click="receive"
              v-if="item.isreceive===1"
              :class="$style.f_btn1"
            >领取</el-button>
            <el-button
              type="primary"
              style="width:100%"
              @click="received"
              v-if="item.isreceive===0"
              :class="$style.f_btn2"
            >已领取</el-button>
            <!-- <el-button type="info" disabled style="width:100%">领取</el-button> -->
          </li>
        </ul>
        <p :class="$style.f_jz1" v-if="loading">加载中...</p>
        <p :class="$style.f_jz" v-if="noMore">没有更多了</p>
      </div>
      <!-- 未领取 -->
      <div v-show="xz5===true" class="infinite-list-wrapper">
        <ul
          class="list"
          v-infinite-scroll="load2"
          infinite-scroll-disabled="disabled"
          style="padding:0px;"
        >
          <li v-for="(item,i) in list" :key="i" :class="$style.f_list">
            <div :class="$style.f_ysj" v-if="item.status===1">
              <div :class="$style.f_yjxz">进行中</div>
            </div>
            <div :class="$style.f_ysj" v-if="item.status===2">
              <div :class="$style.f_yyjs">已结束</div>
            </div>
            <div :class="$style.f_top">
              <div :class="$style.f_wz">{{item.name}}</div>
              <div :class="$style.f_wz">{{item.code}}</div>
            </div>
            <img
              src="../../assets/img/WX20190708-093540.png"
              style="min-width: 100%;position: relative;"
              alt
            >
            <div :class="$style.f_content">
              <div>{{item.from_date}}至{{item.to_date}}</div>
              <el-progress
                :percentage="currentprogress"
                class="f_jd4"
                :class="$style.f_jd4"
                :format="format"
              ></el-progress>
              <span :class="$style.f_sz">当前进度{{item.progress}}%</span>
              <span :class="$style.f_sy">{{item.data_num}}/{{item.amount_count}}</span>
            </div>
            <div style="margin-top:20px">
              <div style="display: inline-block; margin-right: 4px; width: 30%;">{{item.price}}</div>
              <div
                style="display: inline-block; margin-right: 4px; width: 30%;"
              >{{item.bonus_count}}</div>
            </div>
            <div style="margin-bottom:10px">
              <div style="display: inline-block; margin-right: 4px; width: 30%;">单条奖励</div>
              <div style="display: inline-block; margin-right: 4px; width: 30%;">全部奖励</div>
            </div>
            <el-button
              type="primary"
              style="width:100%"
              @click="receive"
              v-if="item.isreceive===1"
              :class="$style.f_btn1"
            >领取</el-button>
            <el-button
              type="primary"
              style="width:100%"
              @click="received"
              v-if="item.isreceive===0"
              :class="$style.f_btn2"
            >已领取</el-button>
            <!-- <el-button type="info" disabled style="width:100%">领取</el-button> -->
          </li>
        </ul>
        <p :class="$style.f_jz1" v-if="loading">加载中...</p>
        <p :class="$style.f_jz" v-if="noMore">没有更多了</p>
      </div>
    </div>
    <div :class="$style.f_jz">
      <footerl/>
    </div>
  </div>
</template>

<script>
import footerl from '../footer/footerl'
import vueWaterfallEasy from 'vue-waterfall-easy'
export default {
  components: {
    footerl,
    vueWaterfallEasy
  },
  data () {
    return {
      date1: '',
      qdjd: "当前进度90%",
      jdxs: '100/2000',
      loading: false,
      allnum: null,
      getonnum: null,
      endnum: null,
      num2: 500,
      num3: 500,
      percentageallnum: 100,
      percentagenum: 0,
      percentageendnum: 0,
      input: '',
      value1: '',
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
      tableData: [],
      tableData1: [],
      currentPage4: 1,
      sjxq1: false,
      value3: [],
      value2: [],
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      age: '',
      nl: '',
      zy: '',
      gzdd: '',
      pt: '',
      ikon: false,
      input1: '',
      jzdd: '',
      ysjl: 1000,
      moeny: '1000VKT',
      textarea2: '',
      dgdata: false,
      dgmoney: null,
      btname: '领取回购任务',
      btmatter: '数据回购任务',
      imgsArr: [],
      pullDownDistance: 0,
      zs: 0,
      count: 0,
      list: [],
      currentprogress: 0,
    }
  },
  created () {
    this.getList();
    this.getCount()
  },
  computed: {
    noMore () {
      return this.count >= this.zs
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  methods: {
    getCount () {
      this.$http.get(`pc/platform/countPlatform`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.allnum = data.ALL_NUM
          this.getonnum = data.ACTIVE_NUM
          this.endnum = data.FINISH_NUM
          if (this.getonnum / this.percentageallnum === 0) {
            this.percentagenum = 0
          } else if (this.getonnum === this.allnum) {
            this.percentagenum = 100
          } else {
            this.percentagenum = (this.getonnum / this.percentageallnum) * 100
          }
          if (this.endnum / this.percentageallnum === 0) {
            this.percentageendnum = 0
          } else if (this.endnum === this.allnum) {
            this.percentageendnum = 100
          } else {
            this.percentageendnum = (this.endnum / this.percentageallnum) * 100
          }
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    getList () {
      this.$http.get('pc/platform/merchantPlatfrom').then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.zs = data.total
        }
      })
    },
    load () {
      this.loading = true
      setTimeout(() => {
        this.count += 6
        this.$http.get('pc/platform/merchantPlatfrom').then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.list = data.content
            this.list.forEach(item => {
              if (item.data_num / item.amount_count === 0) {
                item.progress = 0
              } else if (item.data_num / item.amount_count === 1) {
                item.progress = 1
              } else {
                item.progress = (item.data_num / item.amount_count) * 100
              }
            })
            // this.zs=data.total
          }
        })
        this.loading = false
      }, 100)
    },
    load1 () {
      this.loading = true
      setTimeout(() => {
        this.count += 6
        this.$http.get('pc/platform/merchantPlatfrom',{params:{
          status:1
        }}).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.list = data.content
            this.list.forEach(item => {
              if (item.data_num / item.amount_count === 0) {
                item.progress = 0
              } else if (item.data_num / item.amount_count === 1) {
                item.progress = 1
              } else {
                item.progress = (item.data_num / item.amount_count) * 100
              }
            })
            // this.zs=data.total
          }
        })
        this.loading = false
      }, 100)
    },
    load2 () {
      this.loading = true
      setTimeout(() => {
        this.count += 6
        this.$http.get('pc/platform/merchantPlatfrom',{params:{
          status:2
        }}).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.list = data.content
            this.list.forEach(item => {
              if (item.data_num / item.amount_count === 0) {
                item.progress = 0
              } else if (item.data_num / item.amount_count === 1) {
                item.progress = 1
              } else {
                item.progress = (item.data_num / item.amount_count) * 100
              }
            })
            // this.zs=data.total
          }
        })
        this.loading = false
      }, 100)
    },
    format (percentage) {
      return percentage === 100 ? '' : ``;
    },
    chongzhi () {
      this.input = ''
      this.value1 = ''
    },
    // 全部任务
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
      this.getList();
      this.load()
    },
    // 已完成任务
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
      this.load1()
    },
    // 未完成
    wwc () {
      console.log(1)
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
      this.load2()
    },
    // 订购画像
    dghx () {
      console.log(1)
      this.ikon = true
    },
    // 订购数据
    dgsj () {
      console.log(2)
      this.dgdata = true
    },
    handleSelectionChange (val) {
      console.log(val)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
    },
    handleSizeChange1 (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange1 (val) {
      console.log(`当前页: ${val}`);
    },
    arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
      console.log(1)
    },
    dj () {
      console.log(1)
    },
    receive (item) {
      console.log(item)
      this.$store.commit('myval1', this.btname)
      this.$router.push({ path: '/index/lqrenwu.vue', query: { row: item } })
    },
    received (item) {
      console.log(item)
      this.$store.commit('myval1', this.btmatter)
      this.$router.push('/index/rwhuigou.vue')
    },
    clickFn (event, { index, value }) {
      // event.preventDefault()
      if (event.target.tagName.toLowerCase() == 'img') {
        console.log('img clicked', index, value)
      }
    },
    imgErrorFn (imgItem) {
      console.log('图片加载错误', imgItem)
    },
    changeImgArr () {
      axios.get('/static/mock/data-change.json') // 真实环境中，后端会根据参数group返回新的图片数组，这里我用一个静态json文件模拟
        .then(res => {
          this.imgsArr = res.data
        })
    },
    pullDownMove (pullDownDistance) {
      // console.log('pullDownDistance', pullDownDistance)
      this.pullDownDistance = pullDownDistance
    },
    pullDownEnd (pullDownDistance) {
      console.log('pullDownEnd')
      if (this.pullDownDistance > 50) {
        alert('下拉刷新')
      }
      this.pullDownDistance = 0
    },
  },

}
</script>

<style lang='scss' module>
.f_s6,
.f_s {
  height: 130px;
  margin-top: 41px;
  border-radius: 10px;
  margin-left: 20px;
  .f_kp {
    height: 80px;
    p {
      text-align: left;
    }
    .f_p {
      font-size: 16px;
      color: #3b4859;
      letter-spacing: 0;
      line-height: 24px;
      float: left;
      display: inline-block;
    }
    .f_jd {
      padding-top: 10px;
      // padding-bottom: 10px;
      text-align: left;
    }
    .f_num,
    .f_num1,
    .f_num2,
    .f_num3,
    .f_num4 {
      text-align: left;
      font-size: 18px;
      letter-spacing: 0;
      line-height: 24px;
      float: right;
    }
    .f_num {
      color: #3b7cff;
    }
    .f_num1 {
      color: #77c12b;
    }
    .f_num2 {
      color: #fb745b;
    }
    .f_num3 {
      color: #42e0fc;
    }
    .f_num4 {
      color: #9013fe;
    }
  }
}
.f_s {
  margin-left: 44px;
}
.f_sx {
  margin-top: 36px;
  background-color: #fff;
  text-align: left;
  border-radius: 10px;
  p {
    padding: 30px 0;
    padding-left: 10px;
  }
}
.f_search {
  display: inline-block;
  height: 60px;
  .f_cx {
    font-size: 14px;
    color: #3b4859;
    letter-spacing: 0;
    line-height: 60px;
    padding-left: 20px;
  }
  .f_date {
    margin-left: 20px;
  }
  .f_chaxun {
    background: #d9b4fa;
    border: 1px solid #9013fe;
    border-radius: 4px;
    font-size: 14px;
    color: #5800a0;
    letter-spacing: 0;
  }
  .f_chaxun:hover {
    background: #9013fe;
    color: #fff;
    border: 1px solid #9013fe;
  }
}
.f_table {
  background: #fff;
  box-shadow: 0 2px 4px 0 #eff2f7;
  border-radius: 10px;
  text-align: left;
  overflow: auto;
  position: relative;
  .some-info {
    line-height: 1.6;
    text-align: center;
  }
  p {
    padding: 30px 0;
    padding-left: 10px;
  }
  .f_row {
    padding-left: 20px;
  }

  .f_bgnr {
    padding-top: 39px;
    padding-left: 34px;
    padding-right: 34px;
  }
  .f_fy {
    float: right;
  }
}
.f_jz {
  margin-top: 20px;
  text-align: center;
}
.f_ycsj {
  cursor: pointer;
}
.f_tit {
  text-align: left;
}
.f_sjbg {
  margin-top: 20px;
}
.f_jb,
.f_sjxx {
  width: 100%;
  font-size: 16px;
  color: #1f2e4d;
  line-height: 14px;
  text-align: left;
  padding-bottom: 20px;
  border-bottom: 1px solid #e6e9f0;
}
.f_sjxx {
  margin-top: 30px;
}
.f_hxrow {
  margin-top: 20px;
  text-align: left;
  .f_ddname {
    font-size: 14px;
    color: #3d4966;
    line-height: 14px;
  }
  .f_hxinpt {
    width: calc(100% - 60%);
  }
  .f_hxinpt1 {
    width: calc(100% - 20%);
    padding-left: 1%;
  }
}

.f_chaxun {
  background: #d9b4fa;
  border: 1px solid #9013fe;
  border-radius: 4px;
  font-size: 14px;
  color: #5800a0;
  letter-spacing: 0;
}
.f_chaxun:hover {
  background: #9013fe;
  color: #fff;
  border: 1px solid #9013fe;
}
.f_inpt {
  width: calc(100% - 66%);
}
.f_btn {
  text-align: right;
  display: inline-block;
  width: 80px;
  height: 36px;
  line-height: 36px;
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
.f_s5 {
  margin-right: 10px;
  width: calc(100% - 76%);
}
.f_point {
  cursor: pointer;
  color: #3b7cff;
}
.f_z {
  font-size: 12px;
  color: #3b4859;
  letter-spacing: 0;
  line-height: 24px;
  float: left;
}
.f_y,
.f_y1,
.f_y2 {
  font-size: 12px;

  letter-spacing: 0;
  line-height: 24px;
  float: right;
}
.f_y {
  color: #fb745b;
}
.f_y1 {
  color: #77c12b;
}
.f_y2 {
  color: #9013fe;
}
.f_zd,
.f_zd1,
.f_zd2 {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  margin-right: -21%;
}
.f_zd {
  background: #fb745b;
}
.f_zd1 {
  background: #77c12b;
}
.f_zd2 {
  background: #9013fe;
}
.f_zx {
  font-size: 11px;
  color: #8a99ad;
  letter-spacing: 0;
  line-height: 24px;
  float: left;
}
.f_list {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  width: 358px;
  display: inline-block;
  text-align: center;
  margin-left: 30px;
  border: 1px solid #e6e9f0;
  height: 497px;
  margin-top: 10px;
  .f_ysj {
    position: absolute;
    right: 0;
    width: 90px;
    height: 90px;
    background: #fff;
    overflow: hidden;
    .f_yjxz {
      background: #77c12b;
      height: 40px;
      width: 175px;
      line-height: 40px;
      color: #fff;
      transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      -moz-transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
      -o-transform: rotate(45deg);
      position: absolute;
      right: -64px;
      top: 17px;
      z-index: 2;
    }
    .f_yyjs {
      background: #9013fe;
      height: 40px;
      width: 175px;
      line-height: 40px;
      color: #fff;
      transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      -moz-transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
      -o-transform: rotate(45deg);
      position: absolute;
      right: -64px;
      top: 17px;
      z-index: 2;
    }
  }
}
.f_top {
  text-align: left;
  margin-left: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
  .f_wz {
    font-size: 14px;
    color: #3b4859;
    letter-spacing: 0;
    line-height: 20px;
  }
}
.f_content {
  text-align: center;
  margin: 0 20px;
  margin-top: 20px;
  height: 70px;
  .f_sz {
    float: left;
    padding-left: 20px;
  }
  .f_sy {
    float: right;
    padding-right: 30px;
    font-size: 12px;
    color: #909399;
  }
  .f_jd4 {
    text-align: center;
  }
}
.f_btn1 {
  text-align: right;
  display: inline-block;
  width: 80px;
  height: 36px;
  color: #fff;
  background: #9013fe;
  border: 1px solid #9013fe;
  border-radius: 0px;
  margin-right: 10px;
  text-align: center;
  font-size: 14px;
  letter-spacing: 0;
  cursor: pointer;
}
.f_btn1:hover {
  background: #7408d3b6;
  color: #fff;
  border: 1px solid #9013fe;
}
.f_btn2 {
  text-align: right;
  display: inline-block;
  width: 80px;
  height: 36px;
  color: #9013fe;
  background: #fff;
  border: 1px solid #9013fe;
  border-radius: 0px;
  margin-right: 10px;
  text-align: center;
  font-size: 14px;
  letter-spacing: 0;
  cursor: pointer;
}
.f_btn2:hover {
  background: #7408d3b6;
  color: #fff;
  border: 1px solid #9013fe;
}
.f_jz1 {
  text-align: center;
}
</style>
