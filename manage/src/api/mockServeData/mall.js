
let mallList = [
    {
        id:'001',//商品编号
        name:'复古高腰牛仔套裙',//商品名字
        price:326,//价格
        genre:'女装',//类别
        stock:1563,//库存
        sales:246 //销量
    },
    {
        id:'002',//商品编号
        name:'透气网面小白鞋',//商品名字
        price:326,//价格
        genre:'鞋包',//类别
        stock:6234,//库存
        sales:542 //销量
    },
    {
        id:'003',//商品编号
        name:'脆甜多汁红富士',//商品名字
        price:12,//价格
        genre:'食品',//类别
        stock:9635,//库存
        sales:4542 //销量
    },
    {
        id:'004',//商品编号
        name:'漫花树叶经典抽纸',//商品名字
        price:24,//价格
        genre:'生活用品',//类别
        stock:16234,//库存
        sales:7842 //销量
    },
    {
        id:'005',//商品编号
        name:'凯斯琳时尚包包',//商品名字
        price:2999,//价格
        genre:'鞋包',//类别
        stock:4534,//库存
        sales:242 //销量
    },
    {
        id:'006',//商品编号
        name:'免煮红油面皮',//商品名字
        price:4,//价格
        genre:'食品',//类别
        stock:6234,//库存
        sales:542 //销量
    },
    {
        id:'007',//商品编号
        name:'智能恒温加热杯垫',//商品名字
        price:789,//价格
        genre:'生活用品',//类别
        stock:9038,//库存
        sales:672 //销量
    },
    {
        id:'008',//商品编号
        name:'新疆葡萄干',//商品名字
        price:326,//价格
        genre:'食品',//类别
        stock:6234,//库存
        sales:542 //销量
    },
    {
        id:'009',//商品编号
        name:'泡泡染发剂',//商品名字
        price:326,//价格
        genre:'生活用品',//类别
        stock:6234,//库存
        sales:542 //销量
    },
    {
        id:'010',//商品编号
        name:'玉米烫夹板',//商品名字
        price:326,//价格
        genre:'生活用品',//类别
        stock:6234,//库存
        sales:542 //销量
    },
    {
        id:'011',//商品编号
        name:'拉夏贝尔乐福鞋',//商品名字
        price:326,//价格
        genre:'鞋包',//类别
        stock:6234,//库存
        sales:542 //销量
    },
    {
        id:'012',//商品编号
        name:'纯欲风辣妹短袖',//商品名字
        price:326,//价格
        genre:'女装',//类别
        stock:6234,//库存
        sales:542 //销量
    },
    {
        id:'013',//商品编号
        name:'复古文艺衬衫',//商品名字
        price:326,//价格
        genre:'男装',//类别
        stock:6234,//库存
        sales:542 //销量
    },
    {
        id:'014',//商品编号
        name:'春季港风高级套装',//商品名字
        price:326,//价格
        genre:'男装',//类别
        stock:6234,//库存
        sales:542 //销量

    }
]
export default {
    getMallData(){
        return mallList;
    },
    //添加商品
    addMall: config =>{
        // const {name,age,sex,date,address} = JSON.parse(config.body)
        const newMall = JSON.parse(config.body)
        newMall.id = mallList[mallList.length-1].id +1; //新用户的id为用户列表中最后一位用户的id+1
        mallList.push(newMall)
    },
    //修改商品信息
    upMall: config =>{
        //post请求的数据   json.parse 解析json字符串
        const mall = JSON.parse(config.body)
        for (let i of mallList){
            if (i.id === mall.id){
                i.name = mall.name;
                i.stock = mall.stock;
                i.genre = mall.genre;
                i.price = mall.price;
                break;
            }
        }
    },
    //删除商品信息
    deleteMall: config =>{
        const id = config.body
        for(let i in mallList){
            if (mallList[i].id === id)
                mallList.splice(i,1)
        }
    },
    //查找商品信息
    queryMall: config =>{
        let list = []
        const name = config.body
        for(let i in mallList){
            if (mallList[i].name.indexOf(name)!==-1)
                list.push(mallList[i])
            if (mallList[i].genre.indexOf(name)!==-1)
                list.push(mallList[i])
        }
        if (list.length===0)
            return null;
        return list;
    }
}