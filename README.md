## 电影日记

人们喜欢看电影
有的人是被电影的内容所吸引
有的人是因为看这场电影陪伴在她身边的人

不管是在电影院
还是在自己被窝里拿着手机看
电影总是会留给我们很多喜怒哀乐的时刻

是否想过把这些情感记录下来
写下一小段文字
在过了很长很长的时间之后重新去回顾
可能追忆到的不止是电影的内容

## 用到的技术工具

- react native
- native base样式组件
- expo

## 如何下载运行

1. 安装[Expo](https://expo.io/)
2. <code>git clone https://github.com/jielongink/movie-diary.git && cd movie-diary</code>
3. <code>yarn install && yarn start</code>,这里有可能需要获取root权限
4. 启动完毕之后按照提示操作就可以在<strong>Expo</strong>软件上运行<strong>电影日记</strong>
## 主要功能

### 电影搜索
- 通过调用豆瓣的电影接口，拿到电影的基本的信息。

<figure>
    <img src="https://a.photo/images/2018/02/25/161519546122_.pic_hd.png" alt="161519546122_.pic_hd.png" border="0" width="300px">
    <img src="https://a.photo/images/2018/02/25/151519546122_.pic.jpg" alt="151519546122_.pic.jpg" border="0" width="300px">
    <img src="https://a.photo/images/2018/02/25/141519546121_.pic.jpg" alt="141519546121_.pic.jpg" border="0" width="300px">
</figure>

### 展示部分
- 按照收藏的分类展示电影
- 日记按照自己看电影的时间线展示

<figure>
    <img src="https://a.photo/images/2018/02/25/131519546121_.pic.jpg" alt="131519546121_.pic.jpg" border="0" width="300px">
    <img src="https://a.photo/images/2018/02/25/121519546120_.pic.png" alt="121519546120_.pic.png" border="0" width="300px">
    <img src="https://a.photo/images/2018/02/25/111519546120_.pic.png" alt="111519546120_.pic.png" border="0" width="300px">
</figure>

### 电影日记
- 收藏自己喜欢的电影，记录看这场电影时发生的故事
- 收藏自己期待的电影，也可以期待下一起看的那个人

<figure>
    <img src="https://a.photo/images/2018/02/25/101519546119_.pic.jpg" alt="101519546119_.pic.jpg" border="0" width="300px">
</figure>

## 很多的问题未得到优化和解决

- [x] 电影搜索
- [x] 电影收藏
- [x] 电影日记的编辑
- [ ] 键盘会遮挡编辑中的光标
- [ ] 用户数据的存储，包括喜欢的电影和日记
- [ ] 数据状态管理会向Redux迁移解决props传递过深导致的各种响应过慢问题