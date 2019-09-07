<template>
  <div :class="$style.f_bj">
    <!--创建订单 -->
    <div :class="$style.f_cjdd">
      <div :class="$style.f_jb">
        <p style="display: inline-block;">基本信息</p>
        <p :class="$style.f_date">创建时间:{{createTime}}</p>
      </div>
      <el-row :class="$style.f_row">
        <p :class="$style.f_rwmc">任务名称:</p>
        <span>{{taskName}}</span>
        <br>
        <p :class="$style.f_rwid">任务编号:</p>
        <span :class="$style.f_span">{{taskCode}}</span>
        <p :class="$style.f_rwlangth">采集距离:</p>
        <span :class="$style.f_span">{{radius}}米</span>
        <p :class="$style.f_rwlangth">采集数量:</p>
        <span :class="$style.f_span">{{dataNum}}</span>
        <div :class="$style.f_img">
          <img :src="url" alt style="    max-width: 100%; display: inline-block; max-height: 100%;">
        </div>
        <div :class="$style.f_hz">
          <p :class="$style.f_hg">{{taskType}}</p>
          <p :class="$style.f_jx">{{status}}</p>
          <!-- <p :class="$style.f_jx" v-if="row.status==='1'">进行</p>
          <p :class="$style.f_jx" v-if="row.status==='2'">暂停</p>
          <p :class="$style.f_jx" v-if="row.status==='3'">结束</p>
          <p :class="$style.f_jx" v-if="row.status==='4'&&row.lx==='平台任务'">取消</p>-->
        </div>
      </el-row>
      <p :class="$style.f_jb">代理信息</p>
      <div :class="$style.f_bgnr">
        <el-table :data="tableData2" border style="width: 100%;">
          <el-table-column prop="name" align="center" label="客户"></el-table-column>
          <el-table-column prop="type" align="center" label="客户类型">
            <template slot-scope="scope">
              <span v-if="scope.row.proxyType===1">省级运营中心</span>
              <span v-if="scope.row.proxyType===2">市级运营中心</span>
              <span v-if="scope.row.proxyType===3">市级一般代理商</span>
              <span v-if="scope.row.proxyType===4">大客户</span>
              <span v-if="scope.row.proxyType===5">清竹数据</span>
            </template>
          </el-table-column>
          <el-table-column prop="area" align="center" label="区域"></el-table-column>
        </el-table>
      </div>
      <p :class="$style.f_jb" v-if="platformTask!=null">任务奖励</p>
      <div :class="$style.f_bgnr" v-if="platformTask!=null">
        <el-table :data="tableData" border style="width: 100%;">
          <el-table-column prop="dt" align="center" label="单条奖励(VKT)"></el-table-column>
          <el-table-column prop="zjl" align="center" label="剩余奖励(VKT)/总奖金(VKT)"></el-table-column>
          <el-table-column prop="zsj" align="center" label="剩余数据(VKT)/总数据(VKT)"></el-table-column>
          <el-table-column prop="ywc" align="center" label="已完成(VKT)"></el-table-column>
          <el-table-column prop="yhjl" align="center" label="已获奖励(VKT)"></el-table-column>
        </el-table>
      </div>
      <p :class="$style.f_jb">采集时段</p>
      <div :class="$style.f_bgnr">
        <el-table :data="tableData3" border style="width: 100%;">
          <el-table-column prop="date" align="center" label="采集日期"></el-table-column>
          <el-table-column prop="time" align="center" label="采集时段"></el-table-column>
        </el-table>
      </div>
      <p :class="$style.f_jb">采集场景</p>
      <div :class="$style.f_bgnr">
        <el-table :data="tableData4" border style="width: 100%;">
          <el-table-column align="center" label="省市区" width="180">
            <template slot-scope="scope">
              <span>{{scope.row.province}}/{{scope.row.city}}/{{scope.row.area}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="数据类型">
            <template slot-scope="scope">
              <span v-if="scope.row.type==='1'">区域类型</span>
              <span v-if="scope.row.type==='2'">行业类型</span>
            </template>
          </el-table-column>
          <el-table-column prop="address" align="center" label="行业/区域">
            <template slot-scope="scope">
              <span v-if="scope.row.type==='1'">{{scope.row.regionParent}}/{{scope.row.region}}</span>
              <span v-if="scope.row.type==='2'">{{scope.row.industryType}}/{{scope.row.industry}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="scencesAddress" align="center" label="场景类型">
            <template slot-scope="scope">
              <span v-if="scope.row.type==='1'">{{scope.row.regionParent}}/{{scope.row.regionType}}</span>
              <span
                v-if="scope.row.type==='2'"
              >{{scope.row.industryTypeParent}}/{{scope.row.industryParent}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="scencesName" align="center" label="场景名称">
            <template slot-scope="scope">
              <span
                :class="$style.f_chakan"
                @click="Geofence(scope.$index, scope.row)"
              >{{scope.row.scencesName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="crowd" align="center" label="人群标签"></el-table-column>
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
          @click="adjunction"
          style="display: inline-block;margin-left:4.5%;margin-top: 14px;"
          :class="$style.f_btn"
        >增加</span>
      </el-row>
      <div :class="$style.f_bgnr">
        <el-table :data="terminalform" border style="width: 100%;">
          <el-table-column prop="code" align="center" label="终端编号" width="180"></el-table-column>
          <el-table-column prop="groupName" align="center" label="终端分组" width="180"></el-table-column>
          <el-table-column prop="dataNum" align="center" label="采集数量"></el-table-column>
          <el-table-column align="center" label="采集状态">
            <template slot-scope="scope">
              <span v-if="scope.row.isPosition===1">是</span>
              <span v-if="scope.row.isPosition===2">否</span>
            </template>
          </el-table-column>
          <el-table-column prop="isNet" align="center" label="联网状态">
            <template slot-scope="scope">
              <span v-if="scope.row.isNet===1">
                <i class="gzz"></i>工作中
              </span>
              <span v-if="scope.row.isNet===2">
                <i class="quxiao"></i>断开
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="addressname" align="center" label="位置信息">
            <template slot-scope="scope">
              <span
                :class="$style.f_chakan"
                @click="point(scope.$index, scope.row)"
              >{{scope.row.addressname}}</span>
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
      <el-row :class="$style.f_row" style="padding-bottom:20px;">
        <p :class="$style.f_rwmc" style="vertical-align: top;">备注</p>
        <el-input
          style="width: calc(100% - 7%); margin-top:20px;"
          type="textarea"
          :autosize="{ minRows: 5, maxRows: 10}"
          placeholder="请输入内容"
          v-model="textarea2"
        ></el-input>
      </el-row>
    </div>
    <!-- 地图 -->
    <div class="f_dg">
      <el-dialog title="场景地点" :visible.sync="ikon" width="30%" :before-close="gb">
        <baidu-map class="map" style="height:300px" :center="center" :zoom="18">
          <bm-marker :position="center" :dragging="true" @click="infoWindowOpen">
            <bm-info-window
              :show="show"
              @close="infoWindowClose"
              @open="infoWindowOpen"
            >{{addressname}}</bm-info-window>
          </bm-marker>
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
import axios from 'axios'
import tb1 from '../../assets/img/坐标1.gif'
export default {
  components: {
    footerl
  },
  data () {
    return {
      props3: {
        lazy: true,
        multiple: true,
        lazyLoad (node, resolve) {
          const { level } = node;
          let option = {
            url: 'pc/group/findGroup',
            methods: 'get',
          }
          if (level === 0) {
            option.url = '/pc/group/findGroup'
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
            }
          })
        }
      },
      url: '',
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
      options: [],
      options1: [],
      defaultParams: {
        label: 'name',
        value: 'id',
        children: 'children'
      },
      tableData: [],
      date: '2017-06-03',
      mc: '',
      rwid: '',
      cjlangth: '',
      cjnum: null,
      row: {},
      ikon: false,
      lx: '',
      tableData2: [],
      tableData3: [],
      tableData4: [],
      tableData5: [],
      rwname: "",
      obj: {},
      lat: '',
      lng: '',
      group: '',
      terminalnumber: '',
      condition: '',
      network: '',
      Grouping: {},
      terminalform: [],
      selectedOptions: '',
      ending: [],
      DeviceId: [],
      center: {},
      addressname: '',
      show: true,
      id: '',
      createTime: '',
      taskName: "",
      taskCode: '',
      radius: '',
      dataNum: '',
      taskType: '',
      status: '',
      platformTask: {},
      show: true,
      Fence: false,
      Center: {},
      polygonPath: [],
      devicefrom: {},
      deviceid: null
    }
  },
  mounted () {
    this.getoption();
    this.id = this.$route.query.id
    this.getGrouping();
  },
  methods: {
    queding () {
      console.log(this.selectedOptions)
    },
    getGrouping () {
      this.$http.get(`pc/task/detail/${this.id}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData2.push(data.merchantInfo)
          this.row = data
          this.createTime = data.createTime
          this.taskName = data.taskName
          this.taskCode = data.taskCode
          this.taskName = data.taskName
          this.radius = data.radius
          this.dataNum = data.dataNum
          this.taskType = data.taskType
          this.status = data.status
          this.platformTask = data.platformTask
          this.obj = {
            date: data.fromDate + '至' + data.toDate,
            time: data.fromTime + ':00' + '至' + data.toTime + ':00'
          }
          let money={
            price:data.platformTask.price
          }
          this.tableData3.push(this.obj)
          this.tableData4 = this.row.collectList
          this.tableData5 = this.row.deviceList
          for (let i in this.row.deviceList) {
            this.$jsonp(`http://api.map.baidu.com/geocoder/v2/?ak=1IGwblSXzAV0yxzCq0ZGdYoixoreCQwS&callback=renderReverse&location=${Number(this.row.deviceList[i].lat)},${Number(this.row.deviceList[i].lng)}&output=json&pois=1 `).then(res => {
              // var {code,data}=res.data
              this.addressname = res.result.formatted_address
              this.Grouping = {
                groupName: this.row.deviceList[i].groupName,
                code: this.row.deviceList[i].code,
                dataNum: this.row.deviceList[i].dataNum,
                isNet: this.row.deviceList[i].isNet,
                lat: this.row.deviceList[i].lat,
                lng: this.row.deviceList[i].lng,
                isPosition: this.row.deviceList[i].isPosition,
                addressname: this.addressname
              }
              this.lat = this.Grouping.lat
              this.lng = this.Grouping.lng
              this.terminalform.push(this.Grouping)
              this.selectedOptions = ''
            }).catch((err) => {
              console.log('错误信息' + err)
            })
          }
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    terminal () {
      if (this.selectedOptions.length === 1) {
        // console.log(this.ending)  
        this.$http.get(`/pc/group/findGroup`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            console.log(data)
            data.forEach(item => {
              if (this.selectedOptions[0][0] == item.id) {
                this.group = item.name
              }
            })
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
                this.devicefrom = item
                this.deviceid = item.id
                this.terminalnumber = item.code,
                  this.condition = item.status,
                  this.network = item.isNet,
                  this.lat = item.lat,
                  this.lng = item.lng
                this.DeviceId.push(item.id)
              } else {
                console.log(item)
              }
            })
          }
        }).catch(function (err) {
          console.log('错误信息' + err)
        })
      }
    },
    adjunction () {
      let info = {
        taskId: this.id,
        deviceids: this.deviceid
      }
      this.$http.post(`pc/task/updateDevice`, info).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.$message({
            message: '添加成功',
            type: 'success'
          });
          this.$jsonp(`http://api.map.baidu.com/geocoder/v2/?ak=1IGwblSXzAV0yxzCq0ZGdYoixoreCQwS&callback=renderReverse&location=${this.lat},${this.lng}&output=json&pois=1 `).then(res => {
            // var {code,data}=res.data
            this.addressname = res.result.formatted_address
            this.Grouping = {
              groupName: this.group,
              code: this.terminalnumber,
              status: this.condition,
              isNet: this.network,
              lat: this.lat,
              lng: this.lng,
              addressname: this.addressname,
            }
          }).catch((err) => {
            console.log('错误信息' + err)
          })
          this.devicefrom= this.Grouping
          // this.devicefrom = this.Grouping
          this.terminalform.push(this.Grouping)
          this.selectedOptions = ''
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    infoWindowClose () {
      this.show = false
    },
    infoWindowOpen () {
      this.show = true
    },
    // 地理围栏
    Geofence (index, row) {
      this.Fence = true
      console.log(row)
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
    async getoption () {
      var res = await this.$http.request({
        url: '/pc/group/findGroup',
        methods: 'get'
      });
      var { meta, data } = res.data
      if (res.data.code === 1000) {
        this.options1 = data
        for (let i in this.options1) {
          for (let i in data) {
            this.options1[i].value = data[i].id
            this.options1[i].label = data[i].name
            this.options1[i].children = []
          }
        }
      }
    },
    cli1 () {
      console.log(1)
    },
    Delete (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(row)
      let info = {
        taskId: this.id,
        devCode: row.code,
      }
      this.$http.post(`pc/task/delDevice`,info).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          // this.$message({
          //   message: '已删除',
          //   type: 'success'
          // });
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    point (index, row) {
      console.log(row)
      this.center = {
        lat: Number(row.lat),
        lng: Number(row.lng)
      }
      this.addressname = row.addressname
      console.log(this.center)
      this.ikon = true
    },
    gb () {
      this.ikon = false
    }
  },
  created () {
    this.row = this.$route.query.row
    console.log(this.row)
  },
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
.f_chakan {
  font-size: 14px;
  color: #3b7cff;
  letter-spacing: 0;
  cursor: pointer;
}
.f_jz {
  margin-top: 20px;
  text-align: center;
}
.f_img {
  width: 150px;
  display: inline-block;
  width: 18%;
  height: 97px;
  vertical-align: text-top;
  margin-left: 20px;
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
</style>
