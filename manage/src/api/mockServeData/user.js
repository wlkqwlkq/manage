
let userList = [
    {
        id:1,
        name:'张三',
        age:10,
        sex:'男',
        date:'2013-1-2',
        address:'广东佛山'
    },
    {
        id:2,
        name:'李四',
        age:21,
        sex:'女',
        date:'2002-9-4',
        address:'广东深圳'
    },
    {
        id:3,
        name:'王五',
        age:25,
        sex:'男',
        date:'1998-3-2',
        address:'山东济南'
    },
    {
        id:4,
        name:'刘帮',
        age:13,
        sex:'男',
        date:'2010-3-7',
        address:'广西'
    },
    {
        id:5,
        name:'赵分',
        age:23,
        sex:'女',
        date:'2000-3-14',
        address:'江西'
    },
    {
        id:6,
        name:'钱三一',
        age:22,
        sex:'男',
        date:'2001-1-4',
        address:'浙江温州'
    },
    {
        id:7,
        name:'小红帽',
        age:21,
        sex:'女',
        date:'2002-1-4',
        address:'浙江温州'
    },
    {
        id:8,
        name:'大灰狼',
        age:22,
        sex:'男',
        date:'2001-5-13',
        address:'湖北荆州'
    },
    {
        id:9,
        name:'匹诺曹',
        age:22,
        sex:'男',
        date:'2001-1-4',
        address:'浙江温州'
    },
    {
        id:10,
        name:'小鲜肉',
        age:22,
        sex:'男',
        date:'2001-1-4',
        address:'浙江温州'
    },
    {
        id:11,
        name:'大张伟',
        age:22,
        sex:'男',
        date:'2001-1-4',
        address:'浙江温州'
    }
]
export default {
    getUser(){
        return userList;
    },
    //添加用户
    addUser: config =>{
        // const {name,age,sex,date,address} = JSON.parse(config.body)
        const newUser = JSON.parse(config.body)
        newUser.id = userList[userList.length-1].id +1; //新用户的id为用户列表中最后一位用户的id+1
        userList.push(newUser)
    },
    //修改用户信息
    upUser: config =>{
        //post请求的数据   json.parse 解析json字符串
        const User = JSON.parse(config.body)
        for (let i in userList){
            if (userList[i].id === User.id){
                userList[i].name = User.name;
                userList[i].age = User.age;
                userList[i].sex = User.sex;
                userList[i].address = User.address;
                userList[i].date = User.date;
                break;
            }
        }
    },
    //删除用户信息
    delUser: config =>{
        const id = JSON.parse(config.body)
        for(let i in userList){
            if (userList[i].id === id)
                userList.splice(i,1)
        }
    },
    //查找用户信息
    queryUser: config =>{
        console.log(config)
        const name = config.body
        for(let i in userList){
           if (userList[i].name.indexOf(name)!==-1)
               return userList[i]
        }
        return null;
    }
}