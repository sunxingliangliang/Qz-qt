<template>
  <div>
    <el-row style="margin-top:20px;">
      <!-- <el-button :class="$style.f_btn" style="float:left;margin-left:20px;" size="medium">导出报表</el-button> -->
        <div class="daochu"  @click="exportc" style="display: inline;float:left;margin-left:20px;width:100px;height:45px;line-height:45px;background:#d9b4fa;border-radius: 5px;color:#fff;cursor: pointer;">导出图表</div>
      <div style="float: right; margin-right: 20px;">
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <el-button :class="$style.f_btn" @click="dianji3" size="medium">查询</el-button>
      </div>
    </el-row>
    <div :class="$style.f_bgnr">
      <el-table :data="tableData1" border style="width: 100%;">
        <el-table-column type="index" align="center" width="50" label="序号"></el-table-column>
        <el-table-column align="center" label="名称">
          <template slot-scope="scope">
            <img :src="scope.row.icon" alt style="width: 50px; height: 50px;margin-left: -50px;">
            <span
              style="position: absolute; top: 28px;margin-left: 10px;"
            >{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cate_name" align="center" label="应用分类"></el-table-column>
        <el-table-column prop="final_pct" align="center" label="活跃渗透率"></el-table-column>
        <el-table-column prop="index1" align="center" label="TGI"></el-table-column>
      </el-table>
    </div>
    <!-- <div style="text-align: right;margin-top:20px;padding-bottom: 20px;padding-right:10px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </div> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentPage4: 1,
      tableData1: [
        {
          dls: '微信',
          yyfl: '即使通讯',
          stl: '92%',
          tgi: 117
        },
      ],
      id: "",
      value1: ''

    }
  },
  mounted () {
    this.id = this.$store.state.id
    this.getList()
    this.settime()
  },
  methods: {
    settime(){//当前日期
       let Time = new Date();
       Time.getTime() - 3600 * 1000 * 24;
       this.value1= [Time,Time]
     },
    getList () {
        this.$http.get(`pc/fixedPortrait/selectAppinfo`,{
          params:{
          taskId:this.id
        }
      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData1 = data
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    dianji3 () {
     this.$http.get(`pc/fixedPortrait/selectAppinfo`,{
          params:{
          taskId:this.id,
          'dateStr4Start': this.value1[0],
          'dateStr4end': this.value1[1]
        }
      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData1 = data
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    exportc(){
       this.$http.get(`pc/fixedPortrait/exportAppinfo`,{
          params:{
          taskId:this.id,
          'dateStr4Start': this.value1[0],
          'dateStr4end': this.value1[1]
        }
      }).then(res => {
         let filePath = res.data.data.path
        let fileName = res.data.data.fileName
        // console.log(res.res.filePath)
        window.location.href =  `http://47.105.207.228:8874/pc/fixedPortrait/export/fixed?filePath=${filePath}&fileName=${fileName}`
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData1 = data
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
    },
  }
}
</script>

<style lang='scss' module>
.f_bgnr {
  padding-top: 39px;
  padding-left: 34px;
  padding-right: 34px;
  padding-bottom: 20px;
}
.f_btn {
  display: inline-block;
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
.f_btn:hover {
  background: #9013fe;
  color: #fff;
  border: 1px solid #9013fe;
}
</style>
