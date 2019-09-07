<template>
  <div class="bj">
    <!--创建订单 -->
    <div :class="$style.f_cjdd">
      <p :class="$style.f_jb">基本信息</p>
      <el-row :class="$style.f_row">
        <p :class="$style.f_rwmc">任务名称</p>
        <el-input
          placeholder="请输入内容"
          v-model="taskname"
          :disabled="true"
          :class="$style.f_inpt"
          clearable
        ></el-input>
        <p :class="$style.f_rwmc">任务编号</p>
        <el-input
          placeholder="请输入内容"
          v-model="taskserial"
          :disabled="true"
          :class="$style.f_inpt"
          clearable
        ></el-input>
        <p :class="$style.f_rwmc">采集距离</p>
        <el-input
          placeholder="请输入内容"
          v-model="removing"
          :disabled="true"
          :class="$style.f_inpt"
          clearable
        ></el-input>
        <!-- <el-select v-model="value" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>-->
        <!-- <p :class="$style.f_rwmc">数据类型</p>
        <el-select v-model="value" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>-->
      </el-row>
      <p :class="$style.f_jb">任务奖励</p>
      <div :class="$style.f_bgnr">
        <el-table :data="tableData" border style="width: 100%;">
          <el-table-column prop="Totalprize" align="center" label="奖金池" width="180"></el-table-column>
          <el-table-column prop="amountCount" align="center" label="任务量" width="180"></el-table-column>
          <el-table-column prop="price" align="center" label="单条奖励"></el-table-column>
          <el-table-column prop="dataNum" align="center" label="已完成"></el-table-column>
          <el-table-column prop="alreadyprice" align="center" label="已获奖励"></el-table-column>
        </el-table>
      </div>
      <p :class="$style.f_jb">采集时间</p>
      <el-row :class="$style.f_row">
        <p :class="$style.f_rwmc">采集日期</p>
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          :class="$style.f_inpt"
          :disabled="true"
          end-placeholder="结束日期"
        ></el-date-picker>
        <p :class="$style.f_rwmc">采集时段</p>
        <el-time-select
          placeholder="起始时间"
          v-model="startTime"
          :disabled="true"
          :picker-options="{
           start: '00:00',
            step: '01:00',
            end: '23:00'
          }"
        ></el-time-select>
        <el-time-select
          placeholder="结束时间"
          v-model="endTime"
          :disabled="true"
          :picker-options="{
           start: '00:00',
            step: '01:00',
            end: '23:00',
            minTime: startTime
          }"
        ></el-time-select>
      </el-row>
      <p :class="$style.f_jb">采集场景</p>
      <!-- 表格 -->
      <div :class="$style.f_bgnr">
        <el-table :data="Acquisition" border style="width: 100%;">
          <el-table-column align="center" label="采集地区" width="180">
            <template slot-scope="scope">
              <span>{{scope.row.province}}\{{scope.row.city}}\{{scope.row.area}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" align="center" label="数据类型" width="180">
            <template slot-scope="scope">
              <span v-if="scope.row.type==1">区域数据</span>
            </template>
          </el-table-column>
          <el-table-column prop="address" align="center" label="行业/区域"></el-table-column>
          <el-table-column prop="address" align="center" label="行业/区域(细分)"></el-table-column>
          <el-table-column prop="address" align="center" label="场景"></el-table-column>
          <el-table-column prop="address" align="center" label="场景(细分)"></el-table-column>
          <el-table-column prop="address" align="center" label="人群标签"></el-table-column>
          <el-table-column prop="address" align="center" label="场景名称"></el-table-column>
          <!-- <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <span :class="$style.f_delete" @click="Delete(scope.$index, scope.row)">删除</span>
            </template>
          </el-table-column> -->
        </el-table>
      </div>
      <!-- 终端配置 -->
      <p :class="$style.f_jb">终端配置</p>
      <el-row :class="$style.f_row">
        <p :class="$style.f_rwmc">采集终端</p>
        <el-select v-model="changjing" clearable :class="$style.f_inpt" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span
          @click="queding"
          style="display: inline-block;margin-left:4.5%;margin-top: 14px;"
          :class="$style.f_btn"
        >增加</span>
      </el-row>
      <div :class="$style.f_bgnr">
        <el-table :data="tableData" border style="width: 100%;">
          <el-table-column prop="date" align="center" label="终端编号" width="180"></el-table-column>
          <el-table-column prop="name" align="center" label="终端分组" width="180"></el-table-column>
          <el-table-column prop="address" align="center" label="采集状态"></el-table-column>
          <el-table-column prop="address" align="center" label="联网状态"></el-table-column>
          <el-table-column align="center" label="位置信息">
            <template slot-scope="scope">
              <span
                @click="point(scope.$index, scope.row)"
                :class="$style.f_point"
              >{{scope.row.address}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <span :class="$style.f_delete" @click="handleDelete(scope.$index, scope.row)">删除</span>
            </template>
          </el-table-column>
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
      <span
        @click="queding"
        style="display: inline-block;margin-left:4.5%;margin-top: 14px;"
        :class="$style.f_btn"
      >领取</span>
    </div>
    <!-- 地图 -->
    <div class="f_dg">
      <el-dialog title="订购画像" :visible.sync="ikon" width="30%" :before-close="gb">
        <baidu-map
          class="map"
          style="height:300px"
          :center="{lng: 116.403765, lat: 39.914850}"
          :zoom="12"
        >
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
      value1: [],
      value2: '',
      adress: '',
      quyu: '',
      mingcheng: '',
      leixing: '',
      changjing: '',
      textarea2: '',
      options: [],
      tableData: [],
      Acquisition:[],
      ikon: false,
      id: '',
      taskname: '',
      taskserial: '',
      removing: "",
      startTime: '',
      endTime: '',
    }
  },
  mounted () {
    this.id = this.$route.query.row
    console.log(this.id)
    this.getContent()
  },
  methods: {
    getContent () {
      this.$http.get(`pc/platform/task/${this.id}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          this.taskname = data.taskName
          this.taskserial = data.taskCode
          this.removing = data.radius + '米'
          let bonus = {
            Totalprize: data.price * data.amountCount,
            amountCount: data.amountCount,
            price: data.price,
            dataNum: data.dataNum,
            alreadyprice: data.price * data.dataNum
          }
          let fromTime = ''
          let toTime = ''
          if (data.fromTime < 10) {
            fromTime = '0' + data.fromTime + ':00'
          } else if (data.toTime >= 10) {
            fromTime = data.fromTime + ':00'
          }
          if (data.toTime < 10) {
            toTime = '0' + data.toTime + ':00'
          } else if (data.toTime >= 10) {
            toTime = data.toTime + ':00'
          }
          this.Acquisition = data.collectList
          this.startTime = fromTime
          this.endTime = toTime
          this.value1.push(data.fromDate, data.toDate)
          this.tableData.push(bonus)
        }
      }).catch((err) => {
        console.log('错误信息' + err)
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
    point () {
      this.ikon = true
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
      width: calc(100% - 78%);
      margin-left: 1%;
    }
  }
  .f_bgnr {
    padding-top: 39px;
    padding-left: 34px;
    padding-right: 34px;
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
