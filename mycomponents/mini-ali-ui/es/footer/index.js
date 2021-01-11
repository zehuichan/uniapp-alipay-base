import fmtUnit from '../_util/fmtUnit';
Component({
  props: {
    className: '',
    // normal: 基础样式；
    // guide：文案加引导；
    // copyright：声明；
    // brand：带品牌；
    // link：带链接
    // end: 没有更多
    type: 'normal',
    content: '',
    extend: [],
    onBrandTap: function onBrandTap() {},
    showEndIcon: false,
    iconName: 'selected',
    // 为了兼容 mini-antui 转 mini-ali-ui 而添加的 props
    copyright: '',
    links: []
  },
  data: {
    defaultSize: fmtUnit(18),
    maxSize: fmtUnit(22),
    valueUnit: fmtUnit('px'),
    isCustomLinkHandler: false
  },
  didMount: function didMount() {
    this.compatAntui();
    this.checkCustomLinkHandler();
  },
  didUpdate: function didUpdate() {
    this.compatAntui();
    this.checkCustomLinkHandler();
  },
  methods: {
    compatAntui: function compatAntui() {
      // 兼容 mini-antui 升级到 mini-ali-ui 后分页符的页数使用
      var _this$props = this.props,
          copyright = _this$props.copyright,
          links = _this$props.links;
      var changeLinks = []; // footer 的文案内容

      if (copyright !== '') {
        this.setData({
          content: copyright
        });
      } // footer 的链接元素


      if (links.length > 0) {
        // eslint-disable-next-line guard-for-in
        for (var i in links) {
          changeLinks[i] = {
            link: links[i].url,
            text: links[i].text
          };
        }

        this.setData({
          extend: changeLinks,
          type: 'link'
        });
      }
    },
    checkCustomLinkHandler: function checkCustomLinkHandler() {
      var onLinkTap = this.props.onLinkTap;
      this.setData({
        isCustomLinkHandler: typeof onLinkTap === 'function'
      });
    },
    onBrandClick: function onBrandClick(e) {
      var brandLink = e.currentTarget.dataset.url;
      var _this$props2 = this.props,
          onBrandTap = _this$props2.onBrandTap,
          extend = _this$props2.extend;

      if (onBrandTap !== '' && brandLink) {
        my.navigateTo({
          url: brandLink
        });
      }

      if (onBrandTap !== '' && !brandLink && typeof onBrandTap === 'function') {
        onBrandTap(extend[e.currentTarget.dataset.index]);
      }
    },
    onLinkTap: function onLinkTap(e) {
      var item = e.currentTarget.dataset.item;
      var onLinkTap = this.props.onLinkTap;
      onLinkTap(item);
    }
  }
});