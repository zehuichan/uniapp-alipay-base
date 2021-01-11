import fmtUnit from '../_util/fmtUnit';
Component({
  props: {
    infinite: false,
    className: '',
    fillColor: '#ddd',
    frontColor: '#1677FF',
    pagerName: '',
    height: fmtUnit('100px'),
    white: false,
    max: 5,
    currentPage: 1,
    current: 0,
    // 兼容 mini-antui 而添加的属性
    total: 0 // 兼容 mini-antui 而添加的属性

  },
  didMount: function didMount() {
    this.compatAntui();
  },
  didUpdate: function didUpdate() {
    this.compatAntui();
  },
  methods: {
    compatAntui: function compatAntui() {
      // 兼容 mini-antui 升级到 mini-ali-ui 后分页符的页数使用
      var _this$props = this.props,
          current = _this$props.current,
          total = _this$props.total;

      if (current !== 0 || total !== 0) {
        this.setData({
          currentPage: current,
          max: total
        });
      }
    },
    clacWidth: function clacWidth(pagerName) {
      var _this = this;

      my.createSelectorQuery().select("#" + pagerName).boundingClientRect().exec(function (ret) {
        _this.wrapWidth = ret[0].width;
      });
      return this.wrapWidth;
    },
    onScroll: function onScroll(e) {
      var infinitePageNumber = {};
      var _e$detail = e.detail,
          scrollLeft = _e$detail.scrollLeft,
          scrollWidth = _e$detail.scrollWidth;
      var viewWidth = this.clacWidth(e.currentTarget.dataset.id);

      if (viewWidth) {
        infinitePageNumber[e.currentTarget.dataset.id] = {
          pageDeg: Math.ceil(scrollLeft / (scrollWidth - viewWidth) * 100)
        };
        this.setData({
          pageDeg: infinitePageNumber[e.currentTarget.dataset.id].pageDeg
        });
      }
    }
  }
});