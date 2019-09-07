<template>
  <div :class="$style.f_fz">
    <div :class="$style.f_table">
      <el-row :class="$style.f_row">
        <div :class="$style.f_zlb">
          <div style="display: inline-block;">分组列表</div>
        </div>
        <div :class="$style.f_btn" @click="dghx">创建分组</div>
      </el-row>
      <!-- 表格内容 -->
      <!-- 全部 -->
      <div :class="$style.f_bgnr">
        <el-table :data="tableData" border style="width: 100%" class="a1">
          <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
          <el-table-column prop="name" align="center" label="分组" width="100"></el-table-column>
          <el-table-column prop="num" align="center" sortable label="数量" width="100"></el-table-column>
          <el-table-column prop="code" align="center" sortable label="采集终端"></el-table-column>
          <el-table-column prop="status" align="center" label="操作" width="100">
            <template slot-scope="scope">
              <span
                style="font-size: 14px; color: #9013FE; letter-spacing: 0; text-align: center;  cursor: pointer;"
                @click="bj(scope.$index, scope.row)"
              >编辑</span>
              <span
                style="font-size: 14px; color: #FB745B; letter-spacing: 0; text-align: center;  cursor: pointer;"
                @click="strike(scope.$index,scope.row)"
              >删除</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div style="text-align: right;margin-top:20px;padding-bottom: 20px;padding-right:10px;">
        <!-- <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        ></el-pagination>-->
      </div>
      <!-- 创建分组 -->
      <div class="f_dg">
        <el-dialog
          title="创建分组"
          style="height: 100%;"
          :visible.sync="dialogVisible"
          width="50%"
          :before-close="gb"
        >
          <p :class="$style.f_jb">分组名称</p>
          <el-row :class="$style.f_hxrow">
            <el-input
              placeholder="请输入分组名称(不可重复)"
              @blur="xiaoyan"
              v-model="GroupName"
              :class="$style.f_hxinpt"
              clearable
            ></el-input>
          </el-row>
          <p :class="$style.f_sjxx">添加终端</p>
          <div>
            <el-table
              :data="Grouping1"
              tooltip-effect="dark"
              border
              style="width: 30%;margin-top:20px;display: inline-block;margin-left:20px;"
              @selection-change="handleSelectionChange"
            >
              <el-table-column prop="code" align="center" label="采集终端" show-overflow-tooltip></el-table-column>
              <el-table-column type="selection" align="center" label="操作"></el-table-column>
            </el-table>
            <el-table
              :data="Grouping2"
              tooltip-effect="dark"
              border
              style="width: 30%;margin-top:20px;display: inline-block;margin-left:15px;"
              @selection-change="handleSelectionChange2"
            >
              <el-table-column prop="code" align="center" label="采集终端" show-overflow-tooltip></el-table-column>
              <el-table-column type="selection" align="center" label="操作"></el-table-column>
            </el-table>
            <el-table
              :data="Grouping3"
              tooltip-effect="dark"
              border
              style="width: 30%;margin-top:20px;display: inline-block;margin-left:15px;"
              @selection-change="handleSelectionChange3"
            >
              <el-table-column prop="code" align="center" label="采集终端" show-overflow-tooltip></el-table-column>
              <el-table-column type="selection" align="center" label="操作"></el-table-column>
            </el-table>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="info" @click="dialogVisible = false">取 消</el-button>
            <el-button :class="$style.f_chaxun" type="primary" @click="determine">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 编辑分组 -->
      <div class="f_dg">
        <el-dialog
          title="创建分组"
          style="height: 100%;"
          :visible="bianji"
          width="50%"
          :before-close="gb1"
        >
          <p :class="$style.f_jb">分组名称</p>
          <el-row :class="$style.f_hxrow">
            <el-input
              placeholder="请输入分组名称(不可重复)"
              @blur="xiaoyan"
              v-model="Groupname"
              :class="$style.f_hxinpt"
              clearable
            ></el-input>
          </el-row>
          <p :class="$style.f_sjxx">添加终端</p>
          <div>
            <el-table
              ref="multipleTable"
              :data="tableData1"
              tooltip-effect="dark"
              border
              style="width: 30%;margin-top:20px;display: inline-block;margin-left:20px;"
              @selection-change="handleSelectionChange4"
            >
              <el-table-column prop="code" label="采集终端" show-overflow-tooltip></el-table-column>
              <el-table-column type="selection" align="center"></el-table-column>
            </el-table>
            <el-table
              ref="multipleTable2"
              :data="tableData2"
              tooltip-effect="dark"
              border
              style="width: 30%;margin-top:20px;display: inline-block;margin-left:15px;"
              @selection-change="handleSelectionChange5"
            >
              <el-table-column prop="code" align="center" label="采集终端" show-overflow-tooltip></el-table-column>
              <el-table-column type="selection" align="center" label="操作"></el-table-column>
            </el-table>
            <el-table
              ref="multipleTable3"
              :data="tableData3"
              tooltip-effect="dark"
              border
              style="width: 30%;margin-top:20px;display: inline-block;margin-left:15px;"
              @selection-change="handleSelectionChange6"
            >
              <el-table-column prop="code" align="center" label="采集终端" show-overflow-tooltip></el-table-column>
              <el-table-column type="selection" align="center" label="操作"></el-table-column>
            </el-table>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="info" @click="bianji = false">取 消</el-button>
            <el-button :class="$style.f_chaxun" type="primary" @click="certain">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      Grouping: [],
      tableData1: [
        {
          name: ''
        }
      ],
      Grouping1: [],
      Grouping2: [],
      Grouping3: [],
      tableData2: [],
      tableData3: [],
      currentPage4: 1,
      dialogVisible: false,
      input1: '',
      bianji: false,
      input2: '',
      id: [],
      GroupName: '',
      Groupname: '',
      Group: [],
      Serialnumber: '',
      ids: [],
      addGrouping: [],
      addGrouping1: [],
      addGrouping2: [],
      editGrouping:[],
      editGrouping1:[],
      editGrouping2:[],
    }
  },
  mounted () {
    this.getlis()
    this.getList()
  },
  methods: {
    getlis () {
      let name = []
      this.$http.get(`pc/group/all`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = data
          this.tableData.forEach(item=>{
            item.num = item.deviceList.length
            item.codes=[]
            // console.log(item.deviceList)
            item.deviceList.forEach(item1=>{
              // console.log(item1.code)
              item.codes.push(item1.code)
            })
            item.code = item.codes.join(',')
          })
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    getList () {
      this.$http.get(`pc/device/unGroupDevice`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.Group = data
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    bj (index, row) {
      this.Groupname = row.name
      this.Serialnumber = row.id
      let deviceList = row.deviceList
      // console.log(deviceList)
      var obj = {}
      let arr = []
      deviceList.forEach(item => {
        obj = {
          code: item.code,
          id: item.id
        }
        arr.push(obj)
      })
      var arr3 = arr.concat(this.Group)
      let arr1 = []
      for (var i = 0; i < arr3.length; i += arr3.length / 3) {
        arr1.push(arr3.slice(i, i + arr3.length / 3));
        this.tableData1 = arr1[2]
        this.tableData2 = arr1[1]
        this.tableData3 = arr1[0]
      }
      this.$nextTick(() => {
        for (let i in arr) {
          for (let a in this.tableData1) {
            if (arr[i].id === this.tableData1[a].id) {
              this.$refs.multipleTable.toggleRowSelection(this.tableData1[0], true)
            }
          }
          for (let b in this.tableData2) {
            if (arr[i].id === this.tableData2[b].id) {
              this.$refs.multipleTable2.toggleRowSelection(this.tableData2[b], true)
            }
          }
          for (let c in this.tableData3) {
            if (arr[i].id === this.tableData3[c].id) {
              this.$refs.multipleTable3.toggleRowSelection(this.tableData3[c], true)
            }
          }
        }

      })
      this.input2 = row.fz
      this.bianji = true

    },
    //创建分组
    dghx () {
      let arr1 = []
      console.log(this.Group)
      for (var i = 0; i < this.Group.length; i += this.Group.length / 3) {
        // console.log()
        arr1.push(this.Group.slice(i, i + this.Group.length / 3));
        this.Grouping1 = arr1[2]
        this.Grouping2 = arr1[1]
        this.Grouping3 = arr1[0]
      }
      this.dialogVisible = true
    },
    // 确定
    certain () {
      console.log(this.GroupName)
      let ids = this.editGrouping.concat(this.editGrouping1)
      this.ids= ids.concat(this.editGrouping2)
      this.$http.put(`pc/group/updateGroup`,{
        params:{
          name:this.Groupname,
          id:this.Serialnumber,
          ids:this.ids.join(',')
        }
      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          // this.$message({
          //   message: '创建成功',
          //   type: 'success'
          // });
          // this.getList()
          // this.bianji = false
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    gb () {
      this.dialogVisible = false
    },
    queding () {
      this.dialogVisible = false
    },
    xiaoyan () {
      if (this.input1 === '') {
        console.log(1)
      }
    },
    gb1 () {
      this.bianji = false
    },
    determine () {
      let ids = this.addGrouping.concat(this.addGrouping1)
      this.ids = ids.concat(this.addGrouping2)
      let info = {
        name: this.GroupName,
        ids: this.ids.join(',')
      }
      // console.log(this.ids)
      this.$http.post(`pc/group/addGroup`, info).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.$message({
            message: '创建成功',
            type: 'success'
          });
          this.getlis()
          this.dialogVisible = false
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
    // 删除
    strike (index, row) {
      console.log(row.id)
      this.$http.delete(`pc/group/${row.id}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.$message({
            message: '已删除',
            type: 'success'
          });
          this.getlis()
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
    handleSelectionChange (val) {
      // console.log(val)
      this.addGrouping = []
      val.forEach(item => {
        this.addGrouping.push(item.id)
      })
      // console.log(this.ids)
    },
    handleSelectionChange2 (val) {
      this.addGrouping1 = []
      val.forEach(item => {
        this.addGrouping1.push(item.id)
      })
    },
    handleSelectionChange3 (val) {
      this.addGrouping2 = []
      val.forEach(item => {
        this.addGrouping2.push(item.id)
      })
    },
    handleSelectionChange4 (val) {
      this.editGrouping = []
      console.log(val)
      val.forEach(item=>{
        this.editGrouping.push(item.id)
      })
      // this.ids.push(row.id)
    },
    handleSelectionChange5 (val) {
      this.editGrouping1 = []
      console.log(val)
      val.forEach(item=>{
        this.editGrouping1.push(item.id)
      })
    },
    handleSelectionChange6 (val) {
      this.editGrouping2 = []
      console.log(val)
      val.forEach(item=>{
        this.editGrouping2.push(item.id)
      })
    },
    handleSizeChange (val) {
      console.log(val)
    },
    handleCurrentChange (val) {
      console.log(val)
    }
  }
}
</script>

<style  lang='scss' module>
.f_fz {
  width: 1200px;
  margin: 0 auto;
  .f_table {
    background: #fff;
    margin-top: 35px;
    box-shadow: 0 2px 4px 0 #eff2f7;
    border-radius: 10px;
    text-align: left;
    .f_bgnr {
      padding: 0 20px;
      padding-top: 39px;
    }
    .f_row {
      margin: 0 20px;
      border-bottom: 1px solid #e6e9f0;
      .f_zlb {
        margin-top: 30px;
        display: inline-block;
      }
    }
    .f_fy {
      float: right;
    }
    .f_btn {
      width: 59px;
      height: 20px;
      padding: 13px 16px;
      float: right;
      background: #d9b4fa;
      border: 1px solid #9013fe;
      border-radius: 4px;
      font-size: 14px;
      color: #5800a0;
      letter-spacing: 0;
      margin-right: 20px;
      margin-top: 20px;
      margin-bottom: 10px;
      cursor: pointer;
    }
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
  .f_hxrow {
    margin-top: 20px;
    text-align: left;
    .f_ddname {
      font-size: 14px;
      color: #3d4966;
      line-height: 14px;
    }
    .f_hxinpt {
      width: calc(100% - 30%);
    }
    .f_hxinpt1 {
      width: calc(100% -50%);
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
}
</style>
