// 事件代理实现tab切换

function $(selector) {
    return document.querySelector(selector);
}

/**
 * 将当前元素置为活动状态，其他兄弟元素未活动状态
 * @param {*} arrayLike  所有元素
 * @param {*} current    当前元素   
 */
function resetSibling(arrayLike, current) {
    [].forEach.call(arrayLike, (item) => {
        item.classList.remove('active');
    });
    current.classList.add('active');
}

$('.nav-list').addEventListener('click', function(event) {
    var target = event.target;
    // tab
    if(target.classList.contains('nav-item')) {
        if(target.classList.contains('active')) return;
        
        // tab切换
        resetSibling(target.parentElement.children, target);

        // tab对应模块切换
        var module = target.dataset.tab;
        var curTabModule = $('.' + module);
        if(curTabModule) {
            resetSibling(curTabModule.parentElement.children, curTabModule);
        }
    }
});