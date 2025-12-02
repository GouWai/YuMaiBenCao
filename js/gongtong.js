// 网页加载完成后执行
window.addEventListener('load', function() {
    // 页面加载动画
    document.body.classList.add('loaded');
    
    // 初始化滚动动画
    initScrollAnimations();
    
    // 初始化卡片交互
    initCardInteractions();
    
    // 初始化Banner按钮交互
    initBannerButton();
    
    // 初始化平滑滚动
    initSmoothScroll();
});

// 初始化滚动动画
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });
    
    // 特殊动画元素
    const specialElements = document.querySelectorAll('.highlight-item, .virtue-item, .medicine-card');
    
    const specialObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, Math.random() * 300);
                specialObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    specialElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        specialObserver.observe(element);
    });
    
    // 时间线动画
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
                timelineObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        if (index % 2 === 0) {
            item.style.transform = 'translateX(-30px)';
        } else {
            item.style.transform = 'translateX(30px)';
        }
        item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        timelineObserver.observe(item);
    });
}

// 初始化卡片交互
function initCardInteractions() {
    // 故事卡片交互
    const storyCards = document.querySelectorAll('.story-card');
    storyCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)';
        });
    });
    
    // 药材卡片交互增强
    const medicineCards = document.querySelectorAll('.medicine-card');
    medicineCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.medicine-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.boxShadow = '0 6px 16px rgba(44, 110, 73, 0.4)';
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.medicine-icon');
            icon.style.transform = 'scale(1) rotate(0)';
            icon.style.boxShadow = '0 4px 12px rgba(44, 110, 73, 0.3)';
        });
    });
}

// 初始化Banner按钮交互
function initBannerButton() {
    const bannerBtn = document.querySelector('.banner-btn');
    if (bannerBtn) {
        bannerBtn.addEventListener('click', () => {
            bannerBtn.style.transform = 'scale(0.95) translateY(-1px)';
            setTimeout(() => {
                bannerBtn.style.transform = 'scale(1) translateY(-3px)';
                // 点击按钮后平滑滚动到内容区域
                document.querySelector('.container').scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }, 100);
        });
    }
}

// 初始化平滑滚动
function initSmoothScroll() {
    // 为所有内部链接添加平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }
        });
    });
}

// 返回顶部按钮功能
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerText = '↑';
    backToTopBtn.id = 'backToTop';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #2c6e49, #3fa36b);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(44, 110, 73, 0.3);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ 
            top: 0, 
            behavior: 'smooth' 
        });
    });
    
    backToTopBtn.addEventListener('mouseenter', () => {
        backToTopBtn.style.transform = 'translateY(-3px) scale(1.05)';
        backToTopBtn.style.boxShadow = '0 8px 20px rgba(44, 110, 73, 0.4)';
    });
    
    backToTopBtn.addEventListener('mouseleave', () => {
        backToTopBtn.style.transform = 'translateY(0) scale(1)';
        backToTopBtn.style.boxShadow = '0 4px 12px rgba(44, 110, 73, 0.3)';
    });
}

// 当页面完全加载后初始化返回顶部按钮
window.addEventListener('load', initBackToTop);

// 监听窗口大小变化，调整响应式布局
window.addEventListener('resize', function() {
    // 对于时间线在小屏幕上的调整
    if (window.innerWidth < 768) {
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            item.style.justifyContent = 'flex-start';
            const content = item.querySelector('.timeline-content');
            if (content) {
                content.style.marginLeft = '40px';
                content.style.textAlign = 'left';
                content.style.width = 'calc(100% - 60px)';
            }
        });
    }
});

// 图片懒加载
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    image.removeAttribute('data-src');
                    imageObserver.unobserve(image);
                }
            });
        });
        
        lazyImages.forEach(image => {
            imageObserver.observe(image);
        });
    } else {
        // 回退方案
        lazyImages.forEach(image => {
            image.src = image.dataset.src;
            image.removeAttribute('data-src');
        });
    }
};

// 初始化图片懒加载
window.addEventListener('load', initLazyLoading);

// ====================== AI对话助手功能 ======================

// 全局变量
let chatDialogVisible = false;

