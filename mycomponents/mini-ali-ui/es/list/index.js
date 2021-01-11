import fmtUnit from '../_util/fmtUnit';
Component({
  props: {
    className: '',
    loadMore: false,
    loadContent: ['', ''],
    loadingSize: fmtUnit('16px'),
    loadingColor: '',
    loadingHeight: 'auto'
  },
  data: {
    loadContent: ['加载更多...', '-- 数据加载完了 --']
  },
  didMount: function didMount() {
    var _this = this;

    var loadTxt = this.props.loadContent[0] ? this.props.loadContent[0] : this.data.loadContent[0];
    var overTxt = this.props.loadContent[1] ? this.props.loadContent[1] : this.data.loadContent[1];
    setTimeout(function () {
      _this.setData({
        loadContent: [loadTxt, overTxt]
      });
    }, 0);
  },
  didUpdate: function didUpdate() {
    var _this2 = this;

    var loadTxt = this.props.loadContent[0] ? this.props.loadContent[0] : this.data.loadContent[0];
    var overTxt = this.props.loadContent[1] ? this.props.loadContent[1] : this.data.loadContent[1];

    if (loadTxt !== this.data.loadContent[0] || overTxt !== this.data.loadContent[1]) {
      setTimeout(function () {
        _this2.setData({
          loadContent: [loadTxt, overTxt]
        });
      }, 0);
    }
  }
});