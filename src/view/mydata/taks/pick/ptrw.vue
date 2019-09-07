<template>
  <div>
    <div :class="$style.f_bgnr">
      <el-table :data="tableData" border style="width: 100%" @expand-change="dj">
        <el-table-column type="selection" align="center" width="50"></el-table-column>
        <el-table-column sortable prop="code" align="center" label="任务编号" width="115">
          <template slot-scope="scope">
            <span @click="point(scope.$index, scope.row)" :class="$style.f_point">{{scope.row.code}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" align="center" label="任务名称" width="180"></el-table-column>
        <el-table-column prop="date" align="center" sortable label="采集日期"></el-table-column>
        <el-table-column prop="time" align="center" sortable label="采集时间" width="105"></el-table-column>
        <el-table-column prop="ycsj" align="center" label="已采数据" width="90">
          <template slot-scope="scope">
            <span @click="sjxq" :class="$style.f_ycsj">{{scope.row.ycsj}}</span>
          </template>
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="scope" class="a2">
            <el-table :data="tableData1" class="a1" border style="width: 100%">
              <el-table-column prop="area" align="center" label="采集点" width="180"></el-table-column>
              <el-table-column prop="sjl" align="center" label="数据类型" width="180"></el-table-column>
              <el-table-column prop="rAndIparent" align="center" label="行业/区"></el-table-column>
              <el-table-column prop="rAndI" align="center" label="细分"></el-table-column>
              <el-table-column prop="typeParent" align="center" label="场景类别"></el-table-column>
              <el-table-column prop="type" align="center" label="类别细分"></el-table-column>
              <el-table-column prop="NAME" align="center" label="人群标签"></el-table-column>
              <el-table-column prop="signScencesBase" align="center" label="场景名称"></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="cj" align="left" label="场景" width="105"></el-table-column>
        <el-table-column align="center" label="任务类型" width="90">
          <template slot-scope="scope">
            <span v-if="scope.row.platformTaskId===null">自建任务</span>
            <span v-if="scope.row.platformTaskId!==null">平台任务</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态" width="80">
          <template slot-scope="scope">
            <span
              v-if="scope.row.status===1"
              style="font-size: 14px; letter-spacing: 0; text-align: center;"
            >
              <i class="jinxing"></i>进行
            </span>
            <span
              v-if="scope.row.status===2"
              style="font-size: 14px;  letter-spacing: 0; text-align: center;"
            >
              <i class="zanting"></i>暂停
            </span>
            <span
              v-if="scope.row.status===3"
              style="font-size: 14px; letter-spacing: 0; text-align: center;"
            >
              <i class="jieshu"></i>结束
            </span>
            <span
              v-if="scope.row.status===0"
              style="font-size: 14px;  letter-spacing: 0; text-align: center;"
            >
              <i class="quxiao"></i>取消
            </span>
          </template>
        </el-table-column>
      </el-table>
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
    <!-- 数据详情 -->
    <div class="f_dg">
      <el-dialog
        title="数据列表——任务名称"
        :class="$style.f_tit"
        :visible.sync="sjxq1"
        width="55%"
        :before-close="handleClose"
      >
        <el-select v-model="value3" style="width:26%" clearable multiple placeholder="请选择采集场景">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="value2" style="width:26%" clearable multiple placeholder="请选择终端编号">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <div :class="$style.f_sousuo">
          <el-input placeholder="请输入内容" v-model="input" style="width:47%;" clearable></el-input>
          <span @click="queding2" style="display: inline-block;" :class="$style.f_btn">搜索</span>
        </div>
        <div :class="$style.f_sjbg">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
            <el-table-column prop="date" align="center" label="MAC地址"></el-table-column>
            <el-table-column prop="name" align="center" label="采集时间"></el-table-column>
            <el-table-column prop="name" align="center" label="场景名称"></el-table-column>
            <el-table-column prop="address" align="center" label="终端编号"></el-table-column>
          </el-table>
        </div>
        <!-- 分页 -->
        <div style="text-align: right;margin-top:20px;padding-bottom: 20px;padding-right:10px;">
          <el-pagination
            @size-change="handleSizeChange1"
            @current-change="handleCurrentChange1"
            :current-page="currentPage5"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      tableData1: [],
      currentPage4: 1,
      currentPage5: 1,
      sjxq1: false,
      value3: '',
      value2: '',
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      input: '',
      total: null,
      sizes: 10,
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    // 采集任务列表
    getList () {
      this.$http.get(`pc/task/list?tab=4&size=${10}`).then(data => {
        if (data.data.code === 1000) {
          var Data = data.data
          console.log(Data.data)
          this.total = Data.data.total
          this.tableData = Data.data.content
          this.tableData.forEach(item => {
            item.date = item.fromDate + '\n' + '至' + '\n' + item.toDate
            item.time = item.fromTime + ':00' + '-' + item.toTime + ':00'
            item.cj = item.collectSet[0].signScencesBase
            this.tableData1 = item.collectSet
          })
          // console.log(this.tableData)
        }
      }).catch(function (err) {
        console.log("连接错误" + err)
      })
    },
    dj (row) {
      console.log(row.id)
    },
    point (index, row) {
      console.log(index, row)
      this.$store.commit('myval1', this.btmatter)
      this.$router.push({ path: '/index/rwpoint.vue', query: { row: row } })
    },
    sjxq () {
      console.log(1)
      this.sjxq1 = true
    },
    handleClose () {
      this.sjxq1 = false
    },
    handleSizeChange1 (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange1 (val) {
      console.log(`当前页: ${val}`);
    },
    handleSizeChange (val) {
      this.sizes = val;
      this.$http.get(`pc/task/list?tab=4&size=${val}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = data.content
          this.tableData.forEach(item => {
            item.date = item.fromDate + '\n' + '至' + '\n' + item.toDate
            item.time = item.fromTime + ':00' + '-' + item.toTime + ':00'
            item.cj = item.collectSet[0].signScencesBase
            this.tableData1 = item.collectSet
          })
        }
      }).catch(function (err) {
        console.log("连接错误" + err)
      });
    },
    handleCurrentChange (val) {
      this.$http.get(`pc/task/list?tab=4&page=${val}&size=${this.sizes}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data.content)
          this.tableData = data.content
          this.tableData.forEach(item => {
            item.date = item.fromDate + '\n' + '至' + '\n' + item.toDate
            item.time = item.fromTime + ':00' + '-' + item.toTime + ':00'
            item.cj = item.collectSet[0].signScencesBase
            this.tableData1 = item.collectSet
          })
        }
      }).catch(function (err) {
        console.log("连接错误" + err)
      });
    },
    queding2 () {
      console.log(2)
    },
  },
}
</script>

<style lang='scss' module>
.f_bgnr {
  padding-top: 39px;
  padding-left: 34px;
  padding-right: 34px;
}
.f_ycsj,
.f_point {
  color: #3b7cff;
  cursor: pointer;
}
.f_tit {
  text-align: left;
}
.f_sjbg {
  margin-top: 20px;
}
.f_sousuo {
  display: inline-block;
  width: 45%;
  text-align: right;
  float: right;
}
.f_btn {
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
.f_btn:hover {
  background: #9013fe;
  color: #fff;
  border: 1px solid #9013fe;
}
</style>
