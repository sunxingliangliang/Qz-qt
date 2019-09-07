<template>
  <div class="bj">
    <div>
      <div :class="$style.f_s">
        <el-card shadow="always" :class="$style.f_kp">
          <p :class="$style.f_p">全部终端</p>
          <p :class="$style.f_num">{{num}}</p>
          <el-progress :percentage="num5" :class="$style.f_jd" :format="format"></el-progress>
        </el-card>
      </div>
      <div :class="$style.f_s6">
        <el-card shadow="always" :class="$style.f_kp">
          <p :class="$style.f_p">采集中</p>
          <p :class="$style.f_num4">{{num4}}</p>
          <el-progress :percentage="num6" class="f_jd4" :format="format"></el-progress>
        </el-card>
      </div>
      <div :class="$style.f_s6">
        <el-card shadow="always" :class="$style.f_kp">
          <p :class="$style.f_p" style="width: 48px;">联网</p>
          <p :class="$style.f_num1">{{num1}}</p>
          <el-progress :percentage="num7" class="f_jd1" :format="format"></el-progress>
        </el-card>
      </div>
    </div>
    <!-- 表格 -->
    <div :class="$style.f_table">
      <p>终端列表</p>
      <div :class="$style.f_row">
        <div :span="1" :class="{'f_fy':xz,'f_fy1':xz1}" @click="qb">全部</div>
        <div :span="1" :class="{'f_fy':xz2,'f_fy1':xz3}" @click="ywc">采集中</div>
        <div :span="1" :class="{'f_fy':xz4,'f_fy1':xz5}" @click="wwc">待采集</div>
        <div :span="1" :class="{'f_fy':xz6,'f_fy1':xz7}" @click="zzrw">已联网</div>
        <div
          :span="1"
          :offset="15"
          :class="$style.f_btn"
          style="float: right; margin-right: 22px;"
          @click="dghx"
        >绑定终端</div>
      </div>
      <!-- 表格内容 -->
      <!-- 全部 -->
      <div v-if="xz1===true">
        <div :class="$style.f_bgnr">
          <el-table
            :data="alltableData"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
            <el-table-column sortable align="center" label="任务编号" width="180">
              <template slot-scope="scope">
                <span
                  @click="point(scope.$index, scope.row)"
                  :class="$style.f_point"
                >{{scope.row.code}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="分组" width="180">
              <template slot-scope="scope">
                <span v-if="scope.row.groupName!=''">{{scope.row.groupName}}</span>
                <span v-if="scope.row.groupName===''">未分组</span>
              </template>
            </el-table-column>
            <el-table-column prop="status" align="center" sortable label="采集状态"></el-table-column>
            <el-table-column prop="isNet" align="center" sortable label="联网状态"></el-table-column>
            <el-table-column align="center" label="采集任务">
              <template slot-scope="scope">
                <span
                  @click="sjxq(scope.$index, scope.row)"
                  :class="$style.f_ycsj"
                >{{scope.row.taskName}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="固定画像">
              <template slot-scope="scope">
                <span
                  @click="sjxq2(scope.$index, scope.row)"
                  :class="$style.f_ycsj"
                >{{scope.row.fixedName}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="isTaskRange" align="center" label="位置信息"></el-table-column>
            <el-table-column prop="status" align="center" label="操作">
              <template slot-scope="scope">
                <span
                  @click="open(scope.$index, scope.row)"
                  style="font-size: 14px; cursor: pointer; color: #9013FE; letter-spacing: 0; text-align: center;"
                >解绑</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 采集中 -->
      <div v-if="xz3===true">
        <div :class="$style.f_bgnr">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
            <el-table-column sortable align="center" label="任务编号" width="180">
              <template slot-scope="scope">
                <span
                  @click="point(scope.$index, scope.row)"
                  :class="$style.f_point"
                >{{scope.row.id}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" align="center" label="分组" width="180"></el-table-column>
            <el-table-column prop="date" align="center" sortable label="采集状态"></el-table-column>
            <el-table-column prop="time" align="center" sortable label="联网状态"></el-table-column>
            <el-table-column align="center" label="采集任务">
              <template slot-scope="scope">
                <span
                  @click="sjxq(scope.$index, scope.row)"
                  :class="$style.f_ycsj"
                >{{scope.row.ycsj}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="固定画像">
              <template slot-scope="scope">
                <span
                  @click="sjxq2(scope.$index, scope.row)"
                  :class="$style.f_ycsj"
                >{{scope.row.cj}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="lx" align="center" label="位置信息"></el-table-column>
            <el-table-column prop="status" align="center" label="操作">
              <template slot-scope="scope">
                <span
                  @click="open(scope.$index, scope.row)"
                  style="font-size: 14px; cursor: pointer; color: #9013FE; letter-spacing: 0; text-align: center;"
                >解绑</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 待采集 -->
      <div v-if="xz5===true">
        <div :class="$style.f_bgnr">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
            <el-table-column sortable align="center" label="任务编号" width="180">
              <template slot-scope="scope">
                <span
                  @click="point(scope.$index, scope.row)"
                  :class="$style.f_point"
                >{{scope.row.id}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" align="center" label="分组" width="180"></el-table-column>
            <el-table-column prop="date" align="center" sortable label="采集状态"></el-table-column>
            <el-table-column prop="time" align="center" sortable label="联网状态"></el-table-column>
            <el-table-column align="center" label="采集任务">
              <template slot-scope="scope">
                <span
                  @click="sjxq(scope.$index, scope.row)"
                  :class="$style.f_ycsj"
                >{{scope.row.ycsj}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="固定画像">
              <template slot-scope="scope">
                <span
                  @click="sjxq2(scope.$index, scope.row)"
                  :class="$style.f_ycsj"
                >{{scope.row.cj}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="lx" align="center" label="位置信息"></el-table-column>
            <el-table-column prop="status" align="center" label="操作">
              <template slot-scope="scope">
                <span
                  @click="open(scope.$index, scope.row)"
                  style="font-size: 14px; cursor: pointer; color: #9013FE; letter-spacing: 0; text-align: center;"
                >解绑</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 已联网 -->
      <div v-if="xz7===true">
        <div :class="$style.f_bgnr">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
            <el-table-column sortable align="center" label="任务编号" width="180">
              <template slot-scope="scope">
                <span
                  @click="point(scope.$index, scope.row)"
                  :class="$style.f_point"
                >{{scope.row.id}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" align="center" label="分组" width="180"></el-table-column>
            <el-table-column prop="date" align="center" sortable label="采集状态"></el-table-column>
            <el-table-column prop="time" align="center" sortable label="联网状态"></el-table-column>
            <el-table-column align="center" label="采集任务">
              <template slot-scope="scope">
                <span
                  @click="sjxq(scope.$index, scope.row)"
                  :class="$style.f_ycsj"
                >{{scope.row.ycsj}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="固定画像">
              <template slot-scope="scope">
                <span
                  @click="sjxq2(scope.$index, scope.row)"
                  :class="$style.f_ycsj"
                >{{scope.row.cj}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="lx" align="center" label="位置信息"></el-table-column>
            <el-table-column prop="status" align="center" label="操作">
              <template slot-scope="scope">
                <span
                  @click="open(scope.$index, scope.row)"
                  style="font-size: 14px; cursor: pointer; color: #9013FE; letter-spacing: 0; text-align: center;"
                >解绑</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 绑定终端 -->
      <div>
        <el-dialog title="绑定终端" :visible.sync="bangding" width="30%" :before-close="bd">
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 7}"
            placeholder="请输入终端编号,多个终端请另起一行排列"
            v-model="textarea2"
          ></el-input>
          <p :class="$style.f_yl" style="margin-top:5px;">样例：</p>
          <p :class="$style.f_yl">QZ-QQWEWEWQ</p>
          <p :class="$style.f_yl">QZ-QQWEWEWQ</p>
          <p :class="$style.f_yl">QZ-QQWEWEWQ</p>
          <span slot="footer" class="dialog-footer">
            <el-button @click="bangding = false" :class="$style.f_btn1">取 消</el-button>
            <el-button type="primary" :class="$style.f_btn1" @click="tijiao">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 解绑 -->
      <div>
        <el-dialog title="解绑" :visible.sync="jiebang" width="30%" :before-close="bd">
          <p :class="$style.f_yl" style="margin-top:5px;margin-bottom:10px;font-size: 14px;">
            <i class="el-icon-warning" style="color: #f80e;font-size: 28px;"></i>
            是否确定解除"{{jbname}}"绑定
          </p>
          <p :class="$style.f_yl">终端解绑后，终端将不再执行原任务并且清除相关信息</p>
          <span slot="footer" class="dialog-footer">
            <el-button @click="quxiao1 " :class="$style.f_btn1">取 消</el-button>
            <el-button type="primary" :class="$style.f_btn1" @click="tijiao1">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 分页 -->
      <div style="text-align: right;margin-top:20px;padding-bottom: 20px;padding-right:10px;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <div :class="$style.f_jz">
      <footerl/>
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
      textarea2: '',
      num: 2000,
      num1: 500,
      num2: 500,
      num3: 500,
      num4: 500,
      num5: 100,
      num6: 0,
      num7: 0,
      input: '',
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
      tableData: [],
      tableData1: [],
      alltableData: [],
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
      btname: '任务详情',
      btmatter: '数据回购任务',
      bangding: false,
      jiebang: false,
      jbname: '',
      total: null,
      sizes: 10,
    }
  },
  mounted () {
    this.qb()
    this.getCount()
  },
  methods: {
    getCount () {
      this.$http.get(`pc/device/count`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          this.num = data.all
          this.num4 = data.gather
          if (this.num4 / this.num5 === 0) {
            this.num6 = 0
          } else if (this.num4 === this.num) {
            this.num6 = 100
          } else {
            this.num6 = (this.num4 / this.num5) * 100
          }
          this.num1 = data.isNet
          if (this.num1 / this.num5 === 0) {
            this.num7 = 0
          } else if (this.num1 === this.num) {
            this.num7 = 100
          } else {
            this.num7 = (this.num1 / this.num5) * 100
          }
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    format (percentage) {
      return percentage === 100 ? '' : ``;
    },
    chongzhi () {
      this.input = ''
      this.value1 = ''
    },
    open (index, row) {
      console.log(row)
      this.jbname = row.id
      console.log(this.jbname)
      this.jiebang = true
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
      this.$http.get(`pc/device/list`, {        params: {
          size: this.sizes,
          type: 0
        }      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          this.alltableData = data.content
          this.total = data.total
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    // 采集中
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
      this.$http.get(`pc/device/list`, {        params: {
          size: this.sizes,
          type: 1
        }      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          this.alltableData = data.content
          this.total = data.total
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    // 待采集
    wwc () {
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
      this.$http.get(`pc/device/list`, {        params: {
          size: this.sizes,
          type: 2
        }      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          this.alltableData = data.content
          this.total = data.total
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    // 已联网
    zzrw () {
      this.xz1 = false
      this.xz = true
      this.xz2 = true
      this.xz3 = false
      this.xz4 = true
      this.xz5 = false
      this.xz6 = false
      this.xz7 = true
      this.xz8 = true
      this.xz9 = false
      this.$http.get(`pc/device/list`, {        params: {
          size: this.sizes,
          type: 3
        }      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          this.alltableData = data.content
          this.total = data.total
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    // 订购画像
    dghx () {
      this.bangding = true
    },
    // 订购数据
    dgsj () {
      console.log(2)
      this.dgdata = true
    },
    handleSelectionChange (val) {
      console.log(val)
    },
    handleSizeChange (val) {
      this.sizes = val
      this.$http.get(`pc/device/list`, {
        params: {
          size: val
        }
      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          this.alltableData = data.content
          this.total = data.total
        }else if (code == 2001) {
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
    handleCurrentChange (val) {
      this.$http.get(`pc/device/list?size=${this.sizes}&page=${val - 1}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          this.alltableData = data.content
          this.total = data.total
        }else if (code == 2001) {
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
    dj () {
      console.log('b')
    },
    sjxq (index, row) {
      this.$store.commit('myval1', this.btname)
      console.log(row)
      this.$router.push({ path: '/index/rwpoint.vue', query: { row: row } })
    },
    sjxq2 (index, row) {
      this.$store.commit('myval1', this.btname)
      console.log(index)
      // this.$router.push('/index/rwpoint.vue')
      this.$router.push({ path: '/index/rwpoint.vue', query: { row: row } })
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
    lingqu () {
      this.$store.commit('myval1', this.btname)
      this.$router.push('/index/lqrenwu.vue')
    },
    point (index, row) {
      console.log(row)
      this.$store.commit('myval1', this.btmatter)
      this.$router.push({ path: '/index/rwhuigou.vue', query: { row: row } })
    },
    tijiao () {
      var string = this.textarea2;
      string = string.replace(/\n/g, ",")
      // let info = new FormData()
      // info.append('str', string)
      let info = {
        'str': string
      }
      this.$http.post('pc/device/binding', info).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          // this.$message({
          //   type: 'success',
          //   message: '添加成功!'
          // });
          // this.getList()
          // this.bangding = false
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
    bd () {
      console.log(1)

      this.bangding = false
    },
    tijiao1 () {
      // let info = new FormData()
      // info.append('deviceId', this.jbname)
      let info = {
        'deviceId': this.jbname
      }
      this.$http.post(`pc/device/untied`, info).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          this.$message({
            type: 'success',
            message: '解绑成功!'
          });
          this.jiebang = false
          this.getList()
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })

    },
    quxiao1 () {
      this.$message({
        type: 'info',
        message: '已取消'
      });
      this.jiebang = false
    }
  }
}
</script>

<style lang='scss' module>
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
.f_s {
  margin-left: 44px;
}
.f_sx {
  margin-top: 36px;
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
  .f_cx {
    font-size: 14px;
    color: #3b4859;
    letter-spacing: 0;
    line-height: 60px;
    padding-left: 20px;
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
  color: #9013fe;
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
.f_inpt {
  width: calc(100% - 66%);
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
.f_btn1 {
  width: 80px;
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
.f_s5 {
  margin-right: 10px;
  width: calc(100% - 76%);
}
.f_point {
  cursor: pointer;
  color: #3b7cff;
}
.f_z {
  font-size: 12px;
  color: #3b4859;
  letter-spacing: 0;
  line-height: 24px;
  float: left;
}
.f_y,
.f_y1,
.f_y2 {
  font-size: 12px;

  letter-spacing: 0;
  line-height: 24px;
  float: right;
}
.f_y {
  color: #fb745b;
}
.f_y1 {
  color: #77c12b;
}
.f_y2 {
  color: #9013fe;
}
.f_zd,
.f_zd1,
.f_zd2 {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  margin-right: -21%;
}
.f_zd {
  background: #fb745b;
}
.f_zd1 {
  background: #77c12b;
}
.f_zd2 {
  background: #9013fe;
}
.f_zx {
  font-size: 11px;
  color: #8a99ad;
  letter-spacing: 0;
  line-height: 24px;
  float: left;
}
.f_yl {
  padding-top: 0 !important;
  padding-bottom: 5px !important;
  font-size: 12px;
}
</style>
