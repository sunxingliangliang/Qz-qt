<template>
  <div :class="$style.f_bj">
    <div :class="$style.f_s">
      <el-card shadow="always" :class="$style.f_kp">
        <p :class="$style.f_p">任务总数</p>
        <p :class="$style.f_num">{{num}}</p>
        <el-progress :percentage="num5" :class="$style.f_jd" :format="format"></el-progress>
      </el-card>
    </div>
    <div :class="$style.f_s6">
      <el-card shadow="always" :class="$style.f_kp">
        <p :class="$style.f_p">进行中</p>
        <p :class="$style.f_num1">{{num1}}</p>
        <el-progress :percentage="num6" class="f_jd1" :format="format"></el-progress>
      </el-card>
    </div>
    <div :class="$style.f_s6">
      <el-card shadow="always" :class="$style.f_kp">
        <p :class="$style.f_p">已结束</p>
        <p :class="$style.f_num4">{{num2}}</p>
        <el-progress :percentage="num7" class="f_jd4" :format="format"></el-progress>
      </el-card>
    </div>
    <div :class="$style.f_s6">
      <el-card shadow="always" :class="$style.f_kp">
        <p :class="$style.f_p">已取消</p>
        <p :class="$style.f_num3">{{num3}}</p>
        <el-progress :percentage="num8" class="f_jd13" :format="format"></el-progress>
      </el-card>
    </div>
    <!-- 表格 -->
    <div :class="$style.f_table">
      <p>任务列表</p>
      <div :class="$style.f_row">
        <div :class="{'f_fy':xz,'f_fy1':xz1}" @click="qb">全部</div>
        <div :class="{'f_fy':xz2,'f_fy1':xz3}" @click="ywc">进行中</div>
        <div :class="{'f_fy':xz6,'f_fy1':xz7}" @click="zzrw">已取消</div>
        <div :class="{'f_fy':xz4,'f_fy1':xz5}" @click="wwc">已结束</div>
        <el-input placeholder="请输入搜索内容" v-model="searchcontent" :class="$style.f_inpt1" clearable></el-input>
        <el-button plain @click="inquire" :class="$style.f_chaxun">查询</el-button>
        <div style="float:right;display:inline-block;margin-right: 14px;">
          <div :class="$style.f_btn" @click="dghx">订购画像</div>
          <div :class="$style.f_btn" @click="dgsj">订购数据</div>
          <div :class="$style.f_btn" @click="cjrw">创建任务</div>
        </div>
      </div>
      <!-- 表格内容 -->
      <!-- 全部任务 -->
      <div v-if="xz1===true">
        <div :class="$style.f_bgnr">
          <el-table
            :data="tableData"
            @selection-change="handleSelectionChange"
            border
            style="width: 100%"
          >
            <el-table-column type="selection" align="center" width="55"></el-table-column>
            <el-table-column sortable align="center" label="任务编号" width="120">
              <template slot-scope="scope">
                <span
                  @click="point(scope.$index, scope.row)"
                  :class="$style.f_point"
                >{{scope.row.code}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" align="center" label="任务名称" width="120"></el-table-column>
            <el-table-column align="center" label="当前状态">
              <template slot-scope="scope">
                <div v-if="scope.row.status===3">
                  <span :class="$style.f_z">进度{{schedule}}%</span>
                  <div style="float:right;">
                    <span :class="$style.f_zd"></span>
                    <span :class="$style.f_y">进行中</span>
                  </div>
                  <el-progress :percentage="conduct" class="f_jd5" :format="format"></el-progress>
                  <span :class="$style.f_zx">{{percent}}</span>
                </div>
                <div v-if="scope.row.status===2">
                  <span :class="$style.f_z">进度100%</span>
                  <div style="float:right;">
                    <span :class="$style.f_zd2"></span>
                    <span :class="$style.f_y2">已结束</span>
                  </div>
                  <el-progress :percentage="100" class="f_jd7" :format="format"></el-progress>
                  <span :class="$style.f_zx">{{percent}}</span>
                </div>
                <div v-if="scope.row.status===1">
                  <span :class="$style.f_z">进度{{schedule}}%</span>
                  <div style="float:right;">
                    <span :class="$style.f_zd1"></span>
                    <span :class="$style.f_y1">进行中</span>
                  </div>
                  <el-progress :percentage="90" class="f_jd6" :format="format"></el-progress>
                  <span :class="$style.f_zx">{{percent}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="time" align="center" sortable label="采集时间"></el-table-column>
            <el-table-column prop="merchant_num" align="center" label="代理商" width="70"></el-table-column>
            <el-table-column prop="device_num" align="center" label="采集终端" width="100"></el-table-column>
            <!-- <el-table-column prop="lx" align="center" label="任务类型"></el-table-column> -->
          </el-table>
        </div>
      </div>
      <!-- 进行中 -->
      <div v-if="xz3===true">
        <div :class="$style.f_bgnr">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="selection" align="center" width="55"></el-table-column>
            <el-table-column sortable align="center" label="任务编号" width="120">
              <template slot-scope="scope">
                <span
                  @click="point(scope.$index, scope.row)"
                  :class="$style.f_point"
                >{{scope.row.code}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" align="center" label="任务名称" width="120"></el-table-column>
            <el-table-column align="center" label="当前状态">
              <template slot-scope="scope">
                <div v-if="scope.row.status===1">
                  <span :class="$style.f_z">进度{{schedule}}%</span>
                  <div style="float:right;">
                    <span :class="$style.f_zd"></span>
                    <span :class="$style.f_y">已取消</span>
                  </div>
                  <el-progress :percentage="90" class="f_jd5" :format="format"></el-progress>
                  <span :class="$style.f_zx">{{percent}}</span>
                </div>
                <div v-if="scope.row.status===2">
                  <span :class="$style.f_z">进度{{schedule}}%</span>
                  <div style="float:right;">
                    <span :class="$style.f_zd2"></span>
                    <span :class="$style.f_y2">已结束</span>
                  </div>
                  <el-progress :percentage="100" class="f_jd7" :format="format"></el-progress>
                  <span :class="$style.f_zx">{{percent}}</span>
                </div>
                <div v-if="scope.row.status===3">
                  <span :class="$style.f_z">进度{{schedule}}%</span>
                  <div style="float:right;">
                    <span :class="$style.f_zd1"></span>
                    <span :class="$style.f_y1">进行中</span>
                  </div>
                  <el-progress :percentage="90" class="f_jd6" :format="format"></el-progress>
                  <span :class="$style.f_zx">{{percent}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="time" align="center" sortable label="采集时间"></el-table-column>
            <el-table-column prop="merchant_num" align="center" label="代理商" width="70"></el-table-column>
            <el-table-column prop="device_num" align="center" label="采集终端" width="100"></el-table-column>
            <!-- <el-table-column prop="lx" align="center" label="任务类型"></el-table-column> -->
          </el-table>
        </div>
      </div>
      <!-- 已结束 -->
      <div v-if="xz5===true">
        <div :class="$style.f_bgnr">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="selection" align="center" width="55"></el-table-column>
            <el-table-column sortable align="center" label="任务编号" width="120">
              <template slot-scope="scope">
                <span
                  @click="point(scope.$index, scope.row)"
                  :class="$style.f_point"
                >{{scope.row.code}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" align="center" label="任务名称" width="120"></el-table-column>
            <el-table-column align="center" label="当前状态">
              <template slot-scope="scope">
                <div v-if="scope.row.status===1">
                  <span :class="$style.f_z">进度{{schedule}}%</span>
                  <div style="float:right;">
                    <span :class="$style.f_zd"></span>
                    <span :class="$style.f_y">已取消</span>
                  </div>
                  <el-progress :percentage="90" class="f_jd5" :format="format"></el-progress>
                  <span :class="$style.f_zx">{{percent}}</span>
                </div>
                <div v-if="scope.row.status===2">
                  <span :class="$style.f_z">进度{{schedule}}%</span>
                  <div style="float:right;">
                    <span :class="$style.f_zd2"></span>
                    <span :class="$style.f_y2">已结束</span>
                  </div>
                  <el-progress :percentage="100" class="f_jd7" :format="format"></el-progress>
                  <span :class="$style.f_zx">{{percent}}</span>
                </div>
                <div v-if="scope.row.status===3">
                  <span :class="$style.f_z">进度{{schedule}}%</span>
                  <div style="float:right;">
                    <span :class="$style.f_zd1"></span>
                    <span :class="$style.f_y1">进行中</span>
                  </div>
                  <el-progress :percentage="90" class="f_jd6" :format="format"></el-progress>
                  <span :class="$style.f_zx">{{percent}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="time" align="center" sortable label="采集时间"></el-table-column>
            <el-table-column prop="merchant_num" align="center" label="代理商" width="70"></el-table-column>
            <el-table-column prop="device_num" align="center" label="采集终端" width="100"></el-table-column>
            <!-- <el-table-column prop="lx" align="center" label="任务类型"></el-table-column> -->
          </el-table>
        </div>
      </div>
      <!-- 已取消 -->
      <div v-if="xz7===true">
        <div :class="$style.f_bgnr">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="selection" align="center" width="55"></el-table-column>
            <el-table-column sortable align="center" label="任务编号" width="120">
              <template slot-scope="scope">
                <span
                  @click="point(scope.$index, scope.row)"
                  :class="$style.f_point"
                >{{scope.row.code}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" align="center" label="任务名称" width="120"></el-table-column>
            <el-table-column align="center" label="当前状态">
              <template slot-scope="scope">
                <div v-if="scope.row.status===1">
                  <span :class="$style.f_z">进度{{schedule}}%</span>
                  <div style="float:right;">
                    <span :class="$style.f_zd"></span>
                    <span :class="$style.f_y">已取消</span>
                  </div>
                  <el-progress :percentage="90" class="f_jd5" :format="format"></el-progress>
                  <span :class="$style.f_zx">{{percent}}</span>
                </div>
                <div v-if="scope.row.status===2">
                  <span :class="$style.f_z">进度{{schedule}}%</span>
                  <div style="float:right;">
                    <span :class="$style.f_zd2"></span>
                    <span :class="$style.f_y2">已结束</span>
                  </div>
                  <el-progress :percentage="100" class="f_jd7" :format="format"></el-progress>
                  <span :class="$style.f_zx">{{percent}}</span>
                </div>
                <div v-if="scope.row.status===3">
                  <span :class="$style.f_z">进度{{schedule}}%</span>
                  <div style="float:right;">
                    <span :class="$style.f_zd1"></span>
                    <span :class="$style.f_y1">进行中</span>
                  </div>
                  <el-progress :percentage="90" class="f_jd6" :format="format"></el-progress>
                  <span :class="$style.f_zx">{{percent}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="time" align="center" sortable label="采集时间"></el-table-column>
            <el-table-column prop="merchant_num" align="center" label="代理商" width="70"></el-table-column>
            <el-table-column prop="device_num" align="center" label="采集终端" width="100"></el-table-column>
            <!-- <el-table-column prop="lx" align="center" label="任务类型"></el-table-column> -->
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
          <el-table :data="tableData" border style="width: 100%">
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
          <el-input placeholder="请输入内容" v-model="ordername" :class="$style.f_hxinpt" clearable></el-input>
        </el-row>
        <p :class="$style.f_sjxx">数据信息</p>
        <el-row :class="$style.f_hxrow">
          <span :class="$style.f_ddname">源数据量：</span>
          <span :class="$style.f_ddname">{{ysjl}}</span>
        </el-row>
        <el-row :class="$style.f_hxrow">
          <span :class="$style.f_ddname">订购金额：</span>
          <span :class="$style.f_ddname">{{moeny}}VKT</span>
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
          <span @click="determine" style="display: inline-block;" :class="$style.f_btn">确定</span>
        </span>
      </el-dialog>
    </div>
    <!-- 订购数据 -->
    <div class="f_dgsj">
      <el-dialog title="订购数据" :visible.sync="dgdata" width="60%" :before-close="sjdata">
        <p :class="$style.f_jb">基本信息</p>
        <div :class="$style.f_hxrow">
          <span :class="$style.f_ddname">订单名称:</span>
          <el-input placeholder="请输入内容" v-model="formname" :class="$style.f_hxinpt" clearable></el-input>
        </div>
        <p :class="$style.f_sjxx">数据信息</p>
        <div :class="$style.f_hxrow">
          <span :class="$style.f_ddname">源数据量：</span>
          <span :class="$style.f_ddname">{{ysjl1}}</span>
        </div>
        <div :class="$style.f_hxrow">
          <span :class="$style.f_ddname">订单数量:</span>
          <el-input
            placeholder="请输入内容"
            v-model="buyAmount"
            @blur="cipher"
            :class="$style.f_hxinpt1"
            clearable
          ></el-input>
        </div>
        <div :class="$style.f_hxrow">
          <div style="line-height: 40px;margin-right: 1%;display: inline-block;">
            <span :class="$style.f_ddname">数据范围:</span>
          </div>
          <div style="line-height: 40px;display: inline-block;">
            <span>居住地点:</span>
          </div>
          <div style="display: inline-block;">
            <el-cascader
              :change-on-select="true"
              :options="dwell"
              :props="props"
              v-model="placeofresidence"
              @change="live"
              clearable
            ></el-cascader>
          </div>
          <div style="line-height: 40px;display: inline-block;margin-left:5%;">
            <span>年龄:</span>
          </div>
          <div style="display: inline-block;width:13%;">
            <el-select v-model="age" @change="live" clearable placeholder="请选择">
              <el-option
                v-for="item in agebin"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div style="display: inline-block;margin-left:5%;">
            <span>职业:</span>
          </div>
          <div style="line-height: 40px;display: inline-block;">
            <el-select v-model="zy" @change="live" clearable placeholder="请选择">
              <el-option
                v-for="item in career"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div :class="$style.f_hxrow">
          <div style="line-height: 40px;margin-left:9%;display: inline-block;" :span="2">
            <span>工作地点:</span>
          </div>
          <div style="display: inline-block;">
            <el-cascader
              :change-on-select="true"
              :options="work"
              :props="worksite"
              v-model="workplace"
              @change="live"
              clearable
            ></el-cascader>
          </div>
          <div style="line-height: 40px;    margin-left: 5%;display: inline-block;" :span="3">
            <span>性别:</span>
          </div>
          <div style="display: inline-block; width:13%">
            <el-select v-model="jzdd" @change="live" clearable placeholder="请选择">
              <el-option
                v-for="item in sex"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div :class="$style.f_hxrow">
          <span :class="$style.f_ddname">订购金额：</span>
          <span :class="$style.f_ddname" v-if="dgmoney!=null">{{dgmoney}}</span>
        </div>
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
          v-model="textarea3"
        ></el-input>
        <span slot="footer" class="dialog-footer">
          <span @click="cancel" style="display: inline-block;" :class="$style.f_btn">取消</span>
          <span @click="queding" style="display: inline-block;" :class="$style.f_btn">提交</span>
        </span>
      </el-dialog>
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
      num: null,
      num1: null,
      num2: null,
      num3: null,
      num4: null,
      num5: 100,
      num6: 0,
      num7: 0,
      num8: 0,
      input: '',
      value1: '',
      conduct: 0,
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
      currentPage4: 1,
      sjxq1: false,
      value3: [],
      value2: [],
      options: [],
      nl: '',
      gzdd: '',
      pt: '',
      ikon: false,
      input1: '',
      jzdd: '',
      ysjl: 1000,
      moeny: '',
      textarea2: '',
      dgdata: false,
      dgmoney: null,
      btname: '发布任务',
      btmatter: '回购任务',
      searchcontent: '',
      total: null,
      sizes: 10,
      // 订购画像
      ordername: '',
      textarea2: '',
      // 订购数据
      formname: '',
      buyAmount: '',
      placeofresidence: '',
      props: {
        lazy: true,
        lazyLoad (node, resolve) {
          const { level } = node;
          let option = {
            url: 'pc/order/yzProvince',
            methods: 'get',
            data: {
              groupId: level
            }
          }
          if (level === 0) {
            option.url = 'pc/order/yzProvince'
          } else if (level === 1) {
            option.url = `pc/order/yzCity`,
              option.params = {
                province: node.value
              }
          }
          axios(option).then(res => {
            let { meta, data, code } = res.data
            if (code === 1000) {
              const nodes = Array.from({ length: data.length })
                .map((item, i) => ({
                  value: data[i].ID,
                  label: data[i].CN,
                  leaf: level >= 1
                }));
              // 通过调用resolve将子节点数据返回，通知组件数据加载完成
              // console.log(nodes)
              resolve(nodes);
            }
          })
        }
      },
      dwell: [],
      age: '',
      zy: '',
      career: [],
      agebin: [],
      // 工作地点
      workplace: '',
      work: [],
      worksite: {
        lazy: true,
        lazyLoad (node, resolve) {
          const { level } = node;
          let option = {
            url: 'pc/order/yzProvince',
            methods: 'get',
          }
          if (level === 0) {
            option.url = 'pc/order/yzProvince'
          } else if (level === 1) {
            option.url = `pc/order/yzCity`,
              option.params = {
                province: node.value
              }
          }
          axios(option).then(res => {
            let { meta, data, code } = res.data
            if (code === 1000) {
              const nodes = Array.from({ length: data.length })
                .map((item, i) => ({
                  value: data[i].ID,
                  label: data[i].CN,
                  leaf: level >= 1
                }));
              // 通过调用resolve将子节点数据返回，通知组件数据加载完成
              // console.log(nodes)
              resolve(nodes);
            } else if (code == 2001) {
              this.$message.error(res.data.message);
              window.sessionStorage.clear();
              window.localStorage.clear();
              this.$router.push('/')
            } else {
              this.$message.error(res.data.message);
            }
          })
        }
      },
      sex: [],
      platform: '',
      media: [],
      mediaData: [],
      password: '',
      user: '',
      textarea3: '',
      percent: '',
      schedule: "",
      searchId: [],
      mediaAccountList: [],
      mediaids: [],
      ysjl1: "",
      dataPrice: null,
      sizes: 10,
      pages: 0,
    }
  },
  mounted () {
    this.getCount();
    this.qb();
  },
  methods: {
    getCount () {
      this.$http.get('pc/platform/countPlatform').then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.num = data.ALL_NUM
          this.num1 = data.ACTIVE_NUM
          if (this.num1 / this.num5 === 0) {
            this.num6 = 0
          } else if (this.num1 === this.num) {
            this.num6 = 100
          } else {
            this.num6 = (this.num1 / this.num5) * 100
          }
          this.num2 = data.FINISH_NUM
          if (this.num2 / this.num5 === 0) {
            this.num7 = 0
          } else if (this.num2 === this.num) {
            this.num7 = 100
          } else {
            this.num7 = (this.num2 / this.num5) * 100
          }
          this.num3 = data.CLOSE_NUM
          if (this.num3 / this.num5 === 0) {
            this.num8 = 0
          } else if (this.num3 === this.num) {
            this.num8 = 100
          } else {
            this.num8 = (this.num3 / this.num5) * 100
          }
        }
      }).catch(function (err) {
        console.log("连接错误" + err)
      });
    },
    format (percentage) {
      return percentage === 100 ? '' : ``;
    },
    chongzhi () {
      this.input = ''
      this.value1 = ''
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
      this.$http.get(`pc/platform/list`, {        params: {
          size: this.sizes,
          page: this.pages
        }      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = data.content
          this.tableData.forEach(item => {
            item.time = item.from_date + '至' + item.to_date
            this.percent = item.data_num + '/' + item.amount_count
            this.schedule = (item.data_num / item.amount_count) * 100
            if (item.data_num / item.amount_count === 0) {
              this.conduct = 0
            } else if (item.data_num === item.amount_count) {
              this.conduct = 100
            } else {
              this.conduct = (item.data_num / item.amount_count) * 100
            }
          })
          console.log(this.conduct)
          this.total = data.total
        } else if (code == 2001) {
          this.$message.error(res.data.message);
          window.sessionStorage.clear();
          window.localStorage.clear();
          this.$router.push('/')
        } else {
          this.$message.error(res.data.message);
        }
      }).catch(function (err) {
        console.log('连接错误' + err)
      })
    },
    // 进行中
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
      this.$http.get(`pc/platform/list`, {        params: {
          size: this.sizes,
          page: this.pages,
          status: 1
        }      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = data.content
          this.tableData.forEach(item => {
            item.time = item.from_date + '至' + item.to_date
          })
          this.total = data.total
        }
      }).catch(function (err) {
        console.log('连接错误' + err)
      })
    },
    // 已取消
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
      this.$http.get(`pc/platform/list`, {        params: {
          size: this.sizes,
          page: this.pages,
          status: 3
        }      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = data.content
          this.tableData.forEach(item => {
            item.time = item.from_date + '至' + item.to_date
          })
          this.total = data.total
        }
      }).catch(function (err) {
        console.log('连接错误' + err)
      })
    },
    // 已结束
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
      this.$http.get(`pc/platform/list`, {        params: {
          size: this.sizes,
          page: this.pages,
          status: 2
        }      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = data.content
          this.tableData.forEach(item => {
            item.time = item.from_date + '至' + item.to_date
          })
          this.total = data.total
        }
      }).catch(function (err) {
        console.log('连接错误' + err)
      })
    },
    // 查询
    inquire () {
      if (this.xz1 === true) {
        console.log('全部')
        this.$http.get(`pc/platform/list`, {          params: {
            search: this.searchcontent,
            size: this.sizes,
            page: this.pages
          }        }).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.tableData = data.content
            this.tableData.forEach(item => {
              item.time = item.from_date + '至' + item.to_date
            })
            this.total = data.total
          }
        }).catch(function (err) {
          console.log('错误信息' + err)
        })
      } else if (this.xz3 === true) {
        console.log('进行中')
        this.$http.get(`pc/platform/list`, {          params: {
            search: this.searchcontent,
            size: this.sizes,
            page: this.pages,
            status: 1
          }        }).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.tableData = data.content
            this.tableData.forEach(item => {
              item.time = item.from_date + '至' + item.to_date
            })
            this.total = data.total
          }
        }).catch(function (err) {
          console.log('错误信息' + err)
        })
      } else if (this.xz5 === true) {
        console.log('已结束')
        this.$http.get(`pc/platform/list`, {          params: {
            search: this.searchcontent,
            size: this.sizes,
            page: this.pages,
            status: 2
          }        }).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.tableData = data.content
            this.tableData.forEach(item => {
              item.time = item.from_date + '至' + item.to_date
            })
            this.total = data.total
          }
        }).catch(function (err) {
          console.log('错误信息' + err)
        })
      } else if (this.xz7 === true) {
        console.log('已取消')
        this.$http.get(`pc/platform/list`, {          params: {
            search: this.searchcontent,
            size: this.sizes,
            page: this.pages,
            status: 3
          }        }).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.tableData = data.content
            this.tableData.forEach(item => {
              item.time = item.from_date + '至' + item.to_date
            })
            this.total = data.total
          }
        }).catch(function (err) {
          console.log('错误信息' + err)
        })
      }
    },
    // 订购画像
    dghx () {
      console.log(this.searchId)
      let ids = this.searchId.join(',')
      console.log(ids)
      // let info = new FormData()
      // info.append('ids', ids,)
      // info.append('type', 2)
      let info = {
        'ids': ids,
        'type': 2
      }
      this.$http.post(`pc/task/orderInit`, info).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          this.ordername = data.name
          this.moeny = data.personaPrice
          this.ysjl = data.dataCount
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
      this.ikon = true
    },
    // 订购数据
    dgsj () {
      this.dgdata = true
      // let info={'type':1,'searchId':10}
      let ids = this.searchId.join(',')
      // let info = new FormData()
      // info.append('type', 1,)
      // info.append('ids', ids)
      let info = {
        'type': 1,
        'ids': ids
      }
      this.$http.get('modules/media/all').then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.media = data
        }
      }).catch(function (err) {
        console.log('错误信息' + err)
      })
      this.$http.get('pc/order/yzSign').then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.career = data.occupation
          this.sex = data.gender
          this.agebin = data.agebin
        }
      }).catch(function (err) {
        console.log('错误信息' + err)
      })
      this.$http.post(`pc/task/orderInit`, info).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          if (data.dataCount === 0) {
            this.$message.error('源数据量为0无法订购');
          } else {
            this.mediaAccountList = data.mediaAccountList
            this.formname = data.name
            this.ysjl1 = data.dataCount
            this.dataPrice = data.dataPrice
            this.mappingPrice = data.mappingPrice
          }
        } else if (code == 2001) {
          this.$message.error(res.data.message);
          window.sessionStorage.clear();
          window.localStorage.clear();
          this.$router.push('/')
        } else {
          this.$message.error(res.data.message);
        }
      }).catch(function (err) {
        console.log('错误信息' + err)
      })
    },
    // 计算金额
    cipher () {
      if (this.ysjl1 < this.buyAmount) {
        this.$message.error('订购数量大于源数据量,请重新输入');
        this.refer = true
      } else if (this.buyAmount <= 0) {
        this.$message.error('输入有误,请重新输入');
        this.refer = true
      } else {
        this.dgmoney = Number(this.buyAmount) * this.dataPrice
        this.refer = false
      }
      // this.dgmoney = Number(this.buyAmount) * this.dataPrice
      // console.log(this.buyAmount)
      // console.log(this.dataPrice)
    },
    // 创建任务
    cjrw () {
      this.$store.commit('myval1', this.btname)
      this.$router.push('/index/fbrw.vue')
    },
    handleSelectionChange (selection) {
      console.log(selection)
      this.searchId = []
      selection.forEach(item => {
        // console.log(item.id)
        this.searchId.push(item.id)
      })
      // this.searchId.push(row.id)
      // let set = new Set(this.searchId)
      // console.log(set)
      this.id = this.searchId.join(',')
      console.log(this.id)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
    },
    handleSizeChange1 (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange1 (val) {
      console.log(`当前页: ${val}`);
    },
    dj () {
      console.log(1)
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
    // 订购画像
    orderikion () {
      console.log(this.searchId)
      this.ikon = true
    },
    // 订购数据
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
    // 订购数据新增或添加媒体账号
    adddata () {
      this.$http.put(`pc/media?mediaId=${this.platform}&username=${this.user}&password=${this.password}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          let datas = data
          this.mediaData.push(datas)
          this.mediaData.forEach(item => {
            this.mediaids.push(item.id)
            this.media.forEach(item1 => {
              if (item.mediaId == item1.id) {
                item.media = item1.name
              }
            })
          })
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
    determine () {
      this.$confirm('是否确定提交订购画像, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.ordername === '') {
          this.$message.error('订单名称不能为空');
        } else {
          // let digital = new FormData()
          // digital.append('searchId', this.id,)
          // digital.append('price', 232)
          let info = {
            'taskIds': this.id,
            'price': this.moeny
          }
          this.$http.post(`pc/task/orderPersona`, info).then(res => {
            var { code, data } = res.data
            if (code === 1000) {
              this.$message({
                type: 'success',
                message: '提交成功!'
              });
              this.ikon = false
            } else {
              this.$message.error(res.data.message);
            }
          }).catch(function (err) {
            console.log('错误信息' + err)
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    queding () {
      this.$confirm('是否确定提交订购数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // let info = new FormData()
        // info.append('name', this.formname,)
        // info.append('buyAmount', this.buyAmount,)
        // info.append('ids', this.ids,)
        // info.append('taskIds', this.id,)
        // info.append('buyPrice', this.dgmoney,)
        // info.append('gender', this.jzdd,)
        // info.append('agebin', this.age,)
        // info.append('occupation', this.zy,)
        // info.append('workplaceProvince', this.workplace[0],)
        // info.append('workplaceCity', this.workplace[1],)
        // info.append('residenceProvince', this.placeofresidence[0],)
        // info.append('residenceCity', this.placeofresidence[1])
        let info = {
          'name': this.formname,
          'buyAmount': this.buyAmount,
          'ids': this.ids,
          'taskIds': this.id,
          'buyPrice': this.dgmoney,
          'gender': this.jzdd,
          'agebin': this.age,
          'occupation': this.zy,
          'workplaceProvince': this.workplace[0],
          'workplaceCity': this.workplace[1],
          'residenceProvince': this.placeofresidence[0],
          'residenceCity': this.placeofresidence[1]
        }
        this.$http.post(`pc/task/orderData`, info).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.$message({
              type: 'success',
              message: '提交成功!'
            });
          } else {
            this.$message.error(res.data.message);
          }
        }).catch(function (err) {
          console.log('错误信息' + err)
        })

        this.dgdata = false
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    point (index, row) {
      // console.log(index)
      this.$store.commit('myval1', this.btmatter)
      this.$router.push({ path: '/index/hgrw.vue', query: { id: row.id } })
    },
    cancel () {
      this.formname = ''
      this.mediaData = [],
        this.buyAmount = ''
      this.platform = ''
      this.user = ''
      this.password = ''
      this.textarea2 = ''
    },
    // 居住地点
    live () {
      let dataPrice = this.dataPrice
      let placeofresidence = this.placeofresidence
      let age = this.age.length
      let zy = this.zy.length
      let workplace = this.workplace
      let jzdd = this.jzdd
      if (placeofresidence != '') {
        dataPrice = dataPrice + this.mappingPrice
      }
      if (age != '') {
        dataPrice = dataPrice + this.mappingPrice
      }
      if (zy != '') {
        dataPrice = dataPrice + this.mappingPrice
      }
      if (workplace != '') {
        dataPrice = dataPrice + this.mappingPrice
      }
      if (jzdd != '') {
        dataPrice = dataPrice + this.mappingPrice
      }
      this.dgmoney = Number(this.buyAmount) * dataPrice
    },
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
  width: 276px;
  padding: 0 10px;
  display: inline-block;
  height: 80px;
  margin-top: 20px;
  border-radius: 10px;
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
      // padding-bottom: 10px;
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
      color: #9aa3a5;
    }
    .f_num4 {
      color: #9013fe;
    }
  }
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
    padding-top: 20px;
    padding-left: 20px;
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
.f_hxinpt2 {
  width: calc(100% - 60%);
}

.f_inpt {
  width: calc(100% - 66%);
}
.f_inpt1 {
  width: calc(100% - 80%);
}
.f_btn {
  width: 80px;
  display: inline-block;
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
  color: #9aa3a5;
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
}
.f_zd {
  background: #9aa3a5;
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
  float: right;
}
.f_s5 {
  margin-right: 10px;
  width: calc(100% - 76%);
  display: inline-block;
  float: left;
}
</style>
