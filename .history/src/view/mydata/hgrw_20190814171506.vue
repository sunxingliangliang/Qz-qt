<template>
  <div :class="$style.f_bj">
    <!--创建订单 -->
    <div :class="$style.f_cjdd">
      <div :class="$style.f_jb">
        <p style="display: inline-block;">基本信息</p>
        <p :class="$style.f_date">创建时间:{{row.fromDate}}</p>
      </div>
      <el-row :class="$style.f_row">
        <p :class="$style.f_rwmc">任务名称:</p>
        <span>{{row.taskName}}</span>
        <br>
        <p :class="$style.f_rwid">任务编号:</p>
        <span :class="$style.f_span">{{row.taskCode}}</span>
        <p :class="$style.f_rwlangth">采集距离:</p>
        <span :class="$style.f_span">{{row.radius}}米</span>
        <p :class="$style.f_rwlangth">采集数量:</p>
        <span :class="$style.f_span">{{row.dataNum}}</span>
        <div :class="$style.f_hz">
          <p :class="$style.f_hg">回购任务</p>
          <p :class="$style.f_jx" v-if="row.status===0">待采集</p>
          <p :class="$style.f_jx" v-if="row.status===1">进行中</p>
          <p :class="$style.f_jx" v-if="row.status===2">已结束</p>
          <p :class="$style.f_jx" v-if="row.status===3">已取消</p>
          <p :class="$style.f_jx" v-if="row.status===4">失效</p>
        </div>
      </el-row>
      <!-- <p :class="$style.f_jb">代理信息</p>
      <div :class="$style.f_bgnr">
        <el-table :data="tableData" border style="width: 100%;">
          <el-table-column prop="dls" align="center" label="代理商"></el-table-column>
          <el-table-column prop="cjname" align="center" label="场景名称"></el-table-column>
        </el-table>
      </div> -->
      <p :class="$style.f_jb">任务奖励</p>
      <div :class="$style.f_bgnr">
        <el-table :data="missionrewards" border style="width: 100%;">
          <el-table-column prop="price" align="center" label="单条奖励"></el-table-column>
          <el-table-column prop="zjl" align="center" label="剩余奖励/总奖金"></el-table-column>
          <el-table-column prop="totalsurplus" align="center" label="剩余数据/总数据"></el-table-column>
          <el-table-column prop="dataNum" align="center" label="已完成"></el-table-column>
          <el-table-column prop="awarded" align="center" label="已获奖励"></el-table-column>
        </el-table>
      </div>
      <p :class="$style.f_jb">采集时段</p>
      <div :class="$style.f_bgnr">
        <el-table :data="Acquisitionperiod" border style="width: 100%;">
          <el-table-column prop="date" align="center" label="采集日期"></el-table-column>
          <el-table-column prop="time" align="center" label="采集时段"></el-table-column>
        </el-table>
      </div>
      <p :class="$style.f_jb">采集场景</p>
      <div :class="$style.f_bgnr">
        <el-table :data="acquisitionscene" border style="width: 100%;">
          <el-table-column prop="name" align="center" label="类型" width="180">
            <template slot-scope="scope">
              <span v-if="scope.row.industryTypeParent!=''">{{scope.row.industryTypeParent}}</span>
              <span v-if="scope.row.regionTypeParent!=''">{{scope.row.regionTypeParent}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="address" align="center" label="行业">
            <template slot-scope="scope">
              <span v-if="scope.row.industry!=''">{{scope.row.industry}}</span>
              <span v-if="scope.row.region!=''">{{scope.row.region}}</span>
            </template>
            </el-table-column>
          <el-table-column prop="province" align="center" label="省"></el-table-column>
          <el-table-column prop="city" align="center" label="市"></el-table-column>
          <el-table-column prop="area" align="center" label="区"></el-table-column>
          <el-table-column prop="address" align="center" label="场景">
            <template slot-scope="scope">
              <span v-if="scope.row.industryTypeParent!=''">{{scope.row.industryTypeParent}}</span>
              <span v-if="scope.row.regionParent!=''">{{scope.row.regionParent}}</span>
            </template>
            </el-table-column>
          <el-table-column prop="address" align="center" label="场景名称">
            <template slot-scope="scope">
              <span
                :class="$style.f_chakan"
                @click="point(scope.$index, scope.row)"
              >{{scope.row.scencesName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="crowd" align="center" label="人群"></el-table-column>
        </el-table>
      </div>
      <!-- 终端配置 -->
      <p :class="$style.f_jb">采集者信息</p>
     <div :class="$style.f_bgnr">
        <el-table :data="acquisitionscene" border style="width: 100%;">
          <el-table-column prop="name" align="center" label="代理商" width="180">
            <template slot-scope="scope">
              <span v-if="scope.row.industryTypeParent!=''">{{scope.row.industryTypeParent}}</span>
              <span v-if="scope.row.regionTypeParent!=''">{{scope.row.regionTypeParent}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="address" align="center" label="类型">
            <template slot-scope="scope">
              <span v-if="scope.row.industry!=''">{{scope.row.industry}}</span>
              <span v-if="scope.row.region!=''">{{scope.row.region}}</span>
            </template>
            </el-table-column>
          <el-table-column prop="province" align="center" label="区域"></el-table-column>
          <el-table-column prop="city" align="center" label="采集终端"></el-table-column>
          <el-table-column prop="area" align="center" label="采集数量"></el-table-column>
          <el-table-column prop="address" align="center" label="已获奖励">
            <template slot-scope="scope">
              <span v-if="scope.row.industryTypeParent!=''">{{scope.row.industryTypeParent}}</span>
              <span v-if="scope.row.regionParent!=''">{{scope.row.regionParent}}</span>
            </template>
            </el-table-column>
          <el-table-column prop="address" align="center" label="工作状态">
            <template slot-scope="scope">
              <span>{{scope.row.scencesName}}</span>
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
      <!-- <span
        @click="queding"
        style="display: inline-block;margin-left:4.5%;margin-top: 14px;margin-bottom:20px;"
        :class="$style.f_btn"
      >取消</span> -->
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
import tb1  from '../../assets/img/坐标1.gif'
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
      rwid: 12344,
      cjlangth: '5米',
      cjnum: 2000,
      ikon: false,
      id:null,
      row:{},
      missionrewards:[],
      Acquisitionperiod:[],
      acquisitionscene:[],
      Fence: false,
    }
  },
  mounted(){
    this.id = this.$route.query.id
    this.getList()
  },
  methods: {
    getList(){
      this.$http.get(`pc/platform/detail/${this.id}`).then(res=>{
        var{code,data}=res.data
        if(code===1000){
          console.log(data)
          this.row = data
          let obj ={
            price :this.row.price,
            totalsurplus:this.row.dataNum+'/'+this.row.amountCount,
            dataNum:this.row.dataNum,
            awarded:this.row.dataNum*this.row.price
          }
          let Timeslot ={
            date:this.row.fromDate+'至'+this.row.toDate,
            time:this.row.fromTime+':00至'+this.row.toTime+':00'
          }
          let Scenes = {

          }
          this.acquisitionscene = this.row.collectList
          this.missionrewards.push(obj)
          this.Acquisitionperiod.push(Timeslot)
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
    point (index,row) {
      this.Fence = true
      var str = row.lbs
      // var str = '[[{\"lng\":120.360538,\"lat\":36.11021},{\"lng\":120.406244,\"lat\":36.11021},{\"lng\":120.408687,\"lat\":36.083497},{\"lng\":120.356082,\"lat\":36.078596},{\"lng\":120.347459,\"lat\":36.088397}]]'
      var strObj = JSON.parse(str)
      console.log(strObj[0][1].lat)
      console.log(strObj[0][1].lng)
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
      map.centerAndZoom(new BMap.Point(strObj[0][1].lng,strObj[0][1].lat), 14); // 设置中心点
      addMarker(points);
      map.addControl(new BMap.MapTypeControl());
      map.enableScrollWheelZoom(true);
      setTimeout(function () {
        setZoom(bPoints);
      },500)
    },
    stop () {
      this.Fence = false
    },
    shutdown () {
      this.Fence = false
    },
    updatePolygonPath (e) {
      this.polygonPath = e.target.getPath()
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
