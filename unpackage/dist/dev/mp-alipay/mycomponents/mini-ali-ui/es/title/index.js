import fmtEvent from '../_util/fmtEvent';
Component({
  props: {
    // title component have boder-bottom line
    hasLine: false,
    // type: arrow、close、more、'';
    type: '',
    // if type="arrow", need to write path
    iconURL: '',
    onActionTap: function onActionTap() {},
    // developer can use class for style
    className: ''
  },
  data: {},
  didMount: function didMount() {},
  didUpdate: function didUpdate() {},
  didUnmount: function didUnmount() {},
  methods: {
    onClick: function onClick(e) {
      var onActionTap = this.props.onActionTap;
      var event = fmtEvent(this.props, e);

      if (typeof onActionTap === 'function') {
        onActionTap(event);
      }
    }
  }
});