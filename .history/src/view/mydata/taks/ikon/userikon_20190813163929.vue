<template>
  <div>
    <!-- 用户画像 -->
    <div>
      <div :class="$style.f_hx1">
        <span :class="$style.f_mc">{{mc}}</span>
        <div id="myChart" style="position: static; width:100%;height:300px;"></div>
      </div>
      <div :class="$style.f_hx1">
        <span :class="$style.f_mc">{{mc1}}</span>
        <div id="myChart1" style="position: static; width:100%;height:300px;"></div>
      </div>
      <div :class="$style.f_hx1">
        <span :class="$style.f_mc">{{mc2}}</span>
        <div id="myChart2" style="position: static; width:100%;height:300px;"></div>
      </div>
      <div :class="$style.f_hx1">
        <span :class="$style.f_mc">{{mc3}}</span>
        <div id="myChart3" style="position: static; width:100%;height:300px;"></div>
      </div>
      <div :class="$style.f_hx1">
        <span :class="$style.f_mc">{{mc4}}</span>
        <div id="myChart4" style="position: static; width:100%;height:300px;"></div>
      </div>
      <div :class="$style.f_hx1">
        <span :class="$style.f_mc">{{mc5}}</span>
        <div id="myChart5" style="position: static; width:100%;height:300px;"></div>
      </div>
      <div :class="$style.f_hx2">
        <span :class="$style.f_mc">{{mc6}}</span>
        <div id="myChart6" style="position: static; width:100%;height:500px;"></div>
      </div>
      <div :class="$style.f_hx2">
        <span :class="$style.f_mc">{{mc7}}</span>
        <div id="myChart7" style="position: static; width:100%;height:500px;"></div>
      </div>
    </div>
    <div :class="$style.f_jz">
    </div>
  </div>
</template>

