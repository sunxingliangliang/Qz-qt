<template>
  <div :class="$style.f_bj">
    <!--创建订单 -->
    <div :class="$style.f_cjdd">
      <div :class="$style.f_bzt">
        <el-steps :active="active" align-center>
          <el-step
            title="提交订单"
            icon="iconfont icontijiao"
            :description="create_time"
            style="flex-basis: 30%; margin-right: 0px;"
          ></el-step>
          <el-step
            title="数据分析"
            icon="iconfont iconico_data"
            :description="pass"
            style="flex-basis: 30%; margin-right: 0px;"
          ></el-step>
          <el-step
            title="数据发布"
            icon="iconfont icondaifabu"
            :description="end"
            style="flex-basis: 30%; margin-right: 0px;"
          ></el-step>
        </el-steps>
      </div>
      <div :class="$style.f_jb">
        <p style="display: inline-block;">基本信息</p>
        <p :class="$style.f_date">创建时间:{{date}}</p>
      </div>
      <div :class="$style.f_bgnr" style="text-align: left;">
        <!-- <el-table :data="tableData" border style="width: 100%;">
          <el-table-column prop="dls" align="center" label="订单编号"></el-table-column>
          <el-table-column prop="cjname" align="center" label="订单名称"></el-table-column>
        </el-table>-->
        <p :class="$style.f_rwid">订单编号:</p>
        <span :class="$style.f_span">{{row.code}}</span>
        <p :class="$style.f_rwlangth" style="padding-left: 10.5%;">订单名称:</p>
        <span :class="$style.f_span">{{row.name}}</span>
        <!-- <div :class="$style.f_hz">
          <p :class="$style.f_hg">{{row.lx}}</p>
          <p :class="$style.f_jx" v-if="row.status==='1'">进行</p>
          <p :class="$style.f_jx" v-if="row.status==='2'">暂停</p>
          <p :class="$style.f_jx" v-if="row.status==='3'">结束</p>
          <p :class="$style.f_jx" v-if="row.status==='4'&&row.lx==='平台任务'">取消</p>
        </div>-->
      </div>
      <div :class="$style.f_bgnr" style="text-align: left;">
        <p :class="$style.f_rwid">代理商:</p>
        <span :class="$style.f_span" style="width: 200px; display: inline-block;">{{row.merchant}}</span>
        <p :class="$style.f_rwlangth" style="padding-left: 5%;">代理类型:</p>
        <span :class="$style.f_span" v-if="row.merchantType===1">省级运营中心</span>
        <span :class="$style.f_span" v-if="row.merchantType===2">市级运营中心</span>
        <span :class="$style.f_span" v-if="row.merchantType===3">市级一般代理</span>
        <span :class="$style.f_span" v-if="row.merchantType===4">大客户</span>
        <span :class="$style.f_span" v-if="row.merchantType===5">青竹数据</span>
        <p :class="$style.f_rwlangth">区域:</p>
        <span :class="$style.f_span">{{row.proxyArea}}</span>
        <!-- <el-table :data="tableData" border style="width: 100%;">
          <el-table-column prop="dls" align="center" label="代理商"></el-table-column>
          <el-table-column prop="cjname" align="center" label="代理类型"></el-table-column>
          <el-table-column prop="cjname" align="center" label="区域"></el-table-column>
        </el-table>-->
      </div>
      <p :class="$style.f_jb">数据信息</p>
      <div :class="$style.f_bgnr">
        <el-table :data="information" border style="width: 100%;">
          <el-table-column prop="buyAmount" align="center" label="订购数据量"></el-table-column>
          <el-table-column prop="buyPrice" align="center" label="订购总价"></el-table-column>
          <el-table-column prop="sourceData" align="center" label="源数据量"></el-table-column>
        </el-table>
        <el-table :data="actual" border style="width: 100%;margin-top:20px;">
          <el-table-column prop="actualAmount" align="center" label="实际数据量"></el-table-column>
          <el-table-column prop="actualPrice" align="center" label="实际总价"></el-table-column>
          <el-table-column prop="sign" align="center" label="标签需求"></el-table-column>
        </el-table>
      </div>
      <p :class="$style.f_jb">数据来源</p>
      <div :class="$style.f_bgnr">
        <el-table :data="taskList" border style="width: 100%;">
          <el-table-column prop="taskCode" align="center" label="任务编号"></el-table-column>
          <el-table-column prop="taskName" align="center" label="采集任务名称"></el-table-column>
          <el-table-column prop="taskDataCount" align="center" label="数据量"></el-table-column>
        </el-table>
      </div>
      <div :class="$style.f_bgnr" v-if="row.lx==='平台任务'">
        <el-table :data="tableData" border style="width: 100%;">
          <el-table-column prop="dt" align="center" label="关键字"></el-table-column>
          <el-table-column prop="zjl" align="center" label="数据量"></el-table-column>
        </el-table>
      </div>
      <p :class="$style.f_jb">媒体账号</p>
      <div :class="$style.f_bgnr">
        <el-table :data="mediaaccount" border style="width: 100%;">
          <el-table-column prop="media" align="center" label="平台"></el-table-column>
          <el-table-column prop="username" align="center" label="账号"></el-table-column>
          <el-table-column prop="password" align="center" label="密码"></el-table-column>
        </el-table>
      </div>
      <p :class="$style.f_jb">操作信息</p>
      <div :class="$style.f_bgnr" style="padding-bottom:20px;">
        <el-table :data="operator" border style="width: 100%;">
          <el-table-column prop="userName" align="center" label="操作者" width="180"></el-table-column>
          <el-table-column prop="createTime" align="center" label="操作时间"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <span v-if="scope.row.operationType===3">
                <i class="ytz"></i>驳回
              </span>
              <span v-if="scope.row.operationType===1">
                <i class="zanting"></i>审批
              </span>
              <span v-if="scope.row.operationType===2">
                <i class="gzz"></i>分析
              </span>
              <span v-if="scope.row.operationType===4">
                <i class="gzz"></i>分析
              </span>
              <span v-if="scope.row.operationType===6">
                <i class="jieshu"></i>完成
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="remarks" align="center" label="备注"></el-table-column>
        </el-table>
      </div>
      <span
        @click="compiler"
        style="display: inline-block;margin-left:4.5%;margin-top: 14px;margin-bottom:20px;"
        :class="$style.f_btn"
        v-if="this.dataorderrow.status===3"
      >编辑</span>
      <span
        @click="abolishment"
        style="display: inline-block;margin-left:4.5%;margin-top: 14px;margin-bottom:20px;"
        :class="$style.f_btn"
        v-if="this.dataorderrow.status===3"
      >取消</span>
    </div>
    <div :class="$style.f_jz">
      <footerl/>
    </div>
      <!-- 编辑 -->
      <div class="f_dgsj">
        <el-dialog title="订购数据" :visible.sync="dgdata" width="60%" :before-close="sjdata">
          <p :class="$style.f_jb">基本信息</p>
          <el-row :class="$style.f_hxrow">
            <span :class="$style.f_ddname">订单名称:</span>
            <el-input placeholder="请输入内容" v-model="formname" :class="$style.f_hxinpt" clearable></el-input>
          </el-row>
          <p :class="$style.f_sjxx">数据信息</p>
          <el-row :class="$style.f_hxrow">
            <span :class="$style.f_ddname">源数据量：</span>
            <span :class="$style.f_ddname">{{ysjl}}</span>
          </el-row>
          <el-row :class="$style.f_hxrow">
            <span :class="$style.f_ddname">订单数量:</span>
            <el-input placeholder="请输入内容" v-model="buyAmount" :class="$style.f_hxinpt1" clearable></el-input>
          </el-row>
          <el-row :class="$style.f_hxrow">
            <span :class="$style.f_ddname">订购金额：</span>
            <span :class="$style.f_ddname" v-if="dgmoney!=null">{{dgmoney}}</span>
          </el-row>
          <p :class="$style.f_jb" style="margin-top:20px;">媒体平台</p>
          <el-row style="margin-top:20px;">
            <el-col :span="5" :class="$style.f_s5">
              <el-select v-model="platform" clearable @change="mass" placeholder="请选择">
                <el-option v-for="item in media" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-col>
            <el-col :span="5" :class="$style.f_s5">
              <el-input placeholder="请输入账户" v-model="user" clearable></el-input>
            </el-col>
            <el-col :span="5" :class="$style.f_s5">
              <el-input
                placeholder="请输入密码"
                v-model="password"
                type="password"
                show-password
                clearable
              ></el-input>
            </el-col>
            <el-col :span="5">
              <span @click="increase" style="display: inline-block;" :class="$style.f_btn">增加</span>
            </el-col>
          </el-row>
          <el-table :data="editor" border style="width: 100%;margin-top:20px;">
            <el-table-column prop="media" align="center" label="平台" width="180"></el-table-column>
            <el-table-column prop="username" align="center" label="账户" width="180"></el-table-column>
            <el-table-column prop="password" align="center" label="密码"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click.native.prevent="handleDelete(scope.$index, mediaData)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <p :class="$style.f_sjxx">订单备注</p>
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            style="margin-top:20px;"
            v-model="textarea2"
          ></el-input>
          <span slot="footer" class="dialog-footer">
            <span @click="cancel" style="display: inline-block;" :class="$style.f_btn">取消</span>
            <span @click="refer" style="display: inline-block;" :class="$style.f_btn">提交</span>
          </span>
        </el-dialog>
      </div>
  </div>
