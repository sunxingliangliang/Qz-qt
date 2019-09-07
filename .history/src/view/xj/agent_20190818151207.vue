<template>
  <div :class="$style.f_fz">
    <div :class="$style.bac">
      <div :class="$style.f_s">
        <el-card shadow="always" :class="$style.f_kp">
          <div :class="$style.f_icon">
            <i class="iconfont icondailishangguanli"></i>
          </div>
          <div :class="$style.f_sjvkt">
            <p :class="$style.numvkt">{{vkt}}</p>
            <p :class="$style.f_sjfw">全部</p>
          </div>
        </el-card>
      </div>
      <div :class="$style.f_s6">
        <el-card shadow="always" :class="$style.f_kp">
          <div :class="$style.f_icon">
            <i class="iconfont iconyunying"></i>
          </div>
          <div :class="$style.f_sjvkt">
            <p :class="$style.numvkt">{{vkt}}</p>
            <p :class="$style.f_sjfw">省级运营中心</p>
          </div>
        </el-card>
      </div>
      <div :class="$style.f_s6">
        <el-card shadow="always" :class="$style.f_kp">
          <div :class="$style.f_icon">
            <i class="iconfont icondaili"></i>
          </div>
          <div :class="$style.f_sjvkt">
            <p :class="$style.numvkt">{{vkt}}</p>
            <p :class="$style.f_sjfw">市级运营中心</p>
          </div>
        </el-card>
      </div>
      <div :class="$style.f_s6">
        <el-card shadow="always" :class="$style.f_kp">
          <div :class="$style.f_icon">
            <i class="iconfont icondaili"></i>
          </div>
          <div :class="$style.f_sjvkt">
            <p :class="$style.numvkt">{{vkt}}</p>
            <p :class="$style.f_sjfw">一般代理</p>
          </div>
        </el-card>
      </div>
    </div>
    <!-- 表格 -->
    <div :class="$style.f_table">
      <p>代理商列表</p>
      <el-row :class="$style.f_row">
        <div :class="{'f_fy4':xz,'f_fy5':xz1}" style="margin-left:15px" @click="qb">全部({{num1}})</div>
        <div :class="{'f_fy4':xz4,'f_fy5':xz5}" @click="sj">省级运营中心</div>
        <div :class="{'f_fy4':xz6,'f_fy5':xz7}" @click="sj1">市级运营中心</div>
        <div :class="{'f_fy4':xz8,'f_fy5':xz9}" @click="yb">一般代理({{num4}})</div>
        <div style="display: inline-block; float:right;">
          <el-input placeholder="请输入搜索内容" v-model="searchcontent" :class="$style.f_inpt" clearable></el-input>
          <el-button plain @click="demand" :class="$style.f_chaxun">查询</el-button>
        </div>
      </el-row>
      <!-- 表格内容 -->
      <!-- 全部任务 -->
      <div v-if="xz1===true">
        <div :class="$style.f_bgnr">
          <el-table :data="tableData" style="width: 100%" border>
            <el-table-column prop="name" align="center" label="代理商名称" sortable></el-table-column>
            <el-table-column prop="province" align="center" label="代理区域" width="120"></el-table-column>
            <el-table-column prop="proxy_type" align="center" label="类型" width="120">
              <template slot-scope="scope">
                <span v-if="scope.row.proxy_type===2">市级运营中心</span>
                <span v-if="scope.row.proxy_type===3">市级一般代理商</span>
              </template>
            </el-table-column>
            <el-table-column prop="deviceNum" align="center" label="终端数量" width="80"></el-table-column>
            <el-table-column prop="dataNum" align="center" label="采集数据量" width="100"></el-table-column>
            <el-table-column prop="orderDataNum" align="center" label="数据订单" width="80"></el-table-column>
            <el-table-column prop="orderPersonaNum" align="center" label="数据画像" width="80"></el-table-column>
            <el-table-column prop="fixedNum" align="center" label="固定画像" width="80"></el-table-column>
            <el-table-column prop="cny_amount" align="center" label="总金额" width="65"></el-table-column>
            <el-table-column prop="date" align="center" label="有效期"></el-table-column>
          </el-table>
        </div>
      </div>
      <!--  省级运营中心 -->
      <div v-if="xz5===true">
        <div :class="$style.f_bgnr">
          <el-table :data="tableData" style="width: 100%" border>
            <el-table-column prop="name" align="center" label="代理商名称" sortable></el-table-column>
            <el-table-column prop="province" align="center" label="代理区域" width="120"></el-table-column>
            <el-table-column prop="proxy_type" align="center" label="类型" width="120">
              <template slot-scope="scope">
                <span v-if="scope.row.proxy_type===2">市级运营中心</span>
                <span v-if="scope.row.proxy_type===3">市级一般代理商</span>
              </template>
            </el-table-column>
            <el-table-column prop="deviceNum" align="center" label="终端数量" width="80"></el-table-column>
            <el-table-column prop="dataNum" align="center" label="采集数据量" width="100"></el-table-column>
            <el-table-column prop="orderDataNum" align="center" label="数据订单" width="80"></el-table-column>
            <el-table-column prop="orderPersonaNum" align="center" label="数据画像" width="80"></el-table-column>
            <el-table-column prop="fixedNum" align="center" label="固定画像" width="80"></el-table-column>
            <el-table-column prop="cny_amount" align="center" label="总金额" width="65"></el-table-column>
            <el-table-column prop="date" align="center" label="有效期"></el-table-column>
          </el-table>
        </div>
      </div>
      <!--  市级运营中心 -->
      <div v-if="xz7===true">
        <div :class="$style.f_bgnr">
          <el-table :data="tableData" style="width: 100%" border>
            <el-table-column prop="name" align="center" label="代理商名称" sortable></el-table-column>
            <el-table-column prop="province" align="center" label="代理区域" width="120"></el-table-column>
            <el-table-column prop="proxy_type" align="center" label="类型" width="120">
              <template slot-scope="scope">
                <span v-if="scope.row.proxy_type===2">市级运营中心</span>
                <span v-if="scope.row.proxy_type===3">市级一般代理商</span>
              </template>
            </el-table-column>
            <el-table-column prop="deviceNum" align="center" label="终端数量" width="80"></el-table-column>
            <el-table-column prop="dataNum" align="center" label="采集数据量" width="100"></el-table-column>
            <el-table-column prop="orderDataNum" align="center" label="数据订单" width="80"></el-table-column>
            <el-table-column prop="orderPersonaNum" align="center" label="数据画像" width="80"></el-table-column>
            <el-table-column prop="fixedNum" align="center" label="固定画像" width="80"></el-table-column>
            <el-table-column prop="cny_amount" align="center" label="总金额" width="65"></el-table-column>
            <el-table-column prop="date" align="center" label="有效期"></el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 一般代理 -->
      <div v-if="xz9===true">
        <div :class="$style.f_bgnr">
          <el-table :data="tableData" style="width: 100%" border>
            <el-table-column prop="name" align="center" label="代理商名称" sortable></el-table-column>
            <el-table-column prop="province" align="center" label="代理区域" width="120"></el-table-column>
            <el-table-column prop="proxy_type" align="center" label="类型" width="120">
              <template slot-scope="scope">
                <span v-if="scope.row.proxy_type===2">市级运营中心</span>
                <span v-if="scope.row.proxy_type===3">市级一般代理商</span>
              </template>
            </el-table-column>
            <el-table-column prop="deviceNum" align="center" label="终端数量" width="80"></el-table-column>
            <el-table-column prop="dataNum" align="center" label="采集数据量" width="100"></el-table-column>
            <el-table-column prop="orderDataNum" align="center" label="数据订单" width="80"></el-table-column>
            <el-table-column prop="orderPersonaNum" align="center" label="数据画像" width="80"></el-table-column>
            <el-table-column prop="fixedNum" align="center" label="固定画像" width="80"></el-table-column>
            <el-table-column prop="cny_amount" align="center" label="总金额" width="65"></el-table-column>
            <el-table-column prop="date" align="center" label="有效期"></el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 分页 -->
      <div style="text-align: right;margin-top:20px;padding-bottom: 20px;padding-right:10px;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
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
    footerl
  },

  data () {
    return {
      num: 2000,
      num1: 500,
      num2: 500,
      num3: 500,
      num4: 500,
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
      array1: [],
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
      vkt: "2000VKT",
      btname: '创建任务',
      btmatter: '任务详情',
      searchcontent: '',
      num4: null,
      total: null,
      sizes: 10,
    }
  },
  mounted () {
    // this.qb()
    this.getCount()
  },
  methods: {
    getCount(){
      this.$http.get(`pc/merchant/followerCount`).then(res=>{
        var {code,data}=res.data
        if(code===1000){
          console.log(data)
        }
      }).catch(err=>{
        console.log('错误信息'+err)
      })
    },
    format (percentage) {
      return percentage === 100 ? '' : ``;
    },
    chongzhi () {
      this.input = ''
      this.value1 = ''
    },
    // 全部
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
      this.$http.get(`pc/merchant/followerList?size=10`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = data.content
          this.total = data.total
          this.tableData.forEach(item => {
            item.date = item.from_date + '至' + item.to_date
          })
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    // 省级运营中心
    sj () {
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
    },
    // 市级运营中心
    sj1 () {
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
      this.$http.get(`pc/merchant/followerList?proxyType=2&size=10`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = data.content
          this.total = data.total
          this.tableData.forEach(item => {
            item.date = item.from_date + '至' + item.to_date
          })
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    // 一般代理
    yb () {
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
      this.$http.get(`pc/merchant/followerList?proxyType=3&size=10`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = data.content
          this.total = data.total
          this.num4 = data.total
          this.tableData.forEach(item => {
            item.date = item.from_date + '至' + item.to_date
          })
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    demand () {
      this.$http.get(`pc/merchant/followerList?keyWord=${this.searchcontent}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = data.content
          this.tableData.forEach(item => {
            item.date = item.from_date + '至' + item.to_date
          })
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
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
    // 创建任务
    cjrw () {
      this.$store.commit('myval1', this.btname)
      this.$router.push('/index/createtask.vue')
    },
    handleSizeChange (val) {
      this.sizes = val;
      if (this.xz1 === true) {
        this.$http.get(`pc/merchant/followerList?size=${val}`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.tableData = data.content
            this.total = data.total
            this.tableData.forEach(item => {
              item.date = item.from_date + '至' + item.to_date
            })
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
      } else if (this.xz5 === true) {
        this.$http.get(`pc/merchant/followerList?size=${val}`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.tableData = data.content
            this.total = data.total
            this.tableData.forEach(item => {
              item.date = item.from_date + '至' + item.to_date
            })
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
      } else if (this.xz7 === true) {
        this.$http.get(`pc/merchant/followerList?proxyType=2&size=${val}`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.tableData = data.content
            this.total = data.total
            this.tableData.forEach(item => {
              item.date = item.from_date + '至' + item.to_date
            })
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
      } else if (this.xz9 === true) {
        this.$http.get(`pc/merchant/followerList?proxyType=3&size=${val}`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.tableData = data.content
            this.total = data.total
            this.tableData.forEach(item => {
              item.date = item.from_date + '至' + item.to_date
            })
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
      }
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      if (this.xz1 === true) {
        this.$http.get(`pc/merchant/followerList?page=${val - 1}&size${this.sizes}`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.tableData = data.content
            this.total = data.total
            this.tableData.forEach(item => {
              item.date = item.from_date + '至' + item.to_date
            })
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
      }else if(this.xz5===true){
        this.$http.get(`pc/merchant/followerList?proxyType=1&page=${val - 1}&size${this.sizes}`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.tableData = data.content
            this.total = data.total
            this.tableData.forEach(item => {
              item.date = item.from_date + '至' + item.to_date
            })
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
      }else if(this.xz7===true){
        this.$http.get(`pc/merchant/followerList?proxyType=2&page=${val - 1}&size${this.sizes}`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.tableData = data.content
            this.total = data.total
            this.tableData.forEach(item => {
              item.date = item.from_date + '至' + item.to_date
            })
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
      }else if(this.xz9===true){
        this.$http.get(`pc/merchant/followerList?proxyType=3&page=${val - 1}&size${this.sizes}`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.tableData = data.content
            this.total = data.total
            this.tableData.forEach(item => {
              item.date = item.from_date + '至' + item.to_date
            })
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
      }
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
    sjxq () {
      console.log(1)
      this.sjxq1 = true
    },
    handleClose () {
      this.sjxq1 = false
    },
    gb () {
      this.ikon = false
    },
    sjdata () {
      this.dgdata = false
    },
    queding () {
      this.$confirm('此操作将扣除您的购买费用, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '购买成功!'
        });
        this.ikon = false
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    point (index, row) {
      console.log(index, row)
      this.$store.commit('myval1', this.btname)
      this.$router.push('/index/rwpoint.vue')
    },
  }
}
</script>

<style lang='scss' module>
.f_fz {
  width: 1200px;
  margin: 0 auto;
  .f_s6,
  .f_s {
    width: 350px;
    display: inline-block;
    height: 130px;
    margin-top: 41px;
    border-radius: 10px;
    margin-left: 47px;
    .f_kp {
      height: 130px;
      .f_icon {
        display: inline-block;
        width: 35%;
        height: 92px;
        line-height: 92px;
        float: left;
      }
      .f_sjvkt {
        display: inline-block;
        margin-left: 20px;
        width: 54%;
        height: 92px;
        .numvkt {
          font-size: 30px;
          color: #3b4859;
          letter-spacing: 0;
          line-height: 24px;
          padding: 0;
          margin-top: 20px;
        }
        .f_sjfw {
          font-size: 17px;
          color: #3b4859;
          letter-spacing: 0;
          line-height: 24px;
          padding-top: 10px;
        }
      }
      p {
        text-align: left;
      }
      .f_p {
        font-size: 16px;
        color: #3b4859;
        letter-spacing: 0;
        line-height: 24px;
      }
      .f_jd {
        padding-top: 10px;
        padding-bottom: 10px;
        text-align: left;
      }
      .f_num,
      .f_num1 {
        text-align: left;
        font-size: 18px;
        letter-spacing: 0;
        line-height: 24px;
      }
    }
  }
  .f_s {
    margin-left: 0px;
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
    height: 60px;
    background: #f3f4f5;
    border: 1px solid #f0f3f7;
    .f_cx {
      font-size: 14px;
      color: #3b4859;
      letter-spacing: 0;
      line-height: 60px;
      padding-left: 20px;
    }
    .f_inpt {
      width: calc(100% - 90%);
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
  .f_inpt {
    width: calc(100% - 36%);
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
  .f_table {
    background: #fff;
    margin-top: 35px;
    box-shadow: 0 2px 4px 0 #eff2f7;
    border-radius: 10px;
    text-align: left;
    p {
      padding: 30px 0;
      padding-left: 25px;
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
  .f_btn {
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
}
</style>
