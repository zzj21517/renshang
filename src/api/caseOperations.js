import request from '@/utils/request'
//删除单行案件
export function deleteOneCaseList(index){
    return request({
        url:'/case/delete',
        method:'get',
        params:{
            caseIndex:index
        }
    })
}
//查找案件
export function findCase(info){
    const data=info
    return request({
        url:'/case/findCase',
        method:'post',
        data
    })
}
//显示详情
export function showDetailInfo(info){
    const data=info
    return request({
        url:'/case/showDetail',
        method:'post',
        data
    })
}
//编辑案件
export function editCase(info){
    const data=info
    return request({
        url:'/case/editCase',
        method:'post',
        data
    })
}

//显示案件列表
export function showCaseList(page,num){
    return request({
        url:'/case/caseList',
        method:'get',
        params:{
            page:page,
            size:num
        }
    })
}
// 显示部门所有案件列表
export function showAllCaseList(page,num){
    return request({
        url:'/inquire/caselist',
        method:'get',
        params:{
            page:page,
            size:num
        }
    })
}

//继续操作案件
export function continueCase(num){
    return request({
        url:'/inquire/caseInfo',
        method:'get',
        params:{
            baseIndex:num
        }
    })
}

//会员卡信息接口
export function getMembershipCard(page,num){
    return request({
        url:'/card/display',
        method:'get',
        params:{
            page:page,
            size:num
        }
    })
}

//审核信息接口
export function checkCard(info){
    return request({
        url:'/card/check',
        method:'get',
        params:{
            cardId:info
        }
    })
}

//主管审核接口
export function checkCase(arg1,arg2,arg3){
    return request({
        url:'/check/check',
        method:'get',
        params:{
            caseIndex:arg1,
            caseFlowNode:arg2,
            isCheck:arg3,
        }
    })
}

//添加体检卡卡号
export function addCheckCard(info){
    return request({
        url:'/healthCard/addHealthCard',
        method:'post',
        data:info
    })
}

//展示体检卡
export function showCheckCard(info){
    return request({
        url:'/healthCard/displayCardList',
        method:'get',
        params:{
            page:info
        }
    })
}

//激活体检卡列表
export function showActivateCard(){
    return request({
        url:'healthCard/displayExperCardList',
        method:'get',
        
    })
}

// 部门主管审核
export function checktask(info){
    return request({
        url:'inquire/myapprove',
        method:'get',
        params:{
            userIndex:info
        }
    })
}
// 审核驳回功能
export function checkfunction(info){
    return request({
        url:'case/myapprove',
        method:'post',
        data:info
    })
}