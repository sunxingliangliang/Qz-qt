<template>
  <div :class="$style.f_bj">
    <div :class="$style.f_s">
      <el-card shadow="always" :class="$style.f_kp">
        <p :class="$style.f_p">全部任务</p>
        <p :class="$style.f_num">{{allnum}}</p>
        <el-progress :percentage="hundredpercent" :class="$style.f_jd" :format="format"></el-progress>
      </el-card>
    </div>
    <div :class="$style.f_s6">
      <el-card shadow="always" :class="$style.f_kp">
        <p :class="$style.f_p">已完成</p>
        <p :class="$style.f_num1">{{completednum}}</p>
        <el-progress :percentage="completedpercentage" class="f_jd1" :format="format"></el-progress>
      </el-card>
    </div>
    <div :class="$style.f_s6">
      <el-card shadow="always" :class="$style.f_kp">
        <p :class="$style.f_p">未完成</p>
        <p :class="$style.f_num2">{{undonenum}}</p>
        <el-progress :percentage="undonepercentage" class="f_jd2" :format="format"></el-progress>
      </el-card>
    </div>
    <!-- 任务筛选 -->
    <div :class="$style.f_sx">
      <p>任务筛选</p>
      <!-- 输入框 -->
      <div :class="$style.f_search">
        <span :class="$style.f_cx">输入查询</span>
        <el-input placeholder="请输入搜索内容" v-model="searchcontent" :class="$style.f_inpt" clearable></el-input>
        <el-date-picker
          v-model="selectdate"
          type="date"
          :class="$style.f_date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        <el-button plain @click="demand" :class="$style.f_chaxun">查询</el-button>
        <el-button type="info" plain @click="chongzhi">重置</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div :class="$style.f_table">
      <p>数据收益统计</p>
      <el-row :class="$style.f_row">
        <el-col :span="1" :class="{'f_fy':xz,'f_fy1':xz1}" @click.native="qb">全部</el-col>
        <el-col :span="1" :class="{'f_fy':xz2,'f_fy1':xz3}" @click.native="ywc">已完成</el-col>
        <el-col :span="1" :class="{'f_fy':xz4,'f_fy1':xz5}" @click.native="wwc">待完成</el-col>
      </el-row>
      <!-- 表格内容 -->
      <!-- 全部任务 -->
      <div v-if="xz1===true">
        <div :class="$style.f_bgnr">
          <el-table
            :data="datarevenue"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" align="center" width="55"></el-table-column>
            <el-table-column sortable align="center" label="订单编号" width="180">
              <template slot-scope="scope">
                <span
                  @click="point(scope.$index, scope.row)"
                  :class="$style.f_point"
                >{{scope.row.code}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" align="center" label="订单名称" width="180"></el-table-column>
            <el-table-column prop="buyAmount" align="center" label="订购数据"></el-table-column>
            <el-table-column prop="buyPrice" align="center" label="订购金额"></el-table-column>
            <el-table-column prop="createTime" align="center" label="提交时间"></el-table-column>
            <el-table-column align="center" label="状态">
              <template slot-scope="scope">
                <span v-if="scope.row.status===1">
                  <i class="zanting"></i>审批
                </span>
                <span v-if="scope.row.status===2">
                  <i class="gzz"></i>分析
                </span>
                <span v-if="scope.row.status===3">
                  <i class="ytz"></i>驳回
                </span>
                <span v-if="scope.row.status===5">
                  <i class="gzz"></i>分析
                </span>
                <span v-if="scope.row.status===6">
                  <i class="jieshu"></i>完成
                </span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 已完成 -->
      <div v-if="xz3===true">
        <div :class="$style.f_bgnr">
          <el-table
            :data="datarevenue"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" align="center" width="55"></el-table-column>
            <el-table-column sortable align="center" label="订单编号" width="180">
              <template slot-scope="scope">
                <span
                  @click="point(scope.$index, scope.row)"
                  :class="$style.f_point"
                >{{scope.row.code}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" align="center" label="订单名称" width="180"></el-table-column>
            <el-table-column prop="bugAmount" align="center" label="订购数据"></el-table-column>
            <el-table-column prop="bugPrice" align="center" label="订购金额"></el-table-column>
            <el-table-column prop="createTime" align="center" label="提交时间"></el-table-column>
            <el-table-column align="center" label="状态">
              <template slot-scope="scope">
                <span v-if="scope.row.status===1">
                  <i class="zanting"></i>审批
                </span>
                <span v-if="scope.row.status===2">
                  <i class="gzz"></i>分析
                </span>
                <span v-if="scope.row.status===3">
                  <i class="ytz"></i>驳回
                </span>
                <span v-if="scope.row.status===5">
                  <i class="gzz"></i>分析
                </span>
                <span v-if="scope.row.status===6">
                  <i class="jieshu"></i>完成
                </span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 未完成 -->
      <div v-if="xz5===true">
        <div :class="$style.f_bgnr">
          <el-table
            :data="datarevenue"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" align="center" width="55"></el-table-column>
            <el-table-column sortable align="center" label="订单编号" width="180">
              <template slot-scope="scope">
                <span
                  @click="point(scope.$index, scope.row)"
                  :class="$style.f_point"
                >{{scope.row.code}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" align="center" label="订单名称" width="180"></el-table-column>
            <el-table-column prop="bugAmount" align="center" label="订购数据"></el-table-column>
            <el-table-column prop="bugPrice" align="center" label="订购金额"></el-table-column>
            <el-table-column prop="createTime" align="center" label="提交时间"></el-table-column>
            <el-table-column align="center" label="状态">
              <template slot-scope="scope">
                <span v-if="scope.row.status===1">
                  <i class="zanting"></i>审批
                </span>
                <span v-if="scope.row.status===2">
                  <i class="gzz"></i>分析
                </span>
                <span v-if="scope.row.status===3">
                  <i class="ytz"></i>驳回
                </span>
                <span v-if="scope.row.status===5">
                  <i class="gzz"></i>分析
                </span>
                <span v-if="scope.row.status===6">
                  <i class="jieshu"></i>完成
                </span>
              </template>
            </el-table-column>
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
    <!-- 数据详情 -->
    <div>
      <el-dialog
        title="数据列表——任务名称"
        :class="$style.f_tit"
        :visible.sync="sjxq1"
        width="30%"
        :before-close="handleClose"
      >
        <el-select v-model="value3" clearable multiple placeholder="请选择采集场景">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="value2" clearable multiple placeholder="请选择终端编号">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <div :class="$style.f_sjbg">
          <el-table :data="datarevenue" border style="width: 100%">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="date" label="MAC地址"></el-table-column>
            <el-table-column prop="name" label="采集时间"></el-table-column>
            <el-table-column prop="name" label="场景名称"></el-table-column>
            <el-table-column prop="address" label="终端编号"></el-table-column>
          </el-table>
        </div>
        <!-- 分页 -->
        <div style="text-align: right;margin-top:20px;padding-bottom: 20px;padding-right:10px;">
          <el-pagination
            @size-change="handleSizeChange1"
            @current-change="handleCurrentChange1"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
          ></el-pagination>
        </div>
      </el-dialog>
    </div>
    <!-- 订购画像 -->
    <div class="f_dg">
      <el-dialog title="订购画像" :visible.sync="ikon" width="30%" :before-close="gb">
        <p :class="$style.f_jb">基本信息</p>
        <el-row :class="$style.f_hxrow">
          <span :class="$style.f_ddname">订单名称:</span>
          <el-input placeholder="请输入内容" v-model="input1" :class="$style.f_hxinpt" clearable></el-input>
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
          <el-input placeholder="请输入内容" v-model="input1" :class="$style.f_hxinpt" clearable></el-input>
        </el-row>
        <p :class="$style.f_sjxx">数据信息</p>
        <el-row :class="$style.f_hxrow">
          <span :class="$style.f_ddname">源数据量：</span>
          <span :class="$style.f_ddname">{{ysjl}}</span>
        </el-row>
        <el-row :class="$style.f_hxrow">
          <span :class="$style.f_ddname">订单数量:</span>
          <el-input placeholder="请输入内容" v-model="input1" :class="$style.f_hxinpt1" clearable></el-input>
        </el-row>
        <el-row :class="$style.f_hxrow">
          <el-col style="line-height: 40px;margin-right: 1%;" :span="2">
            <span :class="$style.f_ddname">数据范围:</span>
          </el-col>
          <el-col style="line-height: 40px;" :span="1">
            <span>性别:</span>
          </el-col>
          <el-col :span="4">
            <el-select v-model="age" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col style="line-height: 40px;margin-left: 5%;" :span="1">
            <span>年龄:</span>
          </el-col>
          <el-col :span="4">
            <el-select v-model="nl" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col style="line-height: 40px;margin-left: 5%;" :span="1">
            <span>职业:</span>
          </el-col>
          <el-col :span="4">
            <el-select v-model="zy" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :class="$style.f_hxrow">
          <el-col :offset="1" style="line-height: 40px;margin-left: 5%;" :span="2">
            <span>工作地点:</span>
          </el-col>
          <el-col :span="4">
            <el-select v-model="gzdd" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col style="line-height: 40px;margin-left: 1%;" :span="3">
            <span>居住地点:</span>
          </el-col>
          <el-col :span="4">
            <el-select v-model="jzdd" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :class="$style.f_hxrow">
          <span :class="$style.f_ddname">订购金额：</span>
          <span :class="$style.f_ddname" v-if="dgmoney===null">自动计算</span>
          <span :class="$style.f_ddname" v-if="dgmoney!=null">{{dgmoney}}</span>
        </el-row>
        <p :class="$style.f_jb" style="margin-top:20px;">媒体平台</p>
        <el-row style="margin-top:20px;">
          <el-col :span="5" :class="$style.f_s5">
            <el-select v-model="pt" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="5" :class="$style.f_s5">
            <el-input placeholder="请输入账户" v-model="input" clearable></el-input>
          </el-col>
          <el-col :span="5" :class="$style.f_s5">
            <el-input placeholder="请输入密码" v-model="input" show-password clearable></el-input>
          </el-col>
          <el-col :span="5">
            <span @click="dgdata = false" style="display: inline-block;" :class="$style.f_btn">增加</span>
          </el-col>
        </el-row>
        <el-table :data="datarevenue" border style="width: 100%;margin-top:20px;">
          <el-table-column prop="date" label="平台" width="180"></el-table-column>
          <el-table-column prop="name" label="账户" width="180"></el-table-column>
          <el-table-column prop="address" label="密码"></el-table-column>
          <el-table-column label="操作">
            <template>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
          <span @click="queding" style="display: inline-block;" :class="$style.f_btn">确定</span>
        </span>
      </el-dialog>
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
      allnum: 2000,
      completednum: 500,
      undonenum: 500,
      hundredpercent: 100,
      completedpercentage: 0,
      undonepercentage: 0,
      num3: 500,
      num4: 500,
      input: '',
      searchcontent: '',
      selectdate: '',
      value1: '',
      xz: false,
      xz1: true,
      xz2: true,
      xz3: false,
      xz4: true,
      xz5: false,
      xz6: true,
      xz7: false,
      xz8: true,
      xz9: false,
      datarevenue: [],
      datarevenue1: [],
      currentPage4: 1,
      sjxq1: false,
      value3: [],
      value2: [],
      options: [],
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
      btmatter: '订单详情',
      total: null,
      sizes: 10
    }
  },
  mounted () {
    this.qb()
    this.getStatistical()
  },
  methods: {
    format (percentage) {
      return percentage === 100 ? '' : ``;
    },
    chongzhi () {
      this.searchcontent = ''
      this.selectdate = ''
    },
    // 数据统计
    getStatistical () {
      this.$http.get(`pc/orderData/orderDataCount`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.allnum = data.COUNT
          this.completednum = data.END
          if (this.completednum / this.hundredpercent === 0) {
            this.completedpercentage = 0
          } else if (this.completednum === this.allnum) {
            this.completedpercentage = 100
          } else {
            this.completedpercentage = (this.completednum / this.hundredpercent) * 100
          }
          this.undonenum = data.UNDONE
          if (this.undonenum / this.hundredpercent === 0) {
            this.undonepercentage = 0
          } else if (this.undonenum === this.allnum) {
            this.undonepercentage = 100
          } else {
            this.undonepercentage = (this.undonenum / this.hundredpercent) * 100
          }
        }
      }).catch(function (err) {
        console.log('错误信息' + err)
      })
    },
    // 全部任务
    qb () {
      this.xz1 = true
      this.xz = false
      this.xz2 = true
      this.xz3 = false
      this.xz4 = true
      this.xz5 = false
      this.xz6 = true
      this.xz7 = false
      this.xz8 = true
      this.xz9 = false
      this.$http.get(`pc/orderData/list?size=${10}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.datarevenue = data.content
          this.total = data.total
        }
      }).catch(function (err) {
        console.log('错误信息' + err)
      })
    },
    // 已完成任务
    ywc () {
      this.xz1 = false
      this.xz = true
      this.xz2 = false
      this.xz3 = true
      this.xz4 = true
      this.xz5 = false
      this.xz6 = true
      this.xz7 = false
      this.xz8 = true
      this.xz9 = false
      this.$http.get(`pc/orderData/list?tab=1&size=${10}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.datarevenue = data.content
          this.total = data.total
          console.log(this.datarevenue)
        }
      }).catch(function (err) {
        console.log('错误信息' + err)
      })
    },
    // 未完成
    wwc () {
      console.log(1)
      this.xz1 = false
      this.xz = true
      this.xz2 = true
      this.xz3 = false
      this.xz4 = false
      this.xz5 = true
      this.xz6 = true
      this.xz7 = false
      this.xz8 = true
      this.xz9 = false
      this.$http.get(`pc/orderData/list?tab=2&size=${10}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.datarevenue = data.content
          this.total = data.total
          console.log(this.datarevenue)
        }
      }).catch(function (err) {
        console.log('错误信息' + err)
      })
    },
    handleSelectionChange (val) {
      console.log(val)
    },
    // 查询
    demand () {
      if (this.xz1 === true) {
        this.$http.get(`pc/orderData/list?keySearch=${this.searchcontent}&createTime=${this.selectdate}`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.datarevenue = data.content
            this.total = data.total
          }
        }).catch(function (err) {
          console.log('错误信息' + err)
        })
      } else if (this.xz3 === true) {
        this.$http.get(`pc/orderData/list?tab=1&keySearch=${this.searchcontent}&createTime=${this.selectdate}`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.datarevenue = data.content
            this.total = data.total
          }
        }).catch(function (err) {
          console.log('错误信息' + err)
        })
      } else if (this.xz5 === true) {
        this.$http.get(`pc/orderData/list?tab=2&keySearch=${this.searchcontent}&createTime=${this.selectdate}`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.datarevenue = data.content
            this.total = data.total
          }
        }).catch(function (err) {
          console.log('错误信息' + err)
        })
      }
    },
    handleSizeChange (val) {
      this.sizes = val
      this.$http.get(`pc/orderData/list?size=${val}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.datarevenue = data.content
          this.total = data.total
        }
      }).catch(function (err) {
        console.log('错误信息' + err)
      })
    },
    handleCurrentChange (val) {
      this.$http.get(`pc/orderData/list?page=${val - 1}&size=${this.sizes}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.datarevenue = data.content
          this.total = data.total
        }
      }).catch(function (err) {
        console.log('错误信息' + err)
      })
      console.log(`当前页: ${val}`);
    },
    handleSizeChange1 (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange1 (val) {
      console.log(`当前页: ${val}`);
    },
    arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
      console.log(1)
    },
    dj () {
      console.log(1)
    },
    sjxq () {
      console.log(1)
      this.sjxq1 = true
    },
    handleClose () {
      this.sjxq1 = false
    },
    gb () {
      this.ikon = false
    },
    sjdata () {
      this.dgdata = false
    },
    queding () {
      this.$confirm('此操作将扣除您的购买费用, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '购买成功!'
        });
        this.ikon = false
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    point (index, row) {
      console.log(row.id)
      this.$http.get(`modules/order/detail/${row.id}`).then(res=>{
        var {code,data}=res.data
        if(code===1000){
          console.log(data)
          this.$store.commit('myval1', this.btmatter)
          this.$router.push({ path: '/index/ddpoint.vue', query: { id: row.id,row:data,data1:row } })
        }
      }).catch(function(err){
        console.log('错误信息'+err)
      })
    }
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
  display: inline-block;
  margin-left: 20px;
  width: 370px;
  height: 80px;
  margin-top: 20px;
  border-radius: 10px;
  margin-left: 10px;
  margin-bottom: 30px;
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
      padding-bottom: 10px;
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
.f_sx {
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
  }
  .f_hxinpt1 {
    width: calc(100% - 20%);
    padding-left: 1%;
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
.f_s5 {
  margin-right: 10px;
  width: calc(100% - 76%);
}
.f_point {
  cursor: pointer;
  color: #3b7cff;
}
</style>
