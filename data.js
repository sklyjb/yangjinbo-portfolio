/* ============================================================
   作品集内容配置 —— 只需要改这里

   title : 作品标题（卡片上那一行，尽量 12 字以内）
   desc  : 作品描述（标题下面的小字，一两句话）
   img   : 图片文件名，不要动（换图才改，改完要一起换 assets 里的图）

   想调整顺序：把整行 { ... }, 剪切到想放的位置即可
   想换分组：把整行移到另一个数组里
   改完保存，网站 1 分钟内自动更新
   ============================================================ */

window.PORTFOLIO = {
  sections: {
    poster: [
      { img: "poster-course-99", r: 1.0, title: "2026 实践课程主视觉", desc: "限时 99 元课程促销海报，价格锚点与赠品模块一眼可读" },
      { img: "poster-diagnosis-1980", r: 0.977, title: "用工调研诊断 · 价格海报", desc: "深蓝底 + 红色价格条，把 1980 与万元原价拉开对比" },
      { img: "poster-9-systems", r: 1.0, title: "九大管控系统 · 信息图", desc: "九宫格环状结构，把抽象的风控体系讲成一张图" },
      { img: "poster-acquire", r: 1.779, title: "破局获客 · 精准转化", desc: "红金人物海报，讲师形象 + 时间地点信息层级" },
      { img: "poster-illegal", r: 1.477, title: "公司的 9 大违法行为", desc: "红金警示风长图，条目式排版方便手机端阅读" },
      { img: "poster-harmony", r: 1.0, title: "和谐用工 · 安全增长", desc: "人像 + 大标题的讲师个人品牌海报" },
      { img: "poster-arbitration", r: 1.654, title: "劳动者去仲裁更容易了", desc: "金色插画风，把政策变化做成可传播的视觉结论" },
      { img: "poster-annual", r: 0.971, title: "年度成绩单 · 红金流体", desc: "红金流体背景承载 60% / 15+ / 18 万数据，节日营销长图" },
      { img: "poster-civil", r: 1.0, title: "公务员面试课程主图", desc: "电商主图直通车位，蓝白清爽风突出课程卖点" },
      { img: "poster-reverse", r: 1.719, title: "反向营销 · 讲师海报", desc: "深色底 + 金色人物，做高客单课程的质感表达" },
      { img: "poster-xhs", r: 1.0, title: "年终年会 · 小红书封面", desc: "AIGC 辅助的红金年会视觉，成套封面统一版式" },
      { img: "poster-vocational", r: 2.076, title: "成人职业教育招生长图", desc: "商务风长图，招生信息分区块递进" },
      { img: "poster-yancheng", r: 2.597, title: "盐城商会 · 风险破局解析", desc: "商会渠道长图海报，政策解读型内容排版" },
      { img: "poster-finance", r: 2.459, title: "金融保险课程直播预告", desc: "手机端竖版预告，深蓝科技感背景" },
    ],
    detail: [
      { img: "detail-0307", r: 3.744, title: "课程详情长页", desc: "节气 + 课程卖点的长图承接页" },
      { img: "detail-march", r: 7.955, title: "3 月课程内页", desc: "横版内页排版，图文分区承载课程大纲" },
      { img: "detail-413", r: 6.371, title: "4.13 课程详情页", desc: "整屏长图详情页，卖点—大纲—讲师—报名四段式" },
      { img: "detail-hr", r: 7.886, title: "人力资源详情页", desc: "招生详情页长图，用章节头做节奏切分" },
      { img: "detail-new", r: 6.592, title: "详情页新版", desc: "改版后的长图详情页，信息密度与留白重新配比" },
      { img: "detail-content", r: 16.009, title: "课程详细内容页", desc: "把课程内容拆成可扫读的模块化长图" },
      { img: "detail-credit", r: 2.967, title: "金融征信科普长图", desc: "科普型长图，数据与流程图混合排版" },
      { img: "detail-book", r: 4.44, title: "创华中企画册内页", desc: "品牌画册的跨页版式，图文比例克制" },
    ],
    live: [
      { img: "live-bg-1", r: 1.778, title: "直播间背景 01", desc: "竖版直播间背景，人像位与信息区预留" },
      { img: "live-bg-2", r: 1.778, title: "直播间背景 02", desc: "同系列第二版，深蓝底 + 金色标题条" },
      { img: "live-bg-3", r: 1.778, title: "直播间背景 03", desc: "留白版背景，适配不同直播机位" },
      { img: "live-bg-4", r: 1.778, title: "直播间背景 04", desc: "深色版背景，右侧信息区做卖点轮播位" },
      { img: "live-moments", r: 1.0, title: "朋友圈封面 · 讲师个人号", desc: "个人 IP 朋友圈封面，头像位与身份标签" },
      { img: "live-xhs-2", r: 1.0, title: "小红书套装 02", desc: "年会主题小红书图集，统一色系与版式" },
      { img: "live-xhs-3", r: 1.0, title: "小红书套装 03", desc: "同一套视觉的第三张，信息承接" },
      { img: "live-h5-01", r: 1.856, title: "H5 长页 · 封面", desc: "易企秀 H5 首屏，品牌色贯穿整页" },
      { img: "live-h5-08", r: 1.874, title: "H5 长页 · 讲师页", desc: "H5 内页讲师介绍模块" },
      { img: "live-h5-13", r: 1.757, title: "H5 长页 · 服务体系", desc: "H5 内页服务体系图示页" },
      { img: "live-h5-26", r: 1.632, title: "H5 长页 · 合作企业", desc: "H5 尾部合作企业墙上墙页" },
    ],
    brand: [
      { img: "brand-logo-h", r: 0.317, title: "标识组合 · 横版", desc: "创华咨询集团横版标识组合规范" },
      { img: "brand-logo-v", r: 0.779, title: "标识组合 · 竖版", desc: "竖版标识组合，用于易拉宝与展板" },
      { img: "brand-logo-mark", r: 1.0, title: "图形标识", desc: "盾形 + 上升箭头的核心图形" },
      { img: "brand-wall", r: 0.735, title: "公司形象墙", desc: "办公室形象墙的整墙视觉方案" },
      { img: "brand-board", r: 0.551, title: "展板", desc: "展板版式，图文信息分区" },
      { img: "brand-elevator", r: 1.333, title: "电梯海报", desc: "电梯框架广告，讲师形象 + 主张" },
      { img: "brand-brochure-1", r: 0.682, title: "双折页 01", desc: "双折页画册版式，左文右图" },
      { img: "brand-cards-01", r: 1.543, title: "品牌扑克牌 · 方片 A", desc: "54 张法律知识扑克牌，把知识点做成收藏物料" },
      { img: "brand-cards-02", r: 1.543, title: "品牌扑克牌 · 黑桃 A", desc: "同系列第二张，图形与文案一一对应" },
      { img: "brand-cards-03", r: 1.543, title: "品牌扑克牌 · 方片 Q", desc: "牌面留白与印章式角标是整套的识别点" },
      { img: "brand-rollup-hall", r: 2.25, title: "KT 板 · 二楼多功能厅", desc: "活动现场导视，红金主色沿用品牌体系" },
      { img: "brand-rollup-1", r: 2.5, title: "讲师易拉宝", desc: "讲师个人易拉宝，蓝金配色统一" },
      { img: "brand-rollup-sign", r: 2.5, title: "签到处易拉宝", desc: "活动签到导视，大字号远距离可读" },
      { img: "brand-spray-1", r: 0.75, title: "喷绘 · 塾长学堂", desc: "大幅喷绘背景墙，橙色版式" },
      { img: "brand-spray-2", r: 0.6, title: "喷绘 · 读书会", desc: "读书会活动背景墙，图文并列" },
    ],
  },

  videos: [
    { img: "event", r: 0.547, ratio: "16:9", dur: "01:31", title: "活动跟拍 · 用工合规座谈会", desc: "新司法实践下企业用工合规座谈会，现场跟拍 + 会后剪辑" },
    { img: "ip", r: 2.181, ratio: "9:16", dur: "01:30", title: "讲师 IP · 竖版短视频", desc: "帅帅老师说用工：标题条 + 字幕 + 人设统一，可批量复用" },
  ],
};