</template>

<script>
import footerl from '../footer/footerl'
import qs from 'qs'
export default {
  components: {
    footerl
  },
  data () {
    return {
      date: '2017-06-03',
      input: '',
      value: '',
      value1: '',
      value2: '',
      adress: '',
      quyu: '',
      formname: '',
      buyAmount: '',
      mingcheng: '',
      leixing: '',
      changjing: '',
      textarea2: '',
      ysjl: '',
      platform: '',
      options: [
        {
          value: '选项1',
          label: '1-5米'
        },
        {
          value: '选项2',
          label: '5-10米'
        },
        {
          value: '选项3',
          label: '10-20米'
        },
        {
          value: '选项4',
          label: '20+'
        },
      ],
      tableData: [
        {
          date: '2016-05-02至2016-05-02',
          time: '21:30-24:00',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          dls: '青海数据采集中心',
          cjname: "省级运营中心",
          dt: '5vkt',
          zjl: '10000/10000',
          zsj: '1000/10000vkt',
          ywc: 2000,
          yhjl: '110000vkt',
          cz: '1'
        }
      ],
      information: [],
      media: [],
      mediaaccount: [],
      actual: [],
      operator: [],
      date: '2017-06-03',
      mc: '青岛展柜高端人群数据采集',
      rwid: 12344,
      cjlangth: '5米',
      cjnum: 2000,
      dgdata: false,
      dgmoney: null,
      row: {},
      btmatter: '数据订单',
      active: null,
      id: null,
      order: {},
      real: {},
      create_time: '',
      pass: '',
      end: '',
      taskList: [],
      pass: '',
      end: '',
      editor: [],
      user: '',
      password: '',
      ids: '',
      mediaids: [],
      dataorderrow: {}
    }
  },
  mounted () {
    this.row = this.$route.query.row
    this.dataorderrow = this.$route.query.data1
    this.id = this.$route.query.id
    this.order = {
      buyAmount: this.row.buyAmount,
      buyPrice: this.row.buyPrice,
      sourceData: this.row.sourceData
    }
    this.real = {
      actualAmount: this.row.actualAmount,
      actualPrice: this.row.actualPrice,
      sign: this.row.sign
    }
    this.operator = this.row.recordList
    this.actual.push(this.real)
    this.information.push(this.order)
    this.getList()
  },
  methods: {
    getList () {
      this.$http.get(`modules/order/detail/${this.id}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.date = data.timePoint.create_time
          this.create_time = data.timePoint.create_time
          this.pass = data.timePoint.pass
          this.end = data.timePoint.end
          this.taskList = data.taskList
          this.mediaaccount = data.mediaList
          this.mediaaccount.forEach(item => {
            if (item.mediaId === '1') {
              item.media = '今日头条'
            } else if (item.mediaId === '2') {
              item.media = '微信'
            } else if (item.mediaId === '3') {
              item.media = '微博'
            }
          })
          if (this.create_time != undefined) {
            this.active = 1
          }
          if (this.pass != undefined) {
            this.active = 2
          }
          if (this.end != undefined) {
            this.active = 3
          }
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    abolishment () {
      this.$confirm('是否确定删除此订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.get(`modules/order/editOrderStatus?orderId=${this.id}`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            // this.$store.commit('myval1', this.btmatter)
            // this.$router.push('/index/dataorder.vue')
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    Delete (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    compiler () {
      this.$http.get(`modules/media/all`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.media = data
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
      this.formname = this.row.name
      this.buyAmount = this.information[0].buyAmount
      this.editor = this.mediaaccount
      this.editor.forEach(item => {
        if (item.mediaId === '1') {
          item.media = '今日头条'
        } else if (item.mediaId === '2') {
          item.media = '微信'
        } else if (item.mediaId === '3') {
          item.media = '微博'
        }
      })
      this.dgdata = true
    },
    mass () {
      console.log(this.platform)
      console.log(this.editor)
      this.editor.forEach(item => {
        if (this.platform == item.mediaId) {
          console.log(item)
          this.user = item.username
          this.password = item.password
        }
      })
    },
    // 增加媒体账号
    increase () {
      this.$http.put(`pc/media?mediaId=${this.platform}&username=${this.user}&password=${this.password}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          this.editor.push(data)
          this.editor.forEach(item => {
            this.mediaids.push(item.id)
            this.media.forEach(item1 => {
              if (item.mediaId == item1.id) {
                item.media = item1.name
              }
            })
          })
          this.ids = this.mediaids.join(',')
          this.platform = ''
          this.user = ''
          this.password = ''
        }
      }).catch(function (err) {
        console.log('错误信息' + err)
      })
    },
    // 删除媒体账号
    handleDelete (index, rows) {
      rows.splice(index, 1);
    },
    refer () {
      this.$confirm('是否确定提交订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(this.ids)
        let info = {
          'id': this.id,
          'buyAmount': this.buyAmount,
          'name': this.formname,
          'ids': this.ids,
          'code': this.row.code
        }
        // info.append('sourceData',this.information[0].sourceData)
        console.log(info)
        this.$http.post(`modules/order/saveOrderData`, qs.stringify(info, { arrayFormat: 'indices', allowDots: true })).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.$message({
              type: 'success',
              message: '提交成功!'
            });
            this.$store.commit('myval1', this.btmatter)
            this.$router.push('/index/dataorder.vue')
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
        // this.dgdata = false
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
        this.dgdata = false
      });
    },
    Delete1 (index, row) {
      console.log(index, row)
    },
    sjdata () {
      this.formname = ''
      this.buyAmount = ''
      this.user = ''
      this.password = ''
      this.platform = ''
      this.dgdata = false
    },
    cancel () {
      this.formname = ''
      this.buyAmount = ''
      this.user = ''
      this.password = ''
      this.platform = ''
      this.dgdata = false
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
  .f_jb {
    padding-top: 37px;
    margin-left: 20px;
    margin-right: 20px;
    width: 97%;
    font-size: 16px;
    color: #1f2e4d;
    line-height: 14px;
    text-align: left;
    padding-bottom: 20px;
    border-bottom: 1px solid #e6e9f0;
  }
  .f_row {
    text-align: left;
    .f_rwmc,
    .f_cj {
      margin-top: 20px;
      padding-left: 2%;
      text-align: left;
      display: inline-block;
    }
    .f_cj {
      padding-left: 4.5%;
    }
    .f_inpt {
      width: calc(100% - 80%);
      margin-left: 1%;
    }
  }
  .f_bgnr {
    padding-top: 39px;
    padding-left: 34px;
    padding-right: 34px;
  }
}
.f_rwid,
.f_rwlangth {
  display: inline-block;
  font-size: 14px;
  color: #3d4966;
  line-height: 14px;
  margin-top: 20px;
  padding-left: 2%;
}
.f_rwlangth {
  padding-left: 12%;
}
.f_span {
  font-size: 14px;
  color: #3d4966;
  line-height: 14px;
}
.f_hz {
  float: right;
  margin-right: 2%;
  width: 113px;
  height: 80px;
  .f_hg {
    text-align: center;
    background: #641f82;
    color: #fff;
    border: 1px solid #e6e9f0;
    height: 24px;
    line-height: 24px;
  }
  .f_jx {
    margin-left: 1px;
    width: 109px;
    display: block;
    text-align: center;
    background: #fff;
    color: #641f82;
    border: 1px solid #641f82;
    border-top: none;
    height: 24px;
    line-height: 24px;
    font-size: 14px;
    margin-top: -1px;
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
.f_delete {
  font-size: 14px;
  color: #fb745b;
  letter-spacing: 0;
  cursor: pointer;
}
.f_jz {
  margin-top: 20px;
  text-align: center;
}
.f_bzt {
  padding-top: 9%;
  padding-left: 2%;
  text-align: center;
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
  margin-top: 20px;
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
    width: calc(100% - 61%);
    padding-left: 1%;
  }
}
.f_s5 {
  margin-right: 10px;
  width: calc(100% - 76%);
}
.f_date {
  font-size: 14px;
  color: #3d4966;
  height: 40px;
  line-height: 40px;
  display: inline-block;
  float: right;
  vertical-align: text-bottom;
}
</style>
