<template>
  <div :class="$style.f_bj">
    <div :class="$style.f_s6" style="margin-right: 26px;">
      <el-card shadow="always" :class="$style.f_kp">
        <span :class="$style.f_tprq">本月</span>
        <img src="../assets/img/Icon.png" alt :class="$style.f_tp">
        <div :class="$style.f_wz">
          <p :class="$style.f_dd">订单</p>
          <p :class="$style.f_num">{{num}}</p>
          <p :class="$style.f_zz">{{zz}}%同比增长</p>
        </div>
      </el-card>
    </div>
    <div :class="$style.f_s6" style="margin-right: 26px;">
      <el-card shadow="always" :class="$style.f_kp">
        <span :class="$style.f_tprq">本月</span>
        <img src="../assets/img/Stroke 2.png" alt :class="$style.f_tp1">
        <div :class="$style.f_wz">
          <p :class="$style.f_dd3">收入</p>
          <p :class="$style.f_num">{{sr}}</p>
          <p :class="$style.f_zz">{{zz1}}%同比增长</p>
        </div>
      </el-card>
    </div>
    <div :class="$style.f_s6" style="margin-right: 26px;">
      <el-card shadow="always" :class="$style.f_kp">
        <span :class="$style.f_tprq">本月</span>
        <img src="../assets/img/Stroke 3.png" alt :class="$style.f_tp2">
        <div :class="$style.f_wz">
          <p :class="$style.f_dd1">数据量</p>
          <p :class="$style.f_num">{{sjl}}</p>
          <p :class="$style.f_zz">{{zz2}}%同比增长</p>
        </div>
      </el-card>
    </div>
    <div :class="$style.f_s6">
      <el-card shadow="always" :class="$style.f_kp">
        <span :class="$style.f_tprq">本月</span>
        <img src="../assets/img/Stroke 4.png" alt :class="$style.f_tp3">
        <div :class="$style.f_wz">
          <p :class="$style.f_dd2">任务</p>
          <p :class="$style.f_num">{{task}}</p>
          <p :class="$style.f_zz">{{zz3}}%同比增长</p>
        </div>
      </el-card>
    </div>
    <div :class="$style.f_tb1">
      <span :class="$style.f_cjbt">数据采集量</span>
      <el-row>
        <!-- <div :class="$style.f_rq">
          <span :class="{'f_xs':xs,'f_xs1':xs1}" @click="br">本日</span>
          <span :class="{'f_xs':xs2,'f_xs1':xs3}" @click="bz">本周</span>
          <span :class="{'f_xs':xs4,'f_xs1':xs5}" @click="by">本月</span>
          <el-date-picker v-model="value1" type="date" placeholder="选择日期" @change="fs(value1)"></el-date-picker>
        </div>-->
      </el-row>
      <div
        id="myChart1"
        :class="{'f_b1':bxs,'f_b4':bxs4}"
        style="position: static; width:900px;height:300px;"
      ></div>
      <div
        id="myChart"
        :class="{'f_b1':bxs2,'f_b4':bxs5}"
        style="position: static; width:900px;height:300px;"
      ></div>
      <div
        id="myChart3"
        :class="{'f_b1':bxs3,'f_b4':bxs6}"
        style="position: static; width:900px;height:300px;"
      ></div>
      <div
        id="myChart4"
        :class="{'f_b1':bxs7,'f_b4':bxs8}"
        style="position: static; width:900px;height:300px;"
      ></div>
    </div>
    <div :class="$style.f_tb2">
      <span :class="$style.f_sjtj">数据收益统计</span>
      <el-row>
        <div :class="$style.f_rq1">
          <span :class="{'f_xs':xs6,'f_xs1':xs7}" @click="br1">本日</span>
          <span :class="{'f_xs':xs8,'f_xs1':xs9}" @click="bz1">本周</span>
          <span :class="{'f_xs':xs10,'f_xs1':xs11}" @click="by1">本月</span>
          <!-- <el-date-picker v-model="value2" type="date" placeholder="选择日期" @change="fs1(value2)"></el-date-picker> -->
        </div>
      </el-row>
      <div
        id="myChart5"
        :class="{'f_b1':bxs9,'f_b4':bxs10}"
        style="position: static; width:900px;height:300px;"
      ></div>
      <div
        id="myChart6"
        :class="{'f_b1':bxs11,'f_b4':bxs12}"
        style="position: static; width:900px;height:300px;"
      ></div>
      <div
        id="myChart7"
        :class="{'f_b1':bxs13,'f_b4':bxs14}"
        style="position: static; width:900px;height:300px;"
      ></div>
      <div
        id="myChart8"
        :class="{'f_b1':bxs15,'f_b4':bxs16}"
        style="position: static; width:900px;height:300px;"
      ></div>
    </div>
    <div :class="$style.f_footer">
      <footerl/>
    </div>
  </div>
