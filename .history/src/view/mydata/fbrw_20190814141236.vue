<template>
  <div :class="$style.f_bj">
    <!--创建订单 -->
    <div :class="$style.f_cjdd">
      <p :class="$style.f_jb">基本信息</p>
      <el-row :class="$style.f_row">
        <p :class="$style.f_rwmc">任务名称</p>
        <el-input placeholder="请输入内容" v-model="missionname" :class="$style.f_inpt" clearable></el-input>
        <p :class="$style.f_rwmc">采集距离</p>
        <el-select v-model="distance" clearable placeholder="请选择">
          <el-option
            v-for="item in collection"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <p :class="$style.f_rwmc">任务图片</p>
        <div :class="$style.f_sc">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-success="handleAvatarSuccess"
            accept="image/*"
            multiple
            :on-exceed="handleExceed"
            :file-list="fileList"
            ref="upload"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </div>
        <div :class="$style.f_img">
          <img :src="url" alt style="    max-width: 100%; display: inline-block; max-height: 100%;">
        </div>
      </el-row>
      <p :class="$style.f_jb">采集场景</p>
      <el-row :class="$style.f_row">
        <p :class="$style.f_rwmc">数据类型</p>
        <el-select v-model="datastamp" clearable @change="choose" placeholder="请选择">
          <el-option
            v-for="item in datatype"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
        <p :class="$style.f_rwmc">采集地点</p>
        <el-cascader
          :change-on-select="true"
          :options="collectionlocation"
          :props="props"
          v-model="adress"
          @change="gatherplace"
          @focus="Collectionsite"
          :class="$style.f_inpt"
          clearable
        ></el-cascader>
        <p :class="$style.f_rwmc" style="padding-left: 3%;">行业/区域</p>
        <el-cascader
          v-if="datastamp===''"
          :change-on-select="true"
          :options="hyqy"
          :props="props5"
          disabled
          @on-selected="gather"
          v-model="adress1"
          :class="$style.f_inpt"
          clearable
        ></el-cascader>
        <!-- 区域props4 -->
        <el-cascader
          v-if="datastamp===1"
          :change-on-select="true"
          :options="primaryarea"
          :props="props4"
          @change="cli3"
          v-model="onedistrict"
          :class="$style.f_inpt"
          clearable
        ></el-cascader>
        <!-- 行业props1 -->
        <el-cascader
          v-if="datastamp===2"
          :change-on-select="true"
          :options="industrytab"
          :props="props1"
          @change="cli2"
          v-model="trade"
          :class="$style.f_inpt"
          clearable
        ></el-cascader>
      </el-row>
      <el-row :class="$style.f_row">
        <p :class="$style.f_rwmc">场景类型</p>
        <el-cascader
          v-if="datastamp===''"
          :change-on-select="true"
          :options="hyqy"
          :props="props5"
          disabled
          @on-selected="gather"
          v-model="adress1"
          clearable
        ></el-cascader>
        <!-- 区域 -->
        <el-cascader
          v-if="datastamp===1"
          :change-on-select="true"
          :options="secondaryarea"
          :props="props2"
          @change="areaname"
          v-model="twodistrict"
          clearable
        ></el-cascader>
        <!-- 行业 -->
        <el-cascader
          v-if="datastamp===2"
          :change-on-select="true"
          :options="scenesname"
          :props="props6"
          @change="gather2"
          v-model="twotrade"
          clearable
        ></el-cascader>
        <p :class="$style.f_rwmc">场景名称</p>
        <el-select
          v-model="Scene"
          clearable
          :class="$style.f_inpt"
          @focus="scenename"
          @change="sceneheading"
          placeholder="请选择"
        >
          <el-option v-for="item in field" :key="item.value" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <i class="iconfont iconzuobiao" @click="Geofence"></i>
        <p :class="$style.f_rwmc" style="    padding-left: 1.2%;">人群标签</p>
        <el-select
          v-model="people"
          @focus="crowdlabel"
          @change="flocklabel"
          clearable
          :class="$style.f_inpt"
          placeholder="请选择"
        >
          <el-option
            v-for="item in peopletab"
            :key="item.value"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <span
          @click="increase"
          style="display: inline-block;float: right;margin-right: 3.5%;margin-top: 19px;"
          :class="$style.f_btn"
          :disabled="Disable"
        >增加</span>
      </el-row>
      <!-- 表格 -->
      <div :class="$style.f_bgnr">
        <el-table :data="tableData" border style="width: 100%;">
          <el-table-column prop="name" align="center" label="采集地区" width="180"></el-table-column>
          <el-table-column prop="data" align="center" label="数据类型" width="180"></el-table-column>
          <el-table-column prop="regionalcategory" align="center" label="行业/区域"></el-table-column>
          <el-table-column prop="regionalsubcategory" align="center" label="场景"></el-table-column>
          <el-table-column prop="peoplecollection" align="center" label="人群标签"></el-table-column>
          <el-table-column align="center" label="场景名称">
            <template slot-scope="scope">
              <span
                :class="$style.f_chakan"
                @click="Geofence(scope.$index, scope.row)"
              >{{scope.row. sceneappellation}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <span :class="$style.f_delete" @click="Delete(scope.$index, scope.row)">删除</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <p :class="$style.f_jb" v-if="areatype!=null">采集时间</p>
      <el-row :class="$style.f_row">
        <div v-if="areatype===1">
          <p :class="$style.f_rwmc">采集日期</p>
          <el-date-picker
            v-model="collectiondate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            value-format="yyyy-MM-dd"
            :class="$style.f_inpt"
            end-placeholder="结束日期"
          ></el-date-picker>
          <p :class="$style.f_rwmc">采集时段</p>
          <el-time-select
            placeholder="起始时间"
            v-model="startTime"
            :picker-options="{
            start: '00:00',
            step: '01:00',
            end: '24:00'
          }"
          ></el-time-select>
          <el-time-select
            placeholder="结束时间"
            v-model="endTime"
            :picker-options="{
            start: '00:00',
            step: '01:00',
            end: '24:00',
            minTime: startTime
          }"
          ></el-time-select>
        </div>
        <div v-if="areatype===2">
          <p :class="$style.f_rwmc">创建时间:</p>
          <span>{{date}}</span>
        </div>
      </el-row>
      <!-- 终端配置 -->
      <p :class="$style.f_jb">数据数量和奖励</p>
      <el-row :class="$style.f_row">
        <p :class="$style.f_rwmc">数据数量</p>
        <el-input clearable :class="$style.f_inpt" v-model="datanum" placeholder="请选择"></el-input>
        <p :class="$style.f_rwmc">单条奖励</p>
        <el-input clearable :class="$style.f_inpt" v-model="single" placeholder="请选择"></el-input>
        <p :class="$style.f_rwmc">总奖励</p>
        <el-input
          placeholder="自动计算"
          v-model="input1"
          style="width:calc(100% - 80%)"
          :disabled="true"
        ></el-input>
      </el-row>
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
        @click="submit"
        style="display: inline-block;margin-left:4.5%;margin-top: 14px;"
        :class="$style.f_btn"
      >提交</span>
    </div>
    <!-- 地图 -->
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
import qs from 'qs'
import tb1 from '../../assets/img/坐标1.gif'
export default {
  components: {
    footerl
  },
  data () {
    return {
      fileList: [],
      abc: false,
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
      startTime: '',
      endTime: '',
      input1: '',
      collection: [
        {
          value: '5',
          label: '5米'
        },
        {
          value: '10',
          label: '10米'
        },
        {
          value: '20',
          label: '20米'
        },
        {
          value: '0',
          label: '20+'
        },
      ],
      options: [],
      tableData: [],
      ikon: false,
      btmatter: '数据回购',
      datatype: [
        {
          value: 1,
          label: '区域'
        },
        {
          value: 2,
          label: '行业',
          disabled: false
        }
      ],
      location: [],
      cjlx4: [],
      collectionlocation: [],
      props: {
        lazy: true,
        expandTrigger: 'click',
        lazyLoad (node, resolve) {
          const { level } = node;
          console.log(node)
          // setTimeout(() => {
          let option = {
            url: `modules/area/areaByPid`,
            methods: 'get',
            params:{
              pid:1
            }
          }
          if (level === 0) {
            option.url = 'modules/area/areaByPid',
            option.params={
              pid:1
            }
          } else if (level === 1) {
            option.url = `modules/area/areaByPid`,
            option.params={
              pid:node.value
            }
          } else if (level === 2) {
            option.url = `modules/area/areaByPid?pid=${node.value}`,
            option.params={
              pid:node.value
            }
          }
          axios(option).then(res => {
            let { meta, data, code } = res.data
            if (code === 1000) {
              const nodes = Array.from({ length: data.length })
                .map((item, i) => ({
                  value: data[i].id,
                  label: data[i].name,
                  leaf: level >= 2
                }));
              // 通过调用resolve将子节点数据返回，通知组件数据加载完成
              resolve(nodes);
            }
          })
          // }, 1000);
        }
      },
      // 行业
      props1: {
        lazy: true,
        lazyLoad (node, resolve) {
          const { level } = node;
          let option = {
            url: `modules/signIndustry/listByParent?pid=1`,
            methods: 'get',
            params: {
              pid:1
            }
          }
          if (level === 0) {
            option.url = `modules/signIndustry/listByParent`
          } else if (level === 1) {
            option.url = `modules/signIndustry/listByParent`,
            option.params={
              pid:node.value
            }
          }
          axios(option).then(res => {
            let { meta, data, code } = res.data
            if (code === 1000) {
              const nodes = Array.from({ length: data.length })
                .map((item, i) => ({
                  value: data[i].id,
                  label: data[i].name,
                  leaf: level >= 1
                }));
              // 通过调用resolve将子节点数据返回，通知组件数据加载完成
              resolve(nodes);
            }
          })
        }
      },
      props6: {
        lazy: true,
        lazyLoad (node, resolve) {
          const { level } = node;
          let option = {
            url: 'modules/signIndustryType/listByParent',
            methods: 'get',
          }
          if (level === 0) {
            option.url = 'modules/signIndustryType/listByParent'
          } else if (level === 1) {
            option.url = `modules/signIndustryType/listByParent`,
            option.params={
              pid:node.value
            }
          }
          axios(option).then(res => {
            let { meta, data, code } = res.data
            if (code === 1000) {
              const nodes = Array.from({ length: data.length })
                .map((item, i) => ({
                  value: data[i].id,
                  label: data[i].name,
                  leaf: level >= 1
                }));
              // 通过调用resolve将子节点数据返回，通知组件数据加载完成
              resolve(nodes);
            }
          })
        }
      },
      // 区域
      props4: {
        lazy: true,
        lazyLoad (node, resolve) {
          const { level } = node;
          // console.log(node) /
          // setTimeout(() => {
          let option = {
            url: 'modules/signRegion/listByParent',
            methods: 'get'
          }
          if (level === 0) {
            option.url = `modules/signRegion/listByParent`
            console.log(node)
          } else if (level === 1) {
            option.url = `modules/signRegion/listByParent`,
            option.params={
              pid:node.value
            }
          }
          axios(option).then(res => {
            let { meta, data, code } = res.data
            if (code === 1000) {
              const nodes = Array.from({ length: data.length })
                .map((item, i) => ({
                  value: data[i].id,
                  label: data[i].name,
                  leaf: level >= 1
                }));
              // 通过调用resolve将子节点数据返回，通知组件数据加载完成
              resolve(nodes);
            }
          })
          // }, 1000);
        }
      },
      props2: {
        lazy: true,
        lazyLoad (node, resolve) {
          const { level } = node;
          // setTimeout(() => {
          let option = {
            url: 'modules/signRegion/listByParent',
            methods: 'get',
          }
          if (level === 0) {
            option.url = `modules/signRegion/listByParent`,
            option.params={
              pid:this.onedistrict[1]
            }
          } else if (level === 1) {
            option.url = `modules/signRegion/listByParent`,
            option.params={
              pid:node.value
            }
          }
          axios(option).then(res => {
            let { meta, data, code } = res.data
            if (code === 1000) {
              const nodes = Array.from({ length: data.length })
                .map((item, i) => ({
                  value: data[i].id,
                  label: data[i].name,
                  leaf: level >= 1
                }));
              // 通过调用resolve将子节点数据返回，通知组件数据加载完成
              resolve(nodes);
            }
          })
          // }, 1000);
        }
      },
      props3: {
        lazy: true,
        multiple: true,
        lazyLoad (node, resolve) {
          const { level } = node;
          let option = {
            url: '/findDevicesByGroup',
            methods: 'get',
          }
          if (level === 0) {
            option.url = '/pc/group/findGroup'
            option.data = {}
          } else if (level === 1) {
            option.url = '/findDevicesByGroup'
            option.params = { groupId: level }
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
      props5: {},
      cjzd1: [],
      selectedOptions: '',
      options3: [],
      options4: [],
      options5: [],
      peopletab: [],
      hyqy: [],
      primaryarea: [],
      industrytab: [],
      scenesname: [],
      tableData: [],
      field: [],
      ikon: false,
      btname: '采集任务',
      secondaryarea: [],
      province: '',
      city: '',
      area: '',
      options6: [],
      provincialcollection: [],
      citycollection: [],
      regionalcollection: [],
      // 行业
      industrycollection: [],
      industrysubdivisioncollection: [],
      // 行业细分
      propertycollection: [],
      propertysubdivisioncollection: [],
      // 区域
      districtcollection: [],
      districtsubdivisioncollection: [],
      // 区域细分
      areacollection: [],
      areasubdivisioncollection: [],
      // 场景名称
      sceneappellation: [],
      // 人群标签集合
      peoplecollection: [],
      datastamp: '',
      adress1: '',
      Scene: '',
      people: '',
      twotrade: '',
      trade: '',
      twodistrict: '',
      onedistrict: '',
      missionname: '',
      distance: '',
      collectiondate: '',
      scencesBaseId: [],
      scencesBaseid: '',
      crowdId: [],
      crowdid: '',
      beanse: [],
      scenecrowd: {},
      single: '',
      datanum: '',
      Disable: false,
      // datatype:null,
      areatype: null,
      date: '2017-2-2',
      Fence:false,
    }
  },
  methods: {
    // 采集地点
    Collectionsite () {
      this.adress = ''
    },
    gatherplace () {
      console.log(this.adress)
      if (this.adress.length === 3) {
        this.$http.get('modules/area/areaByPid',{params:{
          pid:1
        }}).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            data.forEach(item => {
              if (this.adress[0] === item.id) {
                this.provincialcollection.push(item.name)
              }
            })
          }
        }).catch(function (err) {
          console.log('错误信息' + err)
        })
        this.$http.get(`modules/area/areaByPid`,{params:{
          pid:this.adress[0]
        }}).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            data.forEach(item => {
              if (this.adress[1] === item.id) {
                this.citycollection.push(item.name)
              }
            })
          }
        }).catch(function (err) {
          console.log('错误信息' + err)
        })
        this.$http.get(`modules/area/areaByPid`,{params:{
          pid:this.adress[1]
        }}).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            // console.log(data)
            data.forEach(item => {
              if (this.adress[2] === item.id) {
                this.regionalcollection.push(item.name)
              }
            })
          }
        })
      }
    },
    gather () {
      console.log(1)
    },
    // 场景名称
    scenename () {
      // this.$http.get(`pc/collect/getScencesName?province=22&city=284&area=2344&type=1&industryParent=2&industry=4&industrytypeParent=7&industrytype=10`).then(res => {
      //   var { code, data } = res.data
      //   if (code === 1000) {
      //     this.field = data
      //   }
      // })
      if(this.datastamp===1){
        // 区域
        this.$http.get(`pc/collect/getScencesName`,{params:{
          province:this.adress[0],
          city:this.adress[1],
          area:this.adress[2],
          type:1,
          industryParent:this.onedistrict[0],
          industry:this.onedistrict[1],
          industrytypeParent:this.twodistrict[0],
          industrytype:this.twodistrict[1],
        }}).then(res=>{
          var {code,data}=res.data
          console.log(data)
          if(code===1000){
            this.field=data
          }
        })
      }else if(this.datastamp===2){
        // 行业
        this.$http.get(`pc/collect/getScencesName`,{params:{
          province:this.adress[0],
          city:this.adress[1],
          area:this.adress[2],
          type:2,
          industryParent:this.trade[0],
          industry:this.trade[1],
          industrytypeParent:this.twotrade[0],
          industrytype:this.twotrade[1],
        }}).then(res=>{
          var {code,data}=res.data
          console.log(data)
          if(code===1000){
            this.field=data
          }
        })
      }
    },
    sceneheading () {
      // this.$http.get(`pc/collect/getScencesName?province=22&city=284&area=2344&type=1&industryParent=2&industry=4&industrytypeParent=7&industrytype=10`).then(res => {
      //   var { code, data } = res.data
      //   if (code === 1000) {
      //     this.field = data
      //     this.field.forEach(item => {
      //       if (this.Scene === item.id) {
      //         this.sceneappellation.push(item.name)
      //         this.scencesBaseId.push(item)
      //         this.scencesBaseid = item.id
      //       }
      //     })
      //   }
      // })
      if(this.datastamp===1){
        // 区域
        this.$http.get(`pc/collect/getScencesName?`,{params:{
          province:this.adress[0],
          city:this.adress[1],
          area:this.adress[2],
          type:1,
          industryParent:this.onedistrict[0],
          industry:this.onedistrict[1],
          industrytypeParent:this.twodistrict[0],
          industrytype:this.twodistrict[1]
        }}).then(res=>{
          var {code,data}=res.data
          console.log(data)
          if(code===1000){
            this.field=data
      this.field.forEach(item => {
        if (this.Scene === item.id) {
          this.sceneappellation.push(item)
                this.scencesBaseId.push(item)
                this.scencesBaseid = item.id
        }
       })
          }
        })
      }else if(this.datastamp===2){
        // 行业
        this.$http.get(`pc/collect/getScencesName`,{params:{
          province:this.adress[0],
          city:this.adress[1],
          area:this.adress[2],
          type:2,
          industryParent:this.trade[0],
          industry:this.trade[1],
          industrytypeParent:this.twotrade[0],
          industrytype:this.twotrade[1]
        }}).then(res=>{
          var {code,data}=res.data
          console.log(data)
          if(code===1000){
            this.field=data
      this.field.forEach(item => {
        if (this.Scene === item.id) {
          this.sceneappellation.push(item)
        }
       })
          }
        })
      }
    },
    // 人群标签
    crowdlabel () {
      this.$http.get(`pc/collect/getCrowdByScencesName`,{params:{
        scencesNameId:this.Scene
      }}).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.peopletab = data
        }
      }).catch(function (err) {
        console.log('错误信息' + err)
      })
    },
    flocklabel () {
      this.$http.get(`pc/collect/getCrowdByScencesName`,{params:{
        scencesNameId:this.Scene
      }}).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.peopletab = data
          this.peopletab.forEach(item => {
            if (this.people === item.id) {
              this.peoplecollection.push(item.name)
              this.crowdId.push(item)
              this.crowdid = item.id
            }
          })
        }
      }).catch(function (err) {
        console.log('错误信息' + err)
      })
    },
    // 行业
    cli2 () {
      if (this.trade.length === 2) {
        this.$http.get(`modules/signIndustry/listByParent`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            data.forEach(item => {
              if (this.trade[0] === item.id) {
                this.industrycollection.push(item.name)
                console.log(this.industrycollection)
              }
            })
          }
        })
        this.$http.get(`modules/signIndustry/listByParent`,{params:{
          pid:this.trade[0]
        }}).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            console.log(data)
            data.forEach(item => {
              if (this.trade[1] === item.id) {
                this.industrysubdivisioncollection.push(item.name)
              }
            })
          }
        })
      }
    },
    gather2 () {
      if (this.trade.length === 2) {
        this.$http.get(`modules/signIndustryType/listByParent`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            data.forEach(item => {
              if (this.trade[0] === item.id) {
                this.propertycollection.push(item.name)
                console.log(this.industrycollection)
              }
            })
          }
        })
        this.$http.get(`modules/signIndustryType/listByParent`,{params:{
          pid:this.trade[0]
        }}).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            console.log(data)
            data.forEach(item => {
              if (this.trade[1] === item.id) {
                this.propertysubdivisioncollection.push(item.name)
              }
            })
          }
        })
      }
    },
    // 区域
    cli3 () {
      if (this.onedistrict.length === 2) {
        this.$http.get(`modules/signRegion/listByParent`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            data.forEach(item => {
              if (this.onedistrict[0] === item.id) {
                this.districtcollection.push(item.name)
              }
            })
          }
        })
        this.$http.get(`modules/signRegion/listByParent`,{params:{
          pid:this.onedistrict[1]
        }}).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            console.log(data)
            this.secondaryarea = data
            this.secondaryarea.forEach(item => {
              item.value = item.id
              item.label = item.name
            })
          }
        })
      }
    },
    areaname () {
      console.log(this.twodistrict)
      if (this.twodistrict.length === 2) {
        this.$http.get(`modules/signRegion/listByParent`,{params:{
          pid:this.onedistrict[1]
        }}).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            data.forEach(item => {
              if (this.twodistrict[0] === item.id) {
                this.areacollection.push(item.name)
              }
            })
          }
        })
        this.$http.get(`modules/signRegion/listByParent`,{params:{
          pid:this.twodistrict[0]
        }}).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            data.forEach(item => {
              if (this.twodistrict[1] === item.id) {
                this.areasubdivisioncollection.push(item.name)
              }
            })
          }
        })
      }
    },
    // 增加场景
    increase () {
      let arr = []
      let regionalcategory = []
      let regionalsubcategory = []
      if (this.datastamp === 1) {
        arr.push(this.provincialcollection.pop(), this.citycollection.pop(), this.regionalcollection.pop())
        regionalcategory.push(this.districtcollection.pop(), this.secondaryarea[0].name, )
        regionalsubcategory.push(this.areacollection.pop(), this.areasubdivisioncollection.pop())
        let obj = {}
        var arr2 = arr.join("\\");
        var arr3 = regionalcategory.join("\\");
        var arr4 = this.sceneappellation.join("\\");
        var arr6 = regionalsubcategory.join("\\")
        var arr5 = this.peoplecollection.join("\\")
        let data = '区域类型'
        obj = {
          name: arr2,
          data: data,
          regionalcategory: arr3,
          sceneappellation: arr4,
          regionalsubcategory: arr6,
          peoplecollection: arr5
        }
        var scenceobj1 = ''
        var crowdobj1 = ''
        this.scencesBaseId.forEach(item => {
          scenceobj1 = item.id
        })
        this.crowdId.forEach(item => {
          crowdobj1 = item.id
        })
        this.scenecrowd = {
          scencesBaseId: scenceobj1,
          crowdId: crowdobj1
        }
        this.beanse.push(this.scenecrowd)
        this.tableData.push(obj)
        obj = {}
        this.adress = ''
        this.datastamp = ''
        this.onedistrict = ''
        this.twodistrict = ''
        this.Scene = ''
        this.people = ''
        this.provincialcollection = []
        this.citycollection = []
        this.regionalcollection = []
        this.districtcollection = []
        this.secondaryarea = []
        this.areacollection = []
        this.areasubdivisioncollection = []
        this.sceneappellation = []
        this.peoplecollection = []
        this.areatype = 1
      } else if (this.datastamp === 2) {
        arr.push(this.provincialcollection.pop(), this.citycollection.pop(), this.regionalcollection.pop())
        regionalcategory.push(this.industrycollection.pop(), this.industrysubdivisioncollection.pop(), )
        regionalsubcategory.push(this.propertycollection.pop(), this.propertysubdivisioncollection.pop())
        let obj = {}
        var arr2 = arr.join("\\");
        var arr3 = regionalcategory.join("\\");
        var arr4 = this.sceneappellation.join("\\");
        var arr6 = regionalsubcategory.join("\\")
        var arr5 = this.peoplecollection.join("\\")
        let data = '行业类型'
        obj = {
          name: arr2,
          data: data,
          regionalcategory: arr3,
          sceneappellation: arr4,
          regionalsubcategory: arr6,
          peoplecollection: arr5
        }
        var scenceobj = ''
        var crowdobj = ''
        this.scencesBaseId.forEach(item => {
          scenceobj = item.id
        })
        this.crowdId.forEach(item => {
          crowdobj = item.id
        })
        this.scenecrowd = {
          scencesBaseId: scenceobj,
          crowdId: crowdobj
        }
        this.beanse.push(this.scenecrowd)
        this.tableData.push(obj)
        obj = {}
        this.adress = ''
        this.datastamp = ''
        this.trade = ''
        this.twotrade = ''
        this.Scene = ''
        this.people = ''
        this.provincialcollection = []
        this.citycollection = []
        this.regionalcollection = []
        this.industrycollection = []
        this.industrysubdivisioncollection = []
        this.propertycollection = []
        this.propertysubdivisioncollection = []
        this.sceneappellation = []
        this.peoplecollection = []
        this.areatype = 2
      }
    },
    handleAvatarSuccess (response, file, fileList) {
      // console.log(res, file)
      // console.log(response, file, fileList)
      // console.log(URL.createObjectURL(file.raw))
      this.url = URL.createObjectURL(file.raw)
      this.$refs.upload.clearFiles()
      console.log(this.url)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList +',');
    },
    handlePreview (file) {
      console.log(file +',');
    },
     // 地理围栏
    Geofence () {
      this.Fence = true
      console.log(this.scencesBaseId)
      var str = this.scencesBaseId[0].lbs
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
             var polygon = new BMap.Polygon(points, {strokeColor:"red", strokeWeight:2, strokeOpacity:0.5});  //创建多边形
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
    stop(){
      this.Fence = false
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
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
    choose () {
      if (this.datastamp === 1) {
        this.tableData.forEach(item => {
          if (item.data === '行业类型') {
            this.tableData = []
          }
        })

        this.areatype = 1
      } else if (this.datastamp === 2) {
        this.tableData.forEach(item => {
          if (item.data === '区域类型') {
            this.tableData = []
          }
        })
        this.areatype = 2
      }
    },
    submit () {
      this.$confirm('是否确定发布任务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let starttime = ''
        let endtiem = ''
        let start = this.startTime.split(':')
        let end = this.endTime.split(':')
        if (start[0] == '00') {
          starttime = 0
        } else if (start[0] == '01') {
          starttime = 1
        } else if (start[0] == '02') {
          starttime = 2
        } else if (start[0] == '03') {
          starttime = 3
        } else if (start[0] == '04') {
          starttime = 4
        } else if (start[0] == '05') {
          starttime = 5
        } else if (start[0] == '06') {
          starttime = 6
        } else if (start[0] == '07') {
          starttime = 7
        } else if (start[0] == '08') {
          starttime = 8
        } else if (start[0] == '09') {
          starttime = 9
        }
        if (end[0] == '00') {
          endtiem = 0
        } else if (end[0] == '01') {
          endtiem = 1
        } else if (end[0] == '02') {
          endtiem = 2
        } else if (end[0] == '03') {
          endtiem = 3
        } else if (end[0] == '04') {
          endtiem = 4
        } else if (end[0] == '05') {
          endtiem = 5
        } else if (end[0] == '06') {
          endtiem = 6
        } else if (end[0] == '07') {
          endtiem = 7
        } else if (end[0] == '08') {
          endtiem = 8
        } else if (end[0] == '09') {
          endtiem = 9
        }
        this.tableData.forEach(item => {
          if (item.data === '区域类型') {
            this.datatype = 1
          } else if (item.data === '行业类型') {
            this.datatype = 2
          }
        })
        let info = {
          'name': this.missionname,
          'TaskCollectType': this.datatype,
          'radius': this.distance,
          'fromDate': this.collectiondate[0],
          'toDate': this.collectiondate[1],
          'price': this.datanum,
          'amountCount': this.single,
          'fromTime': starttime,
          'toTime': endtiem,
          'remarks': this.textarea2,
          'beans': this.beanse,
          'file':this.url
        }
        console.log(this.url)
        this.$http.post(`pc/platform/addPlatformTask`, info).then(res => {
          console.log(res.data)
          this.$message({
            type: 'success',
            message: '发布成功!'
          });
          this.$store.commit('myval1', this.btmatter)
          this.$router.push({ path: '/index/datarepo.vue' })
        }).catch(function (err) {
          console.log('错误信息' + err)
        })
      }).catch((err) => {
        console.log('错误信息' + err)
      });
    },
    dt () {
      this.ikon = true
    },
    gb () {
      this.ikon = false
    },
    point () {
      this.ikon = true
    },
    point1 () {
      this.ikon = true
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
.f_chakan {
  font-size: 14px;
  color: #3b7cff;
  letter-spacing: 0;
  cursor: pointer;
}
.f_sc {
  display: inline-block;
  vertical-align: text-top;
  margin-left: 20px;
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
