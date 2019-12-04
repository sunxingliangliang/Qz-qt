<template>
    <div>
      <div :class="$style.f_bgnr">
        <el-table :data="tableData" style="width: 100%" border>
            <el-table-column prop="name" align="center" label="代理商名称" sortable></el-table-column>
            <el-table-column prop="province" align="center" label="代理区域" width="120"></el-table-column>
            <el-table-column prop="proxy_type" align="center" label="类型" width="120">
              <template slot-scope="scope">
                <span v-if="scope.row.proxy_type===1">省级运营中心</span>
                <span v-if="scope.row.proxy_type===2">市级运营中心</span>
                <span v-if="scope.row.proxy_type===3">市级一般代理商</span>
              </template>
            </el-table-column>
            <el-table-column prop="deviceNum" align="center" label="终端数量" width="80"></el-table-column>
            <el-table-column prop="dataNum" align="center" label="采集数据量" width="100"></el-table-column>
            <el-table-column prop="orderDataNum" align="center" label="数据订单" width="80"></el-table-column>
            <el-table-column prop="orderPersonaNum" align="center" label="数据画像" width="80"></el-table-column>
            <el-table-column prop="fixedNum" align="center" label="固定画像" width="80"></el-table-column>
            <el-table-column prop="cny_amount" align="center" label="总金额" width="65"></el-table-column>
            <el-table-column prop="date" align="center" label="有效期"></el-table-column>
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
    }
  },
  mounted(){
    // this.getList()
    this.id = this.$route.query.id
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
    // getList(){
    // //   this.$router.push('/index/allLowerend.vue')
    //   this.$http.get(`pc/merchant/followerList`, {        
    //     params: {
    //     //   parentId:row.id,

    //       }      
    //     }).then(res => {
    //       var { code, data } = res.data
    //     if (code === 1000) {
    //       this.tableData = data.content
    //       this.total = data.total
    //       this.tableData.forEach(item => {
    //         item.date = item.from_date + '至' + item.to_date
    //       })
    //     }
    //   }).catch((err) => {
    //     console.log('错误信息' + err)
    //   })
    // },
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