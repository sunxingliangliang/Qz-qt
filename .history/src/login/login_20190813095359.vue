<template>
  <div class="f_bj">
    <div class="bj">
      <div class="content">
        <img src="../assets/img/清竹大数据-logo-白底大.png" width="80px" alt>
        <h1
          style="    display: inline-block; vertical-align: top; color: #fff; margin: 0;"
        >青竹大数据营销系统</h1>
        <h1
          style="position: absolute; display: inline-block; left: 116px; top: 45px; vertical-align: top; color: rgb(255, 255, 255); margin: 0px;"
        >TSinghou&nbsp;Big&nbsp;Data</h1>
        <div class="dl">
          <div style="height: 109px;">
            <div style="height: 50px;">
              <transition>
                <p class="denglu" v-show="bac">用户名</p>
              </transition>
            </div>
            <input
              type="text"
              :placeholder="user"
              ref="inpt"
              @focus="hqjd"
              @blur="sqjd"
              v-model="input"
            >
            <p class="yanzheng" v-show="user1">请输入正确的账号</p>
          </div>
          <div style="height: 109px;">
            <div style="height: 50px;">
              <transition>
                <p class="denglu" v-show="bac1">密码</p>
              </transition>
            </div>
            <input
              type="password"
              :placeholder="mima1"
              @focus="hqjd1"
              @blur="sqjd1"
              v-model="input1"
              class="f_mima"
              ref="inpt1"
            >
            <p class="yanzheng" v-show="mima">请输入正确的密码</p>
          </div>
          <div class="drag" ref="dragDiv">
            <div class="drag_bg"></div>
            <div class="drag_text">{{confirmWords}}</div>
            <div
              ref="moveDiv"
              @mousedown="mousedownFn($event)"
              :class="{'handler_ok_bg':confirmSuccess}"
              class="handler handler_bg"
              style="position: absolute;top: 0px;left: 0px; border-radius: 5px;"
            ></div>
          </div>
          <span class="btn1" @click="denglu">登陆</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from "js-md5";
