export default function scrollload(ctx, event, pageSelector) {
  if (!ctx.data.startTime) {
    ctx.setData({ startTime: new Date() })
  };
  if (!ctx.data.canLoad) {
    ctx.setData({ canLoad: false })
  };
  return function(cb) {
    let windowH = wx.getSystemInfoSync().windowHeight,
      scrollTop = event.scrollTop,
      query = ctx.createSelectorQuery(),
      pageNode = query.select(pageSelector),
      pageH = null;
    pageNode.boundingClientRect(function(rect) {
      pageH = rect.height;
      if ((pageH - windowH) - scrollTop <= 150) {
        if (ctx.data.canLoad) {
          ctx.setData({ canLoad: false })
          console.log('加载内容')
          cb && cb();
        }
      } else {
        ctx.setData({ canLoad: true })
      }
    }).exec()
  }
}