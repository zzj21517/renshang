import request from '@/utils/request'

export function loginByUsername(info){
    const data=info
    return request({
        url:'/login',
        method:'post',
        data
    })
}

export function getUserInfo(token){
    return request({
        url:'/user/info',
        method:'get',
        params:{token}
    })
}
//请求客户基础信息
export function postBasicInfo(info){
    const data={basicInfo:info,str:'basicInfo'}
    console.log(data)
    return request({
        url:'/case/addcase',
        method:'post',
        data
    })
}
//请求其他信息
export function postOtherInfo(info,address){
        
    const data={str:address,}
    data[address]=info
    console.log(data)
    return request({
        url:`/case/addcase`,
        method:'post',
        data
    })
}
//获得编号
export function getString(userId,index){
    return request({
        url:'/case/number',
        method:'get',
        params:{
            userName:userId,
            caseIndex:index
        }
    })
}
