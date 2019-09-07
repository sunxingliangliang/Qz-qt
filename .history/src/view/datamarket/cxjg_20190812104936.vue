<template>
  <div class="bj">
    <!-- 数据筛选 -->
    <div :class="$style.f_sx">
      <p>数据筛选</p>
      <!-- 输入框 -->
      <el-row class="search">
        <div style="margin-left: 5%;display: inline-block;">
          <span>省</span>
          <el-select
            v-model="oneself"
            @change="visit"
            collapse-tags
            @focus="save"
            multiple
            style="margin-left:28px;"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in province"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              :class="$style.f_search1"
            ></el-option>
          </el-select>
        </div>
        <div style="margin-left: 72px;display: inline-block;">
          <span>市</span>
          <el-select
            v-model="city"
            @change="downtownarea"
            @focus="urban"
            collapse-tags
            multiple
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in urbandistrict"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              :class="$style.f_search1"
            ></el-option>
          </el-select>
        </div>
        <div style="margin-left: 67px;display: inline-block;">
          <span>区</span>
          <el-select
            v-model="area"
            @change="district"
            @focus="county"
            collapse-tags
            multiple
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in countylevel"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              :class="$style.f_search1"
            ></el-option>
          </el-select>
        </div>
      </el-row>
      <el-row :class="$style.search">
        <div style="margin-left:20px;display: inline-block;">
          <span>数据类型</span>
          <el-select style="margin-left: 20px;" v-model="datastamp" clearable placeholder="请选择">
            <el-option
              v-for="item in datatype"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :class="$style.f_search1"
            ></el-option>
          </el-select>
        </div>
        <div style="margin-left:20px;display: inline-block;">
          <span>行业/区域</span>
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
        </div>
        <div style="margin-left:20px;display: inline-block;">
          <span>场景类型</span>
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
        </div>
      </el-row>
      <el-row :class="$style.search1">
        <div style="margin-left:20px;display: inline-block;">
          <span>场景名称</span>
          <el-select
            v-model="changjingmingcheng"
            collapse-tags
            multiple
            @focus="heading"
            @change="Scenename"
            style="margin-left:20px;"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in ScenesName"
              :key="item.value"
              :label="item.name"
              :value="item.id"
              :class="$style.f_search1"
            ></el-option>
          </el-select>
        </div>
        <div style="margin-left: 30px;display: inline-block;">
          <span>人群标签</span>
          <el-select
            v-model="biaoqian"
            @change="crowdlabel"
            @focus="swarm"
            multiple
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in Crowdlabel"
              collapse-tags
              :key="item.id"
              :label="item.name"
              :value="item.id"
              :class="$style.f_search1"
            ></el-option>
          </el-select>
        </div>
        <div style="margin-left:20px;width:264px;display: inline-block;">
          <span>采集时间</span>
          <el-date-picker
            v-model="valuedate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            unlink-panels
            style=" width: calc( 100% - 27%);"
          ></el-date-picker>
        </div>
        <div style="display: inline-block;float:right;margin-right:30px;">
          <span :class="$style.f_btn" @click="chaxun">查询</span>
          <el-button type="info" plain @click="chongzhi">重置</el-button>
        </div>
      </el-row>
    </div>
    <!-- 表格 -->
    <div :class="$style.f_table">
      <p>查询结果</p>
      <div :class="$style.f_bgnr">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="name" align="center" label="关键字"></el-table-column>
          <el-table-column prop="dataCount" align="center" label="数据"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <span :class="$style.f_delete" @click="dgsj(scope.$index, scope.row)">订购数据</span>
              <span :class="$style.f_delete" @click="Orderportrait(scope.$index, scope.row)">订购画像</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 数据详情 -->
    <!-- 订购画像 -->
    <div class="f_dg">
      <el-dialog title="订购画像" :visible.sync="ikon" width="30%" :before-close="gb">
        <p :class="$style.f_jb">基本信息</p>
        <el-row :class="$style.f_hxrow">
          <span :class="$style.f_ddname">订单名称:</span>
          <el-input placeholder="请输入内容" v-model="formname" :class="$style.f_hxinpt" clearable></el-input>
        </el-row>
        <p :class="$style.f_sjxx">数据信息</p>
        <el-row :class="$style.f_hxrow">
          <span :class="$style.f_ddname">源数据量：</span>
          <span :class="$style.f_ddname">{{ysjl}}</span>
        </el-row>
        <el-row :class="$style.f_hxrow">
          <span :class="$style.f_ddname">订购金额：</span>
          <span :class="$style.f_ddname">{{moeny}}</span>
        </el-row>
        <p :class="$style.f_sjxx">订单备注</p>
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入内容"
          style="margin-top:20px;"
          v-model="textarea2"
        ></el-input>
        <span slot="footer" class="dialog-footer">
          <span @click="ikon = false" style="display: inline-block;" :class="$style.f_btn">取消</span>
          <span @click="queding" style="display: inline-block;" :class="$style.f_btn">确定</span>
        </span>
      </el-dialog>
    </div>
    <!-- 订购数据 -->
    <div class="f_dgsj">
      <el-dialog title="订购数据" :visible.sync="dgdata" width="60%" :before-close="sjdata">
        <p :class="$style.f_jb">基本信息</p>
        <el-row :class="$style.f_hxrow">
          <span :class="$style.f_ddname">订单名称:</span>
          <el-input placeholder="请输入内容" v-model="formname" :class="$style.f_hxinpt" clearable></el-input>
        </el-row>
        <p :class="$style.f_sjxx">数据信息</p>
        <el-row :class="$style.f_hxrow">
          <span :class="$style.f_ddname">源数据量：</span>
          <span :class="$style.f_ddname">{{ysjl1}}</span>
        </el-row>
        <el-row :class="$style.f_hxrow">
          <span :class="$style.f_ddname">订单数量:</span>
          <el-input placeholder="请输入内容" v-model="buyAmount" @blur="cipher" :class="$style.f_hxinpt1" clearable></el-input>
        </el-row>
        <el-row :class="$style.f_hxrow">
          <span :class="$style.f_ddname">订购金额：</span>
          <span :class="$style.f_ddname" v-if="dgmoney!=null">{{dgmoney}}</span>
        </el-row>
        <p :class="$style.f_jb" style="margin-top:20px;">媒体平台</p>
        <div style="margin-top:20px;">
          <div :class="$style.f_s5">
            <el-select v-model="platform" clearable placeholder="请选择" @change="mass">
              <el-option v-for="item in media" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </div>
          <div :class="$style.f_s5">
            <el-input placeholder="请输入账户" v-model="user" clearable></el-input>
          </div>
          <div :class="$style.f_s5">
            <el-input
              placeholder="请输入密码"
              v-model="password"
              type="password"
              show-password
              clearable
            ></el-input>
          </div>
          <div>
            <span @click="adddata " style="display: inline-block;" :class="$style.f_btn">增加</span>
          </div>
        </div>
        <el-table :data="mediaData" border style="width: 100%;margin-top:20px;">
          <el-table-column prop="media" align="center" label="平台" width="180"></el-table-column>
          <el-table-column prop="username" align="center" label="账户" width="180"></el-table-column>
          <el-table-column prop="password" align="center" label="密码"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click.native.prevent="handleDelete(scope.$index, mediaData)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <p :class="$style.f_sjxx">订单备注</p>
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入内容"
          style="margin-top:20px;"
          v-model="textarea2"
        ></el-input>
        <span slot="footer" class="dialog-footer">
          <span @click="dgdata = false" style="display: inline-block;" :class="$style.f_btn">取消</span>
          <span @click="ti" style="display: inline-block;" :class="$style.f_btn">确定</span>
        </span>
      </el-dialog>
    </div>
    <div :class="$style.f_jz">
      <footerl/>
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
      options: [],
      province: [],
      urbandistrict: [],
      countylevel: [],
      oneself: '',
      city: '',
      area: '',
      datastamp: '',
      biaoqian: '',
      adress1: '',
      adress2: '',
      value: '',
      value1: '',
      datatype: [
        {
          value: 1,
          label: '区域'
        },
        {
          value: 2,
          label: '行业'
        }
      ],
      changjingmingcheng: '',
      // 行业
      props1: {
        lazy: true,
        multiple: true,
        lazyLoad (node, resolve) {
          const { level } = node;
          let option = {
            url: `modules/signIndustry/listInParent`,
            methods: 'get',
            data: {
              groupId: level
            }
          }
          if (level === 0) {
            option.url = `modules/signIndustry/listInParent`
          } else if (level === 1) {
            option.url = `modules/signIndustry/listInParent?pid=${node.value}`
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
        multiple: true,
        lazyLoad (node, resolve) {
          const { level } = node;
          let option = {
            url: 'modules/signIndustryType/listByParent',
            methods: 'get',
            data: {
              groupId: level
            }
          }
          if (level === 0) {
            option.url = `modules/signIndustryType/listByParent?=${this.trade}`
          } else if (level === 1) {
            option.url = `modules/signIndustryType/listByParent?pid=${node.value}`
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
        multiple: true,
        lazyLoad (node, resolve) {
          const { level } = node;
          // console.log(node) /
          // setTimeout(() => {
          let option = {
            url: 'modules/signRegion/listInParent',
            methods: 'get',
            data: {
              groupId: level
            }
          }
          if (level === 0) {
            option.url = `modules/signRegion/listInParent`

          } else if (level === 1) {
            option.url = `modules/signRegion/listInParent?ids=${node.value}`
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
        multiple: true,
        lazyLoad (node, resolve) {
          const { level } = node;
          // setTimeout(() => {
          console.log(this.onedistrict)
          let option = {
            url: 'modules/signRegion/listInParent',
            methods: 'get',
            data: {
              groupId: level
            }
          }
          if (level === 0) {
            option.url = `modules/signRegion/listInParent?ids=${this.onedistrict}`
          } else if (level === 1) {
            option.url = `modules/signRegion/listInParent?ids=${node.value}`
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
      props5: {},
      hyqy: [],
      cjlx1: [],
      tableData: [],
      dgdata: false,
      dgmoney: null,
      input: '',
      formname: '',
      ysjl: 2000,
      ikon: false,
      moeny: 2100,
      textarea2: '',
      pt: '',
      searchId: '',
      buyAmount: "",
      password: '',
      mediaData: [],
      user: '',
      media: [],
      platform: '',
      mediaids: [],
      mediaAccountList: [],
      ids1: '',
      onedistrictranking: [],
      traderanking: [],
      num1: '1000',
      btname: '查询结果',
      hyqy: [],
      cjlx1: [],
      num5: 100,
      popular: [],
      self: '',
      urbanarea: '',
      onedistrict: '',
      primaryarea: [],
      trade: '',
      tradeoptions: [],
      reginpush: [],
      reginpush0: [],
      ids: '',
      oneid: '',
      oneids: '',
      twoid: '',
      twoids: '',
      twodistrict: '',
      secondaryarea: [],
      rowsubdivision: '',
      rowsubdivisionoptions: [],
      industrytab: [],
      scenesname: [],
      twotrade: '',
      ScenesName: [],
      Crowdlabel: [],
      valuedate: '',
      // 区域
      districtcollection: [],
      districtcollectiontwo: [],
      districtcollectionthree: [],
      districtcollectionfour: [],
      districtcollections: [],
      districtcollectiontwos: [],
      districtcollectionthrees: [],
      districtcollectionfours: [],
      Provide: [],
      City: [],
      Area: [],
      scenesheading: [],
      crowdtab: [],
      secondaryareas: [],
      ysjl1:'',
      dataPrice:null
    }
  },
  created () {
    this.tableData.push(this.$store.state.obj)
  },
  methods: {
    // 省
    save () {
      this.$http.get(`modules/area/areaInPid?ids=1`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.province = data
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    visit () {
      this.self = this.oneself.join(',')
      this.city = ''
      this.area = ''
      for (let i in this.oneself) {
        let id = this.oneself[i]
        for (let a in this.province) {
          if (id === this.province[a].id) {
            this.Provide.push(this.province[a].name)
          }
        }
      }
    },
    // 市
    urban () {
      this.$http.get(`modules/area/areaInPid?ids=${this.self}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.urbandistrict = data
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    downtownarea () {
      this.urbanarea = this.city.join(',')
      this.area = ''
      for (let i in this.city) {
        let id = this.city[i]
        for (let a in this.urbandistrict) {
          if (id === this.urbandistrict[a].id) {
            this.City.push(this.urbandistrict[a].name)
          }
        }
      }
    },
    // 区
    county () {
      this.$http.get(`modules/area/areaInPid?ids=${this.urbanarea}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.countylevel = data
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    district () {
      for (let i in this.area) {
        let id = this.area[i]
        for (let a in this.countylevel) {
          if (id === this.countylevel[a].id) {
            this.Area.push(this.countylevel[a].name)
          }
        }
      }
    },
    // 区域
    cli3 () {
      let regin = []
      let regintwo = []
      this.onedistrict.forEach(item => {
        regintwo.push(item[0])
        regin.push(item[1])
      })
      this.oneid = regin.join(',')
      this.oneids = regintwo.join(',')
      if (this.onedistrict.length === 1) {
        this.$http.get(`modules/signRegion/listInParent`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            data.forEach(item => {
              if (this.onedistrict[0][0] === item.id) {
                this.districtcollection.push(item.name)
              }
            })
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
        this.$http.get(`modules/signRegion/listInParent?ids=${this.onedistrict[0][0]}`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            data.forEach(item => {
              if (this.onedistrict[0][1] === item.id) {
                this.districtcollectiontwo.push(item.name)
              }
            })
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
        this.$http.get(`modules/signRegion/listInParent?ids=${this.onedistrict[0][1]}`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.secondaryarea = data
            this.secondaryarea.forEach(item => {
              item.value = item.id
              item.label = item.name
              this.districtcollectionthree.push(item.name)
            })
          }
        })
      } else {
        this.$http.get(`modules/signRegion/listInParent`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            for (let i in this.onedistrict) {
              // console.log(this.onedistrict[i][0])
              for (let a in data) {
                if (this.onedistrict[i][0] === data[a].id) {
                  this.districtcollections.push(data[a].name)
                }
              }
            }
          }
        })
        this.$http.get(`modules/signRegion/listInParent?ids=${this.oneids}`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            for (let i in this.onedistrict) {
              for (let a in data) {
                if (this.onedistrict[i][1] === data[a].id) {
                  this.districtcollectiontwos.push(data[a].name)
                }
              }
            }
          }
        })
        this.$http.get(`modules/signRegion/listInParent?ids=${this.oneid}`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
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
      let regin = []
      let regintwo = []
      this.twodistrict.forEach(item => {
        regintwo.push(item[0])
        regin.push(item[1])
      })
      this.twoid = regin.join(',')
      this.twoids = regintwo.join(',')
      if (this.twodistrict.length === 1) {
        // console.log(this.twoid)
        // this.$http.get(`modules/signRegion/listInParent?ids=${this.twodistrict[0][0]}`).then(res => {
        //   var { code, data } = res.data
        //   if (code === 1000) {
        //     console.log(data)
        // data.forEach(item => {
        //   if (this.onedistrict[0][0] === item.id) {
        //     this.districtcollection.push(item.name)
        //   }
        // })
        // }
        // }).catch((err) => {
        //   console.log('错误信息' + err)
        // })
        this.$http.get(`modules/signRegion/listInParent?ids=${this.twodistrict[0][0]}`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            data.forEach(item => {
              if (this.twodistrict[0][1] === item.id) {
                this.districtcollectionfour.push(item.name)
              }
            })
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
        // console.log(this.onedistrict)
      } else {
        this.secondaryareas = this.secondaryarea
        for (let i in this.twodistrict) {
          let id = this.twodistrict[i][0]
          for (let a in this.secondaryareas) {
            if (id === this.secondaryareas[a].value) {
              this.districtcollectionthrees.push(this.secondaryareas[a].label)
            }
          }
        }
        // console.log(this.twoid )
        // console.log(this.twodistrict)
        // console.log(this.twoids )
        this.$http.get(`modules/signRegion/listInParent?ids=${this.twoids}`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            for (let i in this.twodistrict) {
              let id = this.twodistrict[i][1]
              for (let a in data) {
                this.districtcollectionfours.push(data[a].name)
              }
            }
            // this.secondaryarea = data
            // this.secondaryarea.forEach(item => {
            //   item.value = item.id
            //   item.label = item.name
            // })
          }
        })
      }
    },
    // 行业
    cli2 () {
      let regin = []
      let regintwo = []
      this.trade.forEach(item => {
        regintwo.push(item[0])
        regin.push(item[1])
      })
      this.oneid = regin.join(',')
      this.oneids = regintwo.join(',')
      if (this.trade.length === 1) {
        this.$http.get(`modules/signIndustry/listInParent`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            data.forEach(item => {
              if (this.trade[0][0] === item.id) {
                this.districtcollection.push(item.name)
              }
            })
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
        this.$http.get(`modules/signIndustry/listInParent?ids=${this.trade[0][0]}`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            data.forEach(item => {
              if (this.trade[0][1] === item.id) {
                this.districtcollectiontwo.push(item.name)
              }
            })
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
        this.$http.get(`modules/signIndustry/listInParent?ids=${this.trade[0][1]}`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.secondaryarea = data
            this.secondaryarea.forEach(item => {
              item.value = item.id
              item.label = item.name
              this.districtcollectionthree.push(item.name)
            })
          }
        })
      } else {
        this.$http.get(`modules/signIndustry/listInParent`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            for (let i in this.trade) {
              // console.log(this.onedistrict[i][0])
              for (let a in data) {
                if (this.trade[i][0] === data[a].id) {
                  this.districtcollections.push(data[a].name)
                }
              }
            }
          }
        })
        this.$http.get(`modules/signIndustry/listInParent?ids=${this.oneids}`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            for (let i in this.trade) {
              for (let a in data) {
                if (this.trade[i][1] === data[a].id) {
                  this.districtcollectiontwos.push(data[a].name)
                }
              }
            }
          }
        })
        this.$http.get(`modules/signIndustry/listInParent?ids=${this.oneid}`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.secondaryarea = data
            this.secondaryarea.forEach(item => {
              item.value = item.id
              item.label = item.name
            })
          }
        })
      }
    },
    gather () {
      console.log(1)
    },
    gather2 () {
      console.log(this.twotrade)
      let regin = []
      let regintwo = []
      this.twotrade.forEach(item => {
        regintwo.push(item[0])
        regin.push(item[1])
      })
      this.twoid = regin.join(',')
      this.twoids = regintwo.join(',')
      if (this.twotrade.length === 1) {
        // console.log(this.twoid)
        // this.$http.get(`modules/signIndustry/listInParent?ids=${this.twotrade[0][0]}`).then(res => {
        //   var { code, data } = res.data
        //   if (code === 1000) {
        //     console.log(data)
        // data.forEach(item => {
        //   if (this.onedistrict[0][0] === item.id) {
        //     this.districtcollection.push(item.name)
        //   }
        // })
        // }
        // }).catch((err) => {
        //   console.log('错误信息' + err)
        // })
        this.$http.get(`modules/signIndustry/listInParent?ids=${this.twotrade[0][0]}`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            data.forEach(item => {
              if (this.twotrade[0][1] === item.id) {
                this.districtcollectionfour.push(item.name)
              }
            })
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
        // console.log(this.onedistrict)
      } else {
        this.secondaryareas = this.secondaryarea
        for (let i in this.twotrade) {
          let id = this.twotrade[i][0]
          for (let a in this.secondaryareas) {
            if (id === this.secondaryareas[a].value) {
              this.districtcollectionthrees.push(this.secondaryareas[a].label)
            }
          }
        }
        // console.log(this.twoid )
        // console.log(this.twotrade)
        // console.log(this.twoids )
        this.$http.get(`modules/signIndustry/listInParent?ids=${this.twoids}`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            for (let i in this.twotrade) {
              let id = this.twotrade[i][1]
              for (let a in data) {
                this.districtcollectionfours.push(data[a].name)
              }
            }
            // this.secondaryarea = data
            // this.secondaryarea.forEach(item => {
            //   item.value = item.id
            //   item.label = item.name
            // })
          }
        })
      }
    },
    // 场景名称
    heading () {
      let provide = this.oneself.join(',')
      let city = this.city.join(',')
      let area = this.area.join(',')
      // this.$http.post(`modules/scencesName/findScence`,info).then(res=>{
      //   var {code,data}=res.data
      //   if(code === 1000){
      //     console.log(data)
      //   }
      // }).catch((err)=>{
      //   console.log('错误信息'+err)
      // })
      this.$http.post(`modules/scencesName/findScence`, { 'province': provide, 'city': city, 'area': area }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.ScenesName = data
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    Scenename () {
      for (let i in this.changjingmingcheng) {
        let id = this.changjingmingcheng[i]
        for (let a in this.ScenesName) {
          if (id === this.ScenesName[a].id) {
            this.scenesheading.push(this.ScenesName[a].name)
          }
        }
      }
    },
    // 人群标签
    swarm () {
      console.log(this.changjingmingcheng[0])
      let ids = this.changjingmingcheng[0]
      console.log(ids)
      this.$http.get(`pc/collect/getCrowdByScencesName?scencesNameId=${ids}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.Crowdlabel = data
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    crowdlabel () {
      for (let i in this.biaoqian) {
        let id = this.biaoqian[i]
        for (let a in this.Crowdlabel) {
          if (id === this.Crowdlabel[a].id) {
            this.crowdtab.push(this.Crowdlabel[a].name)
          }
        }
      }
    },
    async chaxun () {
      let general = []
      let generals = []
      let twogeneral = []
      let twogenerals = []
      this.onedistrict.forEach(item => {
        general.push(item[0])
        generals.push(item[1])
      })
      this.twodistrict.forEach(item => {
        twogeneral.push(item[0])
        twogenerals.push(item[1])
      })
      let type = ''
      if (this.datastamp === 1) {
        type = '区域数据'
        // let info = new FormData()
        // info.append('province', this.oneself.join(','))
        // // info.append('province', 22)
        // info.append('city', this.city.join(','))
        // // info.append('city', 284)
        // info.append('area', this.area.join(','))
        // // info.append('area', 2344)
        // info.append('collectType', this.datastamp)
        // info.append('scenceName', this.changjingmingcheng[0])
        // // info.append('scenceName', 6)
        // info.append('regionParent', general.join(','))
        // // info.append('regionParent', 2)
        // info.append('region', generals.join(','))
        // // info.append('region', 4)
        // info.append('regionTypeParent', twogeneral.join(','))
        // // info.append('regionTypeParent', 7)
        // info.append('regionType', twogenerals.join(','))
        // info.append('signCrowd', this.biaoqian)
        // // info.append('signCrowd', 4)
        // info.append('fromDate', this.valuedate[0])
        // info.append('toDate', this.valuedate[1])

        this.$http.post(`pc/data/getDataCount`, info).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            // console.log(data)
            let arr = []
            arr.push(this.Provide, this.City, this.Area)
            let arr2 = arr.join('\\')
            let arr3 = []
            if (this.districtcollection.length === 1 & this.districtcollections.length === 0) {
              arr3.push(this.districtcollection, this.districtcollectiontwo, this.districtcollectionthree, this.districtcollectionfour)
            } else if (this.districtcollection.length === 1 & this.districtcollections.length != 0) {
              arr3.push(this.districtcollections, this.districtcollectiontwos, this.districtcollectionthrees, this.districtcollectionfours)
            }
            let arr4 = arr3.join('\\')
            let arr5 = this.valuedate.join('\\')
            let arr6 = []
            arr6.push(arr2, type, arr4, arr5, this.scenesheading, this.crowdtab)
            let arr7 = arr6.join('-')
            var obj = {
              name: arr7,
              searchUUID: data.searchUUID,
              dataCount: data.dataCount
            }
            this.oneself = ''
            this.city = ''
            this.area = ''
            this.datastamp = ''
            this.onedistrict = ''
            this.trade = ''
            this.twodistrict = ''
            this.twotrade = ''
            this.changjingmingcheng = ''
            this.biaoqian = ''
            this.valuedate = ''
            this.Provide = []
            this.City = []
            this.Area = []
            this.districtcollection = []
            this.districtcollectiontwo = []
            this.districtcollectionthree = []
            this.districtcollectionfour = []
            this.valuedate = []
            this.scenesheading = []
            this.crowdtab = []
            this.districtcollections = []
            this.districtcollectiontwos = []
            this.districtcollectionthrees = []
            this.districtcollectionfours = []
            this.tableData.push(obj)
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
      } else if (this.datastamp === 2) {
        type = '行业类型'
        let info = new FormData()
        info.append('province', this.oneself.join(','))
        // info.append('province', 22)
        info.append('city', this.city.join(','))
        // info.append('city', 284)
        info.append('area', this.area.join(','))
        // info.append('area', 2344)
        info.append('collectType', this.datastamp)
        info.append('scenceName', this.changjingmingcheng[0])
        // info.append('scenceName', 6)
        info.append('industryParent', general.join(','))
        // info.append('industryParent', 2)
        info.append('industry', generals.join(','))
        // info.append('industry', 4)
        info.append('industrytypeParent', twogeneral.join(','))
        // info.append('industrytypeParent', 7)
        info.append('industrytype', twogenerals.join(','))
        // info.append('industrytype', this.biaoqian)
        info.append('signCrowd', 4)
        info.append('fromDate', this.valuedate[0])
        info.append('toDate', this.valuedate[1])
        this.$http.post(`pc/data/getDataCount`, info).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            // console.log(data)
            let arr = []
            arr.push(this.Provide, this.City, this.Area)
            let arr2 = arr.join('\\')
            let arr3 = []
            if (this.districtcollection.length === 1 & this.districtcollections.length === 0) {
              arr3.push(this.districtcollection, this.districtcollectiontwo, this.districtcollectionthree, this.districtcollectionfour)
            } else if (this.districtcollection.length === 1 & this.districtcollections.length != 0) {
              arr3.push(this.districtcollections, this.districtcollectiontwos, this.districtcollectionthrees, this.districtcollectionfours)
            }
            let arr4 = arr3.join('\\')
            let arr5 = this.valuedate.join('\\')
            let arr6 = []
            arr6.push(arr2, type, arr4, arr5, this.scenesheading, this.crowdtab)
            let arr7 = arr6.join('-')
            var obj = {
              name: arr7,
              searchUUID: data.searchUUID,
              dataCount: data.dataCount
            }
            this.oneself = ''
            this.city = ''
            this.area = ''
            this.datastamp = ''
            this.onedistrict = ''
            this.trade = ''
            this.twodistrict = ''
            this.twotrade = ''
            this.changjingmingcheng = ''
            this.biaoqian = ''
            this.valuedate = ''
            this.Provide = []
            this.City = []
            this.Area = []
            this.districtcollection = []
            this.districtcollectiontwo = []
            this.districtcollectionthree = []
            this.districtcollectionfour = []
            this.valuedate = []
            this.scenesheading = []
            this.crowdtab = []
            this.districtcollections = []
            this.districtcollectiontwos = []
            this.districtcollectionthrees = []
            this.districtcollectionfours = []
            this.tableData.push(obj)
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
      }
    },
    format (percentage) {
      return percentage === 100 ? '' : ``;
    },
    chongzhi () {
      this.oneself = ''
      this.city = ''
      this.area = ''
      this.datastamp = ''
      this.onedistrict = ''
      this.trade = ''
      this.twodistrict = ''
      this.twotrade = ''
      this.changjingmingcheng = ''
      this.biaoqian = ''
      this.valuedate = ''
      this.Provide = []
      this.City = []
      this.Area = []
      this.districtcollection = []
      this.districtcollectiontwo = []
      this.districtcollectionthree = []
      this.districtcollectionfour = []
      this.valuedate = []
      this.scenesheading = []
      this.crowdtab = []
      this.districtcollections = []
      this.districtcollectiontwos = []
      this.districtcollectionthrees = []
      this.districtcollectionfours = []
    },
    dgsj (index, row) {
      this.searchId = row.searchUUID
      let info = new FormData()
      info.append('type',1)
      info.append('searchId',this.searchId)
      this.$http.get('modules/media/all').then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.media = data
        }
      }).catch(function (err) {
        console.log('错误信息' + err)
      })
      this.$http.post(`pc/order/init`,info).then(res=>{
        var {code,data}=res.data
        if(code===1000){
           this.mediaAccountList = data.mediaAccountList
          this.formname = data.name
          this.ysjl1 =data.dataCount
          this.dataPrice = data.dataPrice
        }
      }).catch((err)=>{
        console.log('错误信息'+err)
      })
      this.dgdata = true
    },
    // 计算金额
    cipher(){
      this.dgmoney = Number(this.buyAmount)*this.dataPrice
      console.log(this.buyAmount)
      console.log(this.dataPrice)
    },
    sjdata () {
      this.formname = ''
      this.buyAmount = ''
      this.searchId = ''
      this.ids = ''
      this.mediaData = []
      this.dgdata = false
    },
    Orderportrait (index, row) {
      this.searchId = row.searchUUID
      let ids = this.searchId.join(',')
      let info = new FormData()
      info.append('ids',ids)
      info.append('type',2)
      this.$http.post(`pc/task/orderInit`,info).then(res=>{
        var {code,data}=res.data
        if(code===1000){
          console.log(data)
          this.formname = data.name
          this.moeny = data.personaPrice
          this.ysjl = data.dataCount
        }
      }).catch((err)=>{
        console.log('错误信息'+err)
      })
      this.ikon = true
    },
    gb () {
      this.ikon = false
    },
    // 订购数据新增或添加媒体账号
    adddata () {
      this.$http.put(`pc/media?mediaId=${this.platform}&username=${this.user}&password=${this.password}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.mediaData.push(data)
          this.mediaData.forEach(item => {
            this.mediaids.push(item.id)
            this.media.forEach(item1 => {
              if (item.mediaId == item1.id) {
                item.media = item1.name
              }
            })
          })
          console.log(this.mediaData)
          this.ids = this.mediaids.join(',')
          this.platform = ''
          this.user = ''
          this.password = ''
        }
      }).catch(function (err) {
        console.log('错误信息' + err)
      })
    },
    // 删除媒体账号
    handleDelete (index, rows) {
      rows.splice(index, 1);
    },
    mass () {
      this.mediaAccountList.forEach(item => {
        if (this.platform == item.mediaId) {
          this.user = item.username
          this.password = item.password
        } else {
          this.user = ''
          this.password = ''
        }
      })
    },
    ti () {
      this.$confirm('是否确定提交订购数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let info = new FormData()
        info.append('name', this.formname)
        info.append('buyAmount', this.buyAmount)
        info.append('searchId', this.searchId)
        info.append('ids', this.ids1)
        info.append('buyPrice', 233)
        this.$http.post(`pc/order/orderData`, info).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.$message({
              type: 'success',
              message: '提交成功!'
            });
            this.dgdata = false
          } else {
            this.$message.error(res.data.message);
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    queding () {
      this.$confirm('是否确定提交订购画像, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let info = new FormData()
        info.append('searchId', this.searchId)
        info.append('price', 232)
        this.$http.post(`pc/order/orderPersona`).then(res => {
          var { code, data } = res.data
          if (code == 1000) {
            this.$message({
              type: 'success',
              message: '提交成功!'
            });
            this.ikon = false
          } else {
            this.$message.error(res.data.message);
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    }
  }
}
</script>

<style lang='scss' module>
.f_sx {
  margin-top: 36px;
  background-color: #fff;
  text-align: left;
  border-radius: 10px;
  p {
    padding-top: 35px;
    margin: 30px 10px;
    padding-left: 10px;
    border-bottom: 1px solid #e6e9f0;
  }
}
.search,
.search1 {
  margin-top: 20px;
}
.search1 {
  padding-bottom: 20px;
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
    width: calc(100% - 90%);
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
.f_btn {
  display: inline-block;
  width: 68px;
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
.f_table {
  margin-top: 36px;
  background-color: #fff;
  text-align: left;
  border-radius: 10px;
  p {
    padding-top: 35px;
    margin: 30px 10px;
    padding-left: 10px;
    border-bottom: 1px solid #e6e9f0;
  }
}
.f_bgnr {
  padding-top: 39px;
  padding-left: 34px;
  padding-right: 34px;
}
.f_jb {
  // padding-top: 37px;
  margin-right: 20px;
  width: 97%;
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
    width: calc(100% - 60%);
    padding-left: 1%;
  }
}
.f_bq {
  font-size: 14px;
  color: #3b4859;
  letter-spacing: 0;
  line-height: 114px;
  vertical-align: top;
  text-align: center;
  display: inline-block;
  width: calc(100% - 43%);
}
.f_rmrq {
  margin-left: 5%;
}
.f_rq {
  display: inline-block;
  float: right;
  padding-top: 10px;
  padding-right: 10px;
}
.f_tj {
  display: inline-block;
  padding: 10px;
}
.f_jd {
  padding: 0 20px;
  padding-bottom: 20px;
}
.f_zn,
.f_ym {
  font-size: 14px;
  color: #8998ac;
  letter-spacing: 0;
  line-height: 22px;
}
.f_ym {
  float: right;
  padding-right: 11%;
}
.f_delete {
  font-size: 14px;
  color: #9013fe;
  letter-spacing: 0;
  padding-right: 10px;
  cursor: pointer;
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
  padding-top: 20px;
}
.f_s5 {
  margin-right: 10px;
  width: calc(100% - 76%);
  display: inline-block;
  float: left;
}
.f_jz {
  margin-top: 20px;
  text-align: center;
}
</style>
