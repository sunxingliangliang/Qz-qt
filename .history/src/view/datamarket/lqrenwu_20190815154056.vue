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
              <span v-if="scope.row.type==2">行业数据</span>
            </template>
          </el-table-column>
          <el-table-column prop="regionParent" align="center" label="行业/区域"></el-table-column>
          <el-table-column prop="region" align="center" label="行业/区域(细分)"></el-table-column>
          <el-table-column prop="regionTypeParent" align="center" label="场景"></el-table-column>
          <el-table-column prop="regionType" align="center" label="场景(细分)"></el-table-column>
          <el-table-column prop="crowd" align="center" label="人群标签"></el-table-column>
          <el-table-column prop="scencesName" align="center" label="场景名称">
            <template slot-scope="scope">
              <span
                :class="$style.f_chakan"
                @click="Geofence(scope.$index, scope.row)"
              >{{scope.row.scencesName}}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <span :class="$style.f_delete" @click="Delete(scope.$index, scope.row)">删除</span>
            </template>
          </el-table-column>-->
        </el-table>
      </div>
      <!-- 终端配置 -->
      <p :class="$style.f_jb">终端配置</p>
      <el-row :class="$style.f_row">
        <p :class="$style.f_rwmc">采集终端</p>
         <el-cascader
          style="width:900px"
          :change-on-select="true"
          :options="ending"
          :props="props3"
          @change="terminal"
          v-model="selectedOptions"
          clearable
        ></el-cascader>
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
    <!-- 地理围栏 -->
    <div class="f_dg" :class="$style.f_map" v-show="Fence">
      <div :class="$style.f_backdrop" @click="stop"></div>
      <div id="allmap" style="height:400px;"></div>
    </div>
    <div :class="$style.f_jz">
      <footerl/>
    </div>
  </div>
</template>

