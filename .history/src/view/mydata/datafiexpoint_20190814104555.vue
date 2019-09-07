<template>
  <div :class="$style.f_bj">
    <!--创建订单 -->
    <div :class="$style.f_cjdd">
      <div :class="$style.f_bzt">
        <el-steps :active="1" align-center>
          <el-step
            title="提交订单"
            icon="iconfont icontijiao"
            :description="create_time"
            style="flex-basis: 30%; margin-right: 0px;"
          ></el-step>
          <el-step
            title="订单审批"
            icon="iconfont iconshenpi"
            :description="pass"
            style="flex-basis: 30%; margin-right: 0px;"
          ></el-step>
          <el-step
            title="订单查看"
            icon="iconfont iconchakan"
            :description="end"
            style="flex-basis: 30%; margin-right: 0px;"
          ></el-step>
        </el-steps>
      </div>
      <div :class="$style.f_jb">
        <p style="display: inline-block;">基本信息</p>
        <p :class="$style.f_date">创建时间:{{create_time}}</p>
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
          <!-- <p :class="$style.f_hg">订单状态</p>
          <p :class="$style.f_jx" v-if="row.status==='1'">进行</p>
          <p :class="$style.f_jx" v-if="row.status==='2'">暂停</p>
          <p :class="$style.f_jx" v-if="row.status==='3'">结束</p>
          <p :class="$style.f_jx" v-if="row.status==='4'&&row.lx==='平台任务'">取消</p>-->
        </div>
      </div>
      <div :class="$style.f_bgnr" style="text-align: left;">
        <p :class="$style.f_rwid">代理商:</p>
        <span :class="$style.f_span">{{row.merchantName}}</span>
        <p :class="$style.f_rwlangth">代理类型:</p>
        <span :class="$style.f_span" v-if="row.merchantType ===1">省级运营中心</span>
        <span :class="$style.f_span" v-if="row.merchantType ===2">市级运营中心</span>
        <span :class="$style.f_span" v-if="row.merchantType ===3">市级一般代理商</span>
        <span :class="$style.f_span" v-if="row.merchantType ===4">大客户</span>
        <span :class="$style.f_span" v-if="row.merchantType ===5">清竹数据</span>
        <p :class="$style.f_rwlangth">区域:</p>
        <span :class="$style.f_span">{{row.area}}</span>
        <!-- <el-table :data="tableData" border style="width: 100%;">
          <el-table-column prop="dls" align="center" label="代理商"></el-table-column>
          <el-table-column prop="cjname" align="center" label="代理类型"></el-table-column>
          <el-table-column prop="cjname" align="center" label="区域"></el-table-column>
        </el-table>-->
      </div>

      <p :class="$style.f_jb">数据信息</p>
      <el-row :class="$style.f_row">
        <p :class="$style.f_rwmc">采集终端</p>
        <el-cascader
          style="margin-top: 14px;"
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
        <el-table :data="tableData" border style="width: 100%;">
          <el-table-column prop="code" align="center" label="终端编号"></el-table-column>
          <el-table-column prop="groupName" align="center" label="终端分组"></el-table-column>
          <el-table-column align="center" label="工作状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status===1">采集中</span>
              <span v-if="scope.row.status===2">未采集</span>
            </template>
          </el-table-column>
          <el-table-column prop="isNet" align="center" label="联网状态"></el-table-column>
          <el-table-column align="center" label="位置信息">
            <template slot-scope="scope">
              <span
                :class="$style.f_chakan"
                @click="point1(scope.$index, scope.row)"
              >{{scope.row.addressname}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="dataNum" align="center" label="采集数据量(当天)"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <span :class="$style.f_delete" @click="handleDelete(scope.$index, tableData)">删除</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <p :class="$style.f_jb">操作信息</p>
      <div :class="$style.f_bgnr" style="padding-bottom:20px;">
        <el-table :data="record" border style="width: 100%;">
          <el-table-column prop="userName" align="center" label="操作者" width="180"></el-table-column>
          <el-table-column prop="createTime" align="center" label="操作时间"></el-table-column>
          <el-table-column prop="cz" align="center" label="操作">
            <template slot-scope="scope">
              <span v-if="scope.row.operationType===1">
                <i class="zanting"></i>审批
              </span>
              <span v-if="scope.row.operationType===2">
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
        @click="edit"
        style="display: inline-block;margin-left:4.5%;margin-top: 14px;margin-bottom:20px;"
        :class="$style.f_btn"
        v-if="status===2"
      >编辑</span>
      <span
        @click="strike"
        style="display: inline-block;margin-left:4.5%;margin-top: 14px;margin-bottom:20px;"
        :class="$style.f_btn"
        v-if="status===2"
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
          <span :class="$style.f_ddname">订购金额：</span>
          <span :class="$style.f_ddname" v-if="dgmoney!=null">{{dgmoney}}VKT</span>
        </el-row>
        <p :class="$style.f_sjxx" style="margin-top:20px;">终端信息</p>
        <el-row style="text-align: left;">
          <el-cascader
            style="margin-top: 14px;"
            :change-on-select="true"
            :options="ending"
            :props="props3"
            @change="terminal"
            v-model="selectedOptions"
            clearable
          ></el-cascader>
          <span
            @click="adjunction"
            style="float: right;  margin-bottom: 10px;display: inline-block;margin-left:4.5%;margin-top: 14px;"
            :class="$style.f_btn1"
          >增加</span>
        </el-row>
        <div :class="$style.f_bgnr">
          <el-table :data="terminalform" border style="width: 100%;">
            <el-table-column prop="code" align="center" label="终端编号" width="180"></el-table-column>
            <el-table-column prop="name" align="center" label="终端分组"></el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <span :class="$style.f_delete" @click="deleteRow(scope.$index, terminalform)">删除</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
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
    <!-- 地图 -->
    <div class="f_dg">
      <el-dialog title="场景地点" :visible.sync="ikon" width="30%" :before-close="gb">
        <baidu-map class="map" style="height:300px" :center="center" :zoom="18">
          <bm-marker :position="center" :dragging="true" @click="infoWindowOpen">
            <bm-info-window
              :show="show"
              @close="infoWindowClose"
              @open="infoWindowOpen"
            >{{formatted_address}}</bm-info-window>
          </bm-marker>
        </baidu-map>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import footerl from '../footer/footerl'
import axios from 'axios'
export default {
  components: {
    footerl
  },
  data () {
    return {
      input1: "",
      input: '',
      value: '',
      value1: '',
      value2: '',
      adress: '',
      quyu: '',
      mingcheng: '',
      leixing: '',
      selectedOptions: '',
      textarea2: '',
      options: [],
      tableData: [],
      record: [],
      date: '2017-06-03',
      mc: '青岛展柜高端人群数据采集',
      rwid: 12344,
      cjlangth: '5米',
      cjnum: 2000,
      active: 2,
      sjxq: false,
      dgmoney: null,
      row: {},
      ysjl: {},
      id: '',
      addressname: "",
      Grouping: {},
      create_time: '',
      terminalform: [],
      pass: '',
      end: '',
      terminalnumber: '',
      condition: '',
      network: '',
      lat: '',
      lng: "",
      DeviceId: [],
      news: {},
      formatted_address: '',
      center: {},
      ikon: false,
      Center: {},
      show: true,
      status: null,
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
      ending: [],
      Id: '',
      repeat: '',
      Groupingend: [],
      terminalobj: {}
    }
  },
  created () {
    this.id = this.$store.state.id
    this.status = this.$route.query.status
    this.getList()
  },
  methods: {
    getList () {
      this.$http.get(`pc/fixed/selectFixedById`, {        params: {
          taskId: this.id
        }      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          // console.log(data)
          this.row = data.name
          this.record = data.record
          this.create_time = data.timePoint.create_time
          this.pass = data.timePoint.pass
          this.end = data.timePoint.end
          data.decice.forEach(item => {
            let lat = item.lat
            let lng = item.lng
            this.$jsonp(`http://api.map.baidu.com/geocoder/v2/?ak=1IGwblSXzAV0yxzCq0ZGdYoixoreCQwS&callback=renderReverse&location=${lat},${lng}&output=json&pois=1 `).then(res => {
              // console.log(res.result.formatted_address)
              this.formatted_address = res.result.formatted_address
              this.Grouping = {
                name: item.groupName,
                code: item.code,
                status: item.status,
                isNet: item.isNet,
                lat: lat,
                lng: lng,
                dataNum: item.dataNum,
                addressname: this.formatted_address
              }
              this.tableData.push(this.Grouping)
            }).catch((err) => {
              console.log('错误信息' + err)
            })
          })
          // console.log(this.tableData)
          if (this.create_time != undefined) {
            this.active = 1
          }
          if (this.pass != undefined) {
            this.active = 2
          }
          if (this.end != undefined) {
            this.active = 3
          }
        } else if (code == 2001) {
          this.$message.error(res.data.message);
          window.sessionStorage.clear();
          window.localStorage.clear();
          this.$router.push('/')
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    terminal () {
      if (this.selectedOptions.length === 1) {
        this.$http.get(`/pc/group/findGroup`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            data.forEach(item => {
              if (this.selectedOptions[0][0] == item.id) {
                this.group = item.name
              }
            })
            console.log(1)
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
                this.Id = item.id
                this.DeviceId.push(item.id)
              } else {
                console.log(item)
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
      }
    },
    adjunction () {
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
          addressname: this.addressname,
          id: this.Id
        }
        this.tableData.push(this.Grouping)
        this.selectedOptions = ''
        console.log(this.DeviceId)
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    Delete (index, row) {
      console.log(index, row)
    },
    handleDelete (index, rows) {
      rows.splice(index, 1);
    },
    deleteRow (index, rows) {
      rows.splice(index, 1);
    },
    edit () {
      this.sjxq = true
      this.terminalform = this.tableData
      this.input1 = this.row.name
      console.log(this.terminalform)
      console.log(this.selectedOptions)
      this.$http.get(`pc/fixed/getFixedPriceBymerchantId`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.dgmoney = data[0]
        } else if (code == 2001) {
          this.$message.error(res.data.message);
          window.sessionStorage.clear();
          window.localStorage.clear();
          this.$router.push('/')
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    ti () {
      console.log(1)
      // let info = new FormData()
      // info.append('name', this.input1,)
      // info.append('price', this.dgmoney,)
      // info.append('remark', this.textarea2,)
      // info.append('taskId', this.id,)
      // info.append('deviceids',this.DeviceId.join(','))
      let info = {
        'name': this.input1,
        'price': this.dgmoney,
        'remark': this.textarea2,
        'taskId': this.id,
        'deviceids': this.DeviceId.join(',')
      }
      this.$http.post(`pc/fixed/saveFixed`, info).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.sjxq = false
          this.$message({
            message: '已重新提交',
            type: 'success'
          });
          this.$router.push('/index/fiexikon.vue')
        } else if (code == 2001) {
          this.$message.error(res.data.message);
          window.sessionStorage.clear();
          window.localStorage.clear();
          this.$router.push('/')
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    strike () {
      this.$http.get(`pc/fixed/delete`, {        params: {
          taskId: this.id
        }      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.$router.push('/index/fiexikon.vue')
        } else if (code == 2001) {
          this.$message.error(res.data.message);
          window.sessionStorage.clear();
          window.localStorage.clear();
          this.$router.push('/')
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
      console.log(1)
    },
    Delete1 (index, row) {
      console.log(index, row)
    },
    sjdata () {
      this.sjxq = false
    },
    point1 (index, row) {
      console.log(row)
      this.center = {
        lat: Number(row.lat),
        lng: Number(row.lng)
      }
      this.ikon = true
    },
    infoWindowClose () {
      this.show = false
    },
    infoWindowOpen () {
      this.show = true
    },
    gb () {
      this.ikon = false
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
.f_jz {
  margin-top: 20px;
  text-align: center;
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
.f_chakan {
  font-size: 14px;
  color: #3b7cff;
  letter-spacing: 0;
  cursor: pointer;
}

.f_btn1 {
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
.f_btn1:hover {
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
</style>
