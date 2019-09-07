<template>
  <div :class="$style.user">
    <div class="jibenxinxi">
      <el-tabs :tab-position="tabPosition" v-model="activeName" :class="$style.f_tabs">
        <el-tab-pane label="我的资金" name="first">
          <div :class="$style.f_userxx">
            <i class="iconfont icondingjin"></i>
            <div :class="$style.clear"></div>
            <span :class="$style.f_vkt">CNY</span>
            <div :class="$style.clear"></div>
            <div :class="$style.f_ky" class="ky">
              <el-table :data="money" style="width: 100%">
                <el-table-column prop="cnyAmount" align="center" label="可用" width="180"></el-table-column>
                <el-table-column prop="cnyFreeze" align="center" label="冻结" width="180"></el-table-column>
                <el-table-column prop="cnyall" align="center" label="全部"></el-table-column>
              </el-table>
            </div>
            <img src="../../assets/img/u15793.png" :class="$style.f_png" alt>
            <div :class="$style.clear"></div>
            <span :class="$style.f_vkt">VKT</span>
            <div :class="$style.clear"></div>
            <div :class="$style.f_ky" class="ky">
              <el-table :data="money1" style="width: 100%">
                <el-table-column prop="vktAmount" align="center" label="可用" width="180"></el-table-column>
                <el-table-column prop="vktFreeze" align="center" label="冻结" width="180"></el-table-column>
                <el-table-column prop="vktall" align="center" label="全部"></el-table-column>
              </el-table>
            </div>
            <div>
              <div :class="$style.f_z">
                <p :class="$style.f_cz">充值地址</p>
                <div>
                  <div :class="$style.f_zh">{{zh}}</div>
                  <div :class="$style.f_fz" @click="copyUrl()">{{fz}}</div>
                  <div :class="$style.f_ewm">
                    <i class="iconfont iconerweima" @click="erweima"></i>
                  </div>
                </div>
              </div>
              <div :class="$style.f_y">
                <p :class="$style.f_cz">充值须知</p>
                <div :class="$style.f_wz">
                  <p :class="$style.f_xz">1、本地址只能使用支持万加链token的钱包充值；</p>
                  <p :class="$style.f_xz">2、禁止向该地址充值除 VKT之外的资产，任何充入VKT地址的非VKT资产将不可找回；</p>
                  <p :class="$style.f_xz">3、充值需要确认时间，区块链确认成功，充值才成功并显示；</p>
                </div>
              </div>
            </div>
            <!-- 充值记录 -->
            <div>
              <div :class="$style.f_czjl">
                <p :class="$style.f_cz">充值记录</p>
                <el-date-picker
                  v-model="value1"
                  @change="selectionperiod"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :class="$style.f_cxrq"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
                <div :class="$style.clear"></div>
              </div>
              <div>
                <div :class="$style.f_cztable">
                  <el-table :data="recharge" style="width: 100%">
                    <el-table-column prop="create_time" align="center" label="时间" width="180"></el-table-column>
                    <el-table-column prop="account" align="center" label="地址" width="180"></el-table-column>
                    <el-table-column prop="amount" align="center" label="数量"></el-table-column>
                    <el-table-column align="center" label="单位">
                      <template slot-scope="scope">
                        <span v-if="scope.row.currency===1">VKT</span>
                        <span v-if="scope.row.currency===2">CNY</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
              <el-pagination
                style="text-align: right;"
                @size-change="Numberofrecharges"
                @current-change="Topuppaging"
                :current-page="currentPage5"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
              ></el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="收支记录" name="second">
          <div :class="$style.f_zttb" style="    padding-bottom: 20px;">
            <div :class="$style.f_sjfwcny" style="    margin-right: 30px;">
              <div :class="$style.f_shujufuwu">
                <i class="iconfont iconshujufuwu"></i>
              </div>
              <div :class="$style.f_shujufuw1">
                <p :class="$style.f_cny1">{{cny1}}</p>
                <p :class="$style.f_sjfw1">数据服务</p>
              </div>
            </div>
            <div :class="$style.f_sjfwcny1">
              <div :class="$style.f_shujufuwu">
                <i class="iconfont iconshouyi"></i>
              </div>
              <div :class="$style.f_shujufuw1">
                <p :class="$style.f_cny1">{{cny1}}</p>
                <p :class="$style.f_sjfw1">数据收益</p>
              </div>
            </div>
            <div :class="$style.f_sjfwcny2" style="    margin-left: 30px;">
              <div :class="$style.f_shujufuwu">
                <i class="iconfont iconxinlingshouyewuicon-"></i>
              </div>
              <div :class="$style.f_shujufuw1">
                <p :class="$style.f_cny1">{{cny1}}</p>
                <p :class="$style.f_sjfw1">任务奖励</p>
              </div>
            </div>
          </div>
          <div :class="$style.f_userxx">
            <div :class="$style.f_table">
              <div class="xiahuaxian">
                <div :class="{'f_fy4':xz,'f_fy5':xz1}" @click="qb">全部</div>
                <div :class="{'f_fy4':xz2,'f_fy5':xz3}" @click="ywc">数据服务</div>
                <div :class="{'f_fy4':xz4,'f_fy5':xz5}" @click="wwc">数据收益</div>
                <div :class="{'f_fy4':xz6,'f_fy5':xz7}" @click="zzrw">任务奖励</div>
                <el-date-picker
                  v-model="value2"
                  type="daterange"
                  @change="Querytime"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  style="float: right;"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </div>
              <!-- 表格内容 -->
              <!-- 全部 -->
              <div v-if="xz1===true">
                <div :class="$style.f_bgnr">
                  <el-table :data="TransactionRecord" border style="width: 100%">
                    <el-table-column prop="create_time" align="center" label="时间" width="180"></el-table-column>
                    <el-table-column prop="account" align="center" label="地址"></el-table-column>
                    <el-table-column align="center" label="类型">
                      <template slot-scope="scope">
                        <span v-if="scope.row.type===1">平台充值</span>
                        <span v-if="scope.row.type===2">平台提现</span>
                        <span v-if="scope.row.type===3">自充值</span>
                        <span v-if="scope.row.type===4">自提现</span>
                        <span v-if="scope.row.type===5">数据收益</span>
                        <span v-if="scope.row.type===6">任务奖励</span>
                        <span v-if="scope.row.type===7">订购数据</span>
                        <span v-if="scope.row.type===8">数据画像</span>
                        <span v-if="scope.row.type===9">固定画像</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="amount" align="center" label="数量"></el-table-column>
                    <el-table-column align="center" label="单位" width="80">
                      <template slot-scope="scope">
                        <span v-if="scope.row.currency===1">VKT</span>
                        <span v-if="scope.row.currency===2">CNY</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
              <!-- 数据服务 -->
              <div v-if="xz3===true">
                <div :class="$style.f_bgnr">
                  <el-table :data="TransactionRecord" border style="width: 100%">
                    <el-table-column prop="create_time" align="center" label="时间" width="180"></el-table-column>
                    <el-table-column prop="account" align="center" label="地址"></el-table-column>
                    <el-table-column align="center" label="类型">
                      <template slot-scope="scope">
                        <span v-if="scope.row.type===1">平台充值</span>
                        <span v-if="scope.row.type===2">平台提现</span>
                        <span v-if="scope.row.type===3">自充值</span>
                        <span v-if="scope.row.type===4">自提现</span>
                        <span v-if="scope.row.type===5">数据收益</span>
                        <span v-if="scope.row.type===6">任务奖励</span>
                        <span v-if="scope.row.type===7">订购数据</span>
                        <span v-if="scope.row.type===8">数据画像</span>
                        <span v-if="scope.row.type===9">固定画像</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="amount" align="center" label="数量"></el-table-column>
                    <el-table-column align="center" label="单位" width="80">
                      <template slot-scope="scope">
                        <span v-if="scope.row.currency===1">VKT</span>
                        <span v-if="scope.row.currency===2">CNY</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
              <!-- 任务奖励 -->
              <div v-if="xz5===true">
                <div :class="$style.f_bgnr">
                  <el-table :data="TransactionRecord" border style="width: 100%">
                    <el-table-column prop="create_time" align="center" label="时间" width="180"></el-table-column>
                    <el-table-column prop="account" align="center" label="地址"></el-table-column>
                    <el-table-column align="center" label="类型">
                      <template slot-scope="scope">
                        <span v-if="scope.row.type===1">平台充值</span>
                        <span v-if="scope.row.type===2">平台提现</span>
                        <span v-if="scope.row.type===3">自充值</span>
                        <span v-if="scope.row.type===4">自提现</span>
                        <span v-if="scope.row.type===5">数据收益</span>
                        <span v-if="scope.row.type===6">任务奖励</span>
                        <span v-if="scope.row.type===7">订购数据</span>
                        <span v-if="scope.row.type===8">数据画像</span>
                        <span v-if="scope.row.type===9">固定画像</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="amount" align="center" label="数量"></el-table-column>
                    <el-table-column align="center" label="单位" width="80">
                      <template slot-scope="scope">
                        <span v-if="scope.row.currency===1">VKT</span>
                        <span v-if="scope.row.currency===2">CNY</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
              <!-- 数据收益 -->
              <div v-if="xz7===true">
                <div :class="$style.f_bgnr">
                  <el-table :data="TransactionRecord" border style="width: 100%">
                    <el-table-column prop="create_time" align="center" label="时间" width="180"></el-table-column>
                    <el-table-column prop="account" align="center" label="地址"></el-table-column>
                    <el-table-column align="center" label="类型">
                      <template slot-scope="scope">
                        <span v-if="scope.row.type===1">平台充值</span>
                        <span v-if="scope.row.type===2">平台提现</span>
                        <span v-if="scope.row.type===3">自充值</span>
                        <span v-if="scope.row.type===4">自提现</span>
                        <span v-if="scope.row.type===5">数据收益</span>
                        <span v-if="scope.row.type===6">任务奖励</span>
                        <span v-if="scope.row.type===7">订购数据</span>
                        <span v-if="scope.row.type===8">数据画像</span>
                        <span v-if="scope.row.type===9">固定画像</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="amount" align="center" label="数量"></el-table-column>
                    <el-table-column align="center" label="单位" width="80">
                      <template slot-scope="scope">
                        <span v-if="scope.row.currency===1">VKT</span>
                        <span v-if="scope.row.currency===2">CNY</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
              <!-- 分页 -->
              <div
                style="text-align: right;margin-top:20px;padding-bottom: 20px;padding-right:10px;"
              >
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage4"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="10"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="article"
                ></el-pagination>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 二维码 -->
    <div v-show="ewm===true" id="popBox">
      <div class="close">
        <span href="javascript:void(0)" @click="gb">❌</span>
      </div>
      <div class="content">
        <canvas
          id="msg"
          style="width:200px !important;height:200px !important;"
          height="200"
          width="200"
        ></canvas>
        <p>{{zh}}</p>
      </div>
    </div>
    <div :class="$style.f_jz">
      <footerl/>
    </div>
  </div>
