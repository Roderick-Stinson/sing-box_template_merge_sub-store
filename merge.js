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

// 6. 自定义目标分组和过滤规则
const targetGroups = [
    { tag: "⚙️ 手动切换" },
    { tag: "🤖 AI", filter: /JNIX|小白/i },
    { tag: "🎥 海外流媒体" },
    { tag: "🗃️ PayPal" },
    { tag: "📟 Telegram" },
    { tag: "🇺🇸 America", filter: /美国|🇺🇸/i },
];

// 7. 给每个 group 分配节点
targetGroups.forEach(({ tag, filter }) => {
    const group = config.outbounds.find(
        (o) => o.tag === tag && Array.isArray(o.outbounds)
    );
    if (!group) return;

    const matched = filter
        ? allTags.filter((t) => filter.test(t))
        : allTags;

    group.outbounds = matched.length > 0 ? matched : ["🔄 直连入口"];
});

// 8. 输出最终配置
$content = JSON.stringify(config, null, 2);
