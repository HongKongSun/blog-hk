

function tokbfun(val){//转化文件大小
  let size = ""
  let limit = parseInt(val)
  if(limit < 0.1*1024){
    size = limit.toFixed(2) + "B"
  }else if(limit < 0.1 * 1024 * 1024){
    size = (limit/1024).toFixed(2) + "KB"
  }else if(limit < 0.1 * 1024 * 1024 * 1024){
    size = Math.floor(limit/(1024 * 1024)*100)/100 + "MB"
  }else{ 
     size = (limit/(1024 * 1024 * 1024)).toFixed(2) + "GB"
  }

  let sizeStr = size + ""
  let index = sizeStr.indexOf(".")
  let dou = sizeStr.substr(index + 1 ,2)  
  if(dou == "00"){                               
    return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
  }
  return size;
}


function setfileicon(filename){//计算文件图标
  let dotpost = filename.lastIndexOf('.')
  let filelastname = filename.substring(dotpost+1)
  filelastname = filelastname.toLowerCase()
  const urladdress = 'https://storage.jd.com/jddbucket/cn_static/images/'
  switch(filelastname){
    case 'txt':
      // return require('@/assets/images/upfilesimg/'+ 'filetxt.png')

      return "https://img11.360buyimg.com/imagetools/jfs/t1/119031/37/16588/256/5f4dbc6cE3c0b56bd/634d35ed377794ec.png"
      break;
    case 'pdf':
      // return require('@/assets/images/upfilesimg/' + 'filepdf.png')
      return "https://img12.360buyimg.com/imagetools/jfs/t1/122466/34/11586/496/5f4dbc6cE35c6d8c9/c64d8c574b94789e.png"
      break;
    case 'ppt' :
      // return require('@/assets/images/upfilesimg/' + 'fileppt.png')
      return "https://img14.360buyimg.com/imagetools/jfs/t1/135744/21/8734/346/5f4dbc6cE06d38000/1acb82ba027e33f6.png"
      break;

    case 'docx':
    case 'doc':
      // return require('@/assets/images/upfilesimg/' + 'fileword.png')
      return "https://img12.360buyimg.com/imagetools/jfs/t1/146174/37/7313/512/5f4dbc6cEf7d3d381/96744c5b3ad81a03.png"
      break;

    case 'xlsx':
    case 'xls':
      // return require('@/assets/images/upfilesimg/' + 'filexlsx.png')
      return "https://img11.360buyimg.com/imagetools/jfs/t1/112760/29/16814/479/5f4dbc6cE897ef464/dcb568848ccbfc5d.png"
      break;

    case 'zip':
    case 'rar':
    case '7z':
      // return require('@/assets/images/upfilesimg/' + 'filezip.png')
      return "https://img10.360buyimg.com/imagetools/jfs/t1/121197/19/11429/273/5f4dbc6cE68e86279/55458e9b091c4ddd.png"
      break;
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'bmp':
    case 'pic':
      // return require('@/assets/images/upfilesimg/' + 'fileimg.png')
      return "https://img12.360buyimg.com/imagetools/jfs/t1/39189/10/13395/455/5f4dbc6cE361db633/cb490f4a8f3d2427.png"
      break;

    default:
      // return require('@/assets/images/upfilesimg/' + 'filedefault.png')
      return "https://img13.360buyimg.com/imagetools/jfs/t1/149673/2/7424/227/5f4dbc6cE36aa18f5/908354496a55505d.png"
  }
}

export default{
  tokbfun,
  setfileicon
}