</template>

<script>
import footerl from '../footer/footerl'
import QRCode from 'qrcode'
export default {
  components: {
    footerl
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
      tabPosition: 'left',
      activeName: 'first',
      input: '',
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      input6: '',
      input7: '',
      input8: '',
      input9: '',
      value2: '',
      zh: '',
      fz: '复制',
      cny1: '2000CNY',
      recharge: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      },],
      money: [],
      money1: [],
      TransactionRecord: [],
      value1: '',
      ewm: false,
      total: null,
      article: null,
      currentPage5: 1,
      currentPage4: 1,
      erweima1: { "quantity": "", "contract": "eosio.token", "account_name": "", "token": "VKT", "type": "token_make_collections_QRCode" },
      sizes: 10,
      pages:0,
      sizes1: 10,
    };
  },
  created () {
    this.add()
  },
  mounted () {
    this.getZj()
    this.qb()
  },
  methods: {
    // 我的资金
    getZj () {
      console.log(this.$store.state.userinfo)
      this.$http.get('pc/account/getAccount').then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.zh = data.name
          this.erweima1.account_name = this.zh
          var vkt = {
            vktAmount: data.vktAmount,
            vktFreeze: data.vktFreeze,
            vktall: data.vktAmount + data.vktFreeze
          }
          var cny = {
            cnyAmount: data.cnyAmount,
            cnyFreeze: data.cnyFreeze,
            cnyall: data.cnyAmount + data.cnyFreeze
          }
          this.money.push(cny)
          this.money1.push(vkt)
        }
      }).catch(function (err) {
        console.log("错误信息" + err)
      })
    },
    selectionperiod () {
      if (this.value1 === null) {
        this.$http.get('pc/account/list',{params:{
          size:this.sizes,
          page:this.pages
        }}).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.recharge = data.content
            this.total = data.total
            this.TransactionRecord = data.content
            this.article = data.total
          }
        }).catch(function (err) {
          console.log('错误信息' + err)
        })
      } else {
        var str = this.value1.join(',')
        console.log(2)
        this.$http.get(`pc/account/list`,{params:{
          values:str
        }}).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.recharge = data.content
            this.total = data.total
            this.TransactionRecord = data.content
            this.article = data.total
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
      }
    },
    Querytime () {
      if (this.value2 === null) {
        console.log(1)
        this.$http.get('pc/account/list',{params:{
          size:10
        }}).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.recharge = data.content
            this.total = data.total
            this.TransactionRecord = data.content
            this.article = data.total
          }
        }).catch(function (err) {
          console.log('错误信息' + err)
        })
      } else {
        var str = this.value2.join(',')
        console.log(2)
        this.$http.get(`pc/account/list`,{params:{
          values:str
        }}).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.recharge = data.content
            this.total = data.total
            this.TransactionRecord = data.content
            this.article = data.total
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
      }
    },
    Numberofrecharges (val) {
      this.sizes = val;
      this.$http.get(`pc/account/list`,{params:{
        size:val
      }}).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.recharge = data.content
          this.total = data.total
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    Topuppaging (val) {
      this.$http.get(`pc/account/list`,{params:{
        size:this.sizes,
        page:val-1
      }}).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.recharge = data.content
          this.total = data.total
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    handleSizeChange (val) {
      this.sizes1 = val;
      this.$http.get(`pc/account/list`,{params:{
        size:val
      }}).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.TransactionRecord = data.content
          this.totaarticlel = data.total
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    handleCurrentChange (val) {
      this.$http.get(`pc/account/list`,{params:{
        page:val-1,
        size:this.sizes1
      }}).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.TransactionRecord = data.content
          this.totaarticlel = data.total
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
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
      this.$http.get('pc/account/list',{params:{
        size:10
      }}).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.recharge = data.content
          this.total = data.total
          this.TransactionRecord = data.content
          this.article = data.total
        }
      }).catch(function (err) {
        console.log('错误信息' + err)
      })
    },
    // 数据服务
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
      this.$http.get('pc/account/list',{params:{
        size:10,
        type:0
      }}).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.recharge = data.content
          this.total = data.total
          this.TransactionRecord = data.content
          this.article = data.total
        }
      }).catch(function (err) {
        console.log('错误信息' + err)
      })
    },
    // 数据收益
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
      this.$http.get('pc/account/list',{params:{
        size:10,
        type:5
      }}).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.recharge = data.content
          this.total = data.total
          this.TransactionRecord = data.content
          this.article = data.total
        }
      }).catch(function (err) {
        console.log('错误信息' + err)
      })
    },
    // 任务奖励
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
      this.$http.get('pc/account/list',{params:{
        size:10,
        type:6
      }}).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.recharge = data.content
          this.total = data.total
          this.TransactionRecord = data.content
          this.article = data.total
        }
      }).catch(function (err) {
        console.log('错误信息' + err)
      })
    },
    add () {
      if (this.$route.query.id === 1) {
        this.activeName = 'first'
      } else if (this.$route.query.id === 2) {
        this.activeName = 'second'
      }
    },
    erweima () {
      this.ewm = true
      // 获取页面的canvas
      var msg = document.getElementById('msg')
      // 将获取到的数据（val）画到msg（canvas）上
      QRCode.toCanvas(msg, JSON.stringify(this.erweima1), function (error) {
        console.log(error)
      })
    },
    gb () {
      this.ewm = false
    },
    copyUrl () {
      let url = this.zh;
      let oInput = document.createElement('input');
      oInput.value = url;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象;
      document.execCommand("Copy"); // 执行浏览器复制命令
      this.$message({
        message: '已成功复制到剪切板',
        type: 'success'
      });
      oInput.remove()
    },
  }
}
</script>

