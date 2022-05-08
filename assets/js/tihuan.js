$.ajaxPrefilter(function(options){
    options.url ="http://www.liulongbin.top:3007"+options.url


if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
  } }

  options.complete = function (tgg) {
    console.log(tgg);
  
    if (tgg.responseJSON.status === 1 && tgg.responseJSON.message === '身份认证失败！') {
      location.href = 'index.html'
      localStorage.removeItem('token')
     
      
    }
  }
})
    