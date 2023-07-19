import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import userApi from './mockServeData/user'
import loginApi from './mockServeData/login'
import mallApi from './mockServeData/mall'

Mock.mock('/api/home/getData',homeApi.getStatisticalData)
Mock.mock('/api/user/getData',userApi.getUser)
Mock.mock('/api/user/addUser','post',userApi.addUser)
Mock.mock('/api/user/upUser','post',userApi.upUser)
Mock.mock('/api/user/delUser','post',userApi.delUser)
Mock.mock('/api/user/queryUser','post',userApi.queryUser)
Mock.mock('/api/login/doLogin','post',loginApi.doLogin)
Mock.mock('/api/mall/getMallData',mallApi.getMallData)
Mock.mock('/api/mall/addMall',mallApi.addMall)
Mock.mock('/api/mall/upMall',mallApi.upMall)
Mock.mock('/api/mall/deleteMall',mallApi.deleteMall)
Mock.mock('/api/mall/queryMall',mallApi.queryMall)