export default {
  data () {
    return {
      input: '',
      input1: '',
      btname: '首页',
      user: '用户名',
      mima1: '密码',
      bac1: false,
      bac: false,
      mima: false,
      user1: false,
      beginClientX: 20,           /*距离屏幕左端距离*/
      mouseMoveStata: false,     /*触发拖动状态  判断*/
      maxwidth: '',               /*拖动最大宽度，依据滑块宽度算出来的*/
      confirmWords: '拖动滑块验证',   /*滑块文字*/
      confirmSuccess: false           /*验证成功判断*/
    }
  },
  mounted () {
    this.maxwidth = this.$refs.dragDiv.clientWidth - this.$refs.moveDiv.clientWidth;
    document.getElementsByTagName('html')[0].addEventListener('mousemove', this.mouseMoveFn);
    document.getElementsByTagName('html')[0].addEventListener('mouseup', this.moseUpFn)
  },
  methods: {
    denglu () {
      let md = this.$md5(this.input1);
      if (this.confirmWords === '验证通过') {
        this.$http.post(`pc/user/login`, { username: this.input, password: md }).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            let token = res.headers.api_token
            window.sessionStorage.setItem("token", token);
            this.$store.commit('myval1', this.btname)
            this.$store.commit('updateUserInfo', data)
            let arr = ["0", "1", "2", "3", "4", "5", '6', '7', '8', "9", '10', '11', '12'];
            window.sessionStorage.setItem("data", JSON.stringify(arr));
            // console.log(JSON.stringify(arr))
            this.$router.push('./index/indexx.vue')
          } else {
            this.$message.error(res.data.message);
            this.confirmWords = '拖动滑块验证'
            this.confirmSuccess = false
            // this.mouseMoveStata = tr;
            if (window.addEventListener) {
              document.getElementsByTagName('html')[0].removeEventListener('mousemove', this.mouseMoveFn);
              document.getElementsByTagName('html')[0].removeEventListener('mouseup', this.moseUpFn);
            } else {
              document.getElementsByTagName('html')[0].removeEventListener('mouseup', () => { });
            }
            document.getElementsByClassName('drag_text')[0].style.color = '#fff'
            document.getElementsByClassName('drag_bg')[0].style.width = 0 + 'px'
            document.getElementsByClassName('handler')[0].style.left = 0 + 'px';
            document.getElementsByClassName('drag_bg')[0].style.width = 0 + 'px';
            document.getElementsByClassName('handler')[0].style.left = 0 + 'px';
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
      }
    },
    hqjd () {
      this.user = ''
      this.bac = true
      this.user1 = false
      this.$refs.inpt.style = 'border-bottom:1px solid #5c2ea0'
    },
    sqjd () {
      this.user = '用户名'
      this.bac = false
      if (this.input === '') {
        this.user1 = true
        // console.log(this.$refs.inpt.style)
        this.$refs.inpt.style = 'border-bottom:1px solid red'
      }
    },
    hqjd1 () {
      // console.log(1)
      this.mima1 = ''
      this.bac1 = true
      this.mima = false
      this.$refs.inpt1.style = 'border-bottom:1px solid #5c2ea0'
    },
    sqjd1 () {
      this.mima1 = '密码'
      this.bac1 = false
      if (this.input1 === '') {
        this.mima = true
        this.$refs.inpt1.style = 'border-bottom:1px solid red'
      }
    },
    mousedownFn: function (e) {
      if (!this.confirmSuccess) {
        e.preventDefault && e.preventDefault();   //阻止文字选中等 浏览器默认事件
        this.mouseMoveStata = true;
        this.beginClientX = e.clientX;
      }
    },        //mousedoen 事件
    successFunction () {
      this.confirmSuccess = true
      this.confirmWords = '验证通过';
      if (window.addEventListener) {
        document.getElementsByTagName('html')[0].removeEventListener('mousemove', this.mouseMoveFn);
        document.getElementsByTagName('html')[0].removeEventListener('mouseup', this.moseUpFn);
      } else {
        document.getElementsByTagName('html')[0].removeEventListener('mouseup', () => { });
      }
      document.getElementsByClassName('drag_text')[0].style.color = '#5C9B51'
      document.getElementsByClassName('handler')[0].style.left = this.maxwidth + 'px';
      document.getElementsByClassName('drag_bg')[0].style.width = 346 + 'px';
      // document.getElementsByClassName('drag_bg')[0].style.width = this.maxwidth + 'px';
    },                //验证成功函数
    mouseMoveFn (e) {
      if (this.mouseMoveStata) {
        let width = e.clientX - this.beginClientX;
        if (width > 0 && width <= this.maxwidth) {
          document.getElementsByClassName('handler')[0].style.left = width + 'px';
          document.getElementsByClassName('drag_bg')[0].style.width = width + 'px';
        } else if (width > this.maxwidth) {
          this.successFunction();
        }
      }
    },
    //失败
    mouseMoveFn1 (e) {
      if (this.mouseMoveStata) {
        let width = e.clientX - this.beginClientX;
        if (width > 0 && width <= this.maxwidth) {
          document.getElementsByClassName('handler')[0].style.left = 0 + 'px';
          document.getElementsByClassName('drag_bg')[0].style.width = 0 + 'px';
        } else if (width > this.maxwidth) {
          this.successFunction();
        }
      }
    },                //mousemove事件
    moseUpFn (e) {
      this.mouseMoveStata = false;
      var width = e.clientX - this.beginClientX;
      if (width < this.maxwidth) {
        document.getElementsByClassName('handler')[0].style.left = 0 + 'px';
        document.getElementsByClassName('drag_bg')[0].style.width = 0 + 'px';
      }
    }
  }
}
</script>

