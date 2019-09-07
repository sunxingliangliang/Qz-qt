<template>
  <div :class="$style.user">
    <div class="jibenxinxi">
      <el-tabs :tab-position="tabPosition" v-model="activeName" :class="$style.f_tabs">
        <el-tab-pane label="基本信息" name="first">
          <div :class="$style.f_userxx">
            <h4>基本信息</h4>
            <div :class="$style.f_userxinxi">
              <span>用户名称</span>
              <el-input
                placeholder="请输入内容"
                :disabled="true"
                :class="$style.f_inpt"
                v-model="input"
                clearable
              ></el-input>
            </div>
            <div :class="$style.f_userxinxi">
              <span>登陆账号</span>
              <el-input
                placeholder="请输入内容"
                :disabled="true"
                :class="$style.f_inpt"
                v-model="input1"
                clearable
              ></el-input>
            </div>
            <div :class="$style.f_userxinxi">
              <span>企业账号</span>
              <el-input
                placeholder="请输入内容"
                :disabled="true"
                :class="$style.f_inpt"
                v-model="input2"
                clearable
              ></el-input>
            </div>
            <div :class="$style.f_userxinxi">
              <span>确权账号</span>
              <el-input
                placeholder="请输入内容"
                :disabled="true"
                :class="$style.f_inpt"
                v-model="input3"
                clearable
              ></el-input>
            </div>
            <h4>用户类型</h4>
            <div :class="$style.f_userxinxi">
              <span>类型</span>
              <el-input
                placeholder="请输入内容"
                :disabled="true"
                :class="$style.f_inpt1"
                v-model="input4"
                clearable
              ></el-input>
            </div>
            <div :class="$style.f_userxinxi">
              <span>区域</span>
              <el-input
                placeholder="请输入内容"
                :disabled="true"
                :class="$style.f_inpt1"
                v-model="input5"
                clearable
              ></el-input>
            </div>
            <h4>联系方式</h4>
            <div :class="$style.f_userxinxi">
              <span>联系人</span>
              <el-input placeholder="请输入内容" :class="$style.f_inpt2" v-model="input6" clearable></el-input>
            </div>
            <div :class="$style.f_userxinxi">
              <span>联系电话</span>
              <el-input placeholder="请输入内容" :class="$style.f_inpt" v-model="input7" clearable></el-input>
            </div>
            <div :class="$style.f_userxinxi">
              <span>联系邮箱</span>
              <el-input placeholder="请输入内容" :class="$style.f_inpt" v-model="input8" clearable></el-input>
            </div>
            <div :class="$style.f_userxinxi">
              <span>联系地址</span>
              <el-input placeholder="请输入内容" :class="$style.f_inpt" v-model="input9" clearable></el-input>
            </div>
          </div>
          <div :class="$style.clear"></div>
          <div :class="$style.f_bc">
            <el-button :class="$style.f_btn">保存</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="修改密码" name="second">
          <div :class="$style.f_userxx">
            <h4>修改密码</h4>
            <div :class="$style.f_userxinxi1">
              <span>原密码</span>
              <el-input placeholder="请输入内容" :class="$style.f_inpt3" v-model="input" clearable></el-input>
            </div>
            <div :class="$style.f_userxinxi1">
              <span>新密码</span>
              <el-input placeholder="请输入内容" :class="$style.f_inpt3" v-model="input1" clearable></el-input>
            </div>
            <div :class="$style.f_userxinxi1">
              <span>确认密码</span>
              <el-input placeholder="请输入内容" :class="$style.f_inpt2" v-model="input2" clearable></el-input>
            </div>
          </div>
          <div :class="$style.clear"></div>
          <div :class="$style.f_bc">
            <el-button :class="$style.f_btn">保存</el-button>
          </div>
        </el-tab-pane>
        <!-- <el-tab-pane label="消息中心" name="third">角色管理</el-tab-pane> -->
      </el-tabs>
    </div>

    <div :class="$style.f_jz">
      <footerl/>
    </div>
  </div>
