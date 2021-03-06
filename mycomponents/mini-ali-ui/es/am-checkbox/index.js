import fmtEvent from '../_util/fmtEvent';
/**
 * 对齐 ant design checkbox 的设计，增加 ctrlChecked 属性
 * 当 props 中有 checked 传入时，am-checkbox 是非受控组件
 * 当 props 中不传入 checked 而使用 ctrlChecked 时，am-checkbox 是受控组件
 */

Component({
  props: {
    value: '',
    checked: false,
    ctrlChecked: undefined,
    disabled: false,
    onChange: function onChange() {},
    id: ''
  },
  data: {
    // 组件内维护的 chackbox 勾选状态
    _checked: false
  },
  onInit: function onInit() {
    var checked = this.props.checked;
    this.setData({
      _checked: checked
    });
  },
  didMount: function didMount() {
    var checked = this.props.checked;
    this.setData({
      _checked: checked
    });
  },
  // props 改变时
  deriveDataFromProps: function deriveDataFromProps(nextProps) {
    var _checked = this.data._checked;
    var oldChecked = this.props.ctrlChecked;
    var ctrlChecked = nextProps.ctrlChecked; // oldChecked===undefined 说明未传入 checked 属性，am-checkbox 将成为不受控组件
    // oldChecked 有传入值 _checked 受外部 checked 属性控制

    if (_checked !== ctrlChecked && oldChecked !== undefined) {
      this.setData({
        _checked: ctrlChecked
      });
    }
  },
  methods: {
    onChange: function onChange(e) {
      var _e$detail = e.detail,
          detail = _e$detail === void 0 ? {} : _e$detail;
      var value = detail.value;
      this.setData({
        _checked: value
      });
      var event = fmtEvent(this.props, e);
      this.props.onChange(event);
    }
  }
});