<script>
import footerl from '../../../footer/footerl'
export default {
  components: {
    footerl
  },
  data () {
    return {
      mc: '性别',
      mc1: '年龄',
      mc2: '学历',
      mc3: '收入',
      mc4: '子女',
      mc5: '汽车',
      mc6: '职业',
      mc7: '人群',
      array: [],
      id: '',
      agebin: [],
      car: [],
      edu: [],
      gender: [],
      income: [],
      kids: [],
      occupation: [],
      segment: []
    }
  },
  mounted () {
    this.id = this.$store.state.id
    this.getList()
  },
  methods: {
    getList () {
      this.$http.get(`modules/persona/dataView?orderId=${this.id}&type=basic`,{params:{
        orderId:this.id,
        type:
      }}).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.agebin = data.agebin
          this.car = data.car
          this.edu = data.edu
          this.gender = data.gender
          this.income = data.income
          this.kids = data.kids
          this.occupation = data.occupation
          this.segment = data.segment
          // 性别
          let sex = []
          sex.push(this.gender[0].name, this.gender[1].name)
          this.gender.forEach(item => {
            item.value = item.y
          })
          let myChart = this.$echarts.init(document.getElementById("myChart"));
          let option = {
            color: ['#8E16FE', ' #8C99AD'], //环形图每块的颜色
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
              orient: 'horizontal', //图例列表的布局朝向。 horizontal - 横向 ， vertical - 竖向
              x: 'center', // 居中显示
              bottom: 10, //  距离底部距离
              data: sex
            },
            series: [
              {
                name: '访问来源',
                type: 'pie',
                center: ['50%', '45%'], // 饼图定位
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '30',
                      fontWeight: 'bold'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: this.gender
              }
            ]
          };
          myChart.setOption(option);
          // 年龄
          let age = []
          age.push(this.agebin[0].name, this.agebin[1].name, this.agebin[2].name, this.agebin[3].name, this.agebin[4].name, )
          this.agebin.forEach(item => {
            item.value = item.y
          })
          let myChart1 = this.$echarts.init(document.getElementById("myChart1"));
          let option1 = {
            color: ['#8C99AD', '#41E0FC ', '#0079FE', '#B8E986', '#FF8F00'], //环形图每块的颜色
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
              orient: 'horizontal', //图例列表的布局朝向。 horizontal - 横向 ， vertical - 竖向
              x: 'center', // 居中显示
              bottom: 10, //  距离底部距离
              data: age
            },
            series: [
              {
                name: '访问来源',
                type: 'pie',
                center: ['50%', '45%'], // 饼图定位
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '30',
                      fontWeight: 'bold'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: this.agebin
              }
            ]
          };
          myChart1.setOption(option1);
          // 学历
          let Education = []
          Education.push(this.edu[0].name, this.edu[1].name, this.edu[2].name, this.edu[3].name, )
          this.edu.forEach(item => {
            item.value = item.y
          })
          let myChart2 = this.$echarts.init(document.getElementById("myChart2"));
          let option2 = {
            color: ['#8C99AD', '#41E0FC ', '#B8E986 ', '#FF8F00'], //环形图每块的颜色
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
              orient: 'horizontal', //图例列表的布局朝向。 horizontal - 横向 ， vertical - 竖向
              x: 'center', // 居中显示
              bottom: 10, //  距离底部距离
              data: Education
            },
            series: [
              {
                name: '访问来源',
                type: 'pie',
                center: ['50%', '45%'], // 饼图定位
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '30',
                      fontWeight: 'bold'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: this.edu
              }
            ]
          };
          myChart2.setOption(option2);
          // 汽车
          let automobile = []
          automobile.push(this.car[0].name, this.car[1].name)
          this.car.forEach(item => {
            item.value = item.y
          })
          let myChart3 = this.$echarts.init(document.getElementById("myChart5"));
          let option3 = {
            color: ['#8392A7', '#0079FE '], //环形图每块的颜色
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
              orient: 'horizontal', //图例列表的布局朝向。 horizontal - 横向 ， vertical - 竖向
              x: 'center', // 居中显示
              bottom: 10, //  距离底部距离
              data: automobile
            },
            series: [
              {
                name: '访问来源',
                type: 'pie',
                center: ['50%', '45%'], // 饼图定位
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '30',
                      fontWeight: 'bold'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: this.car
              }
            ]
          };
          myChart3.setOption(option3);
          // 薪资
          let revenue = []
          revenue.push(this.income[0].name, this.income[1].name, this.income[2].name, this.income[3].name, this.income[4].name, )
          this.income.forEach(item => {
            item.value = item.y
          })
          let myChart4 = this.$echarts.init(document.getElementById("myChart3"));
          let option4 = {
            color: ['#0079FE', '#41E0FC ', '#B8E986', '#FF8F00', '#659030'], //环形图每块的颜色
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
              orient: 'horizontal', //图例列表的布局朝向。 horizontal - 横向 ， vertical - 竖向
              x: 'center', // 居中显示
              bottom: 10, //  距离底部距离
              data: revenue
            },
            series: [
              {
                name: '访问来源',
                type: 'pie',
                center: ['50%', '45%'], // 饼图定位
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '24',
                      fontWeight: 'bold',
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: this.income
              }
            ]
          };
          myChart4.setOption(option4);
          // 子女
          let child = []
          child.push(this.kids[0].name, this.kids[1].name, this.kids[2].name, this.kids[3].name, this.kids[4].name)
          this.kids.forEach(item => {
            item.value = item.y
          })
          let myChart5 = this.$echarts.init(document.getElementById("myChart4"));
          let option5 = {
            color: ['#8392A7', '#41E0FC ', '#8E16FE', '#B8E986', '#FF8F00'], //环形图每块的颜色
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
              orient: 'horizontal', //图例列表的布局朝向。 horizontal - 横向 ， vertical - 竖向
              x: 'center', // 居中显示
              bottom: 10, //  距离底部距离
              data: child
            },
            series: [
              {
                name: '访问来源',
                type: 'pie',
                center: ['50%', '45%'], // 饼图定位
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '16',
                      fontWeight: 'bold'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: this.kids
              }
            ]
          };
          myChart5.setOption(option5);
          // 职业
          let Career = []
          Career.push(this.occupation[0].name, this.occupation[1].name, this.occupation[2].name, this.occupation[3].name, this.occupation[4].name, this.occupation[5].name, this.occupation[6].name, this.occupation[7].name, this.occupation[8].name)
          this.occupation.forEach(item => {
            item.value = item.y
          })
          let myChart6 = this.$echarts.init(document.getElementById("myChart6"));
          let option6 = {
            color: ['#8392A7', '#41E0FC ', '#8E16FE', '#B8E986', '#FF8F00','#B52780','#F6D707','#EC3829','#8C5207'],
            title: {
              x: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              type: 'scroll',
              orient: 'vertical',
              right: 10,
              top: 20,
              bottom: 20,
              data: Career,

              selected: Career
            },
            series: [
              {
                name: '姓名',
                type: 'pie',
                radius: '55%',
                center: ['43%', '50%'],
                data: this.occupation,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
          myChart6.setOption(option6);
          // 人群
          let crowd = []
          this.segment.forEach(item => {
            crowd.push(item.name)
            item.value = item.y
          })
          let myChart7 = this.$echarts.init(document.getElementById("myChart7"));
          let option7 = {
            color: ['#8392A7', '#41E0FC ', '#8E16FE', '#B8E986', '#FF8F00','#B52780','#F6D707','#EC3829','#8C5207'],
            title: {
              x: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              type: 'scroll',
              orient: 'vertical',
              right: 10,
              top: 20,
              bottom: 20,
              data: crowd,

              selected: crowd
            },
            series: [
              {
                name: '姓名',
                type: 'pie',
                radius: '55%',
                center: ['43%', '50%'],
                data: this.segment,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
          myChart7.setOption(option7);
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    drawLine () {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      let option = {
        color: ['#8E16FE', ' #8C99AD'], //环形图每块的颜色
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'horizontal', //图例列表的布局朝向。 horizontal - 横向 ， vertical - 竖向
          x: 'center', // 居中显示
          bottom: 10, //  距离底部距离
          data: ['男', '女']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            center: ['50%', '45%'], // 饼图定位
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: '男' },
              { value: 310, name: '女' },
            ]
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine1 () {
      let myChart = this.$echarts.init(document.getElementById("myChart1"));
      let option = {
        color: ['#8C99AD', '#41E0FC ', '#0079FE', '#B8E986', '#FF8F00'], //环形图每块的颜色
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'horizontal', //图例列表的布局朝向。 horizontal - 横向 ， vertical - 竖向
          x: 'center', // 居中显示
          bottom: 10, //  距离底部距离
          data: ['18岁以下', '18-24岁以上', '25岁到34岁', '35岁-44岁', '45岁以上']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            center: ['50%', '45%'], // 饼图定位
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: '18岁以下' },
              { value: 310, name: '18-24岁以上' },
              { value: 234, name: '25岁到34岁' },
              { value: 234, name: '35岁-44岁' },
              { value: 234, name: '45岁以上' }
            ]
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine2 () {
      let myChart = this.$echarts.init(document.getElementById("myChart2"));
      let option = {
        color: ['#8C99AD', '#41E0FC ', '#B8E986 ', '#FF8F00'], //环形图每块的颜色
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'horizontal', //图例列表的布局朝向。 horizontal - 横向 ， vertical - 竖向
          x: 'center', // 居中显示
          bottom: 10, //  距离底部距离
          data: ['硕士及以上', '本科', '高中及以下', '专科']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            center: ['50%', '45%'], // 饼图定位
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: '硕士及以上' },
              { value: 310, name: '本科' },
              { value: 234, name: '高中及以下' },
              { value: 234, name: '专科' }
            ]
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine3 () {
      let myChart = this.$echarts.init(document.getElementById("myChart3"));
      let option = {
        color: ['#0079FE', '#41E0FC ', '#B8E986', '#FF8F00'], //环形图每块的颜色
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'horizontal', //图例列表的布局朝向。 horizontal - 横向 ， vertical - 竖向
          x: 'center', // 居中显示
          bottom: 10, //  距离底部距离
          data: ['20k以上', '5-10k', '小于3k', '10-20k']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            center: ['50%', '45%'], // 饼图定位
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '24',
                  fontWeight: 'bold',
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: '20k以上' },
              { value: 310, name: '5-10k' },
              { value: 234, name: '小于3k' },
              { value: 234, name: '10-20k' }
            ]
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine4 () {
      let myChart = this.$echarts.init(document.getElementById("myChart4"));
      let option = {
        color: ['#8392A7', '#41E0FC ', '#8E16FE', '#B8E986', '#FF8F00'], //环形图每块的颜色
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'horizontal', //图例列表的布局朝向。 horizontal - 横向 ， vertical - 竖向
          x: 'center', // 居中显示
          bottom: 10, //  距离底部距离
          data: ['13-17岁(初/高中生)', '0-3岁(婴幼儿)', '无小孩', '4-6岁', '45岁以上']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            center: ['50%', '45%'], // 饼图定位
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '16',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: '13-17岁(初/高中生)' },
              { value: 310, name: '0-3岁(婴幼儿)' },
              { value: 234, name: '无小孩' },
              { value: 234, name: '4-6岁' },
              { value: 234, name: '45岁以上' }
            ]
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine5 () {
      let myChart = this.$echarts.init(document.getElementById("myChart5"));
      let option = {
        color: ['#8392A7', '#0079FE '], //环形图每块的颜色
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'horizontal', //图例列表的布局朝向。 horizontal - 横向 ， vertical - 竖向
          x: 'center', // 居中显示
          bottom: 10, //  距离底部距离
          data: ['有', '无']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            center: ['50%', '45%'], // 饼图定位
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: '有' },
              { value: 310, name: '无' },
            ]
          }
        ]
      };
      myChart.setOption(option);
    },

  }
}
</script>