</template>

<script>
import footerl from './footer/footerl'
export default {
  components: {
    footerl
  },
  data () {
    return {
      value1: "",
      num: null,
      zz: '',
      zz1: '',
      zz2: '',
      zz3: '',
      sr: '',
      sjl: '',
      task:'',
      xs: true,
      xs1: false,
      xs2: false,
      xs3: true,
      xs4: false,
      xs5: true,
      xs6: true,
      xs7: false,
      xs8: false,
      xs9: true,
      xs10: false,
      xs11: true,
      bxs: true,
      bxs2: false,
      bxs3: false,
      bxs4: false,
      bxs5: true,
      bxs6: true,
      bxs7: false,
      bxs8: true,
      bxs9: true,
      bxs10: false,
      bxs11: false,
      bxs12: true,
      bxs13: false,
      bxs14: true,
      bxs15: false,
      bxs16: true,
      value2: ''
    }
  },
  mounted () {
    this.br()
    this.drawLine1()
    this.drawLine()
    this.drawLine3()
    this.drawLine4()
    this.drawLine5()
    this.drawLine6()
    this.drawLine7()
    this.drawLine8()
    this.br1()
    this.getCompare()
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event);
    },
    getCompare(){
      this.$http.get(`pc/merchant/compare`).then(res=>{
        var {code,data}=res.data
        if(code===1000){
          console.log(data)
          this.num = data.order.count
          this.zz = data.order.compare
          this.sr = data.income.count
          this.zz1 = data.income.compare
          this.sjl = data.data.count
          this.zz2 = data.data.compare
          this.task  = data.task.count
          this.zz3 = data.task.compare
        }else if(code==){
           this.$message.error(res.data.message);
        }
      }).catch((err)=>{
        console.log('错误信息'+err)
      })
    },
    br () {
      this.xs = true
      this.xs1 = false
      this.xs4 = false
      this.xs5 = true
      this.xs2 = false
      this.xs3 = true
      this.bxs = true
      this.bxs2 = false
      this.bxs3 = false
      this.bxs4 = false
      this.bxs5 = true
      this.bxs6 = true
      this.bxs7 = false
      this.bxs8 = true
      this.value1 = ''
    },
    bz () {
      this.xs2 = true
      this.xs3 = false
      this.xs = false
      this.xs1 = true
      this.xs4 = false
      this.xs5 = true
      this.drawLine()
      this.bxs = false
      this.bxs4 = true
      this.bxs2 = true
      this.bxs5 = false
      this.bxs3 = false
      this.bxs6 = true
      this.bxs7 = false
      this.bxs8 = true
      this.value1 = ''
    },
    by () {
      this.xs4 = true
      this.xs5 = false
      this.xs2 = false
      this.xs3 = true
      this.xs = false
      this.xs1 = true
      this.drawLine3()
      this.bxs = false
      this.bxs2 = false
      this.bxs3 = true
      this.bxs4 = true
      this.bxs5 = true
      this.bxs6 = false
      this.bxs7 = false
      this.bxs8 = true
      this.value1 = ''
    },
    fs (val) {
      this.drawLine4()
      this.xs = false
      this.xs1 = true
      this.xs2 = false
      this.xs4 = false
      this.xs3 = true
      this.xs5 = true
      this.bxs7 = true
      this.bxs8 = false
      this.bxs = false
      this.bxs4 = true
      this.bxs2 = false
      this.bxs5 = true
      this.bxs3 = false
      this.bxs6 = true
    },
    br1 () {
      this.xs6 = true
      this.xs7 = false
      this.xs8 = false
      this.xs9 = true
      this.xs10 = false
      this.xs11 = true
      this.drawLine5()
      this.bxs9 = true
      this.bxs10 = false
      this.bxs11 = false
      this.bxs12 = true
      this.bxs13 = false
      this.bxs14 = true
      this.bxs15 = false
      this.bxs16 = true
      this.value2 = ''
    },
    bz1 () {
      this.xs6 = false
      this.xs7 = true
      this.xs8 = true
      this.xs9 = false
      this.xs10 = false
      this.xs11 = true
      this.drawLine6()
      this.bxs9 = false
      this.bxs10 = true
      this.bxs11 = true
      this.bxs12 = false
      this.bxs13 = false
      this.bxs14 = true
      this.bxs15 = false
      this.bxs16 = true
      this.value2 = ''
    },
    by1 () {
      this.xs6 = false
      this.xs7 = true
      this.xs8 = false
      this.xs9 = true
      this.xs10 = true
      this.xs11 = false
      this.drawLine7()
      this.bxs9 = false
      this.bxs10 = true
      this.bxs11 = false
      this.bxs12 = true
      this.bxs13 = true
      this.bxs14 = false
      this.bxs15 = false
      this.bxs16 = true
      this.value2 = ''
    },
    fs1 () {
      this.drawLine8()
      this.xs6 = false
      this.xs7 = true
      this.xs8 = false
      this.xs9 = true
      this.xs10 = false
      this.xs11 = true
      this.bxs9 = false
      this.bxs10 = true
      this.bxs11 = false
      this.bxs12 = true
      this.bxs13 = false
      this.bxs14 = true
      this.bxs15 = true
      this.bxs16 = false
    },
    // 日(数据采集)
    drawLine1 () {
      let name = []
      let value = []
      // let token = window.sessionStorage.token.slice(1,37)
      // ,{headers:{ 'api_token':token}}
      // console.log(window.sessionStorage.token)
      this.$http.get(`pc/task/countCrowdHistogram`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          data.forEach(item => {
            name.push(item.name)
            value.push(item.num)
          })
          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById("myChart1"));
          // 绘制图表
          let option = {
            color: ['#22314F'],
            tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {
              top: '8%',
              left: '3%',
              right: '4%',
              bottom: '0',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                data: name,
                axisTick: {
                  alignWithLabel: true
                },
                axisLabel: {
                  interval: 0,
                  formatter: function (params) {
                    var newParamsName = "";
                    var paramsNameNumber = params.length;
                    var provideNumber = 8; //一行显示几个字
                    var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                    if (paramsNameNumber > provideNumber) {
                      for (var p = 0; p < rowNumber; p++) {
                        var tempStr = "";
                        var start = p * provideNumber;
                        var end = start + provideNumber;
                        if (p == rowNumber - 1) {
                          tempStr = params.substring(start, paramsNameNumber);
                        } else {
                          tempStr = params.substring(start, end) + "\n";
                        }
                        newParamsName += tempStr;
                      }
                    } else {
                      newParamsName = params;
                    }
                    return newParamsName;
                  }
                },
                axisLine: {
                  lineStyle: {
                    color: '#000', // X轴及其文字颜色
                  }
                }
              }
            ],
            yAxis: [
              {
                type: 'value',
                axisLine: {
                  lineStyle: {
                    color: '#000', // X轴及其文字颜色
                  }
                }
              }
            ],
            series: [
              {
                name: '直接访问',
                type: 'bar',
                barWidth: '60%',
                data: value,

                itemStyle: {
                  //通常情况下：
                  normal: {
                    //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                    color: function (params) {
                      var colorList = ['#9013FE', '#0079FE', '#FF8F00', '#41E0FC ', '#B8E986', '#8C99AD ', '#FB745B', '#53237E', '#F6D707', '#38579A']; //每根柱子的颜色
                      return colorList[params.dataIndex];
                    }
                  },
                  //鼠标悬停时：
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          }
          myChart.setOption(option);
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })

    },
    // 周
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      let option = {
        color: ['#22314F'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '8%',
          left: '3%',
          right: '4%',
          bottom: '0',
          containLabel: true
        },
        xAxis: [
          {
            type: 'value',
            axisLabel: {
              interval: 0,
              formatter: function (params) {
                console.log(params)
                var newParamsName = "";
                var paramsNameNumber = params.length;
                var provideNumber = 8; //一行显示几个字
                var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                if (paramsNameNumber > provideNumber) {
                  for (var p = 0; p < rowNumber; p++) {
                    var tempStr = "";
                    var start = p * provideNumber;
                    var end = start + provideNumber;
                    if (p == rowNumber - 1) {
                      tempStr = params.substring(start, paramsNameNumber);
                    } else {
                      tempStr = params.substring(start, end) + "\n";
                    }
                    newParamsName += tempStr;
                  }
                } else {
                  newParamsName = params;
                }
                return newParamsName;
              }
            },
            axisLine: {
              lineStyle: {
                color: '#58afed', // X轴及其文字颜色
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'category',
            data: this.workname,
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: '#58afed', // X轴及其文字颜色
              }
            }
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: this.worknum,

            itemStyle: {
              //通常情况下：
              normal: {
                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: function (params) {
                  var colorList = ['#9013FE', '#0079FE', '#FF8F00', '#41E0FC ', '#B8E986', '#8C99AD ', '#FB745B', '#53237E', '#F6D707', '#38579A']; //每根柱子的颜色
                  return colorList[params.dataIndex];
                }
              },
              //鼠标悬停时：
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      myChart.setOption(option);
    },
    // 月
    drawLine3 () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart3"));
      // 绘制图表
      let option = {
        title: {
          text: '本月数据采集量'
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
          boundaryGap: false,
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '数据采集',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210],
            lineStyle: {
              normal: {
                color: '#9013FE'
              }
            }
          },
          // {
          //   name: '微信',
          //   type: 'line',
          //   stack: '总量',
          //   data: [220, 182, 191, 234, 290, 330, 310],
          //   lineStyle: {
          //     normal: {
          //       color: '#3B7CFF'
          //     }
          //   }
          // }
        ]
      };
      myChart.setOption(option);
    },
    // 搜索
    drawLine4 () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart4"));
      // 绘制图表
      let option = {
        title: {
          text: '当天数据采集量'
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
          boundaryGap: false,
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'APP',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210],
            lineStyle: {
              normal: {
                color: '#9013FE'
              }
            }
          },
          // {
          //   name: '微信',
          //   type: 'line',
          //   stack: '总量',
          //   data: [220, 182, 191, 234, 290, 330, 310],
          //   lineStyle: {
          //     normal: {
          //       color: '#3B7CFF'
          //     }
          //   }
          // }
        ]
      };
      myChart.setOption(option);
    },
    // 数据收益统计
    // 日
    drawLine5 () {
      // 基于准备好的dom，初始化echarts实例
      this.$http.get(`pc/merchant/income`, {
        params: {
          type: 'day',
        }
      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          // console.log(data)
          let x = []
          data.x.forEach(item => {
            x.push(item + ":00")
          })
          let myChart = this.$echarts.init(document.getElementById("myChart5"));
          // 绘制图表
          let option = option = {
            title: {
              text: '本日数据收益统计'
            },
            tooltip: {
              trigger: 'axis'
            },
            color: ['#9013FE', '#3B7CFF'],
            legend: {
              data: ['数据收益', '任务收益']
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
              boundaryGap: false,
              data: x
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: '数据收益',
                type: 'line',
                smooth: true,
                stack: '总量',
                data: data.y,
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
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    // 周
    drawLine6 () {
      this.$http.get(`pc/merchant/income`, {
        params: {
          type: 'week',
        }
      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById("myChart6"));
          // 绘制图表
          let option = option = {
            title: {
              text: '本周数据收益统计'
            },
            tooltip: {
              trigger: 'axis'
            },
            color: ['#9013FE', '#3B7CFF'],
            legend: {
              data: ['数据收益', '任务收益']
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
              boundaryGap: false,
              data: data.x
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: '数据收益',
                type: 'line',
                smooth: true,
                stack: '总量',
                data: data.y,
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
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    // 月
    drawLine7 () {
      this.$http.get(`pc/merchant/income`, {
        params: {
          type: 'month',
        }
      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById("myChart7"));
          // 绘制图表
          let option = option = {
            title: {
              text: '本月数据收益统计'
            },
            tooltip: {
              trigger: 'axis'
            },
            color: ['#9013FE', '#3B7CFF'],
            legend: {
              data: ['数据收益', '任务收益']
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
              boundaryGap: false,
              data: data.x
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: '数据收益',
                type: 'line',
                smooth: true,
                stack: '总量',
                data: data.y,
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
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    // 搜索
    drawLine8 () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart8"));
      // 绘制图表
      let option = option = {
        title: {
          text: '当前数据收益统计'
        },
        tooltip: {
          trigger: 'axis'
        },
        color: ['#9013FE', '#3B7CFF'],
        legend: {
          data: ['数据收益', '任务收益']
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
          boundaryGap: false,
          data: ['0:00-2:00', '2:00-4:00', '4:00-6:00', '6:00-8:00', '8:00-10:00', '10:00-12:00', '12:00-14:00', '14:00-18:00', '18:00-20:00', '20:00-22:00', '22:00-0:00']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '数据收益',
            type: 'line',
            smooth: true,
            stack: '总量',
            data: [820, 932, 901, 934, 1290, 1330, 1320, 230, 210, 200, 1000, 2000, 3000],
            lineStyle: {
              normal: {
                color: '#9013FE'
              }
            }
          },
          {
            name: '任务收益',
            type: 'line',
            smooth: true,
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210, 200, 1000, 2000, 3000],
            lineStyle: {
              normal: {
                color: '#3B7CFF'
              }
            }
          }
        ]
      };
      myChart.setOption(option);
    },
  }
}
</script>

<style lang='scss' module>
.f_bj {
  width: 1200px;
  margin: 0 auto;
  .f_s6 {
    display: inline-block;
    height: 178px;
    margin-top: 20px;
    border-radius: 10px;
    .f_kp {
      height: 178px;
    }
  }
  .f_tb1,
  .f_tb2 {
    margin-top: 35px;
    border-radius: 10px;
  }
  .f_tb1 {
    background-color: #fff;
    .f_rq {
      float: right;
    }
  }
  .f_tb2 {
    background-color: #fff;
    .f_rq1 {
      float: right;
    }
  }
}
.f_tprq {
  float: right;
  margin-top: -10px;
  font-size: 14px;
  color: #3b4859;
  letter-spacing: 0;
  line-height: 30px;
}
.f_tp {
  display: inline-block;
  float: left;
  margin-left: 4%;
  margin-top: 20px;
}
.f_tp1 {
  display: inline-block;
  margin-top: 13%;
  float: left;
}
.f_tp2 {
  display: inline-block;
  margin-top: 11%;
  float: left;
  margin-left: 4%;
}
.f_tp3 {
  display: inline-block;
  margin-top: 15%;
  float: left;
  margin-left: 4%;
}
.f_wz {
  display: inline-block;
  height: 108px;
  margin-left: 20px;
  .f_dd {
    // padding-top: 18px;
    font-size: 14px;
    color: #3b4859;
    letter-spacing: 0;
    line-height: 30px;
  }
  .f_dd3 {
    padding-top: 28px;
    font-size: 14px;
    color: #3b4859;
    letter-spacing: 0;
    line-height: 30px;
  }
  .f_dd1 {
    // margin-top: 20px;
    // padding-top: 18px;
    font-size: 14px;
    color: #3b4859;
    letter-spacing: 0;
    line-height: 30px;
  }
  .f_dd2 {
    // margin-top: 20px;
    font-size: 14px;
    color: #3b4859;
    letter-spacing: 0;
    line-height: 30px;
  }
  p {
    padding: 0;
    padding-top: 7px;
    text-align: left;
  }
  .f_num {
    font-size: 18px;
    color: #9013fe;
    letter-spacing: 0;
    line-height: 12px;
  }
  .f_zz {
    font-size: 14px;
    color: #8392a7;
    letter-spacing: 0;
    line-height: 24px;
  }
}

.f_footer {
  position: relative;
  bottom: 0;
}
.f_cjbt,
.f_sjtj {
  float: left;
  font-size: 18px;
  color: #3b4859;
  letter-spacing: 0;
  line-height: 24px;
  padding-left: 20px;
  padding-top: 20px;
}
</style>