</template>

<script>
import footerl from '../footer/footerl'
import {mapActions} from 'vuex'
export default {
  components: {
    footerl
  },
  data () {
    return {
      tabPosition: 'left',
      activeName: '',
      input: '',
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      input6: '',
      input7: '',
      input8: '',
      input9: '',
    };
  },
  created () {
    this.add()
    this.user()
    // console.log(this.$store.state.userinfo)
  },
  methods: {
    ...mapActions([
      'getSearch'
    ]),
    add () {
      if (this.$route.query.id === 1) {
        console.log(2)
        this.activeName = 'first'
      } else if (this.$route.query.id === 2) {
        console.log(3)
        this.activeName = 'second'
      }
    },
    user () {
      let userinfo = this.$store.state.userinfo
      console.log(userinfo.merchant.proxyType)
      this.input1 = userinfo.user.username
      this.input = userinfo.user.name
      this.input2 = userinfo.merchant.account.name
      this.input3 = userinfo.merchant.account.name
      if (userinfo.merchant.proxyType === 1) {
        this.input4 = '省级运营中心'
      } else if (userinfo.merchant.proxyType === 2) {
        this.input4 = '市级运营中心'
      } else if (userinfo.merchant.proxyType === 3) {
        this.input4 = '市级一般代理商'
      } else if (userinfo.merchant.proxyType === 4) {
        this.input4 = '大客户'
      } else if (userinfo.merchant.proxyType === 5) {
        this.input4 = '青竹数据'
      }
      this.getSearch().then(res=>{
        console.log(res)
        res.forEach(item=>{
          if(userinfo.merchant.province===item.id){
            console.log(item)
          }
        })
        // it()
      })
    },
    // getProvince () {
    //   this.$http.get(`modules/area/areaByPid?pid=1`).then(res => {
    //     var { code, data } = res.data
    //     if (code === 1000) {
    //       data.forEach(item => {
    //         if(this.$store.state.userinfo.merchantInfo.province===item.id){
    //           this.input5=item.name
    //         }
    //       })
    //     }
    //   }).catch((err) => {
    //     console.log('错误信息' + err)
    //   })
    // },
  }
}
</script>

<style lang='scss' module>
.user {
  width: 1200px;
  margin: auto;
  margin-top: 20px;
  .f_userxx {
    background: #ffffff;
    box-shadow: 0 2px 4px 0 #eff2f7;
    border-radius: 10px;
    h4 {
      float: left;
      height: 40px;
      line-height: 40px;
      margin-top: 30px;
      margin-left: 20px;
      font-size: 16px;
      color: #1f2e4d;
      margin-bottom: 20px;
    }
    .f_userxinxi {
      float: left;
      height: 40px;
      width: 100%;
      margin-bottom: 20px;
      text-align: left;
      padding-left: 55px;
      font-size: 14px;
      color: #3d4966;
      line-height: 14px;
      .f_inpt,
      .f_inpt1,
      .f_inpt2 {
        width: 25%;
        padding-left: 20px;
      }
      .f_inpt1 {
        padding-left: 45px;
      }
      .f_inpt2 {
        padding-left: 35px;
      }
    }
    .f_userxinxi1 {
      float: left;
      height: 40px;
      width: 100%;
      margin-bottom: 20px;
      text-align: left;
      padding-left: 30%;
      font-size: 14px;
      color: #3d4966;
      line-height: 14px;
      .f_inpt,
      .f_inpt1,
      .f_inpt2,
      .f_inpt3 {
        width: 25%;
        padding-left: 20px;
      }
      .f_inpt1 {
        padding-left: 45px;
      }
      .f_inpt2 {
        padding-left: 35px;
      }
      .f_inpt3 {
        padding-left: 50px;
      }
    }
  }
  .clear {
    clear: both;
  }
  .f_btn {
    display: inline-block;
    width: 68px;
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
}
.f_tabs {
  height: 100%;
}
.f_jz {
  margin-top: 20px;
  text-align: center;
}
</style>
