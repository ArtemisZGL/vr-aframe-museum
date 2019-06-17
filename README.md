# VR-MUSEUM
  这个项目实现的主要是通过VR技术来浏览一个博物馆的demo。  
  主要用到的技术是aframe，通过aframe加载模型，然后进行光照和阴影的设置，并通过aframe-teleport-controls这个组件进行手机上的导航。

## a-frame粗浅的理解
A-Frame 是一个用来构建虚拟现实（VR）应用的网页开发框架,基于HTML,核心思想是基于Three.js来提供一个声明式、可扩展以及组件化的编程结构。简而言之，就是其通过包装好各种vr场景中用到的组件，像几何模型加载渲染, 材料, 光线, 动画, 模式, 光线投射, 阴影等，然后我们就可以通过html中的组件标签进行简单的使用，并配以适当的属性。

主要的结构是  
```html
<a-scene>
    <a-assets>
        <!--在其中加载一些资源如模型，图片，音频-->
    </a-assets>

    <!--定义各种实体，如模型，光照，天空盒等-->
    <a-entity></a-entity>

</a-scene>
```

## 模型加载
我们用到的模型的格式主要为obj格式和gltf格式（GL传输格式(简称glTF)是一种针对GL(WebGL，OpenGL ES以及OpenGL)接口的运行时资产(asset)。在3D内容的传输和加载中，glTF通过提供一种高效，易扩展，可协作的格式，填补了3D建模工具和现代GL应用之间的空白。）。  

然后根据a-frame提供的标签
```
<a-entity gltf-model="#sculture8" position="-9 8 -6" rotation="0 -90 0"></a-entity>
```
中 gltf-model 属性或者 obj-model属性 进行 gltf格式或者是obj格式的模型进行加载，并通过position，scale，rotation等属性进行模型的摆放。

## 阴影和光照
可以通过light属性来添加各种类型的光源，像point，direction，ambient等，并且设置光源的颜色，强度等属性，至于阴影的话除了在光源的属性中添加castshadow为true以外，还要在想接收阴影的entity标签中添加shadow：cast=true来接收阴影。

```html
<a-entity light="type: ambient; intensity: 0.4;"></a-entity>
<a-entity light="type: point;
                castShadow: true;
                intensity: 0.55;"
            position="0 4 0"></a-entity>

<a-entity gltf-model="#room" scale="0.02 0.02 0.02" position="0 -0.5 0" shadow="cast: true"></a-entity>
```

## 导航
导航的话我们主要分成两个部分，在电脑上打开是可以直接通过wsad和鼠标的拖拽进行位置和视角的移动。而在手机上可以支持使用Cardboard来进行分屏的VR显式，通过aframe-teleport-controls组件，在地上放置checkpoint，通过光标对准checkpoint来进行移动。主要就是利用了aframe中的组件的思想，自己用js编写一个组件，进行注册之后就可以在html中通过enity标签使用了。然后在其中通过AFRAME.utils.device.isMobile() 判断是否为手机，通过类似dom的操作插入不同类型的camera和
aframe-teleport-controls提供的checkpoint组件。
