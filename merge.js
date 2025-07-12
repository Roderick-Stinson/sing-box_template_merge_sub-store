const { name, type } = $arguments;

// 1. 加载模板
let config = JSON.parse($files[0]);

// 2. 拉取订阅或合集节点
let proxies = await produceArtifact({
    name,
    type: /^1$|col/i.test(type) ? "collection" : "subscription",
    platform: "sing-box",
    produceType: "internal",
});

// 3. 去重：过滤掉 tag 冲突的节点
const existingTags = config.outbounds.map((o) => o.tag);
proxies = proxies.filter((p) => !existingTags.includes(p.tag));

// 4. 添加到 outbounds
config.outbounds.push(...proxies);

// 5. 获取新节点 tag 列表
const allTags = proxies.map((p) => p.tag);

// 7. 将所有节点添加到除 direct 外的 selector 分组中
const proxyTags = proxies.map(p => p.tag);

config.outbounds.forEach(o => {
    if (o.type === "selector" && o.tag !== "🔄 直连入口") {
        o.outbounds = proxyTags.length > 0 ? proxyTags : ["🔄 直连入口"];
    }
});


// 8. 输出最终配置
$content = JSON.stringify(config, null, 2);
