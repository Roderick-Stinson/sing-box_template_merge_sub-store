# sing-box_template_merge_sub-store

## 使用说明
本项目所搭载的js脚本，必须在sub-store内使用，仅测试了项目中的singbox模板，未测试其他模板，该模板官方1.12内核一定可以使用，其余版本未测试。

## 使用步骤
1. 在sub-store上传singbox_template.json
2. 记住在sub-store中你的单条订阅或组合订阅的名称
3. 在sub-store的文件管理功能中编辑singbox_template.json 添加一个脚本操作，并且选择链接：
```
[https://raw.githubusercontent.com/Roderick-Stinson/sing-box_template_merge_sub-store/refs/heads/main/merge.js#name=<你在sub-store中的订阅名称>&type=<在sub-store中的订阅类型>#noCache]
```
type可以赋值0或1,0表示单条订阅，1表示组合订阅

4. 添加脚本操作后再次访问sub-store中的singbox_template.json，就已经是把节点信息正确插入的完整可用配置了

## 鸣谢
这段js脚本是由chatgpt参考[xishang0128](https://github.com/xishang0128)大佬所写