<style lang='scss' module>
.user {
  width: 1200px;
  margin: auto;
  margin-top: 20px;
  .f_userxx {
    background: #ffffff;
    box-shadow: 0 2px 4px 0 #eff2f7;
    border-radius: 10px;
    height: 100%;
  }
  .clear {
    clear: both;
  }
  .f_btn {
    display: inline-block;
    width: 68px;
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
}
.f_z,
.f_y {
  display: inline-block;
}
.f_z {
  width: 39%;
  height: 127px;
  vertical-align: top;
}
.f_y {
  width: 52%;
}
.f_z {
  padding-right: 20px;
  border-right: 1px solid #e6e9f0;
  .f_cz {
    display: block;
    width: 71%;
    text-align: left;
    margin-left: 20px;
    border-bottom: 1px solid #e6e9f0;
  }
}
.f_y {
  .f_cz {
    display: block;
    width: 71%;
    text-align: left;
    margin-left: 20px;
    border-bottom: 1px solid #e6e9f0;
  }
  .f_wz {
    text-align: left;
    .f_xz {
      padding: 0;
      font-size: 12px;
      color: #1f2e4d;
      line-height: 30px;
      padding-left: 36px;
    }
  }
}
.f_zttb {
  background: RGB(249, 250, 252);
  .f_sjfwcny,
  .f_sjfwcny1,
  .f_sjfwcny2 {
    vertical-align: top;
    display: inline-block;
    width: 28%;
    background: #fff;
    box-shadow: 0 2px 4px 0 #eff2f7;
    border-radius: 10px 10px 10px 0 10px;
    height: 135px;
  }
  .f_shujufuwu {
    width: 40%;
    display: inline-block;
    float: left;
    text-align: center;
    margin-top: 40px;
  }
}
.f_cny1 {
  font-size: 24px;
  color: #3b4859;
  letter-spacing: 0;
  line-height: 24px;
  text-align: left;
  padding-bottom: 0;
}
.f_sjfw1 {
  font-size: 14px;
  color: #3b4859;
  letter-spacing: 0;
  line-height: 24px;
  text-align: left;
}
.f_shujufuw1 {
  display: inline-block;
  width: 58%;
  margin-top: 29px;
}
.f_ewm {
  color: #9013fe;
  cursor: pointer;
}
.f_zh {
  display: inline-block;
  width: 28%;
  margin-top: 30px;
}
.f_zh {
  float: left;
  margin-left: 20px;
}
.f_fz {
  display: inline-block;
  width: 10%;
  float: left;
  margin-top: 30px;
  margin-left: 50px;
  cursor: pointer;
  color: #9013fe;
}
.f_fz:hover {
  color: #9013fe;
}
.f_tabs {
  height: 100%;
}
.f_czjl {
  padding-top: 30px;
  border-bottom: 1px solid #e6e9f0;
  margin: 0 20px;
  padding-bottom: 10px;
  .f_cz {
    display: inline-block;
    float: left;
  }
  .f_cxrq {
    float: right;
  }
}
.f_cztable {
  margin-top: 20px;
  padding: 0 20px;
  margin-bottom: 20px;
}
.f_png {
  display: block;
  width: 43px;
  margin-top: 20px;
  margin-left: 20px;
  float: left;
}
.f_vkt {
  float: left;
  margin-left: 76px;
  margin-top: -36px;
}
.f_ky {
  padding: 0 20px;
  margin-bottom: 20px;
}
.f_jz {
  margin-top: 20px;
  text-align: center;
}
.f_table {
  background: #fff;
  margin-top: 35px;
  box-shadow: 0 2px 4px 0 #eff2f7;
  border-radius: 10px;
  text-align: left;
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
.f_bgnr {
  padding-top: 39px;
  padding-left: 34px;
  padding-right: 34px;
}
</style>
