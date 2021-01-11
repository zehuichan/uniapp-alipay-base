import fmtEvent from '../_util/fmtEvent';
Component({
  props: {
    maskZindex: '',
    // product: 产品弹窗蒙层；market：营销弹窗蒙层；
    type: 'product',
    onMaskTap: function onMaskTap() {},
    show: true,
    fixMaskFull: false
  },
  methods: {
    onMaskClick: function onMaskClick(e) {
      var onMaskTap = this.props.onMaskTap;

      if (onMaskTap !== '' && typeof onMaskTap === 'function') {
        var event = fmtEvent(this.props, e);
        onMaskTap(event);
      }
    }
  }
});