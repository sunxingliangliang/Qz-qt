<template>
  <div :class="$style.f_bj">
    <div
      :class="$style.f_btn"
      @click="create"
      style="float: right; vertical-align: top;    float: right; margin-top: 26px; margin-right: 33px; "
    >创建固定画像</div>
    <!--创建订单 -->
    <div :class="$style.f_cjdd">
      <div v-for="(item,i) in list" :key="i" style="display: inline-block;margin: 10px 20px;">
        <div :class="$style.f_hx1">
          <!-- <img src="../../assets/img/WX20190708-093540.png" alt=""> -->
          <div @click="h1(item)" style="position: relative;">
            <div>
              <i class="iconfont iconzhongduancopy">{{item.deviceNum}}</i>
              <img
                src="../../assets/img/固定画像.png"
                style="width:100%; max-width: 100%;max-height: 100%;"
                alt
              >
            </div>
            <div style="height:60px;">
              <p
                :class="$style.f_mc"
                style="width:60%;text-align: left; display: inline-block;"
              >{{item.name}}</p>
              <div v-if="item.status===1" style="float:right;">
                <i class="iconfont iconshenpi2"></i>
                <br>
                <div style="font-size:14px;color: #8998ac;margin-right: 10px;">审批</div>
              </div>
              <div v-if="item.status===2" style="float:right;">
                <i class="iconfont iconic_detail_telx" style="font-size:25px;"></i>
                <br>
                <div style="font-size:14px;color: #8998ac;margin-right: 10px;">驳回</div>
              </div>
              <div v-if="item.status===3" style="float:right; ">
                <i class="iconfont iconjinhangzhong" style="font-size:25px;"></i>
                <br>
                <div style="font-size:14px;color: #8998ac;margin-right: 10px;">服务</div>
              </div>
              <div v-if="item.status===4" style="float:right;">
                <i class="iconfont iconguoqi1" style="font-size:25px;"></i>
                <br>
                <div style="font-size:14px;color: #8998ac;margin-right: 10px;">过期</div>
              </div>
            </div>
          </div>
          <div :class="$style.f_db">
            <i class="iconfont iconchakan" style="float:left;padding-left:5%;font-size:16px;"></i>
            <span :class="$style.f_z" @click="ddxq1(item)">{{dd}}</span>
            <span :class="$style.f_y">{{item.fromDate}}至{{item.toDate}}</span>
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <div style="text-align: right;margin-top:20px;padding-bottom: 20px;padding-right:10px;">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          layout="total, prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <el-dialog
      title="创建固定画像"
      :visible.sync="regular"
      width="30%"
      class="regular"
      :before-close="handleClose"
    >
      <p :class="$style.f_jb">基本信息</p>
      <el-row :class="$style.f_hxrow">
        <span :class="$style.f_ddname">订单名称:</span>
        <el-input placeholder="请输入内容" v-model="ordername" :class="$style.f_hxinpt" clearable></el-input>
      </el-row>
      <p :class="$style.f_sjxx">数据信息</p>
      <el-row :class="$style.f_hxrow">
        <span :class="$style.f_ddname">订购金额：</span>
        <span :class="$style.f_ddname">{{moeny}}VKT</span>
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
        <el-button
          @click="regular = false"
          style="display: inline-block;"
          :class="$style.f_btn2"
        >取 消</el-button>
        <el-button
          type="primary"
          @click="determine"
          style="display: inline-block;"
          :class="$style.f_btn2"
        >确 定</el-button>
      </span>
    </el-dialog>
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
      mc: '画像名称画像名称画像名称画像名称画像',
      tableData: [],
      list: [],
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
            option.url = `pc/group/findDevicesByGroup?groupId=${node.value}`
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
      selectedOptions: "",
      terminalform: [],
      dd: '画像订单',
      date: '2017-2-1 至 2017-2-1',
      btname: '固定画像分析-订单名称',
      btndd: '固定画像订单',
      currentPage4: 1,
      shuliang: 12,
      total: null,
      regular: false,
      ordername: '',
      textarea2: '',
      moeny: '',
      ending: [],
      group: '',
      terminalcode: '',
      terminalnumber: '',
      ids: [],
      ordermoney: '',
      sizes:6,
      pages:0,
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      this.$http.get(`pc/fixed/selectFixedList`,{params:{
        size:this.sizes,
        page:this.pages
      }}).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          this.list = data.content
          this.total = data.total
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    h1 (item) {
      this.id = item.id
      this.$store.commit('myval1', this.btname)
      this.$store.commit('myid', this.id)
      this.$router.push({ path: '/index/fiexpoint.vue/user.vue' })
    },
    // 创建任务
    create () {
      this.$http.get(`pc/fixed/getFixedPriceBymerchantId`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          this.moeny = data[0]
          this.regular = true
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
            data.forEach(item => {
              if (this.selectedOptions[0][0] == item.id) {
                // console.log(item)
                this.group = item.name
              }
            })
          }
        }).catch(function (err) {
          console.log('错误信息' + err)
        })
        this.$http.get(`pc/group/findDevicesByGroup`,{params:{
          groupId:this.selectedOptions[0][0]}
        }}).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            data.forEach(item => {
              if (this.selectedOptions[0][1] === item.id) {
                // console.log(item)
                this.terminalnumber = item.id
                this.terminalcode = item.code
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
    handleClose () {
      this.regular = false
    },
    adjunction () {
      let obj = {
        code: this.terminalcode,
        name: this.group,
        id: this.terminalnumber
      }
      this.ids.push(this.terminalnumber)
      this.selectedOptions = ''
      this.terminalform.push(obj)
    },
    deleteRow (index, rows) {
      rows.splice(index, 1);
    },
    ddxq () {
      this.$store.commit('myval1', this.btndd)
      console.log(this)
      // this.$router.push({ path: '/index/dataikonpoint.vue', query: { row: this.tableData } })
    },
    ddxq1 (item) {
      this.$store.commit('myval1', this.btndd)
      console.log(item)
      this.$store.commit('myid', item.id)
      this.$router.push({ path: '/index/datafiexpoint.vue', query: { status: item.status } })
    },
    determine () {
      this.$confirm('是否确定提交订购画像, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = this.ids.join(',')
        // let info = new FormData()
        // info.append('name', this.ordername,)
        // info.append('deviceids', ids,)
        // info.append('price', this.moeny,)
        // info.append('remark', this.textarea2)
        let info = {
          'name': this.ordername,
          'deviceids': ids,
          'price': this.moeny,
          'remark': this.textarea2
        }
        this.$http.post(`pc/fixed/addFixed`, info).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.regular = false
            this.getList()
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
        // this.$message({
        //   type: 'success',
        //   message: '删除成功!'
        // });
      }).catch((err) => {
        console.log(err)
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    dj1 () {
      console.log(1)
    },
    dj2 () {
      console.log(1)
    },
    handleCurrentChange (val) {
      this.pages=val
      this.$http.get(`pc/fixed/selectFixedList`,{params:{
        size:this.sizes,
        page:val-1
      }}).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          this.list = data.content
          this.total = data.total
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
      console.log(`当前页: ${val}`);
    },
  }
}
</script>

<style lang='scss' module>
.f_bj {
  width: 1200px;
  margin: 0 auto;
}
.f_cjdd {
  margin-top: 35px;
  background: #fff;
  padding-top: 72px;
  .f_hx1 {
    width: 300px;
    border: 1px solid #e6e9f0;
    display: inline-block;
    margin-top: 20px;
    margin-right: 2%;
    margin-bottom: 30px;
    .f_mc {
      float: left;
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
      height: 30px;
      line-height: 30px;
      span {
        font-size: 15px;
        color: #1f2e4d;
        letter-spacing: 0;
        text-align: center;
      }
      .f_z {
        float: left;
        padding-left: 2%;
        cursor: pointer;
      }
      .f_y {
        float: right;
        padding-right: 2%;
        font-size: 14px;
        color: #8998ac;
        letter-spacing: 0;
        text-align: center;
      }
    }
  }
}
.f_btn {
  // float: right;
  display: inline-block;
  width: 120px;
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
.f_btn2 {
  // float: right;
  display: inline-block;
  width: 80px;
  height: 36px;
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
.f_btn2:hover {
  background: #9013fe;
  color: #fff;
  border: 1px solid #9013fe;
}
.f_jz {
  margin-top: 20px;
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
    padding-left: 1%;
  }
  .f_hxinpt1 {
    width: calc(100% - 60%);
    padding-left: 1%;
  }
}
.f_delete {
  font-size: 14px;
  color: #fb745b;
  letter-spacing: 0;
  cursor: pointer;
}
</style>

