<template>
  <div :class="$style.f_bj">
    <!-- 数据筛选 -->
    <div :class="$style.f_sx">
      <p>数据筛选</p>
      <!-- 输入框 -->
      <el-row class="search">
        <div style="margin-left: 5%;display: inline-block;">
          <span>省</span>
          <el-select
            v-model="oneself"
            @change="visit"
            collapse-tags
            @focus="save"
            multiple
            style="margin-left:28px;"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in province"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              :class="$style.f_search1"
            ></el-option>
          </el-select>
        </div>
        <div style="margin-left: 72px;display: inline-block;">
          <span>市</span>
          <el-select
            v-model="city"
            @change="downtownarea"
            @focus="urban"
            collapse-tags
            multiple
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in urbandistrict"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              :class="$style.f_search1"
            ></el-option>
          </el-select>
        </div>
        <div style="margin-left: 67px;display: inline-block;">
          <span>区</span>
          <el-select
            v-model="area"
            @change="district"
            @focus="county"
            collapse-tags
            multiple
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in countylevel"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              :class="$style.f_search1"
            ></el-option>
          </el-select>
        </div>
      </el-row>
      <el-row :class="$style.search">
        <div style="margin-left:20px;display: inline-block;">
          <span>数据类型</span>
          <el-select style="margin-left: 20px;" v-model="datastamp" clearable placeholder="请选择">
            <el-option
              v-for="item in datatype"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :class="$style.f_search1"
            ></el-option>
          </el-select>
        </div>
        <div style="margin-left:20px;display: inline-block;">
          <span>行业/区域</span>
          <el-cascader
            v-if="datastamp===''"
            :change-on-select="true"
            :options="hyqy"
            :props="props5"
            disabled
            @on-selected="gather"
            v-model="adress1"
            :class="$style.f_inpt"
            clearable
          ></el-cascader>
          <!-- 区域props4 -->
          <el-cascader
            v-if="datastamp===1"
            :change-on-select="true"
            :options="primaryarea"
            :props="props4"
            @change="cli3"
            v-model="onedistrict"
            :class="$style.f_inpt"
            clearable
          ></el-cascader>
          <!-- 行业props1 -->
          <el-cascader
            v-if="datastamp===2"
            :change-on-select="true"
            :options="industrytab"
            :props="props1"
            @change="cli2"
            v-model="trade"
            :class="$style.f_inpt"
            clearable
          ></el-cascader>
        </div>
        <div style="margin-left:20px;display: inline-block;">
          <span>场景类型</span>
          <el-cascader
            v-if="datastamp===''"
            :change-on-select="true"
            :options="hyqy"
            :props="props5"
            disabled
            @on-selected="gather"
            v-model="adress1"
            clearable
          ></el-cascader>
          <!-- 区域 -->
          <el-cascader
            v-if="datastamp===1"
            :change-on-select="true"
            :options="secondaryarea"
            :props="props2"
            @change="areaname"
            v-model="twodistrict"
            clearable
          ></el-cascader>
          <!-- 行业 -->
          <el-cascader
            v-if="datastamp===2"
            :change-on-select="true"
            :options="scenesname"
            :props="props6"
            @change="gather2"
            v-model="twotrade"
            clearable
          ></el-cascader>
        </div>
      </el-row>
      <el-row :class="$style.search1">
        <div style="margin-left:20px;display: inline-block;">
          <span>场景名称</span>
          <el-select
            v-model="changjingmingcheng"
            collapse-tags
            multiple
            @focus="heading"
            @change="Scenename"
            style="margin-left:20px;"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in ScenesName"
              :key="item.value"
              :label="item.name"
              :value="item.id"
              :class="$style.f_search1"
            ></el-option>
          </el-select>
        </div>
        <div style="margin-left: 30px;display: inline-block;">
          <span>人群标签</span>
          <el-select
            v-model="biaoqian"
            @change="crowdlabel"
            @focus="swarm"
            multiple
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in Crowdlabel"
              collapse-tags
              :key="item.id"
              :label="item.name"
              :value="item.id"
              :class="$style.f_search1"
            ></el-option>
          </el-select>
        </div>
        <div style="margin-left:20px;width:264px;display: inline-block;">
          <span>采集时间</span>
          <el-date-picker
            v-model="valuedate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            unlink-panels
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            style=" width: calc( 100% - 27%);"
          ></el-date-picker>
        </div>
        <div style="display: inline-block;float:right;margin-right:30px;">
          <span :class="$style.f_btn" @click="chaxun">查询</span>
          <el-button type="info" plain @click="chongzhi">重置</el-button>
        </div>
      </el-row>
    </div>
    <!-- 表格 -->
    <div :class="$style.f_table">
      <p>热门人群</p>
      <div :class="$style.search1">
        <div v-for="(item, i) in popular" style="    display: inline-block;" :key="i">
          <div :class="$style.f_rmrq1" style="margin-left: 30px;">
            <div :class="$style.gouwu" v-show="i===0">
              <i class="iconfont iconmeirong" v-show="item.name==='高档美容中心人群'"></i>
              <i class="iconfont iconyiliao1" v-show="item.name==='医疗展人群'"></i>
              <i class="iconfont iconicon-test" v-show="item.name==='体育比赛观众人群'"></i>
              <i class="iconfont iconjiachang" v-show="item.name==='高中家长人群'"></i>
              <i class="iconfont iconqichepeijian" v-show="item.name==='机动车配件及用品展人群'"></i>
              <i class="iconfont iconzaixianquhao" v-show="item.name==='宠物水族展会人群'"></i>
              <i class="iconfont icongaozhong1" v-show="item.name==='高中生人群'"></i>
              <i class="iconfont iconzhongxue" v-show="item.name==='初中生人群'"></i>
              <i class="iconfont iconxiezilou1" v-show="item.name==='高端写字楼人群'"></i>
              <i class="iconfont iconcanting1" v-show="item.name==='普通餐饮人群'"></i>
              <i class="iconfont iconjuyuan" v-show="item.name==='剧院人群'"></i>
              <i class="iconfont iconhuochezhan" v-show="item.name==='火车站人群'"></i>
              <i class="iconfont iconjichangVIP-mian" v-show="item.name==='机场VIP厅人群'"></i>
              <i class="iconfont iconyoueryuan" v-show="item.name==='幼儿园家长人群'"></i>
              <i class="iconfont iconzhuzhai" v-show="item.name==='高端住宅人群'"></i>
              <i class="iconfont icongaoerfu" v-show="item.name==='高尔夫球场人群'"></i>
              <i class="iconfont iconbangong" v-show="item.name==='产业办公区人群'"></i>
              <i class="iconfont icontiyu" v-show="item.name==='体育比赛选手人群'"></i>
              <i class="iconfont iconchangguan" v-show="item.name==='文化馆人群'"></i>
              <i class="iconfont iconguanggao" v-show="item.name==='广告人群'"></i>
              <i class="iconfont iconkeji-" v-show="item.name==='科技馆人群'"></i>
              <i class="iconfont iconqichezhan" v-show="item.name==='汽车站人群'"></i>
              <i class="iconfont icongouwu11" v-show="item.name==='普通专营场所购物人群'"></i>
              <i class="iconfont iconliaoyangguanli" v-show="item.name==='公立疗养院人群'"></i>
              <i class="iconfont icongouwu1" v-show="item.name==='高端专营场所购物人群'"></i>
              <i class="iconfont iconjiameng" v-show="item.name==='特色加盟展会人群'"></i>
              <i class="iconfont icongaotieguibin" v-show="item.name==='高铁站VIP人群'"></i>
              <i class="iconfont iconyunyingshouce" v-show="item.name==='孕婴童展人群'"></i>
              <i class="iconfont icongaotie" v-show="item.name==='高铁站人群'"></i>
              <i class="iconfont iconjianshen" v-show="item.name==='高档健身房人群'"></i>
              <i class="iconfont iconjichangguanli" v-show="item.name==='机场人群'"></i>
              <i class="iconfont iconjiazhuangjiancai" v-show="item.name==='家装建材展会人群'"></i>
              <i class="iconfont iconjingqu1" v-show="item.name==='景区游客人群'"></i>
              <i
                class="iconfont iconzhejiangshenghaiyangyuyuyejuyuchuanguanlixitong"
                v-show="item.name==='渔业渔具展会人群'"
              ></i>
              <i class="iconfont iconjiachangfuwuqun" v-show="item.name==='初中生家长人群'"></i>
              <i class="iconfont iconchushimao" v-show="item.name==='五星及以上酒店'"></i>
              <i class="iconfont icontijian" v-show="item.name==='体检中心人群'"></i>
              <i class="iconfont iconyiyuan11" v-show="item.name==='综合医院人群'"></i>
              <i class="iconfont icondongman-copy" v-show="item.name==='动漫游戏展人群'"></i>
              <i class="iconfont iconyiliao" v-show="item.name==='私立疗养院人群'"></i>
              <i class="iconfont iconshubao-" v-show="item.name==='小学生家长人群'"></i>
              <i class="iconfont icongaozhong" v-show="item.name==='大学生人群'"></i>
              <i class="iconfont iconjiaoyu" v-show="item.name==='教育展人群'"></i>
              <i class="iconfont iconbaojian" v-show="item.name==='高档保健养生中心人群'"></i>
              <i class="iconfont icontea" v-show="item.name==='茶博会展会人群'"></i>
              <i class="iconfont iconpifa" v-show="item.name==='批发市场人群'"></i>
              <i class="iconfont iconfangzhifuzhuang" v-show="item.name==='纺织服装展人群'"></i>
              <i class="iconfont iconjiu" v-show="item.name==='糖酒展会人群'"></i>
              <i class="iconfont iconyunfu" v-show="item.name==='孕妇产人群'"></i>
              <i class="iconfont iconshechipin" v-show="item.name==='奢侈品展人群'"></i>
              <i class="iconfont iconjiudian2" v-show="item.name==='商务酒店人群'"></i>
              <i class="iconfont iconyule1" v-show="item.name==='高档娱乐中心人群'"></i>
              <i class="iconfont iconjiudian1" v-show="item.name==='情趣酒店人群'"></i>
              <i class="iconfont iconjiehun" v-show="item.name==='婚博会人群'"></i>
              <i class="iconfont iconshangpin" v-show="item.name==='进口商品展会人群'"></i>
              <i class="iconfont iconcanting" v-show="item.name==='特色餐饮人群'"></i>
              <i class="iconfont icontushuguan" v-show="item.name==='图书馆人群'"></i>
              <i class="iconfont iconyiyuan1" v-show="item.name==='专科医院人群'"></i>
              <i class="iconfont iconjiudian" v-show="item.name==='酒店用品展会人群'"></i>
              <i class="iconfont iconditiezhan" v-show="item.name==='地铁站人群'"></i>
              <i class="iconfont iconmeirong1" v-show="item.name==='普通美容中心人群'"></i>
              <i class="iconfont iconcanting-copy" v-show="item.name==='高档餐饮人群'"></i>
              <i class="iconfont iconyule" v-show="item.name==='普通娱乐中心人群'"></i>
              <i class="iconfont iconyingyouertongjie" v-show="item.name==='婴幼儿家长人群'"></i>
              <i class="iconfont iconjingshuishebei" v-show="item.name==='水设备展会人群'"></i>
              <i class="iconfont iconjinlingyingcaiwangtubiao52" v-show="item.name==='互联网科技展人群'"></i>
              <i class="iconfont iconhuilvjianshenfang" v-show="item.name==='普通健身房人群'"></i>
              <i class="iconfont iconxiezilou" v-show="item.name==='写字楼人群'"></i>
              <i class="iconfont iconxiezilou" v-show="item.name==='民俗客栈人群'"></i>
              <i class="iconfont iconzhanhui" v-show="item.name==='美博会展会人群'"></i>
              <i class="iconfont icongouwu" v-show="item.name==='购物车'"></i>
            </div>
            <div :class="$style.qiche" v-show="i===1">
              <i class="iconfont iconmeirong" v-show="item.name==='高档美容中心人群'"></i>
              <i class="iconfont iconyiliao1" v-show="item.name==='医疗展人群'"></i>
              <i class="iconfont iconicon-test" v-show="item.name==='体育比赛观众人群'"></i>
              <i class="iconfont iconjiachang" v-show="item.name==='高中家长人群'"></i>
              <i class="iconfont iconqichepeijian" v-show="item.name==='机动车配件及用品展人群'"></i>
              <i class="iconfont iconzaixianquhao" v-show="item.name==='宠物水族展会人群'"></i>
              <i class="iconfont icongaozhong1" v-show="item.name==='高中生人群'"></i>
              <i class="iconfont iconzhongxue" v-show="item.name==='初中生人群'"></i>
              <i class="iconfont iconxiezilou1" v-show="item.name==='高端写字楼人群'"></i>
              <i class="iconfont iconcanting1" v-show="item.name==='普通餐饮人群'"></i>
              <i class="iconfont iconjuyuan" v-show="item.name==='剧院人群'"></i>
              <i class="iconfont iconhuochezhan" v-show="item.name==='火车站人群'"></i>
              <i class="iconfont iconjichangVIP-mian" v-show="item.name==='机场VIP厅人群'"></i>
              <i class="iconfont iconyoueryuan" v-show="item.name==='幼儿园家长人群'"></i>
              <i class="iconfont iconzhuzhai" v-show="item.name==='高端住宅人群'"></i>
              <i class="iconfont icongaoerfu" v-show="item.name==='高尔夫球场人群'"></i>
              <i class="iconfont iconbangong" v-show="item.name==='产业办公区人群'"></i>
              <i class="iconfont icontiyu" v-show="item.name==='体育比赛选手人群'"></i>
              <i class="iconfont iconchangguan" v-show="item.name==='文化馆人群'"></i>
              <i class="iconfont iconguanggao" v-show="item.name==='广告人群'"></i>
              <i class="iconfont iconkeji-" v-show="item.name==='科技馆人群'"></i>
              <i class="iconfont iconqichezhan" v-show="item.name==='汽车站人群'"></i>
              <i class="iconfont icongouwu11" v-show="item.name==='普通专营场所购物人群'"></i>
              <i class="iconfont iconliaoyangguanli" v-show="item.name==='公立疗养院人群'"></i>
              <i class="iconfont icongouwu1" v-show="item.name==='高端专营场所购物人群'"></i>
              <i class="iconfont iconjiameng" v-show="item.name==='特色加盟展会人群'"></i>
              <i class="iconfont icongaotieguibin" v-show="item.name==='高铁站VIP人群'"></i>
              <i class="iconfont iconyunyingshouce" v-show="item.name==='孕婴童展人群'"></i>
              <i class="iconfont icongaotie" v-show="item.name==='高铁站人群'"></i>
              <i class="iconfont iconjianshen" v-show="item.name==='高档健身房人群'"></i>
              <i class="iconfont iconjichangguanli" v-show="item.name==='机场人群'"></i>
              <i class="iconfont iconjiazhuangjiancai" v-show="item.name==='家装建材展会人群'"></i>
              <i class="iconfont iconjingqu1" v-show="item.name==='景区游客人群'"></i>
              <i
                class="iconfont iconzhejiangshenghaiyangyuyuyejuyuchuanguanlixitong"
                v-show="item.name==='渔业渔具展会人群'"
              ></i>
              <i class="iconfont iconjiachangfuwuqun" v-show="item.name==='初中生家长人群'"></i>
              <i class="iconfont iconchushimao" v-show="item.name==='五星及以上酒店'"></i>
              <i class="iconfont icontijian" v-show="item.name==='体检中心人群'"></i>
              <i class="iconfont iconyiyuan11" v-show="item.name==='综合医院人群'"></i>
              <i class="iconfont icondongman-copy" v-show="item.name==='动漫游戏展人群'"></i>
              <i class="iconfont iconyiliao" v-show="item.name==='私立疗养院人群'"></i>
              <i class="iconfont iconshubao-" v-show="item.name==='小学生家长人群'"></i>
              <i class="iconfont icongaozhong" v-show="item.name==='大学生人群'"></i>
              <i class="iconfont iconjiaoyu" v-show="item.name==='教育展人群'"></i>
              <i class="iconfont iconbaojian" v-show="item.name==='高档保健养生中心人群'"></i>
              <i class="iconfont icontea" v-show="item.name==='茶博会展会人群'"></i>
              <i class="iconfont iconpifa" v-show="item.name==='批发市场人群'"></i>
              <i class="iconfont iconfangzhifuzhuang" v-show="item.name==='纺织服装展人群'"></i>
              <i class="iconfont iconjiu" v-show="item.name==='糖酒展会人群'"></i>
              <i class="iconfont iconyunfu" v-show="item.name==='孕妇产人群'"></i>
              <i class="iconfont iconshechipin" v-show="item.name==='奢侈品展人群'"></i>
              <i class="iconfont iconjiudian2" v-show="item.name==='商务酒店人群'"></i>
              <i class="iconfont iconyule1" v-show="item.name==='高档娱乐中心人群'"></i>
              <i class="iconfont iconjiudian1" v-show="item.name==='情趣酒店人群'"></i>
              <i class="iconfont iconjiehun" v-show="item.name==='婚博会人群'"></i>
              <i class="iconfont iconshangpin" v-show="item.name==='进口商品展会人群'"></i>
              <i class="iconfont iconcanting" v-show="item.name==='特色餐饮人群'"></i>
              <i class="iconfont icontushuguan" v-show="item.name==='图书馆人群'"></i>
              <i class="iconfont iconyiyuan1" v-show="item.name==='专科医院人群'"></i>
              <i class="iconfont iconjiudian" v-show="item.name==='酒店用品展会人群'"></i>
              <i class="iconfont iconditiezhan" v-show="item.name==='地铁站人群'"></i>
              <i class="iconfont iconmeirong1" v-show="item.name==='普通美容中心人群'"></i>
              <i class="iconfont iconcanting-copy" v-show="item.name==='高档餐饮人群'"></i>
              <i class="iconfont iconyule" v-show="item.name==='普通娱乐中心人群'"></i>
              <i class="iconfont iconyingyouertongjie" v-show="item.name==='婴幼儿家长人群'"></i>
              <i class="iconfont iconjingshuishebei" v-show="item.name==='水设备展会人群'"></i>
              <i class="iconfont iconjinlingyingcaiwangtubiao52" v-show="item.name==='互联网科技展人群'"></i>
              <i class="iconfont iconhuilvjianshenfang" v-show="item.name==='普通健身房人群'"></i>
              <i class="iconfont iconxiezilou" v-show="item.name==='写字楼人群'"></i>
              <i class="iconfont iconxiezilou" v-show="item.name==='民俗客栈人群'"></i>
              <i class="iconfont iconzhanhui" v-show="item.name==='美博会展会人群'"></i>
              <i class="iconfont icongouwu" v-show="item.name==='购物车'"></i>
            </div>
            <div :class="$style.jingqu" v-show="i===2">
              <i class="iconfont iconmeirong" v-show="item.name==='高档美容中心人群'"></i>
              <i class="iconfont iconyiliao1" v-show="item.name==='医疗展人群'"></i>
              <i class="iconfont iconicon-test" v-show="item.name==='体育比赛观众人群'"></i>
              <i class="iconfont iconjiachang" v-show="item.name==='高中家长人群'"></i>
              <i class="iconfont iconqichepeijian" v-show="item.name==='机动车配件及用品展人群'"></i>
              <i class="iconfont iconzaixianquhao" v-show="item.name==='宠物水族展会人群'"></i>
              <i class="iconfont icongaozhong1" v-show="item.name==='高中生人群'"></i>
              <i class="iconfont iconzhongxue" v-show="item.name==='初中生人群'"></i>
              <i class="iconfont iconxiezilou1" v-show="item.name==='高端写字楼人群'"></i>
              <i class="iconfont iconcanting1" v-show="item.name==='普通餐饮人群'"></i>
              <i class="iconfont iconjuyuan" v-show="item.name==='剧院人群'"></i>
              <i class="iconfont iconhuochezhan" v-show="item.name==='火车站人群'"></i>
              <i class="iconfont iconjichangVIP-mian" v-show="item.name==='机场VIP厅人群'"></i>
              <i class="iconfont iconyoueryuan" v-show="item.name==='幼儿园家长人群'"></i>
              <i class="iconfont iconzhuzhai" v-show="item.name==='高端住宅人群'"></i>
              <i class="iconfont icongaoerfu" v-show="item.name==='高尔夫球场人群'"></i>
              <i class="iconfont iconbangong" v-show="item.name==='产业办公区人群'"></i>
              <i class="iconfont icontiyu" v-show="item.name==='体育比赛选手人群'"></i>
              <i class="iconfont iconchangguan" v-show="item.name==='文化馆人群'"></i>
              <i class="iconfont iconguanggao" v-show="item.name==='广告人群'"></i>
              <i class="iconfont iconkeji-" v-show="item.name==='科技馆人群'"></i>
              <i class="iconfont iconqichezhan" v-show="item.name==='汽车站人群'"></i>
              <i class="iconfont icongouwu11" v-show="item.name==='普通专营场所购物人群'"></i>
              <i class="iconfont iconliaoyangguanli" v-show="item.name==='公立疗养院人群'"></i>
              <i class="iconfont icongouwu1" v-show="item.name==='高端专营场所购物人群'"></i>
              <i class="iconfont iconjiameng" v-show="item.name==='特色加盟展会人群'"></i>
              <i class="iconfont icongaotieguibin" v-show="item.name==='高铁站VIP人群'"></i>
              <i class="iconfont iconyunyingshouce" v-show="item.name==='孕婴童展人群'"></i>
              <i class="iconfont icongaotie" v-show="item.name==='高铁站人群'"></i>
              <i class="iconfont iconjianshen" v-show="item.name==='高档健身房人群'"></i>
              <i class="iconfont iconjichangguanli" v-show="item.name==='机场人群'"></i>
              <i class="iconfont iconjiazhuangjiancai" v-show="item.name==='家装建材展会人群'"></i>
              <i class="iconfont iconjingqu1" v-show="item.name==='景区游客人群'"></i>
              <i
                class="iconfont iconzhejiangshenghaiyangyuyuyejuyuchuanguanlixitong"
                v-show="item.name==='渔业渔具展会人群'"
              ></i>
              <i class="iconfont iconjiachangfuwuqun" v-show="item.name==='初中生家长人群'"></i>
              <i class="iconfont iconchushimao" v-show="item.name==='五星及以上酒店'"></i>
              <i class="iconfont icontijian" v-show="item.name==='体检中心人群'"></i>
              <i class="iconfont iconyiyuan11" v-show="item.name==='综合医院人群'"></i>
              <i class="iconfont icondongman-copy" v-show="item.name==='动漫游戏展人群'"></i>
              <i class="iconfont iconyiliao" v-show="item.name==='私立疗养院人群'"></i>
              <i class="iconfont iconshubao-" v-show="item.name==='小学生家长人群'"></i>
              <i class="iconfont icongaozhong" v-show="item.name==='大学生人群'"></i>
              <i class="iconfont iconjiaoyu" v-show="item.name==='教育展人群'"></i>
              <i class="iconfont iconbaojian" v-show="item.name==='高档保健养生中心人群'"></i>
              <i class="iconfont icontea" v-show="item.name==='茶博会展会人群'"></i>
              <i class="iconfont iconpifa" v-show="item.name==='批发市场人群'"></i>
              <i class="iconfont iconfangzhifuzhuang" v-show="item.name==='纺织服装展人群'"></i>
              <i class="iconfont iconjiu" v-show="item.name==='糖酒展会人群'"></i>
              <i class="iconfont iconyunfu" v-show="item.name==='孕妇产人群'"></i>
              <i class="iconfont iconshechipin" v-show="item.name==='奢侈品展人群'"></i>
              <i class="iconfont iconjiudian2" v-show="item.name==='商务酒店人群'"></i>
              <i class="iconfont iconyule1" v-show="item.name==='高档娱乐中心人群'"></i>
              <i class="iconfont iconjiudian1" v-show="item.name==='情趣酒店人群'"></i>
              <i class="iconfont iconjiehun" v-show="item.name==='婚博会人群'"></i>
              <i class="iconfont iconshangpin" v-show="item.name==='进口商品展会人群'"></i>
              <i class="iconfont iconcanting" v-show="item.name==='特色餐饮人群'"></i>
              <i class="iconfont icontushuguan" v-show="item.name==='图书馆人群'"></i>
              <i class="iconfont iconyiyuan1" v-show="item.name==='专科医院人群'"></i>
              <i class="iconfont iconjiudian" v-show="item.name==='酒店用品展会人群'"></i>
              <i class="iconfont iconditiezhan" v-show="item.name==='地铁站人群'"></i>
              <i class="iconfont iconmeirong1" v-show="item.name==='普通美容中心人群'"></i>
              <i class="iconfont iconcanting-copy" v-show="item.name==='高档餐饮人群'"></i>
              <i class="iconfont iconyule" v-show="item.name==='普通娱乐中心人群'"></i>
              <i class="iconfont iconyingyouertongjie" v-show="item.name==='婴幼儿家长人群'"></i>
              <i class="iconfont iconjingshuishebei" v-show="item.name==='水设备展会人群'"></i>
              <i class="iconfont iconjinlingyingcaiwangtubiao52" v-show="item.name==='互联网科技展人群'"></i>
              <i class="iconfont iconhuilvjianshenfang" v-show="item.name==='普通健身房人群'"></i>
              <i class="iconfont iconxiezilou" v-show="item.name==='写字楼人群'"></i>
              <i class="iconfont iconxiezilou" v-show="item.name==='民俗客栈人群'"></i>
              <i class="iconfont iconzhanhui" v-show="item.name==='美博会展会人群'"></i>
              <i class="iconfont icongouwu" v-show="item.name==='购物车'"></i>
            </div>
            <div :class="$style.xuexiao" v-show="i===3">
              <i class="iconfont iconmeirong" v-show="item.name==='高档美容中心人群'"></i>
              <i class="iconfont iconyiliao1" v-show="item.name==='医疗展人群'"></i>
              <i class="iconfont iconicon-test" v-show="item.name==='体育比赛观众人群'"></i>
              <i class="iconfont iconjiachang" v-show="item.name==='高中家长人群'"></i>
              <i class="iconfont iconqichepeijian" v-show="item.name==='机动车配件及用品展人群'"></i>
              <i class="iconfont iconzaixianquhao" v-show="item.name==='宠物水族展会人群'"></i>
              <i class="iconfont icongaozhong1" v-show="item.name==='高中生人群'"></i>
              <i class="iconfont iconzhongxue" v-show="item.name==='初中生人群'"></i>
              <i class="iconfont iconxiezilou1" v-show="item.name==='高端写字楼人群'"></i>
              <i class="iconfont iconcanting1" v-show="item.name==='普通餐饮人群'"></i>
              <i class="iconfont iconjuyuan" v-show="item.name==='剧院人群'"></i>
              <i class="iconfont iconhuochezhan" v-show="item.name==='火车站人群'"></i>
              <i class="iconfont iconjichangVIP-mian" v-show="item.name==='机场VIP厅人群'"></i>
              <i class="iconfont iconyoueryuan" v-show="item.name==='幼儿园家长人群'"></i>
              <i class="iconfont iconzhuzhai" v-show="item.name==='高端住宅人群'"></i>
              <i class="iconfont icongaoerfu" v-show="item.name==='高尔夫球场人群'"></i>
              <i class="iconfont iconbangong" v-show="item.name==='产业办公区人群'"></i>
              <i class="iconfont icontiyu" v-show="item.name==='体育比赛选手人群'"></i>
              <i class="iconfont iconchangguan" v-show="item.name==='文化馆人群'"></i>
              <i class="iconfont iconguanggao" v-show="item.name==='广告人群'"></i>
              <i class="iconfont iconkeji-" v-show="item.name==='科技馆人群'"></i>
              <i class="iconfont iconqichezhan" v-show="item.name==='汽车站人群'"></i>
              <i class="iconfont icongouwu11" v-show="item.name==='普通专营场所购物人群'"></i>
              <i class="iconfont iconliaoyangguanli" v-show="item.name==='公立疗养院人群'"></i>
              <i class="iconfont icongouwu1" v-show="item.name==='高端专营场所购物人群'"></i>
              <i class="iconfont iconjiameng" v-show="item.name==='特色加盟展会人群'"></i>
              <i class="iconfont icongaotieguibin" v-show="item.name==='高铁站VIP人群'"></i>
              <i class="iconfont iconyunyingshouce" v-show="item.name==='孕婴童展人群'"></i>
              <i class="iconfont icongaotie" v-show="item.name==='高铁站人群'"></i>
              <i class="iconfont iconjianshen" v-show="item.name==='高档健身房人群'"></i>
              <i class="iconfont iconjichangguanli" v-show="item.name==='机场人群'"></i>
              <i class="iconfont iconjiazhuangjiancai" v-show="item.name==='家装建材展会人群'"></i>
              <i class="iconfont iconjingqu1" v-show="item.name==='景区游客人群'"></i>
              <i
                class="iconfont iconzhejiangshenghaiyangyuyuyejuyuchuanguanlixitong"
                v-show="item.name==='渔业渔具展会人群'"
              ></i>
              <i class="iconfont iconjiachangfuwuqun" v-show="item.name==='初中生家长人群'"></i>
              <i class="iconfont iconchushimao" v-show="item.name==='五星及以上酒店'"></i>
              <i class="iconfont icontijian" v-show="item.name==='体检中心人群'"></i>
              <i class="iconfont iconyiyuan11" v-show="item.name==='综合医院人群'"></i>
              <i class="iconfont icondongman-copy" v-show="item.name==='动漫游戏展人群'"></i>
              <i class="iconfont iconyiliao" v-show="item.name==='私立疗养院人群'"></i>
              <i class="iconfont iconshubao-" v-show="item.name==='小学生家长人群'"></i>
              <i class="iconfont icongaozhong" v-show="item.name==='大学生人群'"></i>
              <i class="iconfont iconjiaoyu" v-show="item.name==='教育展人群'"></i>
              <i class="iconfont iconbaojian" v-show="item.name==='高档保健养生中心人群'"></i>
              <i class="iconfont icontea" v-show="item.name==='茶博会展会人群'"></i>
              <i class="iconfont iconpifa" v-show="item.name==='批发市场人群'"></i>
              <i class="iconfont iconfangzhifuzhuang" v-show="item.name==='纺织服装展人群'"></i>
              <i class="iconfont iconjiu" v-show="item.name==='糖酒展会人群'"></i>
              <i class="iconfont iconyunfu" v-show="item.name==='孕妇产人群'"></i>
              <i class="iconfont iconshechipin" v-show="item.name==='奢侈品展人群'"></i>
              <i class="iconfont iconjiudian2" v-show="item.name==='商务酒店人群'"></i>
              <i class="iconfont iconyule1" v-show="item.name==='高档娱乐中心人群'"></i>
              <i class="iconfont iconjiudian1" v-show="item.name==='情趣酒店人群'"></i>
              <i class="iconfont iconjiehun" v-show="item.name==='婚博会人群'"></i>
              <i class="iconfont iconshangpin" v-show="item.name==='进口商品展会人群'"></i>
              <i class="iconfont iconcanting" v-show="item.name==='特色餐饮人群'"></i>
              <i class="iconfont icontushuguan" v-show="item.name==='图书馆人群'"></i>
              <i class="iconfont iconyiyuan1" v-show="item.name==='专科医院人群'"></i>
              <i class="iconfont iconjiudian" v-show="item.name==='酒店用品展会人群'"></i>
              <i class="iconfont iconditiezhan" v-show="item.name==='地铁站人群'"></i>
              <i class="iconfont iconmeirong1" v-show="item.name==='普通美容中心人群'"></i>
              <i class="iconfont iconcanting-copy" v-show="item.name==='高档餐饮人群'"></i>
              <i class="iconfont iconyule" v-show="item.name==='普通娱乐中心人群'"></i>
              <i class="iconfont iconyingyouertongjie" v-show="item.name==='婴幼儿家长人群'"></i>
              <i class="iconfont iconjingshuishebei" v-show="item.name==='水设备展会人群'"></i>
              <i class="iconfont iconjinlingyingcaiwangtubiao52" v-show="item.name==='互联网科技展人群'"></i>
              <i class="iconfont iconhuilvjianshenfang" v-show="item.name==='普通健身房人群'"></i>
              <i class="iconfont iconxiezilou" v-show="item.name==='写字楼人群'"></i>
              <i class="iconfont iconxiezilou" v-show="item.name==='民俗客栈人群'"></i>
              <i class="iconfont iconzhanhui" v-show="item.name==='美博会展会人群'"></i>
              <i class="iconfont icongouwu" v-show="item.name==='购物车'"></i>
            </div>
            <div :class="$style.yiyuan" v-show="i===4">
              <i class="iconfont iconmeirong" v-show="item.name==='高档美容中心人群'"></i>
              <i class="iconfont iconyiliao1" v-show="item.name==='医疗展人群'"></i>
              <i class="iconfont iconicon-test" v-show="item.name==='体育比赛观众人群'"></i>
              <i class="iconfont iconjiachang" v-show="item.name==='高中家长人群'"></i>
              <i class="iconfont iconqichepeijian" v-show="item.name==='机动车配件及用品展人群'"></i>
              <i class="iconfont iconzaixianquhao" v-show="item.name==='宠物水族展会人群'"></i>
              <i class="iconfont icongaozhong1" v-show="item.name==='高中生人群'"></i>
              <i class="iconfont iconzhongxue" v-show="item.name==='初中生人群'"></i>
              <i class="iconfont iconxiezilou1" v-show="item.name==='高端写字楼人群'"></i>
              <i class="iconfont iconcanting1" v-show="item.name==='普通餐饮人群'"></i>
              <i class="iconfont iconjuyuan" v-show="item.name==='剧院人群'"></i>
              <i class="iconfont iconhuochezhan" v-show="item.name==='火车站人群'"></i>
              <i class="iconfont iconjichangVIP-mian" v-show="item.name==='机场VIP厅人群'"></i>
              <i class="iconfont iconyoueryuan" v-show="item.name==='幼儿园家长人群'"></i>
              <i class="iconfont iconzhuzhai" v-show="item.name==='高端住宅人群'"></i>
              <i class="iconfont icongaoerfu" v-show="item.name==='高尔夫球场人群'"></i>
              <i class="iconfont iconbangong" v-show="item.name==='产业办公区人群'"></i>
              <i class="iconfont icontiyu" v-show="item.name==='体育比赛选手人群'"></i>
              <i class="iconfont iconchangguan" v-show="item.name==='文化馆人群'"></i>
              <i class="iconfont iconguanggao" v-show="item.name==='广告人群'"></i>
              <i class="iconfont iconkeji-" v-show="item.name==='科技馆人群'"></i>
              <i class="iconfont iconqichezhan" v-show="item.name==='汽车站人群'"></i>
              <i class="iconfont icongouwu11" v-show="item.name==='普通专营场所购物人群'"></i>
              <i class="iconfont iconliaoyangguanli" v-show="item.name==='公立疗养院人群'"></i>
              <i class="iconfont icongouwu1" v-show="item.name==='高端专营场所购物人群'"></i>
              <i class="iconfont iconjiameng" v-show="item.name==='特色加盟展会人群'"></i>
              <i class="iconfont icongaotieguibin" v-show="item.name==='高铁站VIP人群'"></i>
              <i class="iconfont iconyunyingshouce" v-show="item.name==='孕婴童展人群'"></i>
              <i class="iconfont icongaotie" v-show="item.name==='高铁站人群'"></i>
              <i class="iconfont iconjianshen" v-show="item.name==='高档健身房人群'"></i>
              <i class="iconfont iconjichangguanli" v-show="item.name==='机场人群'"></i>
              <i class="iconfont iconjiazhuangjiancai" v-show="item.name==='家装建材展会人群'"></i>
              <i class="iconfont iconjingqu1" v-show="item.name==='景区游客人群'"></i>
              <i
                class="iconfont iconzhejiangshenghaiyangyuyuyejuyuchuanguanlixitong"
                v-show="item.name==='渔业渔具展会人群'"
              ></i>
              <i class="iconfont iconjiachangfuwuqun" v-show="item.name==='初中生家长人群'"></i>
              <i class="iconfont iconchushimao" v-show="item.name==='五星及以上酒店'"></i>
              <i class="iconfont icontijian" v-show="item.name==='体检中心人群'"></i>
              <i class="iconfont iconyiyuan11" v-show="item.name==='综合医院人群'"></i>
              <i class="iconfont icondongman-copy" v-show="item.name==='动漫游戏展人群'"></i>
              <i class="iconfont iconyiliao" v-show="item.name==='私立疗养院人群'"></i>
              <i class="iconfont iconshubao-" v-show="item.name==='小学生家长人群'"></i>
              <i class="iconfont icongaozhong" v-show="item.name==='大学生人群'"></i>
              <i class="iconfont iconjiaoyu" v-show="item.name==='教育展人群'"></i>
              <i class="iconfont iconbaojian" v-show="item.name==='高档保健养生中心人群'"></i>
              <i class="iconfont icontea" v-show="item.name==='茶博会展会人群'"></i>
              <i class="iconfont iconpifa" v-show="item.name==='批发市场人群'"></i>
              <i class="iconfont iconfangzhifuzhuang" v-show="item.name==='纺织服装展人群'"></i>
              <i class="iconfont iconjiu" v-show="item.name==='糖酒展会人群'"></i>
              <i class="iconfont iconyunfu" v-show="item.name==='孕妇产人群'"></i>
              <i class="iconfont iconshechipin" v-show="item.name==='奢侈品展人群'"></i>
              <i class="iconfont iconjiudian2" v-show="item.name==='商务酒店人群'"></i>
              <i class="iconfont iconyule1" v-show="item.name==='高档娱乐中心人群'"></i>
              <i class="iconfont iconjiudian1" v-show="item.name==='情趣酒店人群'"></i>
              <i class="iconfont iconjiehun" v-show="item.name==='婚博会人群'"></i>
              <i class="iconfont iconshangpin" v-show="item.name==='进口商品展会人群'"></i>
              <i class="iconfont iconcanting" v-show="item.name==='特色餐饮人群'"></i>
              <i class="iconfont icontushuguan" v-show="item.name==='图书馆人群'"></i>
              <i class="iconfont iconyiyuan1" v-show="item.name==='专科医院人群'"></i>
              <i class="iconfont iconjiudian" v-show="item.name==='酒店用品展会人群'"></i>
              <i class="iconfont iconditiezhan" v-show="item.name==='地铁站人群'"></i>
              <i class="iconfont iconmeirong1" v-show="item.name==='普通美容中心人群'"></i>
              <i class="iconfont iconcanting-copy" v-show="item.name==='高档餐饮人群'"></i>
              <i class="iconfont iconyule" v-show="item.name==='普通娱乐中心人群'"></i>
              <i class="iconfont iconyingyouertongjie" v-show="item.name==='婴幼儿家长人群'"></i>
              <i class="iconfont iconjingshuishebei" v-show="item.name==='水设备展会人群'"></i>
              <i class="iconfont iconjinlingyingcaiwangtubiao52" v-show="item.name==='互联网科技展人群'"></i>
              <i class="iconfont iconhuilvjianshenfang" v-show="item.name==='普通健身房人群'"></i>
              <i class="iconfont iconxiezilou" v-show="item.name==='写字楼人群'"></i>
              <i class="iconfont iconxiezilou" v-show="item.name==='民俗客栈人群'"></i>
              <i class="iconfont iconzhanhui" v-show="item.name==='美博会展会人群'"></i>
              <i class="iconfont icongouwu" v-show="item.name==='购物车'"></i>
            </div>
            <div :class="$style.f_bq">{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 数据详情 -->
    <div :class="$style.f_table">
      <el-row :class="$style.search1">
        <div
          :span="11"
          style="border:1px solid #CCC;margin:30px 3%;display: inline-block; width: 542px;"
        >
          <span :class="$style.f_tj">区域数据搜索统计</span>
          <div :class="$style.f_rq">
            <span :class="{'f_xs':xs,'f_xs1':xs1}" @click="zj">总计</span>
            <span :class="{'f_xs':xs2,'f_xs1':xs3}" @click="jday">今天</span>
            <span :class="{'f_xs':xs4,'f_xs1':xs5}" @click="zday">昨天</span>
          </div>
          <div
            id="myChart"
            :class="{'f_b1':bxs,'f_b4':bxs4}"
            style="position: static;width:500px;margin-left:20px;height:300px;"
          ></div>
          <div
            id="myChart1"
            :class="{'f_b1':bxs2,'f_b4':bxs5}"
            style="position: static;width:500px;margin-left:20px;height:300px;"
          ></div>
          <div
            id="myChart2"
            :class="{'f_b1':bxs3,'f_b4':bxs6}"
            style="position: static;width:500px;margin-left:20px;height:300px;"
          ></div>
        </div>
        <div
          :span="11"
          style="border:1px solid #CCC;margin:30px 0; display: inline-block; width: 542px;"
        >
          <span :class="$style.f_tj">行业数据搜索统计</span>
          <div :class="$style.f_rq">
            <span :class="{'f_xs':xs6,'f_xs1':xs7}" @click="zj1">总计</span>
            <span :class="{'f_xs':xs8,'f_xs1':xs9}" @click="jday1">今天</span>
            <span :class="{'f_xs':xs10,'f_xs1':xs11}" @click="zday1">昨天</span>
          </div>
          <div
            id="myChart3"
            :class="{'f_b1':bxs7,'f_b4':bxs10}"
            style="position: static;width:500px;margin-left:20px;height:300px;"
          ></div>
          <div
            id="myChart4"
            :class="{'f_b1':bxs8,'f_b4':bxs11}"
            style="position: static;width:500px;margin-left:20px;height:300px;"
          ></div>
          <div
            id="myChart5"
            :class="{'f_b1':bxs9,'f_b4':bxs12}"
            style="position: static;width:500px;margin-left:20px;height:300px;"
          ></div>
        </div>
      </el-row>
      <el-row :class="$style.search1">
        <el-col :span="11" style="border:1px solid #CCC;margin:30px 3%;">
          <span :class="$style.f_tj">区域数据排行榜</span>
          <div v-for="(item,i) in onedistrictranking" :key="i">
            <div :class="$style.f_jd">
              <span :class="$style.f_zn">{{item.name}}</span>
              <span :class="$style.f_ym">{{item.count}}</span>
              <el-progress v-if="i===0" :percentage="num5" class="f_jd4" :format="format"></el-progress>
              <el-progress v-if="i===1" :percentage="num5" class="f_jd8" :format="format"></el-progress>
              <el-progress v-if="i===2" :percentage="num5" class="f_jd2" :format="format"></el-progress>
              <el-progress v-if="i===3" :percentage="num5" class="f_jd3" :format="format"></el-progress>
              <el-progress v-if="i===4" :percentage="num5" class="f_jd9" :format="format"></el-progress>
              <el-progress v-if="i===5" :percentage="num5" class="f_jd10" :format="format"></el-progress>
              <el-progress v-if="i===6" :percentage="num5" class="f_jd11" :format="format"></el-progress>
              <el-progress v-if="i===7" :percentage="num5" :format="format"></el-progress>
              <el-progress v-if="i===8" :percentage="num5" :format="format"></el-progress>
              <el-progress v-if="i===9" :percentage="num5" :format="format"></el-progress>
            </div>
          </div>
        </el-col>
        <el-col :span="11" style="border:1px solid #CCC;margin:30px 0;">
          <span :class="$style.f_tj">行业数据排行榜</span>
          <div v-for="(item,i) in traderanking" :key="i">
            <!-- {{traderanking}} -->
            <div :class="$style.f_jd">
              <span :class="$style.f_zn">{{item.NAME}}</span>
              <span :class="$style.f_ym">{{item.count}}</span>
              <el-progress v-if="i===0" :percentage="100" class="f_jd4" :format="format"></el-progress>
              <el-progress v-if="i===1" :percentage="100" class="f_jd8" :format="format"></el-progress>
              <el-progress v-if="i===2" :percentage="100" class="f_jd2" :format="format"></el-progress>
              <el-progress v-if="i===3" :percentage="100" class="f_jd3" :format="format"></el-progress>
              <el-progress v-if="i===4" :percentage="100" class="f_jd9" :format="format"></el-progress>
              <el-progress v-if="i===5" :percentage="100" class="f_jd10" :format="format"></el-progress>
              <el-progress v-if="i===6" :percentage="100" class="f_jd11" :format="format"></el-progress>
              <el-progress v-if="i===7" :percentage="num5" :format="format"></el-progress>
              <el-progress v-if="i===8" :percentage="num5" :format="format"></el-progress>
              <el-progress v-if="i===9" :percentage="num5" :format="format"></el-progress>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 订购画像 -->
    <!-- 订购数据 -->
    <div :class="$style.f_jz">
      <footerl/>
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
      options: [],
      province: [],
      urbandistrict: [],
      countylevel: [],
      oneself: '',
      city: '',
      area: '',
      datastamp: '',
      biaoqian: '',
      adress1: '',
      adress2: '',
      value: '',
      value1: '',
      datatype: [
        {
          value: 1,
          label: '区域'
        },
        {
          value: 2,
          label: '行业'
        }
      ],
      changjingmingcheng: '',
      // 行业
      props1: {
        lazy: true,
        multiple: true,
        lazyLoad (node, resolve) {
          const { level } = node;
          let option = {
            url: `modules/signIndustry/listInParent`,
            methods: 'get'
          }
          if (level === 0) {
            option.url = `modules/signIndustry/listInParent`
          } else if (level === 1) {
            option.url = `modules/signIndustry/listInParent`,
            option.params={
              pid:node.value
            }
          }
          axios(option).then(res => {
            let { meta, data, code } = res.data
            if (code === 1000) {
              const nodes = Array.from({ length: data.length })
                .map((item, i) => ({
                  value: data[i].id,
                  label: data[i].name,
                  leaf: level >= 1
                }));
              // 通过调用resolve将子节点数据返回，通知组件数据加载完成
              resolve(nodes);
            }
          })
        }
      },
      props6: {
        lazy: true,
        multiple: true,
        lazyLoad (node, resolve) {
          const { level } = node;
          let option = {
            url: 'modules/signIndustryType/listByParent',
            methods: 'get',
            data: {
              groupId: level
            }
          }
          if (level === 0) {
            option.url = `modules/signIndustryType/listByParent`,
            option.params={
              pid:this.trade
            }
          } else if (level === 1) {
            option.url = `modules/signIndustryType/listByParent`,
            option.params={
              pid:node.value
            }
          }
          axios(option).then(res => {
            let { meta, data, code } = res.data
            if (code === 1000) {
              const nodes = Array.from({ length: data.length })
                .map((item, i) => ({
                  value: data[i].id,
                  label: data[i].name,
                  leaf: level >= 1
                }));
              // 通过调用resolve将子节点数据返回，通知组件数据加载完成
              resolve(nodes);
            }
          })
        }
      },
      // 区域
      props4: {
        lazy: true,
        multiple: true,
        lazyLoad (node, resolve) {
          const { level } = node;
          // console.log(node) /
          // setTimeout(() => {
          let option = {
            url: 'modules/signRegion/listInParent',
            methods: 'get',
            data: {
              groupId: level
            }
          }
          if (level === 0) {
            option.url = `modules/signRegion/listInParent`

          } else if (level === 1) {
            option.url = `modules/signRegion/listInParent`,
            option.params={
              pid:node.value
            }
          }
          axios(option).then(res => {
            let { meta, data, code } = res.data
            if (code === 1000) {
              const nodes = Array.from({ length: data.length })
                .map((item, i) => ({
                  value: data[i].id,
                  label: data[i].name,
                  leaf: level >= 1
                }));
              // 通过调用resolve将子节点数据返回，通知组件数据加载完成
              resolve(nodes);
            }
          })
          // }, 1000);
        }
      },
      props2: {
        lazy: true,
        multiple: true,
        lazyLoad (node, resolve) {
          const { level } = node;
          // setTimeout(() => {
          console.log(this.onedistrict)
          let option = {
            url: 'modules/signRegion/listInParent',
            methods: 'get',
            data: {
              groupId: level
            }
          }
          if (level === 0) {
            option.url = `modules/signRegion/listInParent`,
            option.params={
              pid:this.onedistrict
            }
          } else if (level === 1) {
            option.url = `modules/signRegion/listInParent`,
            option.params={
              pid:node.value
            }
          }
          axios(option).then(res => {
            let { meta, data, code } = res.data
            if (code === 1000) {
              const nodes = Array.from({ length: data.length })
                .map((item, i) => ({
                  value: data[i].id,
                  label: data[i].name,
                  leaf: level >= 1
                }));
              // 通过调用resolve将子节点数据返回，通知组件数据加载完成
              resolve(nodes);
            }
          })
          // }, 1000);
        }
      },
      props5: {},
      xs: true,
      xs1: false,
      xs2: false,
      xs3: true,
      xs4: false,
      xs5: true,
      xs6: true,
      xs7: false,
      xs8: false,
      xs9: true,
      xs10: false,
      xs11: true,
      bxs: true,
      bxs2: false,
      bxs3: false,
      bxs4: false,
      bxs5: true,
      bxs6: true,
      bxs7: true,
      bxs8: false,
      bxs9: false,
      bxs10: false,
      bxs11: true,
      bxs12: true,
      name1: '高净值',
      onedistrictranking: [],
      traderanking: [],
      num1: '1000',
      btname: '查询结果',
      hyqy: [],
      cjlx1: [],
      num5: 100,
      popular: [],
      self: '',
      urbanarea: '',
      onedistrict: '',
      primaryarea: [],
      trade: '',
      tradeoptions: [],
      reginpush: [],
      reginpush0: [],
      ids: '',
      oneid: '',
      twoid: '',
      twodistrict: '',
      secondaryarea: [],
      rowsubdivision: '',
      rowsubdivisionoptions: [],
      industrytab: [],
      scenesname: [],
      twotrade: '',
      ScenesName: [],
      Crowdlabel: [],
      valuedate: '',
      districtcollection: [],
      districtcollectiontwo: [],
      districtcollectionthree: [],
      districtcollectionfour: [],
      districtcollections: [],
      districtcollectiontwos: [],
      districtcollectionthrees: [],
      districtcollectionfours: [],
      Provide: [],
      City: [],
      Area: [],
      scenesheading: [],
      crowdtab: []
    }
  },
  mounted () {
    this.drawLine()
    this.drawLine3()
    this.getranking()
    this.gettrade()
    this.getHotpeople()
    // this.drawLine2()
  },
  methods: {
    gather () {
      console.log(1)
    },
    // 省
    save () {
      this.$http.get(`modules/area/areaInPid`,{params:{
        ids:1
      }}).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.province = data
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    visit () {
      this.self = this.oneself.join(',')
      this.city = ''
      this.area = ''
      for (let i in this.oneself) {
        let id = this.oneself[i]
        for (let a in this.province) {
          if (id === this.province[a].id) {
            this.Provide.push(this.province[a].name)
          }
        }
      }
    },
    // 市
    urban () {
      this.$http.get(`modules/area/areaInPid`,{params:{
        ids:this.self
      }}).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.urbandistrict = data
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    downtownarea () {
      this.urbanarea = this.city.join(',')
      this.area = ''
      for (let i in this.city) {
        let id = this.city[i]
        for (let a in this.urbandistrict) {
          if (id === this.urbandistrict[a].id) {
            this.City.push(this.urbandistrict[a].name)
          }
        }
      }
    },
    // 区
    county () {
      this.$http.get(`modules/area/areaInPid`,{params:{
        ids:this.urbanarea
      }}).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.countylevel = data
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    district () {
      for (let i in this.area) {
        let id = this.area[i]
        for (let a in this.countylevel) {
          if (id === this.countylevel[a].id) {
            this.Area.push(this.countylevel[a].name)
          }
        }
      }
    },
    // 区域
    cli3 () {
      let regin = []
      let regintwo = []
      this.onedistrict.forEach(item => {
        regintwo.push(item[0])
        regin.push(item[1])
      })
      this.oneid = regin.join(',')
      this.oneids = regintwo.join(',')
      if (this.onedistrict.length === 1) {
        this.$http.get(`modules/signRegion/listInParent`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            data.forEach(item => {
              if (this.onedistrict[0][0] === item.id) {
                this.districtcollection.push(item.name)
              }
            })
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
        this.$http.get(`modules/signRegion/listInParent`,{params:{
        ids:this.onedistrict[0][0]
      }}).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            data.forEach(item => {
              if (this.onedistrict[0][1] === item.id) {
                this.districtcollectiontwo.push(item.name)
              }
            })
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
        this.$http.get(`modules/signRegion/listInParent`,{params:{
        ids:this.onedistrict[0][1]
      }}).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.secondaryarea = data
            this.secondaryarea.forEach(item => {
              item.value = item.id
              item.label = item.name
              this.districtcollectionthree.push(item.name)
            })
          }
        })
      } else {
        this.$http.get(`modules/signRegion/listInParent`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            for (let i in this.onedistrict) {
              // console.log(this.onedistrict[i][0])
              for (let a in data) {
                if (this.onedistrict[i][0] === data[a].id) {
                  this.districtcollections.push(data[a].name)
                }
              }
            }
          }
        })
        this.$http.get(`modules/signRegion/listInParent`,{params:{
        ids:this.oneids
      }}).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            for (let i in this.onedistrict) {
              for (let a in data) {
                if (this.onedistrict[i][1] === data[a].id) {
                  this.districtcollectiontwos.push(data[a].name)
                }
              }
            }
          }
        })
        this.$http.get(`modules/signRegion/listInParent`,{params:{
        ids:this.oneid
      }}).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.secondaryarea = data
            this.secondaryarea.forEach(item => {
              item.value = item.id
              item.label = item.name
            })
          }
        })
      }
    },
    areaname () {
      console.log(this.twodistrict)
      let regin = []
      let regintwo = []
      this.twodistrict.forEach(item => {
        regintwo.push(item[0])
        regin.push(item[1])
      })
      this.twoid = regin.join(',')
      this.twoids = regintwo.join(',')
      if (this.twodistrict.length === 1) {
        // console.log(this.twoid)
        // this.$http.get(`modules/signRegion/listInParent?ids=${this.twodistrict[0][0]}`).then(res => {
        //   var { code, data } = res.data
        //   if (code === 1000) {
        //     console.log(data)
        // data.forEach(item => {
        //   if (this.onedistrict[0][0] === item.id) {
        //     this.districtcollection.push(item.name)
        //   }
        // })
        // }
        // }).catch((err) => {
        //   console.log('错误信息' + err)
        // })
        this.$http.get(`modules/signRegion/listInParent`,{params:{
        ids:this.twodistrict[0][0]
      }}).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            data.forEach(item => {
              if (this.twodistrict[0][1] === item.id) {
                this.districtcollectionfour.push(item.name)
              }
            })
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
        // console.log(this.onedistrict)
      } else {
        this.secondaryareas = this.secondaryarea
        for (let i in this.twodistrict) {
          let id = this.twodistrict[i][0]
          for (let a in this.secondaryareas) {
            if (id === this.secondaryareas[a].value) {
              this.districtcollectionthrees.push(this.secondaryareas[a].label)
            }
          }
        }
        // console.log(this.twoid )
        // console.log(this.twodistrict)
        // console.log(this.twoids )
        this.$http.get(`modules/signRegion/listInParent`,{params:{
          ids:this.twoids
        }}).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            for (let i in this.twodistrict) {
              let id = this.twodistrict[i][1]
              for (let a in data) {
                this.districtcollectionfours.push(data[a].name)
              }
            }
            // this.secondaryarea = data
            // this.secondaryarea.forEach(item => {
            //   item.value = item.id
            //   item.label = item.name
            // })
          }
        })
      }
    },
    // 行业
    cli2 () {
      let regin = []
      let regintwo = []
      this.trade.forEach(item => {
        regintwo.push(item[0])
        regin.push(item[1])
      })
      this.oneid = regin.join(',')
      this.oneids = regintwo.join(',')
      if (this.trade.length === 1) {
        this.$http.get(`modules/signIndustry/listInParent`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            data.forEach(item => {
              if (this.trade[0][0] === item.id) {
                this.districtcollection.push(item.name)
              }
            })
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
        this.$http.get(`modules/signIndustry/listInParent`,{params:{
          ids:this.trade[0][0]
        }}).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            data.forEach(item => {
              if (this.trade[0][1] === item.id) {
                this.districtcollectiontwo.push(item.name)
              }
            })
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
        this.$http.get(`modules/signIndustry/listInParent?ids=${this.trade[0][1]}`,{params:{
          ids:this.trade[0][1]
        }}).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.secondaryarea = data
            this.secondaryarea.forEach(item => {
              item.value = item.id
              item.label = item.name
              this.districtcollectionthree.push(item.name)
            })
          }
        })
      } else {
        this.$http.get(`modules/signIndustry/listInParent`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            for (let i in this.trade) {
              // console.log(this.onedistrict[i][0])
              for (let a in data) {
                if (this.trade[i][0] === data[a].id) {
                  this.districtcollections.push(data[a].name)
                }
              }
            }
          }
        })
        this.$http.get(`modules/signIndustry/listInParent?ids=${this.oneids}`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            for (let i in this.trade) {
              for (let a in data) {
                if (this.trade[i][1] === data[a].id) {
                  this.districtcollectiontwos.push(data[a].name)
                }
              }
            }
          }
        })
        this.$http.get(`modules/signIndustry/listInParent?ids=${this.oneid}`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.secondaryarea = data
            this.secondaryarea.forEach(item => {
              item.value = item.id
              item.label = item.name
            })
          }
        })
      }
    },
    gather2 () {
      console.log(this.twotrade)
      let regin = []
      let regintwo = []
      this.twotrade.forEach(item => {
        regintwo.push(item[0])
        regin.push(item[1])
      })
      this.twoid = regin.join(',')
      this.twoids = regintwo.join(',')
      if (this.twotrade.length === 1) {
        // console.log(this.twoid)
        // this.$http.get(`modules/signIndustry/listInParent?ids=${this.twotrade[0][0]}`).then(res => {
        //   var { code, data } = res.data
        //   if (code === 1000) {
        //     console.log(data)
        // data.forEach(item => {
        //   if (this.onedistrict[0][0] === item.id) {
        //     this.districtcollection.push(item.name)
        //   }
        // })
        // }
        // }).catch((err) => {
        //   console.log('错误信息' + err)
        // })
        this.$http.get(`modules/signIndustry/listInParent?ids=${this.twotrade[0][0]}`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            data.forEach(item => {
              if (this.twotrade[0][1] === item.id) {
                this.districtcollectionfour.push(item.name)
              }
            })
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
        // console.log(this.onedistrict)
      } else {
        this.secondaryareas = this.secondaryarea
        for (let i in this.twotrade) {
          let id = this.twotrade[i][0]
          for (let a in this.secondaryareas) {
            if (id === this.secondaryareas[a].value) {
              this.districtcollectionthrees.push(this.secondaryareas[a].label)
            }
          }
        }
        // console.log(this.twoid )
        // console.log(this.twotrade)
        // console.log(this.twoids )
        this.$http.get(`modules/signIndustry/listInParent?ids=${this.twoids}`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            for (let i in this.twotrade) {
              let id = this.twotrade[i][1]
              for (let a in data) {
                this.districtcollectionfours.push(data[a].name)
              }
            }
            // this.secondaryarea = data
            // this.secondaryarea.forEach(item => {
            //   item.value = item.id
            //   item.label = item.name
            // })
          }
        })
      }
    },
    // 场景名称
    heading () {
      let provide = this.oneself.join(',')
      let city = this.city.join(',')
      let area = this.area.join(',')
      // let info = new FormData()
      // info.append('province', provide,)
      // info.append('city', city,)
      // info.append('area', area)
      let info = {
        'province': provide,
        'city': city,
        'area': area
      }
      // this.$http.post(`modules/scencesName/findScence`,info).then(res=>{
      //   var {code,data}=res.data
      //   if(code === 1000){
      //     console.log(data)
      //   }
      // }).catch((err)=>{
      //   console.log('错误信息'+err)
      // })
      this.$http.post(`modules/scencesName/findScence`, { 'province': provide, 'city': city, 'area': area }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.ScenesName = data
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    Scenename () {
      for (let i in this.changjingmingcheng) {
        let id = this.changjingmingcheng[i]
        for (let a in this.ScenesName) {
          if (id === this.ScenesName[a].id) {
            this.scenesheading.push(this.ScenesName[a].name)
          }
        }
      }
    },
    // 人群标签
    swarm () {
      console.log(this.changjingmingcheng[0])
      let ids = this.changjingmingcheng[0]
      console.log(ids)
      this.$http.get(`pc/collect/getCrowdByScencesName?scencesNameId=${ids}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.Crowdlabel = data
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    crowdlabel () {
      for (let i in this.biaoqian) {
        let id = this.biaoqian[i]
        for (let a in this.Crowdlabel) {
          if (id === this.Crowdlabel[a].id) {
            this.crowdtab.push(this.Crowdlabel[a].name)
          }
        }
      }
    },
    getHotpeople () {
      this.$http.get(`pc/order/popularCrowd`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          // console.log(data)
          this.popular = data
          if (this.popular[0]) {
            // console.log(1)
          } else if (this.popular[1]) {
            // console.log(2)
          } else if (this.popular[2]) {
            // console.log(3)
          } else if (this.popular[3]) {
            // console.log(4)
          } else if (this.popular[4]) {
            // console.log(5)
          }
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    format (percentage) {
      return percentage === 100 ? '' : ``;
    },
    getranking () {
      this.$http.get('pc/order/dataRankingByRegion').then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.onedistrictranking = data
          this.onedistrictranking.forEach(item => {
            item.name = item.NAME
            item.count = item.count
          })
        }
      }).catch(function (err) {
        console.log('错误信息' + err)
      })
    },
    gettrade () {
      this.$http.get(`pc/order/dataRankingByIndustry`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.traderanking = data
        }
      }).catch(function (err) {
        console.log('错误信息' + err)
      })
    },
    drawLine () {
      this.$http.get('pc/order/popularRegion').then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          let name = []
          let count = []
          data.forEach(item => {
            name.push(item.NAME)
            count.push(item.count)
          })
          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById("myChart"));
          // 绘制图表
          let option = option = {
            color: ['#0079FE',],
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: name,
              axisLabel: {
                interval: 0,
                formatter: function (params) {
                  var newParamsName = "";
                  var paramsNameNumber = params.length;
                  var provideNumber = 3; //一行显示几个字
                  var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                  if (paramsNameNumber > provideNumber) {
                    for (var p = 0; p < rowNumber; p++) {
                      var tempStr = "";
                      var start = p * provideNumber;
                      var end = start + provideNumber;
                      if (p == rowNumber - 1) {
                        tempStr = params.substring(start, paramsNameNumber);
                      } else {
                        tempStr = params.substring(start, end) + "\n";
                      }
                      newParamsName += tempStr;
                    }
                  } else {
                    newParamsName = params;
                  }
                  return newParamsName;
                }
              },
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              data: count,
              type: 'line',
              areaStyle: {}
            }]
          };
          myChart.setOption(option);
        }
      }).catch(function (err) {
        console.log('错误信息' + err)
      })
    },
    drawLine1 () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(("myChart1")));
      // 绘制图表
      let option = option = {
        color: ['#0079FE',],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun2']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          areaStyle: {}
        }]
      };
      myChart.setOption(option);
    },
    drawLine2 () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart2"));
      // 绘制图表
      let option = option = {
        color: ['#0079FE',],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun3']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          areaStyle: {}
        }]
      };
      myChart.setOption(option);
    },
    drawLine3 () {
      // 基于准备好的dom，初始化echarts实例
      this.$http.get('pc/order/popularIndustry').then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          let name = []
          let count = []
          data.forEach(item => {
            name.push(item.NAME)
            count.push(item.count)
          })
          let myChart = this.$echarts.init(document.getElementById("myChart3"));
          // 绘制图表
          let option = option = {
            color: ['#9013FE ',],
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: name,
              axisLabel: {
                interval: 0,
                formatter: function (params) {
                  var newParamsName = "";
                  var paramsNameNumber = params.length;
                  var provideNumber = 3; //一行显示几个字
                  var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                  if (paramsNameNumber > provideNumber) {
                    for (var p = 0; p < rowNumber; p++) {
                      var tempStr = "";
                      var start = p * provideNumber;
                      var end = start + provideNumber;
                      if (p == rowNumber - 1) {
                        tempStr = params.substring(start, paramsNameNumber);
                      } else {
                        tempStr = params.substring(start, end) + "\n";
                      }
                      newParamsName += tempStr;
                    }
                  } else {
                    newParamsName = params;
                  }
                  return newParamsName;
                }
              },
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              data: count,
              type: 'line',
              areaStyle: {}
            }]
          };
          myChart.setOption(option);
        }
      }).catch(function (err) {
        console.log('错误信息' + err)
      })
    },
    drawLine4 () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(("myChart4")));
      // 绘制图表
      let option = option = {
        color: ['#9013FE ',],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun2']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          areaStyle: {}
        }]
      };
      myChart.setOption(option);
    },
    drawLine5 () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart5"));
      // 绘制图表
      let option = option = {
        color: ['#9013FE ',],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun3']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          areaStyle: {}
        }]
      };
      myChart.setOption(option);
    },
    zj () {
      this.xs = true
      this.xs1 = false
      this.xs4 = false
      this.xs5 = true
      this.xs2 = false
      this.xs3 = true
      this.bxs = true
      this.bxs4 = false
      this.bxs2 = false
      this.bxs5 = true
      this.bxs3 = false
      this.bxs6 = true
      this.drawLine()
    },
    jday () {
      this.xs2 = true
      this.xs3 = false
      this.xs = false
      this.xs1 = true
      this.xs4 = false
      this.xs5 = true
      this.bxs = false
      this.bxs4 = true
      this.bxs2 = true
      this.bxs5 = false
      this.bxs3 = false
      this.bxs6 = true
      this.drawLine1()
    },
    zday () {
      this.xs4 = true
      this.xs5 = false
      this.xs2 = false
      this.xs3 = true
      this.xs = false
      this.xs1 = true
      this.bxs = false
      this.bxs2 = false
      this.bxs3 = true
      this.bxs4 = true
      this.bxs5 = true
      this.bxs6 = false
      this.drawLine2()
    },
    zj1 () {
      this.xs6 = true
      this.xs7 = false
      this.xs8 = false
      this.xs9 = true
      this.xs10 = false
      this.xs11 = true
      this.bxs7 = true
      this.bxs10 = false
      this.bxs8 = false
      this.bxs11 = true
      this.bxs9 = false
      this.bxs12 = true
      this.drawLine3()
    },
    jday1 () {
      this.xs6 = false
      this.xs7 = true
      this.xs8 = true
      this.xs9 = false
      this.xs10 = false
      this.xs11 = true
      this.bxs7 = false
      this.bxs10 = true
      this.bxs8 = true
      this.bxs11 = false
      this.bxs9 = false
      this.bxs12 = true
      this.drawLine4()
    },
    zday1 () {
      this.xs6 = false
      this.xs7 = true
      this.xs8 = false
      this.xs9 = true
      this.xs10 = true
      this.xs11 = false
      this.bxs7 = false
      this.bxs10 = true
      this.bxs8 = false
      this.bxs11 = true
      this.bxs9 = true
      this.bxs12 = false
      this.drawLine5()
    },
    chongzhi () {
      this.oneself = ''
      this.city = ''
      this.area = ''
      this.datastamp = ''
      this.onedistrict = ''
      this.trade = ''
      this.twodistrict = ''
      this.twotrade = ''
      this.changjingmingcheng = ''
      this.biaoqian = ''
      this.valuedate = ''
      this.Provide = []
      this.City = []
      this.Area = []
      this.districtcollection = []
      this.districtcollectiontwo = []
      this.districtcollectionthree = []
      this.districtcollectionfour = []
      this.valuedate = []
      this.scenesheading = []
      this.crowdtab = []
      this.districtcollections = []
      this.districtcollectiontwos = []
      this.districtcollectionthrees = []
      this.districtcollectionfours = []
    },
    chaxun () {
      let general = []
      let generals = []
      let twogeneral = []
      let twogenerals = []
      this.onedistrict.forEach(item => {
        general.push(item[0])
        generals.push(item[1])
      })
      this.twodistrict.forEach(item => {
        twogeneral.push(item[0])
        twogenerals.push(item[1])
      })
      let type = ''
      if (this.datastamp === 1) {
        type = '区域数据'
        // let info = new FormData()
        // info.append('province', this.oneself.join(','),)
        // // info.append('province', 22)
        // info.append('city', this.city.join(','),)
        // // info.append('city', 284)
        // info.append('area', this.area.join(','),)
        // // info.append('area', 2344)
        // info.append('collectType', this.datastamp,)
        // info.append('scenceName', this.changjingmingcheng[0],)
        // // info.append('scenceName', 6)
        // info.append('regionParent', general.join(','),)
        // // info.append('regionParent', 2)
        // info.append('region', generals.join(','),)
        // // info.append('region', 4)
        // info.append('regionTypeParent', twogeneral.join(','),)
        // // info.append('regionTypeParent', 7)
        // info.append('regionType', twogenerals.join(','),)
        // // info.append('signCrowd', this.biaoqian,)
        // info.append('signCrowd', 4)
        // info.append('fromDate', this.valuedate[0],)
        // info.append('toDate', this.valuedate[1])
        let info = {
          'province': this.oneself.join(','),
          'city': this.city.join(','),
          'area': this.area.join(','),
          'collectType': this.datastamp,
          'scenceName': this.changjingmingcheng[0],
          'regionParent': general.join(','),
          'region': generals.join(','),
          'regionTypeParent': twogeneral.join(','),
          'regionType': twogenerals.join(','),
          'signCrowd': this.biaoqian,
          'fromDate': this.valuedate[0],
          'toDate': this.valuedate[1]
        }
        this.$http.post(`pc/data/getDataCount`, info).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            // console.log(data)
            let arr = []
            arr.push(this.Provide, this.City, this.Area)
            let arr2 = arr.join('\\')
            let arr3 = []
            if (this.districtcollection.length === 1 & this.districtcollections.length === 0) {
              arr3.push(this.districtcollection, this.districtcollectiontwo, this.districtcollectionthree, this.districtcollectionfour)
            } else if (this.districtcollection.length === 1 & this.districtcollections.length != 0) {
              arr3.push(this.districtcollections, this.districtcollectiontwos, this.districtcollectionthrees, this.districtcollectionfours)
            }
            let arr4 = arr3.join('\\')
            let arr5 = this.valuedate.join('\\')
            let arr6 = []
            arr6.push(arr2, type, arr4, arr5, this.scenesheading, this.crowdtab)
            let arr7 = arr6.join('-')
            var obj = {
              name: arr7,
              searchUUID: data.searchUUID,
              dataCount: data.dataCount
            }
            this.oneself = ''
            this.city = ''
            this.area = ''
            this.datastamp = ''
            this.onedistrict = ''
            this.trade = ''
            this.twodistrict = ''
            this.twotrade = ''
            this.changjingmingcheng = ''
            this.biaoqian = ''
            this.valuedate = ''
            this.Provide = []
            this.City = []
            this.Area = []
            this.districtcollection = []
            this.districtcollectiontwo = []
            this.districtcollectionthree = []
            this.districtcollectionfour = []
            this.valuedate = []
            this.scenesheading = []
            this.crowdtab = []
            this.districtcollections = []
            this.districtcollectiontwos = []
            this.districtcollectionthrees = []
            this.districtcollectionfours = []
            this.$store.commit('myval1', this.btname)
            this.$store.commit('myobj', obj)
            this.$router.push({ path: '/index/cxjg.vue', query: { obj: obj, } })
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
      } else if (this.datastamp === 2) {
        type = '行业类型'
        // let info = new FormData()
        // info.append('province', this.oneself.join(','),)
        // // info.append('province', 22)
        // info.append('city', this.city.join(','),)
        // // info.append('city', 284)
        // info.append('area', this.area.join(','),)
        // // info.append('area', 2344)
        // info.append('collectType', this.datastamp,)
        // info.append('scenceName', this.changjingmingcheng[0],)
        // // info.append('scenceName', 6)
        // info.append('industryParent', general.join(','),)
        // // info.append('industryParent', 2)
        // info.append('industry', generals.join(','),)
        // // info.append('industry', 4)
        // info.append('industrytypeParent', twogeneral.join(','),)
        // // info.append('industrytypeParent', 7)
        // info.append('industrytype', twogenerals.join(','),)
        // // info.append('industrytype', this.biaoqian,)
        // info.append('signCrowd', 4)
        // info.append('fromDate', this.valuedate[0],)
        // info.append('toDate', this.valuedate[1])
        let info = {
          'province': this.oneself.join(','),
          'city': this.city.join(','),
          'area': this.area.join(','),
          'collectType': this.datastamp,
          'scenceName': this.changjingmingcheng[0],
          'industryParent': general.join(','),
          'industry': generals.join(','),
          'industrytypeParent': twogeneral.join(','),
          'industrytype': twogenerals.join(','),
          'industrytype': this.biaoqian,
          'fromDate': this.valuedate[0],
          'toDate': this.valuedate[1]
        }
        this.$http.post(`pc/data/getDataCount`, info).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            // console.log(data)
            let arr = []
            arr.push(this.Provide, this.City, this.Area)
            let arr2 = arr.join('\\')
            let arr3 = []
            if (this.districtcollection.length === 1 & this.districtcollections.length === 0) {
              arr3.push(this.districtcollection, this.districtcollectiontwo, this.districtcollectionthree, this.districtcollectionfour)
            } else if (this.districtcollection.length === 1 & this.districtcollections.length != 0) {
              arr3.push(this.districtcollections, this.districtcollectiontwos, this.districtcollectionthrees, this.districtcollectionfours)
            }
            let arr4 = arr3.join('\\')
            let arr5 = this.valuedate.join('\\')
            let arr6 = []
            arr6.push(arr2, type, arr4, arr5, this.scenesheading, this.crowdtab)
            let arr7 = arr6.join('-')
            var obj = {
              name: arr7,
              searchUUID: data.searchUUID,
              dataCount: data.dataCount
            }
            this.oneself = ''
            this.city = ''
            this.area = ''
            this.datastamp = ''
            this.onedistrict = ''
            this.trade = ''
            this.twodistrict = ''
            this.twotrade = ''
            this.changjingmingcheng = ''
            this.biaoqian = ''
            this.valuedate = ''
            this.Provide = []
            this.City = []
            this.Area = []
            this.districtcollection = []
            this.districtcollectiontwo = []
            this.districtcollectionthree = []
            this.districtcollectionfour = []
            this.valuedate = []
            this.scenesheading = []
            this.crowdtab = []
            this.districtcollections = []
            this.districtcollectiontwos = []
            this.districtcollectionthrees = []
            this.districtcollectionfours = []
            this.tableData.push(obj)
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
      }
      // this.$http.post('pc/data/getDataCount').then(res => {
      //   var { code, data } = res.data
      //   if (code === 1000) {
      //     let arr1 = []
      //     arr1.push(this.oneself, this.city, this.area)
      //     var arr2 = arr1.join("\\");
      //     let arr3 = []
      //     let arr4 = []
      //     if (this.adress1 === '') {
      //       console.log(1)
      //     } else {
      //       arr3 = this.adress1.join("\\")
      //     }
      //     if (this.adress2 === '') {
      //       console.log(1)
      //     } else {
      //       arr4 = this.adress2.join("\\")
      //     }
      //     let time1 = new Date(this.value1[0])
      //     let time2 = new Date(this.value1[1])
      //     var y = time1.getFullYear();
      //     var M = time1.getMonth() + 1;
      //     var d = time1.getDate();
      //     var y1 = time2.getFullYear();
      //     var M1 = time2.getMonth() + 1;
      //     var d1 = time2.getDate();
      //     let time3 = y + '-' + M + '-' + d
      //     let time4 = y1 + '-' + M1 + '-' + d1
      //     let time5 = time3 + '至' + time4
      //     let arr = []
      //     arr.push(arr2, this.datastamp, arr4, arr3, this.biaoqian, this.changjingmingcheng, time5)
      //     let arr5 = arr.join('-')
      //     var natwork = {
      //       keyword: arr5,
      //       searchId: data.searchId,
      //       dataCount: data.dataCount
      //     }
      //     let tableData2 = []
      //     tableData2.push(natwork)
      //     this.$store.commit('myval1', this.btname)
      //     this.$router.push({ path: '/index/cxjg.vue', query: { arr: tableData2 } })
      //   }
      // }).catch(function (err) {
      //   console.log("连接错误" + err)
      // })

    }
  }
}
</script>

<style lang='scss' module>
.f_bj {
  width: 1200px;
  margin: 0 auto;
}
.f_sx {
  margin-top: 36px;
  background-color: #fff;
  text-align: left;
  border-radius: 10px;
  p {
    padding-top: 35px;
    margin: 30px 10px;
    padding-left: 10px;
    border-bottom: 1px solid #e6e9f0;
  }
}
.search,
.search1 {
  margin-top: 20px;
}
.search1 {
  padding-bottom: 20px;
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
    width: calc(100% - 90%);
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
.f_btn {
  display: inline-block;
  width: 68px;
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
.f_table {
  margin-top: 36px;
  background-color: #fff;
  text-align: left;
  border-radius: 10px;
  p {
    padding-top: 35px;
    margin: 30px 10px;
    padding-left: 10px;
    border-bottom: 1px solid #e6e9f0;
  }
}
.f_rmrq,
.f_rmrq1 {
  display: inline-block;
  height: 80px;
  width: 200px;
  border: 1px solid #d3dbeb;
  box-shadow: 0 2px 4px 0 #eff2f7;
  border-radius: 10px;
  .gouwu,
  .qiche,
  .jingqu,
  .xuexiao,
  .yiyuan {
    display: inline-block;
    position: relative;
    width: calc(100% - 60%);
    height: 80px;
    box-shadow: 0 2px 4px 0 #eff2f7;
    border-radius: 10px;
  }
  .gouwu {
    background: #9013fe;
  }
  .qiche {
    background: #3b7cff;
  }
  .jingqu {
    background: #42e0fc;
  }
  .yiyuan {
    background: #ffa737;
  }
  .xuexiao {
    background: #77c12b;
  }
}
.f_bq {
  font-size: 14px;
  color: #3b4859;
  letter-spacing: 0;
  line-height: 80px;
  vertical-align: top;
  text-align: center;
  display: inline-block;
  width: calc(100% - 43%);
}
.f_rmrq {
  margin-left: 20px;
}
.f_rq {
  display: inline-block;
  float: right;
  padding-top: 10px;
  padding-right: 10px;
}
.f_tj {
  display: inline-block;
  padding: 10px;
}
.f_jd {
  padding: 0 20px;
  padding-bottom: 20px;
}
.f_zn,
.f_ym {
  font-size: 14px;
  color: #8998ac;
  letter-spacing: 0;
  line-height: 22px;
}
.f_ym {
  float: right;
  padding-right: 11%;
}
// .f_search1{
//   display: inline-block;
// }
.f_jz {
  margin-top: 20px;
  text-align: center;
}
</style>