<script>
import footerl from '../footer/footerl'
import tb1 from '../../assets/img/坐标1.gif'
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
      Acquisition: [],
      ikon: false,
      id: '',
      taskname: '',
      taskserial: '',
      removing: "",
      startTime: '',
      endTime: '',
      Fence:false,
      ending: [],
      selectedOptions: '',
      props3: {
        lazy: true,
        multiple: true,
        lazyLoad (node, resolve) {
          const { level } = node;
          let option = {
            url: 'pc/group/findGroup',
            methods: 'get',
            data: {
              groupId: level
            }
          }
          if (level === 0) {
            option.url = '/pc/group/findGroup'
            option.data = {}
          } else if (level === 1) {
            option.url = `pc/group/findDevicesByGroup`,
              option.params = {
                groupId: node.value
              }
          }
          axios(option).then(res => {
            let { meta, data, code } = res.data
            if (code === 1000) {
              const nodes = Array.from({ length: data.length })
                .map((item, i) => ({
                  value: data[i].id,
                  label: level ? data[i].code : data[i].name,
                  leaf: level >= 1
                }));
              // 通过调用resolve将子节点数据返回，通知组件数据加载完成
              resolve(nodes);
            } else if (code == 2001) {
              this.$message.error(res.data.message);
              window.sessionStorage.clear();
              window.localStorage.clear();
              this.$router.push('/')
            } else {
              this.$message.error(res.data.message);
            }
          })
        }
      },
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
    // 地理围栏
    Geofence (index, row) {
      this.Fence = true
      console.log(this.scencesBaseId)
      var str = row.lbs
      // var str = '[[{\"lng\":120.360538,\"lat\":36.11021},{\"lng\":120.406244,\"lat\":36.11021},{\"lng\":120.408687,\"lat\":36.083497},{\"lng\":120.356082,\"lat\":36.078596},{\"lng\":120.347459,\"lat\":36.088397}]]'
      var strObj = JSON.parse(str)
      var points = strObj[0];
      // 百度坐标系坐标(地图中需要使用这个)
      var bPoints = new Array();
      //创建标注点并添加到地图中
      function addMarker (points) {
        //循环建立标注点
        // points.forEach(item=>{
        // console.log(item)
        var polygon = new BMap.Polygon(points, { strokeColor: "red", strokeWeight: 2, strokeOpacity: 0.5 });  //创建多边形
        map.addOverlay(polygon);   //增加多边形
        // })
        for (var i = 0, pointsLen = points.length; i < pointsLen; i++) {
          var point = new BMap.Point(points[i].lng, points[i].lat); //将标注点转化成地图上的点
          bPoints.push(point); // 添加到百度坐标数组 用于自动调整缩放级别
          // console.log(bPoints)
          var myIcon = new BMap.Icon(tb1, new BMap.Size(20, 32), { //图片大小 
            anchor: new BMap.Size(10, 25),  //标注相对point的偏移位置
          });
          myIcon.setImageSize(new BMap.Size(20, 32))
          var marker = new BMap.Polygon(point); //将点转化成标注点
          map.addOverlay(marker);  //将标注点添加到地图上
          // marker.addEventListener("mouseout", attribute1);
        }
      }
      // 根据点的数组自动调整缩放级别
      function setZoom (bPoints) {
        var view = map.getViewport(eval(bPoints));
        var mapZoom = view.zoom;
        var centerPoint = view.center;
        map.centerAndZoom(centerPoint, mapZoom);
      }
      //创建地图

      var map = new BMap.Map("allmap");
      map.centerAndZoom(new BMap.Point(112.591886, 26.905407), 14); // 设置中心点
      addMarker(points);
      map.addControl(new BMap.MapTypeControl());
      map.enableScrollWheelZoom(true);
      setTimeout(function () {
        setZoom(bPoints);
      }, 3000)
    },
    stop () {
      this.Fence = false
    },
    updatePolygonPath (e) {
      this.polygonPath = e.target.getPath()
    },
    shutdown () {
      this.Fence = false
    },
    terminal () {
      if (this.selectedOptions.length === 1) {
        // console.log(this.ending)  
        this.$http.get(`/pc/group/findGroup`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            data.forEach(item => {
              if (this.selectedOptions[0][0] == item.id) {
                this.group = item.name
              }
            })
          } else if (code == 2001) {
            this.$message.error(res.data.message);
            window.sessionStorage.clear();
            window.localStorage.clear();
            this.$router.push('/')
          } else {
            this.$message.error(res.data.message);
          }
        }).catch(function (err) {
          console.log('错误信息' + err)
        })
        this.$http.get(`pc/group/findDevicesByGroup`, {          params: {
            groupId: this.selectedOptions[0][0]
          }        }).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            data.forEach(item => {
              if (this.selectedOptions[0][1] === item.id) {
                this.Groupingend = []
                this.terminalobj = item
                this.terminalnumber = item.code,
                  this.condition = item.status,
                  this.network = item.isNet,
                  this.lat = item.lat,
                  this.lng = item.lng
                this.DeviceId.push(item.id)
              } else {
                console.log(item)
                this.Groupingend.push(item)
              }
              this.terminalform.forEach(item1 => {
                if (item.code === item1.code) {
                  // this.terminalobj = {}
                  this.repeat = '重复'
                }
              })
              // console.log(data)
              // this.Groupingend = data
            })
          } else if (code == 2001) {
            this.$message.error(res.data.message);
            window.sessionStorage.clear();
            window.localStorage.clear();
            this.$router.push('/')
          } else {
            this.$message.error(res.data.message);
          }
        }).catch(function (err) {
          console.log('错误信息' + err)
        })
      }
    },
    adjunction () {
      let arr = []
      console.log(this.Groupingend)
      if (this.repeat === '重复') {
        this.$message.error('不能添加重复的设备');
        // console.log(this.terminalobj)
      } else if (this.Groupingend != []) {
        let lat = ''
        let lng = ''
        this.Groupingend.forEach(item => {
          lat = item.lat
          lng = item.lng
          this.$jsonp(`http://api.map.baidu.com/geocoder/v2/?ak=1IGwblSXzAV0yxzCq0ZGdYoixoreCQwS&callback=renderReverse&location=${lat},${lng}&output=json&pois=1 `).then(res => {
            // var {code,data}=res.data
            // this.addressname = res.result.formatted_address
            // console.log(res.result.formatted_address)
            item.addressname = res.result.formatted_address
            this.Grouping = {
              name: this.group,
              code: item.code,
              status: item.status,
              isNet: item.isNet,
              lat: item.lat,
              lng: item.lng,
              addressname: item.addressname
            }
            this.terminalform.push(this.Grouping)
            this.selectedOptions = ''
          }).catch((err) => {
            console.log('错误信息' + err)
          })
          // console.log(item)

        })
      } else {
        this.$jsonp(`http://api.map.baidu.com/geocoder/v2/?ak=1IGwblSXzAV0yxzCq0ZGdYoixoreCQwS&callback=renderReverse&location=${this.lat},${this.lng}&output=json&pois=1 `).then(res => {
          // var {code,data}=res.data
          this.addressname = res.result.formatted_address
          this.Grouping = {
            name: this.group,
            code: this.terminalnumber,
            status: this.condition,
            isNet: this.network,
            lat: this.lat,
            lng: this.lng,
            addressname: this.addressname
          }
          this.terminalobj = this.Grouping
          this.terminalform.push(this.terminalobj)
          // this.terminalform.forEach(item => {
          //   console.log(item.code)
          //   if (this.Grouping.code === item.code) {
          //     console.log('该设备已添加，请勿重复添加')
          //   } else {
          //     this.terminalform.push(this.Grouping)
          //   }
          // })
          this.selectedOptions = ''
          // console.log(this.terminalform)
        }).catch((err) => {
          console.log('错误信息' + err)
        })
      }
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
.f_backdrop {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #000;
  z-index: 0;
  top: 0;
  left: 0;
  opacity: 0.7;
}
.f_map {
  width: 700px;
  height: 400px;
  position: fixed;
  top: 20%;
  background: #fff;
  z-index: 3;
  left: 30%;
}
.f_chakan {
  font-size: 14px;
  color: #3b7cff;
  letter-spacing: 0;
  cursor: pointer;
}
</style>
