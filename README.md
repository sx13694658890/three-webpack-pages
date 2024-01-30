
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