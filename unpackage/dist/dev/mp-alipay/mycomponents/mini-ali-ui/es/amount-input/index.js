import fmtEvent from '../_util/fmtEvent';
import fmtUnit from '../_util/fmtUnit';
Component({
  props: {
    type: 'number',
    className: '',
    focus: false,
    placeholder: '',
    value: '',
    controlled: true,
    showClear: false,
    focusAfterClear: true,
    enableNative: undefined // 兼容安卓input的输入

  },
  data: {
    _focus: false,
    _unit: '',
    iconSize: fmtUnit(22)
  },
  didMount: function didMount() {
    this.getMoneyUnit(this.props.value);
    this.setData({
      _focus: this.props.focus
    });
  },
  didUpdate: function didUpdate(prevProps) {
    var prevFocus = prevProps.focus;
    var nowFocus = this.props.focus;

    if (prevFocus !== nowFocus) {
      this.setData({
        _focus: nowFocus
      });
    }

    this.getMoneyUnit(this.props.value);
  },
  methods: {
    onInput: function onInput(e) {
      var event = fmtEvent(this.props, e);

      if (this.props.onInput) {
        this.props.onInput(event);
      }

      this.getMoneyUnit(e.detail.value);
    },
    onConfirm: function onConfirm(e) {
      var event = fmtEvent(this.props, e);

      if (this.props.onConfirm) {
        this.props.onConfirm(event);
      }
    },
    onButtonClick: function onButtonClick() {
      if (this.onButtonClick) {
        this.props.onButtonClick();
      }
    },
    onFocus: function onFocus(e) {
      this.setData({
        _focus: true
      });
      var event = fmtEvent(this.props, e);

      if (this.props.onFocus) {
        this.props.onFocus(event);
      }

      this.getMoneyUnit(e.detail.value);
    },
    onBlur: function onBlur(e) {
      this.setData({
        _focus: false
      });
      var event = fmtEvent(this.props, e);

      if (this.props.onBlur) {
        this.props.onBlur(event);
      }

      this.getMoneyUnit(e.detail.value);
    },
    onClearTap: function onClearTap() {
      if (this.props.focusAfterClear) {
        this.setData({
          _focus: true
        });
      }

      if (this.props.onClear) {
        this.props.onClear();
      }
    },
    getMoneyUnit: function getMoneyUnit(inputValue) {
      var value = Math.floor(inputValue);

      if (value > 999.99 && value <= 10000) {
        this.setData({
          _unit: '千'
        });
      } else if (value > 9999.99 && value <= 100000) {
        this.setData({
          _unit: '万'
        });
      } else if (value > 99999.99 && value <= 1000000) {
        this.setData({
          _unit: '十万'
        });
      } else if (value > 999999.99 && value <= 10000000) {
        this.setData({
          _unit: '百万'
        });
      } else if (value > 9999999.99 && value <= 100000000) {
        this.setData({
          _unit: '千万'
        });
      } else if (value > 99999999.99 && value <= 1000000000) {
        this.setData({
          _unit: '亿'
        });
      } else if (value > 999999999.99 && value <= 10000000000) {
        this.setData({
          _unit: '十亿'
        });
      } else {
        this.setData({
          _unit: ''
        });
      }
    }
  }
});