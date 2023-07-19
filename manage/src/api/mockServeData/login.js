let userList = [
    {
        userName : 'admin',
        password : '123'
    },
    {
        userName : 'zhangsan',
        password : 'zhang3'
    },
    {
        userName : 'lisi',
        password : 'l4lisi'
    },
    {
        userName : 'wangwu',
        password : 'aini1314'
    }
]
export default {
    doLogin(config){
        const user = JSON.parse(config.body)
        // console.log(user)
        for(let i of userList){
            if(user.userName === i.userName && user.password === i.password){
                return true;
            }
        }
        return false;
    }
}