<template>
  <div :class="$style.f_bj">
    <div :class="$style.f_s">
      <el-card shadow="always" :class="$style.f_kp" class="ab">
        <p :class="$style.f_p">场景</p>
        <p :class="$style.f_num">{{num}}</p>
        <br>
        <el-progress :percentage="num5" :class="$style.f_jd" :format="format"></el-progress>
      </el-card>
    </div>
    <div :class="$style.f_s6">
      <el-card shadow="always" :class="$style.f_kp">
        <p :class="$style.f_p">所有数据</p>
        <p :class="$style.f_num1">{{num1}}</p>
        <el-progress :percentage="100" class="f_jd1" :format="format"></el-progress>
      </el-card>
    </div>
    <div :class="$style.f_s6">
      <el-card shadow="always" :class="$style.f_kp">
        <p :class="$style.f_p">使用条次</p>
        <p :class="$style.f_num3">{{num3}}</p>
        <el-progress :percentage="100" class="f_jd3" :format="format"></el-progress>
      </el-card>
    </div>
    <!-- 任务筛选 -->
    <div :class="$style.f_sx">
      <p>人群标签和数据量</p>
      <!-- 输入框 -->
      <div id="myChart" style="position: static; width:100%; padding-bottom:20px;height:300px;"></div>
    </div>
    <!-- 表格 -->
    <div :class="$style.f_table">
      <p style="padding-bottom:0;">数据列表</p>
      <!-- 表格内容 -->
      <!-- 全部任务 -->
      <div>
        <div :class="$style.f_bgnr">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column prop="id" align="center" label="序号" width="180"></el-table-column>
            <el-table-column prop="area" align="center" label="采集地点" width="180"></el-table-column>
            <el-table-column prop="date" align="center" label="数据类型"></el-table-column>
            <el-table-column prop="rAndI" align="center" label="行业/区域"></el-table-column>
            <el-table-column prop="typeParent" align="center" label="场景"></el-table-column>
            <el-table-column prop="NAME" align="center" label="人群标签"></el-table-column>
            <el-table-column prop="scencesName" align="center" label="场景名称"></el-table-column>
            <el-table-column prop="dataNum" align="center" label="数据量"></el-table-column>
            <!-- <el-table-column prop="status" align="center" label="使用条次"></el-table-column>
            <el-table-column prop="status" align="center" label="过期数据"></el-table-column>-->
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
      num: null,
      num1: 500,
      num2: 500,
      num3: 500,
      num4: 500,
      num5: 100,
      input: '',
      value1: '',
      tableData: [],
      currentPage4: 1,
      sjxq1: false,
      value3: [],
      value2: [],
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
      btname: '创建任务',
      btmatter: '任务详情',
      sjtj: '数据统计',
      xdata: [],
      ysj: [],
      total: null,
      sizes: 10,
      page:null,
    }
  },
  mounted () {
    // this.drawLine();
    this.getTask();
    this.getList();
  },
  methods: {
    async getTask () {
      var res = await this.$http.request({
        url: 'pc/task/countDateTask',
        methods: 'get'
      });
      var { code, data } = res.data
      if (code === 1000) {
        this.num = data.SCENCES_NUM
        this.num1 = data.DATE_NUM
      }
    },
    getList () {
      this.$http.get(`pc/task/scencesList?page=0&size=10`,{params:{}}).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          this.tableData = data.content
          this.total = data.total
        }
      }).catch(function (err) {
        console.log("连接错误" + err)
      })
    },
    format (percentage) {
      return percentage === 100 ? '' : ``;
    },
    handleSelectionChange (val) {
      console.log(val)
    },
    handleSizeChange (val) {
      this.sizes = val;
      this.$http.get(`pc/task/scencesList?size=${val}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          this.tableData = data.content
          this.total = data.total
        }
      }).catch(function (err) {
        console.log("连接错误" + err)
      })
    },
    handleCurrentChange (val) {
      console.log(val-1)
      this.page=val-1
     this.$http.get(`pc/task/scencesList?page=${this.page}&size=${this.sizes}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          this.tableData = data.content
          this.total = data.total
        }
      }).catch(function (err) {
        console.log("连接错误" + err)
      })
    },
    // 周
    drawLine () {
      // 绘制图表
      this.$http.get('pc/task/countCrowdHistogram').then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById("myChart"));
          // console.log(data)
          data.forEach(item => {
            this.xdata.push(item.name)
            this.ysj.push(item.num)
          })
          let option = {
            title: {

            },
            tooltip: {
              trigger: 'axis'
            },
            color: ['#9013FE', '#3B7CFF'],
            legend: {
              data: ['数据采集']
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              data: this.xdata
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: '数据采集',
                type: 'bar',
                stack: '总量',
                data: this.ysj,
                lineStyle: {
                  normal: {
                    color: '#9013FE'
                  }
                }
              },
            ]
          };
          myChart.setOption(option);
        }
      }).catch(function (err) {
        console.log("连接错误" + err)
      })

    },
  }
}
</script>

<style lang='scss' module>
.f_bj {
  width: 1200px;
  margin: 0 auto;
}
.f_s6,
.f_s {
  margin-left: 20px;
  width: 370px;
  display: inline-block;
  height: 80px;
  margin-top: 20px;
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
  margin-left: 0;
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
    width: calc(100% - 88%);
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
.f_jz {
  margin-top: 20px;
  text-align: center;
}
.f_ycsj {
  color: #3b7cff;
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
    padding-left: 1%;
  }
  .f_hxinpt1 {
    width: calc(100% - 60%);
    padding-left: 1%;
  }
}
.f_btn {
  // float: right;
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
  display: inline-block;
  float: left;
}
.f_point {
  cursor: pointer;
  color: #3b7cff;
}
.f_sousuo {
  display: inline-block;
  width: 45%;
  text-align: right;
  float: right;
}
</style>
