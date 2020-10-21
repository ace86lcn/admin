// 下载图片
const downloadImage = (imgsrc, name) => {
    var image = new Image()
    // 解决跨域 Canvas 污染问题
    image.setAttribute("crossOrigin", "anonymous")
    image.onload = function() {
        var canvas = document.createElement("canvas")
        canvas.width = image.width
        canvas.height = image.height;
        var context = canvas.getContext("2d")
        context.drawImage(image, 0, 0, image.width, image.height)
        //得到图片的base64编码数据
        var url = canvas.toDataURL("image/png") 
    
        // 生成一个a元素
        var a = document.createElement("a") 
        // 创建一个单击事件
        var event = new MouseEvent("click") 
        // 设置图片名称
        a.download = name || "photo" 
        // 将生成的URL设置为a.href属性
        a.href = url 
        // 触发a的单击事件
        a.dispatchEvent(event) 
    };
    image.src = imgsrc
}


export {
    downloadImage
}