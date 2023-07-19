<template>
  <div>
    <el-row >
<!--      左边区域-->
      <el-col :span="8">
        <el-card class="box-card">
          <div class="userinfo" >
            <img class="picture" src="../assets/images.jpg">
            <div >
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <div class="login-date">
            <p>上次登录的时间：<span>11：23</span></p>
            <p>上次登录的地点：<span>武汉</span></p>
          </div>
        </el-card>
        <el-card>
          <el-table
              :data="commodity"
              stripe
              style="width: 100%">
            <el-table-column
                v-for="(val,key) in title"
                :prop="key"
                :label="val">
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <!--  右边区域-->
      <el-col :span="16">
<!--        //订单-->
        <el-row class="indent">
            <el-card  shadow="always" body-style="display:flex" v-for="val in indent" :key="val.describe">
              <i class="icon" :class="`el-icon-${val.icon}`" :style="{backgroundColor:val.color}"></i>
              <div class="text">
                <p>￥{{val.money}} </p><span>{{val.describe}}</span>
              </div>
            </el-card>
        </el-row>
<!--        折线图-->
        <el-row class="echarts1" >
          <el-card style="width: 97.5%;height:250px">
            <div ref="echarts1" style="height: 250px" ></div>
          </el-card>
        </el-row>
        <el-row class="echarts23"  >
          <el-col :span="10" style="height: 250px">
            <el-card>
              <div style="height: 250px" ref="echarts2">

              </div>
            </el-card>
          </el-col>
          <el-col :span="10" style="height: 250px">
            <el-card>
              <div style="height: 250px" ref="echarts3">

              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getData} from "@/api";
import * as echarts from 'echarts';
import Cookie from "js-cookie";
export default {
  name: "Home",
  data(){
    return {
      //表格的字段名
      title:{
        name:'品牌',
        todayBuy:'今日购买',
        monthBuy:'本月购买',
        totalBuy:'总购买'
      },
      //表格数据
      commodity:[
        {
          name:'OPPO',
          buyToday:120,
          monthBuy:6089,
          totalBuy:23000
        },
        {
          name:'小米',
          buyToday:132,
          monthBuy:7089,
          totalBuy:24000
        },
        {
          name:'华为',
          buyToday:142,
          monthBuy:6729,
          totalBuy:25000
        }
      ],
      //订单数据
      indent:[
        {
          icon:'success',
          money:1232,
          describe:'今日支付订单',
          color:'#36a4ed'
        },
        {
          icon:'success',
          money:1232,
          describe:'今日收藏订单',
          color:'#f7bb40'
        },
        {
          icon:'success',
          money:1232,
          describe:'今日未支付订单',
          color:'#c78ce6'
        },
        {
          icon:'success',
          money:1232,
          describe:'本月支付订单',
          color:'#36a4ed'
        },
        {
          icon:'success',
          money:1232,
          describe:'本月收藏订单',
          color:'#f7bb40'
        },
        {
          icon:'success',
          money:1232,
          describe:'本月未支付订单',
          color:'#c78ce6'
        }
      ]
    }
  },
  created() {
    if (Cookie.get('grade') === 'senior')
      this.$store.commit('setMenu','senior')
    else
      this.$store.commit('setMenu','lower')
  },
  mounted() {
    //调用api接口获取后端数据
    getData().then((data)=>{
      // console.log(data.data.data)
      //将tableData赋值给commodity
      let dataTab =  data.data.data;
      this.commodity = dataTab.tableData
      //创建echarts的实例
      const echarts1 = echarts.init(this.$refs.echarts1)
      //指定折线图图表的配置项和数据

      let option1 = {
        title:{
          text:'手机销售状况'
        },
        //提示框
        tooltip:{},
        //图例
        legend:{
          data:Object.keys(dataTab.orderData.data[0])
        },
        xAxis:{
          //日期
          type: 'category',
          data:dataTab.orderData.date
        },
        yAxis:{type: 'value'},
        //数据
        series:[
          // {
          //   name: '苹果',
          //   //图表类型
          //   type:'line',
          //   //数据
          //   data:[1,2,2,3,2,1,2,3]
          // }
        ]
      }
      option1.legend.data.forEach(key =>{
        option1.series.push({
          name : key,
          data : dataTab.orderData.data.map(item => item[key]),
          type : 'line'
        })
      })
      echarts1.setOption(option1)


      //获取显示柱状图的dom
      const echarts2 = echarts.init(this.$refs.echarts2)
      //指定柱状图图表的配置项和数据
      let option2 = {
        title:{
          text:'手机销售状况'
        },
        //提示框
        tooltip:{},
        //图例
        legend:{
          data:['new','active']
        },
        xAxis:{
          //日期
          type: 'category',
          data:dataTab.userData.forEach(key => key.date)
        },
        yAxis:{type: 'value'},
        //数据
        series:[
        ]
      }
      option2.series.push({
        name : 'new',
        data : dataTab.userData.map(item=> item.new),
        type : 'bar'
      })
      option2.series.push({
        name : 'active',
        data : dataTab.userData.map(item=> item.active),
        type : 'bar'
      })
      echarts2.setOption(option2)

      //获取显示饼图的dom
      const echarts3 = echarts.init(this.$refs.echarts3)
      //指定柱状图图表的配置项和数据
      let option3 = {
        title:{
          text:'手机销售状况'
        },
        //提示框
        tooltip:{},
        series:{
          type :'pie',
          data : []
        }
      }
      dataTab.videoData.forEach(key =>{
        option3.series.data.push({
          name: key.name,
          value: key.value
        })
        option3.tooltip.name = key.name
      })
      echarts3.setOption(option3)
      // console.log(option3.series)
    })

    if (Cookie.get('grade') === 'senior')
      this.$store.commit('setMenu','senior')
    else
      this.$store.commit('setMenu','lower')
  },

}
</script>

<style scoped lang="less">
*{
  padding: 0;
  margin: 0;
}
.userinfo{
  display: flex;
  align-items: center;
}
.picture{
  width: 90px;
  height: 90px;
  border-radius: 50%  ;
}
.login-date{
  margin-top: 20px;
  padding-top: 20px;
  border-top:1px solid #b9b9b9;
  p{
    color: #818182;
    span{
      padding-left: 60px;
      color: #292930;
    }
  }
 }

//右边订单
.indent{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items:center;
  .el-card{
    width: 32%;
    margin:0  10px 10px 0;
  }
  .el-card__body{
    i{
      display: inline-block;
      padding: 25px;
      background: #36a4ed;
    }
    p{
      font-size: 24px;
    }
    span{
      padding-left: 3px;
      font-size: 14px;
    }
  }
}

//数据可视化图
.echarts1{
  display: flex;
  justify-content: space-between;
  div{
    width: 98%;
    height:700px;
  }
}
.echarts23{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>