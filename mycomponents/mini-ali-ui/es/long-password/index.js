import fmtEvent from '../_util/fmtEvent';
import fmtUnit from '../_util/fmtUnit';
Component({
  props: {
    className: '',
    inputCls: '',
    last: false,
    value: '',
    name: '',
    type: 'text',
    // password: false,
    // placeholder: '',
    placeholderClass: '',
    placeholderStyle: '',
    disabled: false,
    maxlength: 140,
    focus: false,
    clear: true,
    // 默认有清除功能
    syncInput: false,
    controlled: true,
    enableNative: false,
    // 兼容安卓input的输入bug
    onInput: function onInput() {},
    onConfirm: function onConfirm() {},
    onFocus: function onFocus() {},
    onBlur: function onBlur() {},
    onClear: function onClear() {}
  },
  data: {
    _focus: false,
    visible: false,
    iconSizeClose: fmtUnit(18),
    iconSizeEye: fmtUnit(22)
  },
  didMount: function didMount() {
    this.setData({
      _focus: this.props.focus
    });
  },
  methods: {
    onBlur: function onBlur(e) {
      this.setData({
        _focus: false
      });
      var event = fmtEvent(this.props, e);
      this.props.onBlur(event);
    },
    onConfirm: function onConfirm(e) {
      var event = fmtEvent(this.props, e);
      this.props.onConfirm(event);
    },
    onFocus: function onFocus(e) {
      this.setData({
        _focus: true
      });
      var event = fmtEvent(this.props, e);
      this.props.onFocus(event);
    },
    onInput: function onInput(e) {
      var event = fmtEvent(this.props, e);
      this.props.onInput(event);
    },
    onClear: function onClear(e) {
      var event = fmtEvent(this.props, e);
      this.props.onClear(event);
    },
    onSwitchVisible: function onSwitchVisible() {
      this.setData({
        visible: !this.data.visible
      });
    }
  }
});