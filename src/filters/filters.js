export function getDate(time){
    let d = new Date(time)
    let times = d.getFullYear() +'-'+ ((d.getMonth()+1)<10?'0'+(d.getMonth()+1):(d.getMonth()+1)) +'-'+ ((d.getDate())<10?'0'+(d.getDate()):(d.getDate())) +' '+ ((d.getHours())<10?'0'+(d.getHours()):(d.getHours())) +':'+ ((d.getMinutes())<10?'0'+(d.getMinutes()):(d.getMinutes())) +':'+ ((d.getSeconds())<10?'0'+(d.getSeconds()):(d.getSeconds()))
    return times
};

export function getBirthday(data){
    //日期时间处理
    function conver(s) {
        return s < 10 ? '0' + s : s;
    }
    if (data === null){
        return ''
    }else {
        let myDate = new Date(data)
        let year = myDate.getFullYear()
        let month = myDate.getMonth()+1
        let date = myDate.getDate()
        let dates = year + '-' + conver(month) + "-" + conver(date)
        return dates
    }

}

export function getIdentity(identity) {
    switch (identity) {
        case '1': return '队长'; break;
        case '0': return '队员'; break;
        case '-1': return '观众'; break;
    }
}

export function statusFilter(status){
    switch (status) {
        case 1: return '已结束'; break;
        case 0: return '未开始'; break;
    }
}

export function statusStyleFilter(status){
    switch (status) {
        case 1: return 'danger'; break;
        case 0: return 'info'; break;
    }
}