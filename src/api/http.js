import request from '../utils/request.js'

// 登陆
export function login(data) {
    return request({
        method: 'post',
        url: 'login/adminLogin',
        data
    })
}
// 获取用户详情
export function getInfo() {
    return request({
        method: 'get',
        url: 'login/adminInfo'
    })
}
// 退出登录


// 首页——获取轮播图
export function getBanners() {
    return request({
        method: 'get',
        url: 'index/getBanners'
    })
}
// 首页——删除轮播图
export function delBanners(data) {
    return request({
        method: 'get',
        url: `index/delBanners/${data}`
    })
}
// 首页——增加轮播图
export function addBanners(data) {
    return request({
        method: 'post',
        url: `index/addBanners`,
        data
    })
}
// 首页——获取裁判队伍
export function getJudges() {
    return request({
        method: 'get',
        url: `index/getJudges`
    })
}
// 首页——删除裁判
export function delJudges(data) {
    return request({
        method: 'get',
        url: `index/delJudges/${data}`
    })
}
// 首页——增加裁判
export function addJudges(data) {
    return request({
        method: 'post',
        url: `index/addJudges`,
        data
    })
}
// 首页——获取精彩瞬间
export function getVideos() {
    return request({
        method: 'get',
        url: `index/getVideos`
    })
}
// 首页——删除精彩瞬间
export function delVideos(data) {
    return request({
        method: 'get',
        url: `index/delVideos/${data}`
    })
}
// 首页——修改精彩瞬间描述
export function editVideos(data) {
    return request({
        method: 'post',
        url: `index/editVideos`,
        data
    })
}
// 首页——新增精彩瞬间
export function addVideos(data) {
    return request({
        method: 'post',
        url: `index/addVideos`,
        data
    })
}

// 用户---获取所有队伍
export function getTeam() {
    return request({
        method: 'get',
        url: 'user/getTeam'
    })
}
// 用户---创建用户
export function createUser(data) {
    return request({
        method: 'post',
        url: 'user/createUser',
        data
    })
}
// 用户---获取用户详情
export function getUserInfo(data) {
    return request({
        method: 'post',
        url: 'user/getUserInfo',
        data
    })
}
// 用户——修改资料
export function editUserInfo(data) {
    return request({
        method: 'post',
        url: `user/editUserInfo`,
        data
    })
}

// 队伍---创建队伍
export function createTeam(data) {
    return request({
        method: 'post',
        url: 'team/createTeam',
        data
    })
}
// 队伍---队伍评分
export function getScore() {
    return request({
        method: 'get',
        url: 'team/getScore'
    })
}
// 队伍---获取队伍详情
export function getTeamInfo() {
    return request({
        method: 'get',
        url: 'team/getTeamInfo'
    })
}
// 队伍---获取人员详情
export function getTeamUserInfo(data) {
    return request({
        method: 'get',
        url: `team/getTeamUserInfo/${data}`
    })
}
// 队伍---获取战绩详情
export function getTeamScoreInfo(data) {
    return request({
        method: 'get',
        url: `team/getTeamScoreInfo/${data}`
    })
}


// 赛程--获取赛程详情
export function getCompetition() {
    return request({
        method: 'get',
        url: 'competition/getCompetition'
    })
}
// 赛程--新增赛程
export function addCompetition(data) {
    return request({
        method: 'post',
        url: 'competition/addCompetition',
        data
    })
}
// 赛程--删除赛程详情
export function delCompetition(data) {
    return request({
        method: 'get',
        url: `competition/delCompetition/${data}`
    })
}
// 赛程--编辑赛程详情
export function editCompetition(data) {
    return request({
        method: 'post',
        url: `competition/editCompetition`,
        data
    })
}

// 赛程--更新积分
export function changeIntegral(data) {
  return request({
    method: 'post',
    url: 'competition/changeIntegral',
    data
  })
}


// 赛程--录入技术统计时，获取两支球队人员
export function getTeamUser(data) {
    return request({
        method: 'post',
        url: 'competition/getTeamUser',
        data
    })
}

// 赛程--录入技术统计时，查看之前是否已录入(数据库是否已有数据)，如果有，获取数据
export function getTeamBehavior(data) {
  return request({
    method: 'get',
    url: `competition/getTeamBehavior/${data}`,
  })
}

// 赛程--录入两队的技术统计
export function editTeamBehavior(data) {
    return request({
        method: 'post',
        url: 'competition/editTeamBehavior',
        data
    })
}


// 消息通知--获取已发送通知
export function getNotify() {
    return request({
        method: 'get',
        url: 'notify/getNotify'
    })
}
// 消息通知--获取通知详情
export function getNotifyDetail(data){
  return request({
    method: 'post',
    url: 'notify/getNotifyDetail',
    data
  })
}
// 消息通知--发送通知
export function sendNotify(data) {
    return request({
        method: 'post',
        url: 'notify/sendNotify',
        data
    })
}
// 消息通知--删除通知
export function deleteNotify(data) {
  return request({
    method: 'post',
    url: 'notify/deleteNotify',
    data
  })
}

// 意见反馈--获取被反馈的意见
export function getOpinion() {
    return request({
        method: 'get',
        url: 'opinion/getOpinion'
    })
}
// 意见反馈--获取被反馈的意见
export function handleOpinion(data) {
    return request({
        method: 'get',
        url: `opinion/handleOpinion/${data}`
    })
}
// 意见反馈--删除意见反馈的接口
export function deleteOpinion(data) {
  return request({
    method: 'get',
    url: `opinion/deleteOpinion/${data}`,
  })
}