// 预定义AI回答
const aiAnswers = {
    // 问候语
    "你好": "你好！我是大禹，很高兴为您服务。请问您有什么症状或需求吗？我可以为您推荐合适的产品。",
    "您好": "您好！我是大禹，很高兴为您服务。请问您有什么症状或需求吗？我可以为您推荐合适的产品。",
    "早上好": "早上好！我是大禹，很高兴为您服务。请问您有什么症状或需求吗？我可以为您推荐合适的产品。",
    "晚上好": "晚上好！我是大禹，很高兴为您服务。请问您有什么症状或需求吗？我可以为您推荐合适的产品。",
    "嗨": "嗨！我是大禹，很高兴为您服务。请问您有什么症状或需求吗？我可以为您推荐合适的产品。",
    "哈喽": "哈喽！我是大禹，很高兴为您服务。请问您有什么症状或需求吗？我可以为您推荐合适的产品。",
    
    // 引导性问题
    "需要什么帮助": "请问您有什么症状或需求吗？比如失眠、咳嗽、气血不足等，我可以为您推荐合适的产品。",
    "有什么可以帮忙的": "请问您有什么症状或需求吗？比如失眠、咳嗽、气血不足等，我可以为您推荐合适的产品。",
    
    // 产品推荐相关
    "失眠": "您可以试试我们的酸枣仁晚安茶，它含有酸枣仁、茯苓、百合等成分，有助于改善睡眠质量。您可以在淘宝店铺购买，点击这里了解更多：<a href='https://m.tb.cn/h.SrxLnZUUnzcUod1' target='_blank' style='color: #2c6e49; text-decoration: underline;'>淘宝店铺</a>",
    "睡眠不好": "您可以试试我们的酸枣仁晚安茶，它含有酸枣仁、茯苓、百合等成分，有助于改善睡眠质量。您可以在淘宝店铺购买，点击这里了解更多：<a href='https://m.tb.cn/h.SrxLnZUUnzcUod1' target='_blank' style='color: #2c6e49; text-decoration: underline;'>淘宝店铺</a>",
    "咳嗽": "如果您有咳嗽症状，推荐您使用我们的一勺梨膏，它采用传统配方，能够润喉止咳。您可以在淘宝店铺购买，点击这里了解更多：<a href='https://m.tb.cn/h.SrxLnZUUnzcUod1' target='_blank' style='color: #2c6e49; text-decoration: underline;'>淘宝店铺</a>",
    "喉咙痛": "喉咙痛可以试试我们的一勺梨膏，它具有润喉的功效。您可以在淘宝店铺购买，点击这里了解更多：<a href='https://m.tb.cn/h.SrxLnZUUnzcUod1' target='_blank' style='color: #2c6e49; text-decoration: underline;'>淘宝店铺</a>",
    "气血不足": "气血不足推荐您使用红参玫瑰女神茶，它含有红参、玫瑰、红枣等成分，能够补气血。您可以在淘宝店铺购买，点击这里了解更多：<a href='https://m.tb.cn/h.SrxLnZUUnzcUod1' target='_blank' style='color: #2c6e49; text-decoration: underline;'>淘宝店铺</a>",
    "月经不调": "月经不调可以试试红参玫瑰女神茶，它含有红参、玫瑰、红枣等成分，有助于调理月经。您可以在淘宝店铺购买，点击这里了解更多：<a href='https://m.tb.cn/h.SrxLnZUUnzcUod1' target='_blank' style='color: #2c6e49; text-decoration: underline;'>淘宝店铺</a>",
    "祛湿": "祛湿推荐您使用二十八味足浴包，通过泡脚的方式帮助身体祛湿。您可以在淘宝店铺购买，点击这里了解更多：<a href='https://m.tb.cn/h.SrxLnZUUnzcUod1' target='_blank' style='color: #2c6e49; text-decoration: underline;'>淘宝店铺</a>",
    "疲劳": "疲劳时可以试试亚麻籽无花果茶，它含有丰富的营养成分，能够补充能量。您可以在淘宝店铺购买，点击这里了解更多：<a href='https://m.tb.cn/h.SrxLnZUUnzcUod1' target='_blank' style='color: #2c6e49; text-decoration: underline;'>淘宝店铺</a>",
    "解酒": "解酒推荐您使用挡酒令，它含有葛根、枳椇子等成分，有助于解酒护肝。您可以在淘宝店铺购买，点击这里了解更多：<a href='https://m.tb.cn/h.SrxLnZUUnzcUod1' target='_blank' style='color: #2c6e49; text-decoration: underline;'>淘宝店铺</a>",
    "清热降火": "清热降火可以试试竹蔗茅根雪梨茶，它具有清热解暑的功效。您可以在淘宝店铺购买，点击这里了解更多：<a href='https://m.tb.cn/h.SrxLnZUUnzcUod1' target='_blank' style='color: #2c6e49; text-decoration: underline;'>淘宝店铺</a>",
    "美容养颜": "美容养颜推荐您使用红参玫瑰女神茶，它含有红参、玫瑰、红枣等成分，能够养颜美容。您可以在淘宝店铺购买，点击这里了解更多：<a href='https://m.tb.cn/h.SrxLnZUUnzcUod1' target='_blank' style='color: #2c6e49; text-decoration: underline;'>淘宝店铺</a>",
    "养颜": "养颜推荐您使用红参玫瑰女神茶，它含有红参、玫瑰、红枣等成分，能够养颜美容。您可以在淘宝店铺购买，点击这里了解更多：<a href='https://m.tb.cn/h.SrxLnZUUnzcUod1' target='_blank' style='color: #2c6e49; text-decoration: underline;'>淘宝店铺</a>",
    "明目": "明目可以试试青桔柠檬百香果茶，它含有丰富的维生素C和其他营养成分，有助于明目。您可以在淘宝店铺购买，点击这里了解更多：<a href='https://m.tb.cn/h.SrxLnZUUnzcUod1' target='_blank' style='color: #2c6e49; text-decoration: underline;'>淘宝店铺</a>",
    
    // 症状相关
    "湿气重": "湿气重会导致身体沉重、疲劳等症状。您可以使用二十八味足浴包，它由28种天然中药材制成，具有祛湿散寒的功效。您可以在淘宝店铺购买，点击这里了解更多：<a href='https://m.tb.cn/h.SrxLnZUUnzcUod1' target='_blank' style='color: #2c6e49; text-decoration: underline;'>淘宝店铺</a>",
    "便秘": "便秘可能是由于肠道蠕动减慢引起的，您可以尝试饮用亚麻籽无花果茶。它含有丰富的膳食纤维，有助于润肠通便。您可以在淘宝店铺购买，点击这里了解更多：<a href='https://m.tb.cn/h.SrxLnZUUnzcUod1' target='_blank' style='color: #2c6e49; text-decoration: underline;'>淘宝店铺</a>",
    
    // 产品相关
    "酸枣仁晚安茶": "酸枣仁晚安茶是一种有助于改善睡眠质量的茶饮，主要成分包括酸枣仁、桂圆、枸杞等。适合失眠、多梦、易醒的人群饮用。您可以在淘宝店铺购买，点击这里了解更多：<a href='https://m.tb.cn/h.SrxLnZUUnzcUod1' target='_blank' style='color: #2c6e49; text-decoration: underline;'>淘宝店铺</a>",
    "一勺梨膏": "一勺梨膏是由梨、百合、贝母等天然食材熬制而成，具有润肺止咳、生津止渴的功效。适合喉咙干燥、咳嗽的人群食用。您可以在淘宝店铺购买，点击这里了解更多：<a href='https://m.tb.cn/h.SrxLnZUUnzcUod1' target='_blank' style='color: #2c6e49; text-decoration: underline;'>淘宝店铺</a>",
    "红参玫瑰女神茶": "红参玫瑰女神茶是专为女性设计的养生茶，含有红参、玫瑰、红枣等成分，具有补气养血、美容养颜的功效。适合气血不足、面色苍白的女性饮用。您可以在淘宝店铺购买，点击这里了解更多：<a href='https://m.tb.cn/h.SrxLnZUUnzcUod1' target='_blank' style='color: #2c6e49; text-decoration: underline;'>淘宝店铺</a>",
    "二十八味足浴包": "二十八味足浴包是由28种天然中药材制成，具有祛湿散寒、活血化瘀、改善睡眠的功效。适合手脚冰凉、湿气重、失眠的人群使用。您可以在淘宝店铺购买，点击这里了解更多：<a href='https://m.tb.cn/h.SrxLnZUUnzcUod1' target='_blank' style='color: #2c6e49; text-decoration: underline;'>淘宝店铺</a>",
    "亚麻籽无花果茶": "亚麻籽无花果茶含有丰富的膳食纤维和Omega-3脂肪酸，具有润肠通便、调节血脂的功效。适合便秘、血脂偏高的人群饮用。您可以在淘宝店铺购买，点击这里了解更多：<a href='https://m.tb.cn/h.SrxLnZUUnzcUod1' target='_blank' style='color: #2c6e49; text-decoration: underline;'>淘宝店铺</a>",
    "挡酒令": "挡酒令是一种解酒护肝的茶饮，主要成分包括葛根、枳椇子、菊花等，具有解酒醒酒、保护肝脏的功效。适合饮酒前后饮用。您可以在淘宝店铺购买，点击这里了解更多：<a href='https://m.tb.cn/h.SrxLnZUUnzcUod1' target='_blank' style='color: #2c6e49; text-decoration: underline;'>淘宝店铺</a>",
    "竹蔗茅根雪梨茶": "竹蔗茅根雪梨茶具有清热解暑的功效。您可以在淘宝店铺购买，点击这里了解更多：<a href='https://m.tb.cn/h.SrxLnZUUnzcUod1' target='_blank' style='color: #2c6e49; text-decoration: underline;'>淘宝店铺</a>",
    "青桔柠檬百香果茶": "青桔柠檬百香果茶含有丰富的维生素C和其他营养成分，有助于明目、增强免疫力。您可以在淘宝店铺购买，点击这里了解更多：<a href='https://m.tb.cn/h.SrxLnZUUnzcUod1' target='_blank' style='color: #2c6e49; text-decoration: underline;'>淘宝店铺</a>",
    
    // 品牌相关
    "禹脉本草": "禹脉本草致力于传承中医药文化精髓，通过创新方式让千年中医药智慧惠及现代生活。我们的产品包括茶饮、膏方、足浴包等，所有产品都采用优质原料，严格遵循传统工艺制作。",
    "禹州": "禹州是千年药都，拥有深厚的中医药文化底蕴，孕育出'禹白芷、禹南星、禹白附、禹密二花、禹丹参、禹山药'六大地理标志药材，印证了'药不到禹州不香'的美誉。",
    "黄帝内经": "《黄帝内经》是中国最早的医学典籍，成书于战国至秦汉时期，是中医药理论体系的基石。这部伟大著作蕴含着深邃的哲学思想，其中'天人合一'、'阴阳平衡'等核心理论，构建了中医药独特的思维方式。",
    "孙思邈": "孙思邈（541年-682年），唐代著名医学家，被后人尊称为'药王'。他编撰《千金要方》《千金翼方》两部医学巨著，首次系统提出'大医精诚'的医德准则，影响后世医者千余年。",
    
    // 购买渠道
    "淘宝": "您可以在淘宝店铺购买我们的产品，点击这里直接进入：<a href='https://m.tb.cn/h.SrxLnZUUnzcUod1' target='_blank' style='color: #2c6e49; text-decoration: underline;'>禹脉本草淘宝店铺</a>",
    "购买": "您可以在淘宝店铺购买我们的产品，点击这里直接进入：<a href='https://m.tb.cn/h.SrxLnZUUnzcUod1' target='_blank' style='color: #2c6e49; text-decoration: underline;'>禹脉本草淘宝店铺</a>",
    "怎么买": "您可以在淘宝店铺购买我们的产品，点击这里直接进入：<a href='https://m.tb.cn/h.SrxLnZUUnzcUod1' target='_blank' style='color: #2c6e49; text-decoration: underline;'>禹脉本草淘宝店铺</a>",
    "哪里买": "您可以在淘宝店铺购买我们的产品，点击这里直接进入：<a href='https://m.tb.cn/h.SrxLnZUUnzcUod1' target='_blank' style='color: #2c6e49; text-decoration: underline;'>禹脉本草淘宝店铺</a>",
    
    // 默认回答
    "默认": "感谢您的提问！请问您有什么具体的症状或需求吗？比如失眠、咳嗽、气血不足等，我可以为您推荐合适的产品。您也可以直接在淘宝店铺了解更多我们的产品：<a href='https://m.tb.cn/h.SrxLnZUUnzcUod1' target='_blank' style='color: #2c6e49; text-decoration: underline;'>禹脉本草淘宝店铺</a>"
};

