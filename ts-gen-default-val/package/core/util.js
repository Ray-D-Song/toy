import fs from 'fs'

const logFilePath = '/Users/ray-d-song/codebase/toy/ts-gen-default-val/dist/demo.log'

Date.prototype.format = function(fmt) { 
  var o = { 
     "M+" : this.getMonth()+1,                 //月份 
     "d+" : this.getDate(),                    //日 
     "h+" : this.getHours(),                   //小时 
     "m+" : this.getMinutes(),                 //分 
     "s+" : this.getSeconds(),                 //秒 
     "q+" : Math.floor((this.getMonth()+3)/3), //季度 
     "S"  : this.getMilliseconds()             //毫秒 
 }; 
 if(/(y+)/.test(fmt)) {
         fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
 }
  for(var k in o) {
     if(new RegExp("("+ k +")").test(fmt)){
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
      }
  }
 return fmt; 
}    

export function recordLog(content) {
  const logContent = `
${new Date().format('yyyy-MM-dd hh:mm:ss')}
${JSON.stringify(content, '', '\t')}

  `
  fs.appendFileSync(logFilePath, logContent)
}

export function logWarn(arg) {
  console.log('\x1b[33m%s\x1b[0m', arg)
  recordLog(arg)
}

export function logError(arg) {
  console.log('\x1b[31m%s\x1b[0m', arg)
  recordLog(arg)
}