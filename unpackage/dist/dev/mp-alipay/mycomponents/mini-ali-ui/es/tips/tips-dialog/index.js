import fmtEvent from '../../_util/fmtEvent';
import fmtUnit from '../../_util/fmtUnit';
Component({
  props: {
    show: true,
    className: '',
    type: 'dialog',
    iconSize: 20,
    arrowPosition: 'bottom-left'
  },
  data: {
    arrowColor: '000',
    iconSizeClose: fmtUnit(18)
  },
  methods: {
    onCloseTap: function onCloseTap(e) {
      var onCloseTap = this.props.onCloseTap;
      var event = fmtEvent(this.props, e);

      if (onCloseTap) {
        onCloseTap(event);
      }
    }
  }
});