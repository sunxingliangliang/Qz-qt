<template>
  <el-container>
    <el-header style="height:108px">
      <el-row style="height:60px">
        <div :class="$style.f_logo">
          <img src="../assets/img/清竹大数据横版.png" alt :class="$style.f_u">
          <span :class="$style.f_s"></span>
          <img src="../assets/img/PNG-万加链-CN2.png" alt :class="$style.f_lo">
          <span :class="$style.f_zl">战略合作伙伴</span>
        </div>
        <div style="display: inline-block;float: left; margin-left: 8%;">
          <el-menu
            default-active="0"
            class="el-menu-demo"
            @open="handleOpen"
            @close="handleClose"
            mode="horizontal"
            router
          >
            <el-menu-item
              v-for="(item ,i ) in data"
              v-if="!item.child&&list.includes(item.id)"
              :key="i"
              :index="item.path"
              @click="yjcd(item)"
            >
              <span>{{item.name}}</span>
            </el-menu-item>
            <el-submenu
              v-if="item.child&&list.includes(item.id)"
              v-for="(item ,i ) in data"
              :key="i"
              :index="item.name"
            >
              <template slot="title">
                <span>{{item.name}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  v-for="link in item.child "
                  :key="link.id"
                  :index="link.path"
                  @click="zdh(link)"
                >{{link.name}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="/index/agent.vue" @click="xjdl">下级代理商</el-menu-item>
          </el-menu>
        </div>
        <div style="display: inline-block; vertical-align: top; float:right;margin-right:30px;">
          <i
            class="iconfont iconhaofangtuo400iconfontyonghuming yonghu"
            @mouseover="geren"
            @mouseout="yh"
          ></i>
          <ul class="user" v-show="dh===true" @mouseover="jiben" @mouseout="xinxi">
            <li class="yhxx" @click="jibenxinxi">基本信息</li>
            <li class="yhxx" @click="xiugaimima">修改密码</li>
          </ul>
          <el-badge v-if="num!=0" style="vertical-align: top;" :value="num" class="item">
            <i class="iconfont iconxiaoxi"></i>
          </el-badge>
          <el-badge v-if="num===0" style="vertical-align: top;">
            <i class="iconfont iconxiaoxi"></i>
          </el-badge>
          <i class="iconfont icon3" @mouseover="geren1" @mouseout="yh1"></i>
          <ul class="zc" v-show="dh1===true" @mouseover="jiben1" @mouseout="xinxi1">
            <!-- <li class="yhxx1" ref="zc1">资产合计{{heji}}</li> -->
            <!-- <li class="yhxx1" disabled>3000.000VKT</li>
            <li class="yhxx1">3000.0CNY</li>-->
            <li class="yhxx" @click="zijin">我的资金</li>
            <li class="yhxx" @click="jilu">收支记录</li>
          </ul>
          <!-- <el-dropdown>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item disabled>资产合计{{heji}}</el-dropdown-item>
              <el-dropdown-item disabled :class="$style.f_vkt">3000.000VKT</el-dropdown-item>
              <el-dropdown-item disabled :class="$style.f_cny">3000.0CNY</el-dropdown-item>
              <el-dropdown-item>我的资金</el-dropdown-item>
              <el-dropdown-item>收支记录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>-->
          <i class="iconfont icontuichu" @click="ext"></i>
        </div>
      </el-row>
      <el-row :class="$style.f_mbx">
        <el-col :span="4">{{name}}</el-col>
      </el-row>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import footerl from './footer/footerl'
// import {mapActions,}
export default {
  components: {
    footerl
  },
  data () {
    return {
      data: [
        { name: '首页', path: '/index/indexx.vue', id: '0' },
        {          name: '我的数据', id: '1', child: [
            { name: '采集任务', path: '/index/pick.vue', id: '2' },
            { name: '数据订单', path: '/index/dataorder.vue', id: '3' },
            { name: '数据画像', path: '/index/dataikon.vue', id: '4' },
            { name: '固定画像', path: '/index/fiexikon.vue', id: '5' },
            // { name: '数据回购', path: '/index/datarepo.vue', id: '6' },
          ]        },
        {          name: '数据市场', id: '7', child: [
            { name: '数据市场', path: '/index/datamarket.vue', id: '8' },
            // { name: '任务广场', path: '/index/taskmarket.vue', id: '9' },
          ]        },
        {          name: '终端管理', id: '10', child: [
            { name: '采集终端', path: '/index/pickzd.vue', id: '11' },
            { name: '分组终端', path: '/index/groupinggl.vue', id: '12' },
          ]        }
      ],
      list: JSON.parse(window.sessionStorage.getItem('data')),
      activeIndex: '1',
      num: 0,
      heji: '≈3000.0CNY',
      dh: false,
      dh1: false,
      // name: '首页'
    };
  },
  created () {
    console.log(this.$store.state.userinfo.merchant.proxyType)
    if (this.$store.state.userinfo.merchant.proxyType === 5) {
      console.log(1)
      this.data[1].child.push({ name: '数据回购', path: '/index/datarepo.vue', id: '6' })
    } else if (this.$store.state.userinfo.merchant.proxyType === 1 || this.$store.state.userinfo.merchant.proxyType === 2 || this.$store.state.userinfo.merchant.proxyType === 3) {
      console.log(this.$store.state.userinfo.merchant.proxyType)
      console.log(this.data[2].child)
      this.data[2].child.push({ name: '任务广场', path: '/index/taskmarket.vue', id: '9' })
    }
  },
  computed: {
    name: {
      get () {
        return this.$store.state.val
      },
      set (val) {
        this.$store.state.val = val
      }
    }
  },
  methods: {
    geren () {
      this.dh = true
    },
    yh () {
      this.dh = false
    },
    jiben () {
      this.dh = true
    },
    xinxi () {
      this.dh = false
    },
    geren1 () {
      this.dh1 = true
    },
    yh1 () {
      this.dh1 = false
    },
    jiben1 () {
      this.dh1 = true
    },
    xinxi1 () {
      this.dh1 = false
    },
    zdh (link) {
      this.name = link.name
    },
    yjcd (data) {
      this.name = data.name
    },
    xjdl () {
      this.name = '下级代理商'
    },
    geren () {
      this.dh = true
    },
    jibenxinxi () {
      this.$router.push({ path: '/index/user.vue', query: { id: 1 } })
    },
    xiugaimima () {
      this.$router.push({ path: '/index/user.vue', query: { id: 2 } })
    },
    zijin () {
      this.$router.push({ path: '/index/financialcenter.vue', query: { id: 1 } })
    },
    jilu () {
      this.$router.push({ path: '/index/financialcenter.vue', query: { id: 2 } })
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    },
    ext () {
      this.$confirm('您确定要退出登陆？ 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post('sys/user/logout').then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.$message({
              type: 'success',
              message: '已退出!'
            });
            window.sessionStorage.clear();
            window.l.clear();
            this.$router.push('/')
          }else{
            this.$message.error(res.data.message);
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    }
  }
}
</script>

<style lang='scss' module>
.f_logo {
  display: inline-block;
  float: left;
  margin-left: 20px;
  .f_u {
    // width: 120px;
    height: 27px;
    display: inline-block;
    margin-top: 21px;
    margin-bottom: 17px;
    vertical-align: top;
  }
  .f_s {
    display: inline-block;
    width: 1px;
    height: 13px;
    opacity: 0.2;
    background: #343294;
    margin-top: 26px;
    margin-bottom: 22px;
    margin-left: 10px;
    margin-right: 10px;
  }
  .f_lo {
    // width: 50px;
    height: 17px;
    display: inline-block;
    margin-top: 26px;
    margin-bottom: 17px;
    vertical-align: top;
  }
  .f_zl {
    vertical-align: top;
    margin-left: 11px;
    font-size: 15px;
    color: #343294;
    letter-spacing: 0;
  }
}
.f_mbx {
  background: #eff2f7;
  height: 48px;
  line-height: 48px;
  width: 100%;
  float: left;
  position: absolute;
  .f_mbxdh {
    height: 48px;
    line-height: 48px;
    padding-left: 20px;
  }
}
.f_tb {
  i {
    margin-right: 20px;
    font-size: 20px;
    cursor: pointer;
    color: #202f4e;
    margin-top: 23px;
    margin-bottom: 21px;
  }
}
.f_vkt {
  padding-left: 39%;
  line-height: 20px;
}
.f_cny {
  line-height: 20px;
  padding-left: 47%;
}
</style>