// 初始化AI对话助手
function initAIAssistant() {
    // 检查是否已存在聊天对话框，如果不存在则创建
    if (!document.getElementById('chat-dialog')) {
        createChatDialog();
    }
    
    // 为导航栏的聊天按钮添加事件监听
    const chatBtn = document.querySelector('.chat-btn');
    if (chatBtn) {
        chatBtn.addEventListener('click', () => toggleChatDialog(null, null, 'navbar'));
    }
    
    // 为专有名词添加快速链接
    addQuickLinks();
}

// 创建聊天对话框
function createChatDialog() {
    const chatDialogHTML = `
        <!-- 聊天窗口 -->
        <div id="chat-dialog" class="chat-dialog">
            <div class="dialog-header">
                <span class="dialog-title">与大禹对话</span>
                <button class="close-btn" onclick="toggleChatDialog()">×</button>
            </div>
            <div class="dialog-body">
                <div id="chat-messages" class="chat-messages">
                    <!-- 初始欢迎消息 -->
                    <div class="message ai-message">
                        <div class="ai-avatar">禹</div>
                        <div class="message-content">你好！我是大禹，有什么问题可以尽管问我～</div>
                    </div>
                </div>
                <div class="input-area">
                    <input type="text" id="user-query" placeholder="请输入问题..."
                        onkeydown="if(event.key === 'Enter') submitQuery()" />
                    <button onclick="submitQuery()">发送</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', chatDialogHTML);
}

// 显示/隐藏聊天对话框，支持传入位置参数
function toggleChatDialog(x = null, y = null, source = 'quicklink') {
    const chatDialog = document.getElementById('chat-dialog');
    if (chatDialog) {
        chatDialogVisible = !chatDialogVisible;
        chatDialog.style.display = chatDialogVisible ? 'flex' : 'none';
        
        // 如果提供了位置，设置对话框位置
        if (chatDialogVisible && x !== null && y !== null) {
            chatDialog.style.left = `${x}px`;
            chatDialog.style.top = `${y}px`;
            // 确保对话框不超出屏幕
            adjustDialogPosition(chatDialog);
        }
        
        // 如果显示对话框，自动聚焦输入框
        if (chatDialogVisible) {
            setTimeout(() => {
                const userQuery = document.getElementById('user-query');
                if (userQuery) {
                    userQuery.focus();
                }
                
                // 如果是从导航栏按钮点击的，自动发送引导性问题
                if (source === 'navbar') {
                    // 延迟发送，确保对话框已完全显示
                    setTimeout(() => {
                        // 添加引导性问题到聊天记录
                        addMessage('请问您有什么症状或需求吗？我可以为您推荐合适的产品。', 'ai');
                    }, 500);
                }
            }, 100);
        }
    }
}

// 调整对话框位置，确保不超出屏幕
function adjustDialogPosition(chatDialog) {
    const rect = chatDialog.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    let left = parseInt(chatDialog.style.left) || 0;
    let top = parseInt(chatDialog.style.top) || 0;
    
    // 确保对话框右侧不超出屏幕
    if (rect.right > windowWidth) {
        left = windowWidth - rect.width - 20;
    }
    
    // 确保对话框底部不超出屏幕
    if (rect.bottom > windowHeight) {
        top = windowHeight - rect.height - 20;
    }
    
    // 确保对话框左侧不小于0
    if (left < 0) {
        left = 20;
    }
    
    // 确保对话框顶部不小于0
    if (top < 0) {
        top = 20;
    }
    
    chatDialog.style.left = `${left}px`;
    chatDialog.style.top = `${top}px`;
}

// 添加消息到聊天窗口
function addMessage(content, type) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type === 'ai' ? 'ai-message' : 'user-message'}`;
    
    if (type === 'ai') {
        messageDiv.innerHTML = `
            <div class="ai-avatar">禹</div>
            <div class="message-content">${content}</div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-content">${content}</div>
        `;
    }
    
    chatMessages.appendChild(messageDiv);
    
    // 自动滚动到底部
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 提交用户查询
function submitQuery() {
    const userQueryInput = document.getElementById('user-query');
    if (!userQueryInput) return;
    
    const userQuery = userQueryInput.value.trim();
    if (!userQuery) return;
    
    // 添加用户消息
    addMessage(userQuery, 'user');
    
    // 清空输入框
    userQueryInput.value = '';
    
    // 模拟AI回复
    simulateAIResponse(userQuery);
}

// 模拟AI回复
function simulateAIResponse(query) {
    // 模拟加载中
    addMessage('正在查阅本草典籍，为你解答...', 'ai');
    
    // 模拟延迟回复
    setTimeout(() => {
        // 移除加载中消息
        const chatMessages = document.getElementById('chat-messages');
        if (chatMessages && chatMessages.lastChild) {
            chatMessages.removeChild(chatMessages.lastChild);
        }
        
        // 寻找最匹配的答案
        const answer = findBestAnswer(query);
        
        // 添加AI回复
        addMessage(answer, 'ai');
    }, 1200);
}

// 寻找最匹配的答案
function findBestAnswer(query) {
    // 转换为小写，方便匹配
    const lowerQuery = query.toLowerCase();
    
    // 遍历预定义答案，寻找最匹配的
    for (const [keyword, answer] of Object.entries(aiAnswers)) {
        if (lowerQuery.includes(keyword.toLowerCase())) {
            return answer;
        }
    }
    
    // 如果没有匹配到，返回默认答案
    return aiAnswers['默认'];
}

// 为专有名词添加快速链接
function addQuickLinks() {
    // 定义需要添加链接的专有名词
    const keywords = [
        "酸枣仁晚安茶", "一勺梨膏", "红参玫瑰女神茶", "二十八味足浴包", 
        "亚麻籽无花果茶", "挡酒令", "竹蔗茅根雪梨茶", "青桔柠檬百香果茶",
        "禹脉本草", "禹州", "黄帝内经", "孙思邈",
        "失眠", "咳嗽", "气血不足", "湿气重", "便秘"
    ];
    
    // 为页面中的专有名词添加链接
    const allTextElements = document.querySelectorAll('p, h2, h3, h4, span');
    
    allTextElements.forEach(element => {
        let text = element.innerHTML;
        let modified = false;
        
        keywords.forEach(keyword => {
            if (text.includes(keyword) && !text.includes(`<a href="#" onclick="askAbout('${keyword}', event)">${keyword}</a>`)) {
                text = text.replace(new RegExp(keyword, 'g'), `<a href="#" onclick="askAbout('${keyword}', event)" style="color: #2c6e49; font-weight: bold; text-decoration: underline; cursor: pointer; transition: all 0.3s ease;">${keyword}</a>`);
                modified = true;
            }
        });
        
        if (modified) {
            element.innerHTML = text;
        }
    });
}

// 点击专有名词快速提问
function askAbout(keyword, event) {
    event.preventDefault();
    
    // 获取点击位置
    const x = event.clientX;
    const y = event.clientY;
    
    // 显示聊天对话框，传入点击位置
    if (!chatDialogVisible) {
        toggleChatDialog(x, y);
    }
    
    // 自动填充问题并提交
    const userQueryInput = document.getElementById('user-query');
    if (userQueryInput) {
        userQueryInput.value = keyword;
        submitQuery();
    }
}

// 页面加载完成后初始化AI助手
window.addEventListener('load', function() {
    initAIAssistant();
    initDialogInteractions();
});

// 初始化对话框交互功能（拖拽、调整大小）
function initDialogInteractions() {
    const chatDialog = document.getElementById('chat-dialog');
    if (!chatDialog) return;
    
    const dialogHeader = chatDialog.querySelector('.dialog-header');
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;
    
    // 鼠标按下事件，开始拖拽
    dialogHeader.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialLeft = parseInt(chatDialog.style.left) || 0;
        initialTop = parseInt(chatDialog.style.top) || 0;
        
        // 添加拖拽样式
        chatDialog.style.cursor = 'grabbing';
        document.body.style.userSelect = 'none';
    });
    
    // 鼠标移动事件，处理拖拽
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        
        chatDialog.style.left = `${initialLeft + deltaX}px`;
        chatDialog.style.top = `${initialTop + deltaY}px`;
    });
    
    // 鼠标释放事件，结束拖拽
    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            chatDialog.style.cursor = 'default';
            document.body.style.userSelect = '';
            // 确保对话框不超出屏幕
            adjustDialogPosition(chatDialog);
        }
    });
    
    // 调整大小功能
    const resizer = document.createElement('div');
    resizer.className = 'dialog-resizer';
    chatDialog.appendChild(resizer);
    
    let isResizing = false;
    let startWidth, startHeight;
    
    // 鼠标按下事件，开始调整大小
    resizer.addEventListener('mousedown', (e) => {
        isResizing = true;
        startWidth = chatDialog.offsetWidth;
        startHeight = chatDialog.offsetHeight;
        startX = e.clientX;
        startY = e.clientY;
        
        // 添加调整大小样式
        chatDialog.style.cursor = 'nwse-resize';
        document.body.style.userSelect = 'none';
    });
    
    // 鼠标移动事件，处理调整大小
    document.addEventListener('mousemove', (e) => {
        if (!isResizing) return;
        
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        
        // 设置最小宽度和高度
        const newWidth = Math.max(300, startWidth + deltaX);
        const newHeight = Math.max(400, startHeight + deltaY);
        
        chatDialog.style.width = `${newWidth}px`;
        chatDialog.style.height = `${newHeight}px`;
    });
    
    // 鼠标释放事件，结束调整大小
    document.addEventListener('mouseup', () => {
        if (isResizing) {
            isResizing = false;
            chatDialog.style.cursor = 'default';
            document.body.style.userSelect = '';
        }
    });
}