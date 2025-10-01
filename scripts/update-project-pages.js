const fs = require('fs');
const path = require('path');

// 项目页面列表（排除已处理的 mobile-app-react）
const projectPages = [
    'project/interactive-systems/web-application-frontend/index.html',
    'project/interactive-systems/interactive-installation/index.html',
    'project/media-motion-design/3d-motion-graphics/index.html',
    'project/media-motion-design/character-animation/index.html',
    'project/media-motion-design/video-production-project/index.html',
    'project/media-motion-design/visual-effects-compositing/index.html',
    'project/media-motion-design/rube-goldberg-machine/index.html',
    'project/physical-computing-prototyping/arduino-sensor-project/index.html',
    'project/physical-computing-prototyping/wearable-iot-device/index.html',
    'project/physical-computing-prototyping/robotics-mechatronics/index.html',
    'project/physical-computing-prototyping/interactive-installation-physical/index.html',
    'project/physical-computing-prototyping/rapid-prototype/index.html',
    'project/physical-computing-prototyping/physical-computing-wearable/index.html',
    'project/visual-fine-art/digital-illustration/index.html',
    'project/visual-fine-art/acrylic-painting/index.html',
    'project/visual-fine-art/mixed-media-art/index.html',
    'project/visual-fine-art/portrait-photography/index.html',
    'project/visual-fine-art/generative-ai-art/index.html',
    'project/Physical Computing&Prototyping/project1/index.html',
    'project/Media&Motion Design/Rube Goldberg Machine/index.html'
];

const navbarVisitedCheck = `
            // 立即检查导航栏是否已访问，避免淡入动画
            if (sessionStorage.getItem('navbarVisited')) {
                document.documentElement.classList.add('navbar-visited');
            }
`;

const cssLink = '    <link rel="stylesheet" href="../../../styles/navbar-enhanced.css">';
const jsScript = '    <script defer src="../../../js/navbar-enhanced.js"></script>';
const scrollProgressBar = `    <!-- Scroll Progress Bar -->
    <div class="scroll-progress-bar"></div>

`;

projectPages.forEach(pagePath => {
    const fullPath = path.join(__dirname, '..', pagePath);

    try {
        let content = fs.readFileSync(fullPath, 'utf8');

        // 1. 在 anti-FOUC script 中添加 navbarVisited 检查
        // 查找不同的 anti-FOUC script 模式
        if (content.includes('document.documentElement.classList.add(\'no-transitions\')')) {
            // 在 classList.add('no-transitions'); 后添加检查
            if (!content.includes('navbarVisited')) {
                content = content.replace(
                    /document\.documentElement\.classList\.add\('no-transitions'\);/,
                    `document.documentElement.classList.add('no-transitions');${navbarVisitedCheck}`
                );
            }
        }

        // 2. 添加 CSS 引用（如果还没有）
        if (!content.includes('navbar-enhanced.css')) {
            // 在 section-indicators.css 后添加
            content = content.replace(
                /(<link rel="stylesheet" href="\.\.\/\.\.\/\.\.\/styles\/section-indicators\.css">)/,
                `$1\n${cssLink}`
            );
        }

        // 3. 添加 JS 引用（如果还没有）
        if (!content.includes('navbar-enhanced.js')) {
            // 在 section-indicators.js 后添加
            content = content.replace(
                /(<script defer src="\.\.\/\.\.\/\.\.\/js\/section-indicators\.js"><\/script>)/,
                `$1\n${jsScript}`
            );
        }

        // 4. 添加 scroll-progress-bar（如果还没有）
        if (!content.includes('scroll-progress-bar')) {
            // 在 navbar-container 前添加
            content = content.replace(
                /(    <!-- Navigation Bar -->[\s\S]*?    <div class="navbar-container">)/,
                `${scrollProgressBar}$1`
            );

            // 如果没有注释，直接在 navbar-container 前添加
            if (!content.includes('scroll-progress-bar')) {
                content = content.replace(
                    /(    <div class="navbar-container">)/,
                    `${scrollProgressBar}$1`
                );
            }
        }

        // 写回文件
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`✓ Updated: ${pagePath}`);

    } catch (error) {
        console.error(`✗ Error updating ${pagePath}:`, error.message);
    }
});

console.log('\nDone! Updated', projectPages.length, 'project pages.');
