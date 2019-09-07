<template>
  <div class="bj">
    <!--创建订单 -->
    <div :class="$style.f_cjdd">
      <div :class="$style.f_jb">
        <p style="display: inline-block;">基本信息</p>
        <p :class="$style.f_date">创建时间:{{date}}</p>
      </div>
      <el-row :class="$style.f_row">
        <p :class="$style.f_rwmc">任务名称:</p>
        <span>{{mc}}</span>
        <br>
        <p :class="$style.f_rwid">任务编号:</p>
        <span :class="$style.f_span">{{rwid}}</span>
        <p :class="$style.f_rwlangth">采集距离:</p>
        <span :class="$style.f_span">{{cjlangth}}</span>
        <p :class="$style.f_rwlangth">采集数量:</p>
        <span :class="$style.f_span">{{cjnum}}</span>
        <div :class="$style.f_hz">
          <p :class="$style.f_hg">回购任务</p>
          <p :class="$style.f_jx">进行中</p>
        </div>
      </el-row>
      <p :class="$style.f_jb">任务奖励</p>
      <div :class="$style.f_bgnr">
        <el-table :data="tableData" border style="width: 100%;">
          <el-table-column prop="dt" align="center" label="单条奖励"></el-table-column>
          <el-table-column prop="zjl" align="center" label="剩余奖励/总奖金"></el-table-column>
          <el-table-column prop="zsj" align="center" label="剩余数据/总数据"></el-table-column>
          <el-table-column prop="ywc" align="center" label="已完成"></el-table-column>
          <el-table-column prop="yhjl" align="center" label="已获奖励"></el-table-column>
        </el-table>
      </div>
      <p :class="$style.f_jb">采集时间</p>
      <div :class="$style.f_bgnr">
        <el-table :data="tableData" border style="width: 100%;">
          <el-table-column prop="date" align="center" label="采集日期"></el-table-column>
          <el-table-column prop="time" align="center" label="采集时段"></el-table-column>
        </el-table>
      </div>
      <p :class="$style.f_jb">采集场景</p>
      <div :class="$style.f_bgnr">
        <el-table :data="tableData" border style="width: 100%;">
          <el-table-column prop="name" align="center" label="行业大类" width="180"></el-table-column>
          <el-table-column prop="address" align="center" label="行业"></el-table-column>
          <el-table-column prop="address" align="center" label="省"></el-table-column>
          <el-table-column prop="address" align="center" label="市"></el-table-column>
          <el-table-column prop="address" align="center" label="区"></el-table-column>
          <el-table-column prop="address" align="center" label="场景"></el-table-column>
          <el-table-column align="center" label="场景名称">
            <template slot-scope="scope">
              <span
                @click="point(scope.$index, scope.row)"
                :class="$style.f_point"
              >{{scope.row.address}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="address" align="center" label="人群"></el-table-column>
        </el-table>
      </div>
      <!-- 任务备注 -->
      <p :class="$style.f_jb">任务备注</p>
      <el-row :class="$style.f_row">
        <p :class="$style.f_rwmc" style="vertical-align: top;">备注</p>
        <el-input
          style="width: calc(100% - 7%); margin-top:20px;"
          type="textarea"
          :autosize="{ minRows: 5, maxRows: 10}"
          placeholder="请输入内容"
          v-model="textarea2"
        ></el-input>
      </el-row>
      <!-- <span
        @click="queding"
        style="display: inline-block;margin-left:4.5%;margin-top: 14px;"
        :class="$style.f_btn"
      >增加</span> -->
    </div>
    <!-- 地图 -->
    <div class="f_dg">
      <el-dialog title="订购画像" :visible.sync="ikon" width="30%" :before-close="gb">
          <baidu-map class="map" style="height:300px" :center="{lng: 116.403765, lat: 39.914850}" :zoom="12">
            <bm-boundary name="北京市海淀区创业大厦" :strokeWeight="2" strokeColor="blue"></bm-boundary>
          </baidu-map>
      </el-dialog>
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
          yhjl: '110000vkt'
        }
      ],
      date: '2017-06-03',
      mc: '青岛展柜高端人群数据采集',
      rwid: 12344,
      cjlangth: '5米',
      cjnum: 2000,
      keyword: '中惠景园',
      location: '青岛',
      ikon: false,
      id:''
    }
  },
  mounted(){
    this.id= this.$route.query.id
    this.getContent()
  },
  methods: {
    getContent(){
      this.$http.get(`pc/platform/taskDetail/${this.id}`).then(res=>{
        var {code,data}=res.data
        if(code===1000){
          this.mc = data.
        }else{
          this.$message.error(res.data.message);
        }
      }).catch((err)=>{
        console.log('错误信息'+err)
      })
    },
    queding () {
      console.log(1)
    },
    Delete (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    point(){
      this.ikon=true
    },
    gb () {
      this.ikon = false
    }
  }
}
</script>

<style  lang='scss' module>
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
  line-height: 14px;
  display: inline-block;
  float: right;
  margin-right: 1%;
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
.f_point {
  font-size: 14px;
  color: #9013fe;
  letter-spacing: 0;
  text-align: center;
  cursor: pointer;
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
</style>