<style lang='scss' module>
.f_hx1 {
  width: 30%;
  border: 1px solid #e6e9f0;
  display: inline-block;
  margin-top: 20px;
  margin-right: 2%;
  margin-bottom: 30px;
  height: 330px;
  .f_mc {
    float: left;
    padding-top: 10px;
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
    height: 60px;
    line-height: 60px;
    span {
      font-size: 15px;
      color: #1f2e4d;
      letter-spacing: 0;
      text-align: center;
    }
    .f_z {
      float: left;
      padding-left: 2%;
    }
    .f_y {
      float: right;
      padding-right: 7%;
    }
  }
}
.f_hx2 {
  width: 564px;
  border: 1px solid #e6e9f0;
  display: inline-block;
  margin-top: 20px;
  // margin-right: 2%;
  margin-bottom: 30px;
  height: 530px;
  .f_mc {
    float: left;
    padding-top: 10px;
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
    height: 60px;
    line-height: 60px;
    span {
      font-size: 15px;
      color: #1f2e4d;
      letter-spacing: 0;
      text-align: center;
    }
    .f_z {
      float: left;
      padding-left: 2%;
    }
    .f_y {
      float: right;
      padding-right: 7%;
    }
  }
}
.f_jz {
  margin-top: 20px;
  text-align: center;
}
</style>
