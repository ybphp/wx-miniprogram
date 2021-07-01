import { uid, formatDate } from '../../utils/common';

function generageCommentsKey() {
    const arr = ['大小合适', '很便宜', '整体不错', '材质好', '做工不错', '外观不错', '包装不错', '质量一般', '物流快', '衣服很漂亮', '穿着效果好', '款式漂亮', '实惠', '性价比高', '用起来不错', '很好看', '很实用']
    arr.sort(function() { return 0.5 - Math.random() })
    let hasCommentKey = (0.6 - Math.random()) > 0 ? true : false,
        len = Math.ceil(Math.random() * (Math.floor(arr.length / 2 + 2) + 1));
    console.log(hasCommentKey)
    return hasCommentKey ? arr.slice(0, len) : []
}

function generateAppend() {
    const arr = ['当天追评', '当月追评', '两个月后追评', '三个月后追评', '四个月后追评', '五个月后追评', '半年后追评', '一年后追评']
    
    return (0.3 - Math.random()) > 0 ? arr[Math.floor(Math.random() * (arr.length - 1) + 1)] : ''
}

function generateComment(len) {
    return {
            author: uid(),
            content: "这是一段评论这是一段评论",
            time: formatDate("yyyy-MM-dd", new Date().valueOf() +1000 * 60 * 60 * 24 * len),
            isVip: Math.random() > 0.6,
            append: {
                time: generateAppend(),
                content: '这是一段追加的评论，是一段追加的评论，一段追加的评论。'
            },
            params: "规格：暂无; 尺寸暂无"
        }
}

Page({
    data: {
        comments: {}
    },

    onLoad() {
        let arr = [],
            len = Math.random() * 10 + 5;

        while(len > 0) {
            arr.push(generateComment(len));
            len --;
        }
        this.setData({ comments: {
            content: arr,
            commentsKey: generageCommentsKey()
        }})
    },
})