<template>
    <div>
      <div :class="$style.table">
        <el-table ref="filterTable" :data="tableData" style="width: 100%;" :cell-style="rowClass" :header-cell-style="headClass">
          <el-table-column label="任务编号" width="180">
            <template slot-scope="scope">
              <span :class="$style.f_rwid" @click="handleEdit( scope.row)">{{scope.row.code}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="任务名称" width="180"></el-table-column>
          <el-table-column prop="rwlx" label="任务类型">
            <template slot-scope="scope">
              <span v-if="scope.row.type===0">自建任务</span>
              <span v-if="scope.row.type===1">平台任务</span>
            </template>
          </el-table-column>
          <el-table-column prop="merchant_name" label="客户名称"></el-table-column>
          <el-table-column prop="from_date" label="采集时间" width="180"></el-table-column>
          <el-table-column prop="data_num" label="已采数据"></el-table-column>
          <el-table-column prop="status" label="任务状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status===0">待采集</span>
              <span v-if="scope.row.status===1">进行中</span>
              <span v-if="scope.row.status===2">已结束</span>
              <span v-if="scope.row.status===3">已取消</span>
              <span v-if="scope.row.status===4">失效</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
       <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
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
  data(){
    return{
      tableData: [],
      currentPage4:1,
      total: null,
      sizes: 10,
      pages: 0,
    }
  },
  mounted(){
    this.getList()
  },
  methods:{
    headClass () {
      return 'text-align: center;'
    },
    rowClass () {
      return 'text-align: center;'
    },
    getList(){
      this.$http.get(`pc/merchant/followerTaskList`, {
        params: {
          size: this.sizes,
          page: this.pages,
          // parentId:this.id
        }
      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = data.content
          this.total = data.total
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
    handleSizeChange(val){
      this.sizes = val
      this.$http.get(`pc/merchant/followerTaskList`, {
        params: {
          size: val,
          page: this.pages
        }
      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = data.content
          this.total = data.total
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
    handleCurrentChange(val){
      this.pages = val
      this.$http.get(`pc/merchant/followerTaskList`, {
        params: {
          size: this.sizes,
          page: val - 1
        }
      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = data.content
          this.total = data.total
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
    }
  }
}
</script>

<style lang='scss' module>
.f_jz {
    margin-top: 20px;
    text-align: center;
  }
  .table{
    background: #fff;
    margin-top: 35px;
    -webkit-box-shadow: 0 2px 4px 0 #eff2f7;
    box-shadow: 0 2px 4px 0 #eff2f7;
    border-radius: 10px;
    text-align: left;
  }
</style>