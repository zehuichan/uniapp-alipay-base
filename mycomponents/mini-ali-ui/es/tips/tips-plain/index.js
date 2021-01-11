import fmtEvent from '../../_util/fmtEvent';
Component({
  data: {
    show: true
  },
  props: {
    className: '',
    time: 5000,
    onClose: function onClose() {},
    onTimeOut: function onTimeOut() {}
  },
  didMount: function didMount() {
    var _this = this;

    var time = this.props.time;
    this._timer = setTimeout(function () {
      _this.setData({
        show: false
      });

      _this.onTimeOut();
    }, time);
  },
  didUnmount: function didUnmount() {
    clearTimeout(this._timer);
  },
  methods: {
    onClose: function onClose(e) {
      var event = fmtEvent(this.props, e);
      this.setData({
        show: false
      });
      clearTimeout(this._timer);
      this.props.onClose(event);
    },
    onTimeOut: function onTimeOut(e) {
      var event = fmtEvent(this.props, e);

      if (this.props.onTimeOut && typeof this.props.onTimeOut === 'function') {
        this.props.onTimeOut(event);
      }
    }
  }
});