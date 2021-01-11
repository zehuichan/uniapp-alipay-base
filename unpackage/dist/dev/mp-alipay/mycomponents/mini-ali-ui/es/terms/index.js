Component({
  props: {
    fixed: false,
    related: true,
    capsuleSize: 'large',
    shape: 'default',
    agreeBtn: null,
    cancelBtn: null,
    capsuleMinWidth: false,
    hasDesc: false
  },
  data: {
    disabled: false,
    status: 0,
    agreeBtnAttr: {},
    cancelBtnAttr: {}
  },
  didMount: function didMount() {
    var _this$props = this.props,
        agreeBtn = _this$props.agreeBtn,
        cancelBtn = _this$props.cancelBtn,
        related = _this$props.related;
    var agreeBtnCfg = agreeBtn ? Object.assign({
      title: '',
      subtitle: '',
      type: 'primary',
      data: 1,
      checked: false
    }, agreeBtn) : {};
    var cancelBtnCfg = cancelBtn ? Object.assign({
      title: '',
      subtitle: '',
      type: 'default',
      data: 2
    }, cancelBtn) : {};

    if (agreeBtnCfg.checked && related || !related) {
      this.setData({
        disabled: false,
        status: true,
        agreeBtnAttr: agreeBtnCfg,
        cancelBtnAttr: cancelBtnCfg
      });
    } else {
      this.setData({
        disabled: true,
        status: false,
        agreeBtnAttr: agreeBtnCfg,
        cancelBtnAttr: cancelBtnCfg
      });
    }
  },
  methods: {
    onTap: function onTap(e) {
      var onSelect = this.props.onSelect;
      onSelect && onSelect(e);
    },
    onChange: function onChange(e) {
      var related = this.props.related;
      var isSeleted = e.detail.value;

      if (related && isSeleted) {
        this.setData({
          disabled: false,
          status: true
        });
      } else {
        this.setData({
          disabled: true,
          status: false
        });
      }
    }
  }
});