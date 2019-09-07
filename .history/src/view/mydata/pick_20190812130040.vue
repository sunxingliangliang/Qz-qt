<template>
  <div :class="$style.f_bj">
    <div :class="$style.f_s">
      <el-card shadow="always" :class="$style.f_kp">
        <p :class="$style.f_p">全部任务</p>
        <p :class="$style.f_num">{{num}}</p>
        <el-progress :percentage="num5" :class="$style.f_jd" :format="format"></el-progress>
      </el-card>
    </div>
    <div :class="$style.f_s6">
      <el-card shadow="always" :class="$style.f_kp">
        <p :class="$style.f_p">已结束</p>
        <p :class="$style.f_num1">{{num1}}</p>
        <el-progress :percentage="num6" class="f_jd1" :format="format"></el-progress>
      </el-card>
    </div>
    <div :class="$style.f_s6">
      <el-card shadow="always" :class="$style.f_kp">
        <p :class="$style.f_p">未结束</p>
        <p :class="$style.f_num2">{{num2}}</p>
        <el-progress :percentage="num7" class="f_jd2" :format="format"></el-progress>
      </el-card>
    </div>
    <div :class="$style.f_s6">
      <el-card shadow="always" :class="$style.f_kp">
        <p :class="$style.f_p">自建任务</p>
        <p :class="$style.f_num3">{{num3}}</p>
        <el-progress :percentage="num8" class="f_jd3" :format="format"></el-progress>
      </el-card>
    </div>
    <div :class="$style.f_s6">
      <el-card shadow="always" :class="$style.f_kp">
        <p :class="$style.f_p">平台任务</p>
        <p :class="$style.f_num4">{{num4}}</p>
        <el-progress :percentage="num9" class="f_jd4" :format="format"></el-progress>
      </el-card>
    </div>
    <!-- 任务筛选 -->
    <div :class="$style.f_sx">
      <p>任务筛选</p>
      <!-- 输入框 -->
      <div :class="$style.f_search">
        <span :class="$style.f_cx">输入查询</span>
        <el-input placeholder="请输入搜索内容" v-model="search1" :class="$style.f_inpt" clearable></el-input>
        <el-date-picker
          v-model="value1"
          type="date"
          :class="$style.f_date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        <el-button plain :class="$style.f_chaxun" @click="inquire">查询</el-button>
        <el-button type="info" plain @click="chongzhi">重置</el-button>
        <el-button
          :class="$style.f_chaxun"
          plain
          @click="shujutongji"
          style="float:right;margin-top:10px;margin-right:20px;"
        >数据统计</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div :class="$style.f_table">
      <p style="display:inline-block;">任务列表</p>
      <div
        :class="$style.f_btn"
        @click="cjrw"
        style="float: right; vertical-align: top; margin: 30px 0; margin-right: 26px; margin-bottom: 10px;"
      >创建任务</div>
      <div :class="$style.f_row">
        <div :class="{'f_fy':xz,'f_fy1':xz1}" @click="qb">全部</div>
        <div :class="{'f_fy':xz2,'f_fy1':xz3}" @click="ywc">已完成</div>
        <div :class="{'f_fy':xz4,'f_fy1':xz5}" @click="wwc">未完成</div>
        <div :class="{'f_fy':xz6,'f_fy1':xz7}" @click="zzrw">自建任务</div>
        <div :class="{'f_fy':xz8,'f_fy1':xz9}" @click="ptrw">平台任务</div>
        <div style="float:right;display:inline-block;margin-right: 14px;">
          <div :class="$style.f_btn" @click="orderikion">订购画像</div>
          <div :class="$style.f_btn" @click="orderdata">订购数据</div>
        </div>
      </div>
      <!-- <router-view></router-view> -->
      <!-- 全部 -->
      <div v-show="xz1===true" :class="$style.f_bgnr">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          @select="handleSelectionChange"
          @expand-change="dj"
        >
          <el-table-column type="selection" align="center" width="50"></el-table-column>
          <el-table-column sortable prop="code" align="center" label="任务编号" width="120">
            <template slot-scope="scope">
              <span
                @click="point(scope.$index, scope.row)"
                :class="$style.f_point"
              >{{scope.row.code}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" align="center" label="任务名称" width="180"></el-table-column>
          <el-table-column prop="date" align="center" sortable label="采集日期"></el-table-column>
          <el-table-column prop="time" align="center" sortable label="采集时间" width="105"></el-table-column>
          <el-table-column prop="data_num" align="center" label="已采数据" width="90">
            <template slot-scope="scope">
              <span
                @click="addresslist(scope.$index, scope.row)"
                :class="$style.f_ycsj"
              >{{scope.row.data_num}}</span>
            </template>
          </el-table-column>
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-table :data="tableData1" border style="width: 100%">
                <el-table-column align="center" label="采集点" width="180">
                  <template slot-scope="scope">
                    <span>{{scope.row.city}}/{{scope.row.province}}/{{scope.row.area}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="type" align="center" label="数据类型" width="180">
                  <template slot-scope="scope">
                    <span v-if="scope.row.type==='1'">区域类型</span>
                    <span v-if="scope.row.type==='2'">行业类型</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="行业/区">
                  <template slot-scope="scope">
                    <span
                      v-if="scope.row.type==='1'"
                    >{{scope.row.regionParent}}/{{scope.row.region}}</span>
                    <span
                      v-if="scope.row.type==='2'"
                    >{{scope.row.industryTypeParent}}/{{scope.row.industry}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="细分">
                  <template slot-scope="scope">
                    <span
                      v-if="scope.row.type==='1'"
                    >{{scope.row.regionTypeParent}}/{{scope.row.regionType}}</span>
                    <span
                      v-if="scope.row.type==='2'"
                    >{{scope.row.industryTypeParent}}/{{scope.row.industry}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="crowd" align="center" label="人群标签"></el-table-column>
                <el-table-column prop="scencesName" align="center" label="场景名称"></el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column prop="cj" align="left" label="场景" width="105"></el-table-column>
          <el-table-column align="center" label="任务类型" width="90">
            <template slot-scope="scope">
              <span v-if="scope.row.platformTask===null">自建任务</span>
              <span v-if="scope.row.platformTask!==null">平台任务</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="状态" width="80">
            <template slot-scope="scope">
              <span
                v-if="scope.row.status===0"
                style="font-size: 14px; letter-spacing: 0; text-align: center;"
              >
                <i class="jinxing"></i>进行
              </span>
              <span
                v-if="scope.row.status===1"
                style="font-size: 14px; letter-spacing: 0; text-align: center;"
              >
                <i class="jinxing"></i>进行
              </span>
              <span
                v-if="scope.row.status===2"
                style="font-size: 14px; letter-spacing: 0; text-align: center;"
              >
                <i class="jieshu"></i>结束
              </span>
              <span
                v-if="scope.row.status===3"
                style="font-size: 14px;  letter-spacing: 0; text-align: center;"
              >
                <i class="quxiao"></i>取消
              </span>
              <span
                v-if="scope.row.status===4"
                style="font-size: 14px;  letter-spacing: 0; text-align: center;"
              >
                <i class="zanting"></i>暂停
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 已完成 -->
      <div v-show="xz3===true" :class="$style.f_bgnr">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          @select="handleSelectionChange"
          @expand-change="dj"
        >
          <el-table-column type="selection" align="center" width="50"></el-table-column>
          <el-table-column sortable prop="code" align="center" label="任务编号" width="120">
            <template slot-scope="scope">
              <span
                @click="point(scope.$index, scope.row)"
                :class="$style.f_point"
              >{{scope.row.code}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" align="center" label="任务名称" width="180"></el-table-column>
          <el-table-column prop="date" align="center" sortable label="采集日期"></el-table-column>
          <el-table-column prop="time" align="center" sortable label="采集时间" width="105"></el-table-column>
          <el-table-column prop="data_num" align="center" label="已采数据" width="90">
            <template slot-scope="scope">
              <span
                @click="addresslist(scope.$index, scope.row)"
                :class="$style.f_ycsj"
              >{{scope.row.data_num}}</span>
            </template>
          </el-table-column>
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-table :data="tableData1" border style="width: 100%">
                <el-table-column align="center" label="采集点" width="180">
                  <template slot-scope="scope">
                    <span>{{scope.row.city}}/{{scope.row.province}}/{{scope.row.area}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="type" align="center" label="数据类型" width="180">
                  <template slot-scope="scope">
                    <span v-if="scope.row.type==='1'">区域类型</span>
                    <span v-if="scope.row.type==='2'">行业类型</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="行业/区">
                  <template slot-scope="scope">
                    <span
                      v-if="scope.row.type==='1'"
                    >{{scope.row.regionParent}}/{{scope.row.region}}</span>
                    <span
                      v-if="scope.row.type==='2'"
                    >{{scope.row.industryTypeParent}}/{{scope.row.industry}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="细分">
                  <template slot-scope="scope">
                    <span
                      v-if="scope.row.type==='1'"
                    >{{scope.row.regionTypeParent}}/{{scope.row.regionType}}</span>
                    <span
                      v-if="scope.row.type==='2'"
                    >{{scope.row.industryTypeParent}}/{{scope.row.industry}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="crowd" align="center" label="人群标签"></el-table-column>
                <el-table-column prop="scencesName" align="center" label="场景名称"></el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column prop="cj" align="left" label="场景" width="105"></el-table-column>
          <el-table-column align="center" label="任务类型" width="90">
            <template slot-scope="scope">
              <span v-if="scope.row.platformTask===null">自建任务</span>
              <span v-if="scope.row.platformTask!==null">平台任务</span>
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
      <!-- 未完成 -->
      <div v-show="xz5===true" :class="$style.f_bgnr">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          @select="handleSelectionChange"
          @expand-change="dj"
        >
          <el-table-column type="selection" align="center" width="50"></el-table-column>
          <el-table-column sortable prop="code" align="center" label="任务编号" width="120">
            <template slot-scope="scope">
              <span
                @click="point(scope.$index, scope.row)"
                :class="$style.f_point"
              >{{scope.row.code}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" align="center" label="任务名称" width="180"></el-table-column>
          <el-table-column prop="date" align="center" sortable label="采集日期"></el-table-column>
          <el-table-column prop="time" align="center" sortable label="采集时间" width="105"></el-table-column>
          <el-table-column prop="data_num" align="center" label="已采数据" width="90">
            <template slot-scope="scope">
              <span
                @click="addresslist(scope.$index, scope.row)"
                :class="$style.f_ycsj"
              >{{scope.row.data_num}}</span>
            </template>
          </el-table-column>
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-table :data="tableData1" border style="width: 100%">
                <el-table-column align="center" label="采集点" width="180">
                  <template slot-scope="scope">
                    <span>{{scope.row.city}}/{{scope.row.province}}/{{scope.row.area}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="type" align="center" label="数据类型" width="180">
                  <template slot-scope="scope">
                    <span v-if="scope.row.type==='1'">区域类型</span>
                    <span v-if="scope.row.type==='2'">行业类型</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="行业/区">
                  <template slot-scope="scope">
                    <span
                      v-if="scope.row.type==='1'"
                    >{{scope.row.regionParent}}/{{scope.row.region}}</span>
                    <span
                      v-if="scope.row.type==='2'"
                    >{{scope.row.industryTypeParent}}/{{scope.row.industry}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="细分">
                  <template slot-scope="scope">
                    <span
                      v-if="scope.row.type==='1'"
                    >{{scope.row.regionTypeParent}}/{{scope.row.regionType}}</span>
                    <span
                      v-if="scope.row.type==='2'"
                    >{{scope.row.industryTypeParent}}/{{scope.row.industry}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="crowd" align="center" label="人群标签"></el-table-column>
                <el-table-column prop="scencesName" align="center" label="场景名称"></el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column prop="cj" align="left" label="场景" width="105"></el-table-column>
          <el-table-column align="center" label="任务类型" width="90">
            <template slot-scope="scope">
              <span v-if="scope.row.platformTask===null">自建任务</span>
              <span v-if="scope.row.platformTask!==null">平台任务</span>
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
      <!-- 自建任务 -->
      <div v-show="xz7===true" :class="$style.f_bgnr">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          @select="handleSelectionChange"
          @expand-change="dj"
        >
          <el-table-column type="selection" align="center" width="50"></el-table-column>
          <el-table-column sortable prop="code" align="center" label="任务编号" width="120">
            <template slot-scope="scope">
              <span
                @click="point(scope.$index, scope.row)"
                :class="$style.f_point"
              >{{scope.row.code}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" align="center" label="任务名称" width="180"></el-table-column>
          <el-table-column prop="date" align="center" sortable label="采集日期"></el-table-column>
          <el-table-column prop="time" align="center" sortable label="采集时间" width="105"></el-table-column>
          <el-table-column prop="data_num" align="center" label="已采数据" width="90">
            <template slot-scope="scope">
              <span
                @click="addresslist(scope.$index, scope.row)"
                :class="$style.f_ycsj"
              >{{scope.row.data_num}}</span>
            </template>
          </el-table-column>
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-table :data="tableData1" border style="width: 100%">
                <el-table-column align="center" label="采集点" width="180">
                  <template slot-scope="scope">
                    <span>{{scope.row.city}}/{{scope.row.province}}/{{scope.row.area}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="type" align="center" label="数据类型" width="180">
                  <template slot-scope="scope">
                    <span v-if="scope.row.type==='1'">区域类型</span>
                    <span v-if="scope.row.type==='2'">行业类型</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="行业/区">
                  <template slot-scope="scope">
                    <span
                      v-if="scope.row.type==='1'"
                    >{{scope.row.regionParent}}/{{scope.row.region}}</span>
                    <span
                      v-if="scope.row.type==='2'"
                    >{{scope.row.industryTypeParent}}/{{scope.row.industry}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="细分">
                  <template slot-scope="scope">
                    <span
                      v-if="scope.row.type==='1'"
                    >{{scope.row.regionTypeParent}}/{{scope.row.regionType}}</span>
                    <span
                      v-if="scope.row.type==='2'"
                    >{{scope.row.industryTypeParent}}/{{scope.row.industry}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="crowd" align="center" label="人群标签"></el-table-column>
                <el-table-column prop="scencesName" align="center" label="场景名称"></el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column prop="cj" align="left" label="场景" width="105"></el-table-column>
          <el-table-column align="center" label="任务类型" width="90">
            <template slot-scope="scope">
              <span v-if="scope.row.platformTask===null">自建任务</span>
              <span v-if="scope.row.platformTask!==null">平台任务</span>
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
      <!-- 平台任务 -->
      <div v-show="xz9===true" :class="$style.f_bgnr">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          @select="handleSelectionChange"
          @expand-change="dj"
        >
          <el-table-column type="selection" align="center" width="50"></el-table-column>
          <el-table-column sortable prop="code" align="center" label="任务编号" width="120">
            <template slot-scope="scope">
              <span
                @click="point(scope.$index, scope.row)"
                :class="$style.f_point"
              >{{scope.row.code}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" align="center" label="任务名称" width="180"></el-table-column>
          <el-table-column prop="date" align="center" sortable label="采集日期"></el-table-column>
          <el-table-column prop="time" align="center" sortable label="采集时间" width="105"></el-table-column>
          <el-table-column prop="data_num" align="center" label="已采数据" width="90">
            <template slot-scope="scope">
              <span
                @click="addresslist(scope.$index, scope.row)"
                :class="$style.f_ycsj"
              >{{scope.row.data_num}}</span>
            </template>
          </el-table-column>
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-table :data="tableData1" border style="width: 100%">
                <el-table-column align="center" label="采集点" width="180">
                  <template slot-scope="scope">
                    <span>{{scope.row.city}}/{{scope.row.province}}/{{scope.row.area}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="type" align="center" label="数据类型" width="180">
                  <template slot-scope="scope">
                    <span v-if="scope.row.type==='1'">区域类型</span>
                    <span v-if="scope.row.type==='2'">行业类型</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="行业/区">
                  <template slot-scope="scope">
                    <span
                      v-if="scope.row.type==='1'"
                    >{{scope.row.regionParent}}/{{scope.row.region}}</span>
                    <span
                      v-if="scope.row.type==='2'"
                    >{{scope.row.industryTypeParent}}/{{scope.row.industry}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="细分">
                  <template slot-scope="scope">
                    <span
                      v-if="scope.row.type==='1'"
                    >{{scope.row.regionTypeParent}}/{{scope.row.regionType}}</span>
                    <span
                      v-if="scope.row.type==='2'"
                    >{{scope.row.industryTypeParent}}/{{scope.row.industry}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="crowd" align="center" label="人群标签"></el-table-column>
                <el-table-column prop="scencesName" align="center" label="场景名称"></el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column prop="cj" align="left" label="场景" width="105"></el-table-column>
          <el-table-column align="center" label="任务类型" width="90">
            <template slot-scope="scope">
              <span v-if="scope.row.platformTask===null">自建任务</span>
              <span v-if="scope.row.platformTask!==null">平台任务</span>
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
          <el-select
            v-model="value3"
            style="width:26%"
            @change="scenes"
            clearable
            placeholder="请选择采集场景"
          >
            <el-option
              v-for="item in acquisitionscene"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            v-model="value2"
            style="width:26%"
            @change="ending"
            clearable
            placeholder="请选择终端编号"
          >
            <el-option
              v-for="item in terminalnumber"
              :key="item.id"
              :label="item.code"
              :value="item.code"
            ></el-option>
          </el-select>
          <div :class="$style.f_sousuo">
            <el-input placeholder="请输入内容" v-model="datasearch" style="width:60%;" clearable></el-input>
            <span
              @click="define"
              style="display: inline-block; float:right;"
              :class="$style.f_btn"
            >搜索</span>
          </div>
          <div :class="$style.f_sjbg">
            <el-table :data="tableDataaspect" border style="width: 100%">
              <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
              <el-table-column prop="mac" align="center" label="MAC地址"></el-table-column>
              <el-table-column prop="gather_time" align="center" label="采集时间"></el-table-column>
              <el-table-column prop="scences_name" align="center" label="场景名称"></el-table-column>
              <el-table-column prop="device_code" align="center" label="终端编号"></el-table-column>
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
              :total="totals"
            ></el-pagination>
          </div>
        </el-dialog>
      </div>
    </div>
    <div :class="$style.f_jz">
      <footerl/>
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
          v-model="textarea2"
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
      num9: 0,
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
      // 全部
      tableData: [],
      tableData1: [],
      // 数据详情
      value3: '',
      value2: '',
      datasearch: '',
      // 已完成
      completed: [],
      completed1: [],
      // 未完成
      undone: [],
      undone1: [],
      // 自建任务
      selfbuilttask: [],
      selfbuilttask1: [],
      // 平台任务
      platformtask: [],
      platformtask1: [],
      // 居住地点
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
            option.url = `pc/order/yzCity?province=${node.value}`
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
            data: {
              groupId: level
            }
          }
          if (level === 0) {
            option.url = 'pc/order/yzProvince'
          } else if (level === 1) {
            option.url = `pc/order/yzCity?province=${node.value}`
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
      // 媒体平台
      media: [],
      mediaData: [],
      career: [],
      sex: [],
      password: '',
      gender: '',
      options: [],
      age: '',
      agebin: [],
      dwell: [],
      nl: '',
      zy: '',
      gzdd: '',
      platform: '',
      user: "",
      // 订单名称
      ordername: '',
      ikon: false,
      input1: '',
      jzdd: '',
      ysjl: '',
      moeny: '',
      textarea2: '',
      dgdata: false,
      dgmoney: null,
      btname: '创建任务',
      btmatter: '任务详情',
      sjtj: '数据统计',
      search1: '',
      total: null,
      sizes: 10,
      sjxq1: false,
      currentPage4: 1,
      currentPage5: 1,
      searchId: [],
      mediaAccountList: [],
      id: '',
      formname: '',
      buyAmount: '',
      mediaids: [],
      ids: '',
      tableDataaspect: [],
      totals: null,
      taskId: null,
      sizes1: 10,
      acquisitionscene: [],
      terminalnumber: [],
      ysjl1: '',
      dataPrice: null,
      mappingPrice: null
    }
  },
  mounted () {
    this.getTask();
    this.qb()
  },
  methods: {
    // 采集任务统计
    getTask () {
      this.$http.get('pc/task/countTask').then(res => {
        var { code, data } = res
        if (data.code === 1000) {
          this.num = data.data.All_NUM
          this.num1 = data.data.FINISH_NUM
          if (this.num1 / this.num5 === 0) {
            this.num6 = 0
          } else if (this.num1 === this.num) {
            this.num6 = 100
          } else {
            this.num6 = (this.num1 / this.num5) * 100
          }
          this.num2 = data.data.UNFINISH_NUM
          if (this.num2 / this.num5 === 0) {
            this.num7 = 0
          } else if (this.num2 === this.num) {
            this.num7 = 100
          } else {
            this.num7 = (this.num2 / this.num5) * 100
          }
          this.num3 = data.data.GENERAL_NUM
          if (this.num3 / this.num5 === 0) {
            this.num8 = 0
          } else if (this.num3 === this.num) {
            this.num8 = 100
          } else {
            this.num8 = (this.num3 / this.num5) * 100
          }
          this.num4 = data.data.PLATFORM_NUM
          if (this.num4 / this.num5 === 0) {
            this.num9 = 0
          } else if (this.num3 === this.num) {
            this.num9 = 100
          } else {
            this.num9 = (this.num4 / this.num5) * 100
          }
        }else if(code==2001){
           this.$message.error(res.data.message);
            window.sessionStorage.clear();
            window.localStorage.clear();
            this.$router.push('/')
        }
      })
    },
    format (percentage) {
      return percentage === 100 ? '' : ``;
    },
    chongzhi () {
      this.search1 = ''
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
      this.$http.get(`pc/task/list?tab=0&size=${10}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.total = data.total
          this.tableData = data.content
          this.tableData.forEach(item => {
            item.date = item.fromDate + '\n' + '至' + '\n' + item.toDate
            item.time = item.fromTime + ':00' + '-' + item.toTime + ':00'
            item.cj = item.collectList[0].scencesName
          })
        }
      }).catch(function (err) {
        console.log("连接错误" + err)
      })
    },
    dj (row) {
      this.tableData1 = row.collectList
      console.log(this.tableData1)
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
      this.$http.get(`pc/task/list?tab=1&size=${10}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.total = data.total
          this.tableData = data.content
          this.tableData.forEach(item => {
            item.date = item.fromDate + '\n' + '至' + '\n' + item.toDate
            item.time = item.fromTime + ':00' + '-' + item.toTime + ':00'
            // item.cj = item.collectList[0].scencesName
            // this.tableData1 = item.collectList
          })
          console.log(this.tableData)
        }
      }).catch(function (err) {
        console.log("连接错误" + err)
      })
    },
    // 未完成
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
      this.$http.get(`pc/task/list?tab=2&size=${10}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.total = data.total
          this.tableData = data.content
          this.tableData.forEach(item => {
            item.date = item.fromDate + '\n' + '至' + '\n' + item.toDate
            item.time = item.fromTime + ':00' + '-' + item.toTime + ':00'
            // item.cj = item.collectList[0].scencesName
            // this.tableData1 = item.collectList
          })
          console.log(this.tableData)
        }
      }).catch(function (err) {
        console.log("连接错误" + err)
      })
    },
    // 自建任务
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
      this.$http.get(`pc/task/list?tab=3&size=${10}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.total = data.total
          this.tableData = data.content
          this.tableData.forEach(item => {
            item.date = item.fromDate + '\n' + '至' + '\n' + item.toDate
            item.time = item.fromTime + ':00' + '-' + item.toTime + ':00'
            // item.cj = item.collectList[0].scencesName
            // this.tableData1 = item.collectList
          })
          console.log(this.tableData)
        }
      }).catch(function (err) {
        console.log("连接错误" + err)
      })
    },
    // 平台任务
    ptrw () {
      this.xz1 = false
      this.xz = true
      this.xz2 = true
      this.xz3 = false
      this.xz4 = true
      this.xz5 = false
      this.xz6 = true
      this.xz7 = false
      this.xz8 = false
      this.xz9 = true
      this.$http.get(`pc/task/list?tab=1&size=${10}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.total = data.total
          this.tableData = data.content
          this.tableData.forEach(item => {
            item.date = item.fromDate + '\n' + '至' + '\n' + item.toDate
            item.time = item.fromTime + ':00' + '-' + item.toTime + ':00'
            // item.cj = item.collectList[0].scencesName
            // this.tableData1 = item.collectList
          })
          console.log(this.tableData)
        }
      }).catch(function (err) {
        console.log("连接错误" + err)
      })
    },
    // 搜索
    inquire () {
      if (this.xz1 === true) {
        this.$http.get(`pc/task/list?tab=0&keyWord=${this.search1}&QueryDate=${this.value1}`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.tableData = data.content
            this.total = data.total
          }
        }).catch(function (err) {
          console.log("连接错误" + err)
        });
      } else if (this.xz3 === true) {
        this.$http.get(`pc/task/list?tab=1&keyWord=${this.search1}&QueryDate=${this.value1}`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.tableData = data.content
            this.total = data.total
          }
        }).catch(function (err) {
          console.log("连接错误" + err)
        });
      } else if (this.xz5 === true) {
        this.$http.get(`pc/task/list?tab=2&keyWord=${this.search1}&QueryDate=${this.value1}`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.tableData = data.content
            this.total = data.total
          }
        }).catch(function (err) {
          console.log("连接错误" + err)
        });
      } else if (this.xz7 === true) {
        this.$http.get(`pc/task/list?tab=3&keyWord=${this.search1}&QueryDate=${this.value1}`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.tableData = data.content
            this.total = data.total
          }
        }).catch(function (err) {
          console.log("连接错误" + err)
        });
      } else if (this.xz9 === true) {
        this.$http.get(`pc/task/list?tab=4&keyWord=${this.search1}&QueryDate=${this.value1}`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.tableData = data.content
            this.total = data.total
          }
        }).catch(function (err) {
          console.log("连接错误" + err)
        });
      }
    },
    // 详情页面
    point (index, row) {
      let id = row.id
      console.log(id)
      // this.$store.commit('myval1', this.btmatter)
      // this.$http.get(`/pc/task/detail/${id}`).then(res => {
      //   var { code, data } = res.data
      //   if (code === 1000) {
      this.$router.push({ path: '/index/rwpoint.vue', query: { id: id, rwname: row.name } })
      //   }
      // }).catch(function (err) {
      //   console.log("连接错误" + err)
      // })
    },
    handleSizeChange (val) {
      this.sizes = val;
      this.$http.get(`pc/task/list?tab=0&size=${val}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.total = data.total
          this.tableData = data.content
          this.tableData.forEach(item => {
            item.date = item.fromDate + '\n' + '至' + '\n' + item.toDate
            item.time = item.fromTime + ':00' + '-' + item.toTime + ':00'
            item.cj = item.collectList[0].scencesName
          })
        }
      }).catch(function (err) {
        console.log("连接错误" + err)
      });
    },
    handleCurrentChange (val) {
      this.$http.get(`pc/task/list?tab=0&page=${val - 1}&size=${this.sizes}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.total = data.total
          this.tableData = data.content
          this.tableData.forEach(item => {
            item.date = item.fromDate + '\n' + '至' + '\n' + item.toDate
            item.time = item.fromTime + ':00' + '-' + item.toTime + ':00'
            item.cj = item.collectList[0].scencesName
          })
        }
      }).catch(function (err) {
        console.log("连接错误" + err)
      });
    },
    // 订购画像
    orderikion () {
      console.log(this.searchId)
      let ids = this.searchId.join(',')
      console.log(ids)
      // let info = new FormData()
      // info.append('ids', ids)
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
    orderdata () {
      this.dgdata = true
      // let info={'type':1,'searchId':10}
      let ids = this.searchId.join(',')
      // let info = new FormData()
      // info.append('type', 1)
      // info.append('ids', ids)

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
      this.$http.post(`pc/task/orderInit`, { 'ids': ids, 'type': 1 }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          this.mediaAccountList = data.mediaAccountList
          this.formname = data.name
          this.ysjl1 = data.dataCount
          this.dataPrice = data.dataPrice
          this.mappingPrice = data.mappingPrice
        }
      }).catch(function (err) {
        console.log('错误信息' + err)
      })
    },
    // 计算金额
    cipher () {
      this.dgmoney = Number(this.buyAmount) * this.dataPrice
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
    // 创建任务
    cjrw () {
      this.$store.commit('myval1', this.btname)
      this.$router.push('/index/createtask.vue')
    },
    shujutongji () {
      this.$store.commit('myval1', this.sjtj)
      this.$router.push('/index/sjtj.vue')
    },
    // 数据详情
    addresslist (index, row) {
      // console.log(row.id)
      this.taskId = row.id
      let endstr = ''
      this.$http.get(`pc/data/list?taskId=${this.taskId}&size=10`).then(res => {
        var { code, data } = res.data
        if (code == 1000) {
          this.tableDataaspect = data.content
          this.totals = data.total
          this.tableDataaspect.forEach(item => {
            let mac = item.mac
            var a = mac.split('')  //将a字符串转换成数组
            a.splice(2, 1, '*')
            a.splice(3, 1, '*')
            a.splice(4, 1, '*')
            a.splice(5, 1, '*')
            a.splice(6, 1, '*')
            a.splice(7, 1, '*')
            a.splice(8, 1, '*')
            a.splice(9, 1, '*')
            a.splice(10, 1, '*')
            a.splice(11, 1, '*')
            a.splice(12, 1, '*')
            a.splice(13, 1, '*')
            a.splice(14, 1, '*')    //结果是：
            item.mac = a.join('');  //将数组转换成字符串。  完成。
          })
          this.sjxq1 = true
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
      this.$http.get(`pc/task/scencesBytask?taskId=${this.taskId}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.acquisitionscene = data
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
      this.$http.get(`pc/device/all`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.terminalnumber = data
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    handleSizeChange1 (val) {
      this.sizes1 = val
      this.$http.get(`pc/data/list?taskId=${this.taskId}&size=${val}`).then(res => {
        var { code, data } = res.data
        if (code == 1000) {
          this.tableDataaspect = data.content
          this.totals = data.total
          this.tableDataaspect.forEach(item => {
            let mac = item.mac
            var a = mac.split('')  //将a字符串转换成数组
            a.splice(2, 1, '*')
            a.splice(3, 1, '*')
            a.splice(4, 1, '*')
            a.splice(5, 1, '*')
            a.splice(6, 1, '*')
            a.splice(7, 1, '*')
            a.splice(8, 1, '*')
            a.splice(9, 1, '*')
            a.splice(10, 1, '*')
            a.splice(11, 1, '*')
            a.splice(12, 1, '*')
            a.splice(13, 1, '*')
            a.splice(14, 1, '*')    //结果是：
            item.mac = a.join('');  //将数组转换成字符串。  完成。
          })
          this.sjxq1 = true
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange1 (val) {
      this.$http.get(`pc/data/list?taskId=${this.taskId}&size=${this.sizes1}&page=${val - 1}`).then(res => {
        var { code, data } = res.data
        if (code == 1000) {
          this.tableDataaspect = data.content
          this.totals = data.total
          this.tableDataaspect.forEach(item => {
            let mac = item.mac
            var a = mac.split('')  //将a字符串转换成数组
            a.splice(2, 1, '*')
            a.splice(3, 1, '*')
            a.splice(4, 1, '*')
            a.splice(5, 1, '*')
            a.splice(6, 1, '*')
            a.splice(7, 1, '*')
            a.splice(8, 1, '*')
            a.splice(9, 1, '*')
            a.splice(10, 1, '*')
            a.splice(11, 1, '*')
            a.splice(12, 1, '*')
            a.splice(13, 1, '*')
            a.splice(14, 1, '*')    //结果是：
            item.mac = a.join('');  //将数组转换成字符串。  完成。
          })
          this.sjxq1 = true
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
      console.log(`当前页: ${val}`);
    },
    scenes () {
      console.log(this.value3)
      console.log(this.value2)
      this.$http.get(`pc/data/list?taskId=${this.taskId}&size=10&scencesId=${this.value3}&deviceCode=${this.value2}`).then(res => {
        var { code, data } = res.data
        if (code == 1000) {
          this.tableDataaspect = data.content
          this.totals = data.total
          this.tableDataaspect.forEach(item => {
            let mac = item.mac
            var a = mac.split('')  //将a字符串转换成数组
            a.splice(2, 1, '*')
            a.splice(3, 1, '*')
            a.splice(4, 1, '*')
            a.splice(5, 1, '*')
            a.splice(6, 1, '*')
            a.splice(7, 1, '*')
            a.splice(8, 1, '*')
            a.splice(9, 1, '*')
            a.splice(10, 1, '*')
            a.splice(11, 1, '*')
            a.splice(12, 1, '*')
            a.splice(13, 1, '*')
            a.splice(14, 1, '*')    //结果是：
            item.mac = a.join('');  //将数组转换成字符串。  完成。
          })
          this.sjxq1 = true
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    ending () {
      console.log(this.value2)
      this.$http.get(`pc/data/list?taskId=${this.taskId}&size=10&scencesId=${this.value3}&deviceCode=${this.value2}`).then(res => {
        var { code, data } = res.data
        if (code == 1000) {
          this.tableDataaspect = data.content
          this.totals = data.total
          this.tableDataaspect.forEach(item => {
            let mac = item.mac
            var a = mac.split('')  //将a字符串转换成数组
            a.splice(2, 1, '*')
            a.splice(3, 1, '*')
            a.splice(4, 1, '*')
            a.splice(5, 1, '*')
            a.splice(6, 1, '*')
            a.splice(7, 1, '*')
            a.splice(8, 1, '*')
            a.splice(9, 1, '*')
            a.splice(10, 1, '*')
            a.splice(11, 1, '*')
            a.splice(12, 1, '*')
            a.splice(13, 1, '*')
            a.splice(14, 1, '*')    //结果是：
            item.mac = a.join('');  //将数组转换成字符串。  完成。
          })
          this.sjxq1 = true
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    handleClose () {
      this.sjxq1 = false
    },
    handleSelectionChange (selection, row) {
      // console.log(row)
      this.searchId.push(row.id)
      this.id = this.searchId.join(',')
      console.log(this.id)
    },
    gb () {
      this.ikon = false
    },
    sjdata () {
      this.dgdata = false
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
          // digital.append('name', this.ordername)
          // digital.append('taskIds', this.id)
          // digital.append('price', 232)
          let info = {
            'name': this.ordername,
            'taskIds': this.id,
            'price': 232
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
        // info.append('residenceCity', this.placeofresidence[1])、
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
    define () {
    },
    cancel () {
      this.formname = ''
      this.mediaData = [],
        this.buyAmount = ''
      this.platform = ''
      this.user = ''
      this.password = ''
      this.textarea2 = ''
    }
    // point (index, row) {
    //   console.log(index, row)
    //   this.$store.commit('myval1', this.btmatter)
    //   this.$router.push({ path: '/index/rwpoint.vue', query: { row: row } })
    // }
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
  margin-left: 20px;
  width: 215px;
  display: inline-block;
  height: 80px;
  margin-top: 20px;
  border-radius: 10px;
  margin-left: 20px;
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
      color: #42e0fc;
    }
    .f_num4 {
      color: #9013fe;
    }
  }
}
.f_s {
  margin-left: 0;
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
    width: calc(100% - 88%);
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
    padding-left: 1%;
  }
  .f_hxinpt1 {
    width: calc(100% - 60%);
    padding-left: 1%;
  }
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
.f_s5 {
  margin-right: 10px;
  width: calc(100% - 76%);
  display: inline-block;
  float: left;
}
.f_sousuo {
  display: inline-block;
}
</style>
