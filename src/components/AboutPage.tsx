import React from 'react';
import { BookOpen, Clock, Globe } from 'lucide-react';
import { getAssetUrl } from '../utils/assetUtils';

export const AboutPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 mt-8 pb-12">
            {/* 框外独立大标题 */}
            <div className="flex flex-col items-center justify-center gap-1 mb-6">
                <div className="flex items-center gap-3">
                    <BookOpen className="text-amber-500" size={28} />
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg, #fde68a, #fb923c)' }}>
                        古历法说明
                    </h1>
                </div>
                <p className="text-sm text-stone-500 tracking-widest">时空同步生活系统使用指南</p>
            </div>
            <div className="bg-stone-900/80 backdrop-blur-md border border-amber-500/30 w-full rounded-2xl shadow-[0_10px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden glass-panel">
                {/* Content Body */}
                <div className="p-6 md:p-10 space-y-10 bg-gradient-to-b from-stone-900/50 to-stone-950/80">

                    {/* Intro Section */}
                    <section className="space-y-4">
                        <div className="mb-6 space-y-2 text-center bg-gradient-to-br from-amber-500/5 to-orange-500/5 py-5 px-4 rounded-xl border border-amber-500/10 shadow-[inset_0_0_20px_rgba(245,158,11,0.05)]">
                            <p className="text-base md:text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-orange-400 tracking-[0.2em] md:tracking-[0.3em]">
                                因中国八千年文明历史而自信
                            </p>
                            <p className="text-base md:text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-sky-400 tracking-[0.2em] md:tracking-[0.3em]">
                                在自然农耕与时空同步中生活
                            </p>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                            <Globe className="text-amber-500" size={20} />
                            <h3 className="text-xl font-bold text-stone-200">欢迎使用《古历法》系统</h3>
                        </div>
                        <p className="text-stone-300 leading-relaxed text-sm md:text-base">
                            本系统不仅仅是一个查询日期的工具，它是一座架设在中华古代时间哲学与中美洲星系时间法则之间的桥梁。
                            在这里，您可以清晰地看到四维时空在不同文明历法下的映射切片。我们摒弃了机械的现代钟表观，旨在让您重新感受天道运行与宇宙呼吸。
                        </p>
                    </section>

                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                    {/* Core Calendars */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Clock className="text-emerald-500" size={20} />
                            <h3 className="text-xl font-bold text-stone-200">四大历法模块说明</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white/5 border border-sky-500/20 rounded-xl p-5 hover:border-sky-500/40 transition-colors">
                                <h4 className="text-sky-400 font-bold mb-2 flex flex-col">
                                    <span className="text-lg">圣太一天历</span>
                                    <span className="text-xs text-stone-500 font-normal mt-0.5">起源于伏羲 十月太阳历</span>
                                </h4>
                                <p className="text-sm text-stone-300 leading-relaxed mt-2">
                                    展示这套失传古代八千年历法的精妙。以北斗九星与极光流转为底色，您可以通过它知道当前处于上古洪荒哪一个纪元。系统内置了“由、秭、穰、沟、涧”等万亿亿级的大数序列，带您俯瞻宏大的华夏时间尺度。
                                </p>
                            </div>
                            <div className="bg-white/5 border border-amber-500/20 rounded-xl p-5 hover:border-amber-500/40 transition-colors">
                                <h4 className="text-amber-500 font-bold mb-2 flex flex-col">
                                    <span className="text-lg">黄帝纪元历</span>
                                    <span className="text-xs text-stone-500 font-normal mt-0.5">平太阳历与六十甲子</span>
                                </h4>
                                <p className="text-sm text-stone-300 leading-relaxed mt-2">
                                    展示正统的老黄历纪年法。融合了详细的甲子历（六十甲子干支密码），并精确测算了每日对应的六十四卦象变化。
                                </p>
                            </div>
                            <div className="bg-white/5 border border-emerald-500/20 rounded-xl p-5 hover:border-emerald-500/40 transition-colors">
                                <h4 className="text-emerald-500 font-bold mb-2 flex flex-col">
                                    <span className="text-lg">汉历（阴阳合历）</span>
                                    <span className="text-xs text-stone-500 font-normal mt-0.5">传统农历与节气物候</span>
                                </h4>
                                <p className="text-sm text-stone-300 leading-relaxed mt-2">
                                    熟悉的华人传统历。在这里不仅能看到农历日，还能看到当前是否处于“三伏天”或“数九寒冬”，以及具体的七十二物候变迁。
                                </p>
                            </div>
                            <div className="bg-white/5 border border-pink-500/20 rounded-xl p-5 hover:border-pink-500/40 transition-colors">
                                <h4 className="text-pink-400 font-bold mb-2 flex flex-col">
                                    <span className="text-lg">星系玛雅历法</span>
                                    <span className="text-xs text-stone-500 font-normal mt-0.5">13月亮历 · 卓尔金历 · 时空同步</span>
                                </h4>
                                <p className="text-sm text-stone-300 leading-relaxed mt-2">
                                    基于 13:20 自然频率，解析宇宙投射的多维能量。集成了「星系印记」实时查询、260天卓尔金历「生命城堡」全景、20波符调性引导以及「星际原型」深度解读系统。支持 Kin 号查算与月相动态联动，完美呈现神谕五力。
                                </p>
                            </div>
                        </div>
                    </section>

                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                    {/* Features Guide */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-2 mb-4">
                            <BookOpen className="text-amber-500" size={20} />
                            <h3 className="text-xl font-bold text-stone-200">特殊功能指南</h3>
                        </div>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-8 h-8 shrink-0 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold">1</div>
                                <div>
                                    <h4 className="text-stone-200 font-bold mb-2 text-lg">我的时空印记 (Time Capsule)</h4>
                                    <div className="text-sm text-stone-400 leading-relaxed">
                                        点击主视图右下角的悬浮加号 <strong className="text-amber-500 text-lg mx-1">+</strong> 即可留下您在宇宙特定年月日的日记。
                                        当您点击主页面底部的「我的时空印记」标题时，将打开<span className="text-amber-400 font-medium">总管控制台</span>。在这里您可以：<br />
                                        <ul className="list-disc pl-5 mt-2 space-y-1">
                                            <li>按照时间线（正反序）总览您的个人生命历程</li>
                                            <li>将记录的数据导出备份为高度安全的 <code>JSON 数据文件</code></li>
                                            <li>在更换手机时导入还原您的生命印记</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-8 h-8 shrink-0 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold">2</div>
                                <div>
                                    <h4 className="text-stone-200 font-bold mb-2 text-lg">历史上的今天与中华文明探源</h4>
                                    <p className="text-sm text-stone-400 leading-relaxed">
                                        若您某日未留下日记，“时空印记”面板将下潜至人类集体潜意识层——兜底显示《历史上的今天》。
                                        其中收录了如“良渚古城申遗”、“贾湖骨笛出土”等大量中华八千年文明探源工程点位标，带给您极度震撼的时空共振。
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-8 h-8 shrink-0 rounded-full bg-sky-500/20 text-sky-500 flex items-center justify-center font-bold">3</div>
                                <div>
                                    <h4 className="text-stone-200 font-bold mb-2 text-lg">玛雅星系罗盘</h4>
                                    <p className="text-sm text-stone-400 leading-relaxed">
                                        在顶部菜单点击<span className="text-sky-300 px-1 font-medium">玛雅</span>选项卡，进入星系罗盘。功能包括：
                                    </p>
                                    <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-stone-400">
                                        <li><span className="text-pink-300 font-medium">🧭 星系印记查询</span>：查询任意西历/农历日期的银河Kin号，并展示今日等离子体、星际原型、神谕五力（支持月相实时联动修复、包含对等印记·镜像印记），还可输入生日查个人印记</li>
                                        <li><span className="text-purple-300 font-medium">🌊 20波符</span>：展示今日波符大图与 13 问调性引导，深度解析波符在个人进化中的核心指引，支持自由切换浏览</li>
                                        <li><span className="text-amber-300 font-medium">🐊 图腾原型</span>：20个日图腾卡片，点击任意图腾可查看详细解读及对应的星际原型图像与描述</li>
                                        <li><span className="text-blue-300 font-medium">🏰 生命城堡</span>：展示 52 天为一个周期的生命城堡，新增 52 年生命城堡年度解析功能，输入出生年份即可定位当前年份在生命阶段中的角色与主旋律</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-8 h-8 shrink-0 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center font-bold">4</div>
                                <div>
                                    <h4 className="text-stone-200 font-bold mb-2 text-lg">史料纪元一键换算</h4>
                                    <p className="text-sm text-stone-400 leading-relaxed">
                                        主视窗下方配备强大的朝代换算引擎。无论您输入“贞观”“康熙”这样的年号，还是“李世民”这样的帝号，或者是公历如“1949”，都能将系统四个历表同时秒级对齐传送至那一年代。
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-8 h-8 shrink-0 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center font-bold">5</div>
                                <div>
                                    <h4 className="text-stone-200 font-bold mb-2 text-lg">二十四节气与《黄帝内经》健康指南</h4>
                                    <p className="text-sm text-stone-400 leading-relaxed">
                                        在顶部菜单点击<span className="text-rose-300 px-1 font-medium">节气</span>选项卡。不仅可以查看二十四节气对应的七十二物候与农事指导，我们还根据《黄帝内经》为您精心推演了涵盖一年四季的防病起居及饮食养生方案。
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-8 h-8 shrink-0 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center font-bold">6</div>
                                <div>
                                    <h4 className="text-stone-200 font-bold mb-2 text-lg">圣太一天历罗盘与“七星连珠”</h4>
                                    <p className="text-sm text-stone-400 leading-relaxed">
                                        在天历模块中，我们为您呈现了高度动态的圣太一天历罗盘。罗盘背景绘制了北斗九星（含辅、弼二星）的天文位格，展示了古人“斗转星移”的时间判定逻辑。当您点击按钮启动<span className="text-amber-400 font-medium">「七星连珠」</span>时，九大行星将受引力共振瞬间对齐，带给您极具冲击力的星际视觉震撼。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                    {/* Disclaimer & Donation Section */}
                    <section className="space-y-6 bg-amber-500/5 rounded-2xl p-6 md:p-8 border border-amber-500/10">
                        <div className="text-center space-y-4 mb-8">
                            <h3 className="text-2xl font-bold text-amber-500 tracking-wider">开发初衷与声明</h3>
                            <p className="text-[15px] text-stone-300 leading-loose max-w-3xl mx-auto text-left indent-8">
                                本《古历法》系统由开发者朱振坚个人利用业余时间独立开发而成。
                                开发的初衷源于阅读时的一个小小痛点：看书的时候经常会遇到一些历史时间，甚至有时候还要费力计算，距离现在多少年；我们的历法比西历使用时间久远得多，但是大多数的书依然用公元前、西元前这些历史，很多人看了还以为那个西历比我们的历法久远呢，可是西历的使用才多少年呀，远不如和我们五六千年的历法相比的。<br /><br />
                                而且我们的历法是“活人救命”的历法，根据历法的节气可有效安排五谷蔬菜的种植，可以调整生活方式；而玛雅历法呢，在个人天命及时空同步上有一定的参考意义。就目前所知所感兴趣的这几个历法，以前想要整合到手机上挺难的，而且我是安卓手机，所以就自个手搓一个吧！<br /><br />
                                功能旨在简略实用，方便广大喜欢中华传统历法、玛雅十三月亮历的朋友，以及农耕者查阅使用。<br /><br />
                                <span className="text-amber-400 font-medium tracking-wide">本项目现已开放源码，代码按仓库中的 MIT License 授权使用；内置图片、文化资料与整理文本如有第三方来源或后续补充授权，请以对应资源说明为准。若觉得好用，欢迎自愿打赏支持，也欢迎在 GitHub 提交问题与改进建议。</span><br /><br />
                                因开发者个人非程序员、也无天文学基础，难免会有误漏之处，若您在使用中发现问题或有宝贵的改进建议，欢迎发送邮件至：<a href="mailto:254850837@qq.com" className="text-sky-400 hover:text-sky-300 underline underline-offset-4 font-mono ml-1">254850837@qq.com</a>。
                                您的反馈是系统走向蜕变的动力！如果觉得好用，也请将它分享给更多有缘之人。
                            </p>
                        </div>

                        {/* Donation QRs */}
                        <div className="pt-6 border-t border-amber-500/20">
                            <p className="text-center text-[15px] font-bold text-stone-400 mb-8 flex items-center justify-center gap-4">
                                <span className="w-12 h-px bg-stone-600"></span>
                                喜欢请为我打赏，予人玫瑰 🌹 手有余香~~
                                <span className="w-12 h-px bg-stone-600"></span>
                            </p>

                            <div className="flex flex-col sm:flex-row justify-center items-center gap-10 sm:gap-20">
                                {/* WeChat Pay */}
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-36 h-36 md:w-48 md:h-48 bg-white p-2.5 rounded-2xl shadow-[0_0_30px_rgba(34,197,94,0.15)] border-2 border-green-500/30 overflow-hidden relative group">
                                        <img src={getAssetUrl("/images/wechat_pay.jpg")} alt="微信赞赏码" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                    </div>
                                    <span className="text-sm font-bold text-green-500 bg-green-500/10 px-4 py-1.5 rounded-full">微信赞赏</span>
                                </div>

                                {/* AliPay */}
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-36 h-36 md:w-48 md:h-48 bg-white p-2.5 rounded-2xl shadow-[0_0_30px_rgba(14,165,233,0.15)] border-2 border-sky-500/30 overflow-hidden relative group">
                                        <img src={getAssetUrl("/images/alipay.jpg")} alt="支付宝赞赏码" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                    </div>
                                    <span className="text-sm font-bold text-sky-500 bg-sky-500/10 px-4 py-1.5 rounded-full">支付宝支持</span>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>

                {/* Footer */}
                <div className="bg-stone-950 p-5 border-t border-white/5 text-center text-sm text-stone-500 flex justify-center items-center gap-3">
                    <span>古历法 - 时空同步生活系统 V0.10.07</span>
                    <span>© 2026 Ancient Calendar Project</span>
                </div>
            </div>
        </div>
    );
};
