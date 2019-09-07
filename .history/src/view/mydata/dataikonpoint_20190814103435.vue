<template>
  <div :class="$style.f_bj">
    <!--创建订单 -->
    <div :class="$style.f_cjdd">
      <div :class="$style.f_bzt">
        <el-steps :active="1" align-center>
          <el-step
            title="提交订单"
            icon="iconfont icontijiao"
            :description="row.timePoint.create_time"
            style="flex-basis: 30%; margin-right: 0px;"
          ></el-step>
          <el-step
            title="订单审批"
            icon="iconfont iconshenpi"
            :description="row.timePoint.pass"
            style="flex-basis: 30%; margin-right: 0px;"
          ></el-step>
          <el-step
            title="订单查看"
            icon="iconfont iconchakan"
            :description="row.timePoint.end"
            style="flex-basis: 30%; margin-right: 0px;"
          ></el-step>
        </el-steps>
      </div>
      <div :class="$style.f_jb">
        <p style="display: inline-block;">基本信息</p>
        <p :class="$style.f_date">创建时间:{{createTime}}</p>
      </div>
      <div :class="$style.f_bgnr" style="text-align: left;">
        <!-- <el-table :data="tableData" border style="width: 100%;">
          <el-table-column prop="dls" align="center" label="订单编号"></el-table-column>
          <el-table-column prop="cjname" align="center" label="画像名称"></el-table-column>
        </el-table>-->
        <p :class="$style.f_rwid">订单编号:</p>
        <span :class="$style.f_span">{{row.code}}</span>
        <p :class="$style.f_rwlangth" style="padding-left: 10.5%;">画像名称:</p>
        <span :class="$style.f_span">{{row.name}}</span>
        <div :class="$style.f_hz">
          <p :class="$style.f_hg">订单状态</p>
          <p :class="$style.f_jx" v-if="row.status===1">待审核</p>
          <p :class="$style.f_jx" v-if="row.status===2">分析中</p>
          <p :class="$style.f_jx" v-if="row.status===3">已驳回</p>
          <p :class="$style.f_jx" v-if="row.status===4">已取消</p>
          <p :class="$style.f_jx" v-if="row.status===4">已取消</p>
          <p :class="$style.f_jx" v-if="row.status===4">已取消</p>
        </div>
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
        <el-table :data="tableData" border style="width: 100%;">
          <el-table-column prop="dls" align="center" label="源数据量"></el-table-column>
          <el-table-column prop="cjname" align="center" label="订购金额"></el-table-column>
        </el-table>
      </div>
      <p :class="$style.f_jb">数据来源</p>
      <div :class="$style.f_bgnr">
        <el-table :data="tableData" border style="width: 100%;">
          <el-table-column prop="dt" align="center" label="任务编号"></el-table-column>
          <el-table-column prop="zjl" align="center" label="采集任务名称"></el-table-column>
          <el-table-column prop="zsj" align="center" label="数据量"></el-table-column>
        </el-table>
      </div>
      <div :class="$style.f_bgnr">
        <el-table :data="tableData" border style="width: 100%;">
          <el-table-column prop="dt" align="center" label="关键字"></el-table-column>
          <el-table-column prop="zjl" align="center" label="数据量"></el-table-column>
        </el-table>
      </div>
      <p :class="$style.f_jb">操作信息</p>
      <div :class="$style.f_bgnr" style="padding-bottom:20px;">
        <el-table :data="row.recordList" border style="width: 100%;">
          <el-table-column prop="userName" align="center" label="操作者" width="180"></el-table-column>
          <el-table-column prop="createTime" align="center" label="操作时间"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <span v-if="scope.row.operationType===2">
                <i class="zanting"></i>审批
              </span>
              <span v-if="scope.row.operationType===1">
                <i class="ytz"></i>驳回
              </span>
              <span v-if="scope.row.operationType===3">
                <i class="gzz"></i>分析
              </span>
              <span v-if="scope.row.operationType===4">
                <i class="jieshu"></i>完成
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="remarks" align="center" label="备注"></el-table-column>
        </el-table>
      </div>
      <span
        @click="bj"
        style="display: inline-block;margin-left:4.5%;margin-top: 14px;margin-bottom:20px;"
        :class="$style.f_btn"
        v-if="row.status===1"
      >编辑</span>
      <span
        @click="queding"
        style="display: inline-block;margin-left:4.5%;margin-top: 14px;margin-bottom:20px;"
        :class="$style.f_btn"
        v-if="row.status===1"
      >删除</span>
    </div>
    <div :class="$style.f_jz">
      <footerl/>
    </div>
      <!-- 编辑 -->
      <div class="f_dgsj">
        <el-dialog title="订购数据" :visible.sync="sjxq" width="60%" :before-close="sjdata">
          <p :class="$style.f_jb">基本信息</p>
          <el-row :class="$style.f_hxrow">
            <span :class="$style.f_ddname">订单名称:</span>
            <el-input placeholder="请输入内容" v-model="input1" :class="$style.f_hxinpt" clearable></el-input>
          </el-row>
          <p :class="$style.f_sjxx">数据信息</p>
          <el-row :class="$style.f_hxrow">
            <span :class="$style.f_ddname">源数据量：</span>
            <span :class="$style.f_ddname">{{ysjl}}</span>
          </el-row>
          <el-row :class="$style.f_hxrow">
            <span :class="$style.f_ddname">订购金额：</span>
            <span :class="$style.f_ddname" v-if="dgmoney===null">自动计算</span>
            <span :class="$style.f_ddname" v-if="dgmoney!=null">{{dgmoney}}</span>
          </el-row>
          <p :class="$style.f_sjxx">订单备注</p>
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            style="margin-top:20px;"
            v-model="textarea2"
          ></el-input>
          <span slot="footer" class="dialog-footer">
            <span @click="sjxq = false" style="display: inline-block;" :class="$style.f_btn">取消</span>
            <span @click="ti" style="display: inline-block;" :class="$style.f_btn">确定</span>
          </span>
        </el-dialog>
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
      input: '',
      value: '',
      value1: '',
      value2: '',
      adress: '',
      quyu: '',
      mingcheng: '',
      leixing: '',
      changjing: '',
      textarea2: '',
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
      date: '2017-06-03',
      mc: '青岛展柜高端人群数据采集',
      rwid: 12344,
      cjlangth: '5米',
      cjnum: 2000,
      active: 2,
      sjxq: false,
      dgmoney: null,
      input1: '',
      row: {},
      btname: '数据画像',
      createTime: '',
      active:null,
      ysjl:null
    }
  },
  created () {
    this.row = this.$route.query.row
    this.createTime = this.$route.query.time
    console.log(this.row)
    // this.getList()
    if (this.row.timePoint.pass === '') {
      this.active = 1
    } else if (this.row.timePoint.end === '') {
      this.active = 2
    } else if (this.row.timePoint.end != '') {
      this.active = 3
    }
  },
  methods: {
    // getList () {
    //   this.$http.get(`modules/order/detail`).then(res => {
    //     var { code, data } = res.data
    //     if (code === 1000) {
    //       console.log(data)
    //       this.row = data
    //     }
    //   }).catch(function (err) {
    //     console.log('错误信息' + err)
    //   })
    // },
    queding () {
      console.log(1)
    },
    Delete (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    bj () {
      this.sjxq = true
    },
    ti () {
      this.$confirm('是否确定提交订购数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '提交成功!'
        });
        this.$store.commit('myval1', this.btname)
        this.$router.push('/index/dataikon.vue')
        this.sjxq = false
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    Delete1 (index, row) {
      console.log(index, row)
    },
    sjdata () {
      this.sjxq = false
    }
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
.f_date {
  font-size: 14px;
  color: #3d4966;
  height: 40px;
  line-height: 40px;
  display: inline-block;
  float: right;
  vertical-align: text-bottom;
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
.f_bzt {
  padding-top: 9%;
  padding-left: 3%;
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
.f_s5 {
  margin-right: 10px;
  width: calc(100% - 76%);
}
</style>