<style >
.f_bj {
  position: relative;
  height: 100%;
  margin: 0 auto;
  background: -webkit-linear-gradient(#321555, #6101ab);
  background: -o-linear-gradient(#321555, #6101ab);
  background: -moz-linear-gradient(#321555, #6101ab);
  background: linear-gradient(#321555, #6101ab);
}
.f_bj .bj {
  height: 100%;
}
.f_bj .bj .content {
  width: 432px;
  height: 422px;
  position: absolute;
  margin-top: -211px;
  margin-left: -216px;
  left: 50%;
  top: 50%;
}
.f_bj .bj .content h2 {
  color: #fff;
}
.f_bj .bj .content .dl .denglu {
  text-align: left;
  margin-left: 43px;
  height: 31px;
  color: #ccaedf;
}
.f_bj .bj .content .dl input {
  line-height: 40px;
  width: 80%;
  border: none;
  background: #462178;
  font-size: 18px;
  color: #ccaedf;
  letter-spacing: 0;
  border-bottom: 1px solid #7a5096;
}
.f_bj .bj .content .dl .f_mima {
  line-height: 40px;
  width: 80%;
  border: none;
  background: #4d2584;
  font-size: 18px;
  color: #ccaedf;
  letter-spacing: 0;
  border-bottom: 1px solid #7a5096;
}
.f_bj .bj .content .dl input:focus {
  outline: none;
  border: none;
  border-bottom: 1px solid #5c2ea0;
}
.yanzheng {
  padding: 0;
  height: 16px;
  line-height: 0;
  text-align: left;
  margin-left: 40px;
  color: red;
  font-size: 14px;
  margin-top: 8px;
}
.drag {
  margin-bottom: 20px;
  border-radius: 5px 5px 5px 5px;
  position: relative;
  background-color: #61079e;
  width: 81%;
  height: 34px;
  line-height: 34px;
  text-align: center;
  left: 41px;
  top: 20px;
}
.handler {
  width: 40px;
  height: 32px;
  border: 1px solid #ccc;
  /* cursor: move; */
  cursor: pointer;
}
.handler_bg {
  background: #fff
    url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg==")
    no-repeat center;
}
.handler_ok_bg {
  background: #fff
    url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDlBRDI3NjVGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDlBRDI3NjRGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphNWEzMWNhMC1hYmViLTQxNWEtYTEwZS04Y2U5NzRlN2Q4YTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+k+sHwwAAASZJREFUeNpi/P//PwMyKD8uZw+kUoDYEYgloMIvgHg/EM/ptHx0EFk9I8wAoEZ+IDUPiIMY8IN1QJwENOgj3ACo5gNAbMBAHLgAxA4gQ5igAnNJ0MwAVTsX7IKyY7L2UNuJAf+AmAmJ78AEDTBiwGYg5gbifCSxFCZoaBMCy4A4GOjnH0D6DpK4IxNSVIHAfSDOAeLraJrjgJp/AwPbHMhejiQnwYRmUzNQ4VQgDQqXK0ia/0I17wJiPmQNTNBEAgMlQIWiQA2vgWw7QppBekGxsAjIiEUSBNnsBDWEAY9mEFgMMgBk00E0iZtA7AHEctDQ58MRuA6wlLgGFMoMpIG1QFeGwAIxGZo8GUhIysmwQGSAZgwHaEZhICIzOaBkJkqyM0CAAQDGx279Jf50AAAAAABJRU5ErkJggg==")
    no-repeat center;
}
.drag_bg {
  background-color: #ffffff;
  height: 34px;
  width: 0px;
}
.drag_text {
  position: absolute;
  top: 0px;
  width: 100%;
  text-align: center;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  -o-user-select: none;
  -ms-user-select: none;
  color: #fff;
}
.btn1 {
  margin-top: 20px;
  width: 80%;
  border: none;
  background: #a662d2;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  height: 40px;
  line-height: 40px;
}
.btn1:hover {
  background: #a662d2;
  color: #fff;
}
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.4s ease;
}
</style>
