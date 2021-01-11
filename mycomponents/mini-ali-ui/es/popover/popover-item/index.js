import fmtEvent from '../../_util/fmtEvent';
import fmtUnit from '../../_util/fmtUnit';
Component({
  props: {
    className: '',
    iconURL: '',
    iconType: ''
  },
  data: {
    iconSize: fmtUnit(22)
  },
  methods: {
    onItemClick: function onItemClick(e) {
      if (this.props.onItemClick && typeof this.props.onItemClick === 'function') {
        var event = fmtEvent(this.props, e);
        this.props.onItemClick(event);
      }
    }
  }
});