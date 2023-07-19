import http from '@/axios/request'

export const getData = () => {
    return http.get('/home/getData')
}

export const getUserData = () => {
    return http.get('/user/getData')
}

export const addUser = (data)=> {
    return http.post('/user/addUser',data)
}
export const login = (data)=> {
    return http.post('/login/doLogin',data)
}
export const User = {
    getUserData:() => {
        return http.get('/user/getData')
    },
    addUser: (data)=> {
        return http.post('/user/addUser',data)
    },
    upUser: (data)=> {
        return http.post('/user/upUser',data)
    },
    deleteUser: (id)=> {
        return http.post('/user/delUser',id)
    },
    queryUser: (name)=> {
        return http.post('/user/queryUser',name)
    }
}
export const Mall = {
    getMallData:() => {
        return http.get('/mall/getMallData')
    },
    addMall: (data)=> {
        return http.post('/mall/addMall',data)
    },
    upMall: (data)=> {
        return http.post('/mall/upMall',data)
    },
    deleteMall: (id)=> {
        return http.post('/mall/deleteMall',id)
    },
    queryMall: (name)=> {
        return http.post('/mall/queryMall',name)
    }
}
