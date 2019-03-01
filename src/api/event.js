import request from '@/utils/request'
//添加任务
export function calendarTask(){
    return request({
        url:'/inquire/MyTask',
        method:'get',
        params:{
            userId:''
        }
    })
}

//获得动态路由
export function getAsysRouter(info){
    return request({
        url:'/inquire/router',
        method:'get',
        params:{
            userIndex:info
        }
    })
}

//权限管理
export function setPermission(info){
    return request({
        url:'/permission/changePermission',
        method:'post',
        data:info
    })
}
//获取权限列表
export function getLimit(){
    return request({
        url:'/inquire/limit',
        method:'get',
    })
}

//权限查看
export function watchPermission(info){
    return request({
        url:'/inquire/getRolePermission',
        method:'get',
        params:{
            roleId:info
        }
    })
}