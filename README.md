
### Grunt
Grunt (https://gruntjs.com)和NpmScript类似

### Gulp
Gulp (http://gulpjs.com)是一个基于流的自动化构建工具。

### Fis3
Fis3 （https://fex.baidu.com/fis3/)是一个来自百度的优秀国产构建工具。



#### 检测工具
lil-gui (https://lil-gui.georgealways.com/)


#####  Three 弃用的API

https://jsrun.net/t/g3pKp



#### MeshFaceMaterial 材质 
在新版 three.js 中已经不存在这种材质了，因为原则上来讲，旧版中的 MeshFaceMaterial 材质其实就是一个材质数组。 
需要为物体的每一个面单独指定材质



_three.Geometry在新版本被删除

BufferGeometryUtils.mergeBufferGeometries
在最新版本的three.js中 BufferGeometryUtils.mergeBufferGeometries() 真正实现了将多个mesh合并为一个mesh(联合体)，且可以使用多个Material（材质），使其渲染的速度大大提升。【老版本里是Three.Geometry.merge】。


#### dracoLoader setDRACOPath 解析
draco_decoder.js— Emscripten 编译的解码器，与任何现代浏览器兼容。
draco_decoder.wasm— WebAssembly 解码器，与较新的浏览器和设备兼容。
draco_wasm_wrapper.js— WASM 解码器的 JavaScript 包装器。

1. OBJ 和 MTL 格式
OBJ 和MTL是相互配合的两种格式，经常一起使用。OBJ 文件定义几何体，而MTL 文件定义所用的材质



##### TWEEN 
easing 的表现
https://tweenjs.github.io/tween.js/examples/03_graphs.html


 http://oos.moxiecode.com/js_webgl/md2_converter/