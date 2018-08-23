(function (window, document, $) {
    class Slide {
        constructor(container, options = {}) {
            this.init(container, options);
            this.render();
            this.bind();
            this.autoplay();
        }
        // 初始化
        init(container, options) {
            this.$container = container;
            this.slides = this.handle(options.data);
            this.size = this.slides.length;            // 轮播图个数
            this.percent = 100 / this.size;            // 轮播图宽度百分比
            this.current = 1;                          // 当前小圆点索引 
            this.timer = null;
        }
        // 克隆头尾数据，实现无限轮播
        handle(data) {
            if (data.length >= 2) {
                let first = data[0];
                let last = data[data.length - 1];
                data.unshift(last);
                data.push(first);
                return data;
            }
        }
        // dom渲染
        render() {
            this.$container.innerHTML = `
                <ul class="slide-list"></ul>
                <span class="iconfont icon-prev prevBtn"></span>
                <span class="iconfont icon-next nextBtn"></span>
                <ul class="slide-bubbles"></ul>
            `;
            this.$slideList = this.$container.firstElementChild;
            this.$slideList.style.width = this.size * 100 + '%';
            this.$slideList.style.left = '-100%';
            this.$slideBubbles = this.$container.lastElementChild;

            this.$slideList.innerHTML = this.slides.map((item) => {
                return `<li class="slide-item"><a href="#"><img src="${item.imgSrc}" alt="${item.text}"></a></li>`
            }).join('');

            [].forEach.call(this.$slideList.querySelectorAll('li'), (item) => {
                item.style.width = this.percent + '%';
            });

            // 小圆圈
            let html = '';
            for (let i = 0; i < this.size - 2; i++) {
                if (i == 0) {
                    html += `<li class="slide-bubble active"></li>`;
                } else {
                    html += `<li class="slide-bubble"></li>`;
                }
            }
            this.$slideBubbles.innerHTML = html;
        }
        // 事件绑定
        bind() {
            let prevBtn = this.$container.querySelector('.prevBtn'),
                nextBtn = this.$container.querySelector('.nextBtn');

            // 上一张
            prevBtn.addEventListener('click', () => {
                this.play();
            });
            // 下一张
            nextBtn.addEventListener('click', () => {
                this.current += 1;
                // 最后一张图片涉及到动画执行完毕后需重置(即动画结束执行回调函数，这里直接用jQuery的animate函数)
                $(this.$slideList).animate({
                    left: `-${100 * this.current}%`
                }, 1000, () => {
                    if (this.current === this.size - 1) {
                        this.current = 1;
                        this.$slideList.style.left = "-100%";
                    }
                    this.setBubble();
                });
            });
        }
        // 设置小圆圈
        setBubble() {
            [].forEach.call(this.$slideBubbles.children, (item, index) => {
                item.classList.remove('active');
                if (this.current - 1 === index) {
                    item.classList.add('active');
                }
            });

        }
        play() {
            this.current -= 1;
            // 最后一张图片涉及到动画执行完毕后需重置(即动画结束执行回调函数，这里直接用jQuery的animate函数)
            $(this.$slideList).animate({
                left: `-${100 * this.current}%`
            }, 900, () => {
                if (this.current === 0) {
                    this.current = this.size - 2;
                    this.$slideList.style.left = -100 * (this.current) + '%';
                }
                this.setBubble();
            });
        }
        // 自动播放
        autoplay() {
            this.timer = setInterval(() => {
                this.play();
            },1000)
        }

    }
    window.Slide = Slide;
})(window, document, jQuery);


var slide = new Slide(document.querySelector('.slide-container'), {
    el: 123,
    data: [
        {
            link: "http://www.baidu.com",
            imgSrc: "/imgs/slide1.jpg",
            text: '百度'
        },
        {
            link: "http://www.sina.com",
            imgSrc: "/imgs/slide2.jpg",
            text: '新浪'
        },
        {
            link: "http://www.sohu.com",
            imgSrc: "/imgs/slide3.jpg",
            text: '搜狐'
        },
        {
            link: "http://www.zhihu.com",
            imgSrc: "/imgs/slide4.jpg",
            text: '知乎'
        },
        {
            link: "http://www.jianshu.com",
            imgSrc: "/imgs/slide5.jpg",
            text: '简书'
        }
    ]
});