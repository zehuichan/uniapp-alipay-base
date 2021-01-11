import fmtEvent from '../_util/fmtEvent';
Component({
  mixins: [],
  data: {},
  props: {
    className: '',
    type: 'line',
    title: '',
    thumb: '',
    icon: '',
    custom: '',
    onActionTap: function onActionTap() {}
  },
  didMount: function didMount() {},
  didUpdate: function didUpdate() {},
  didUnmount: function didUnmount() {},
  methods: {
    onTitleClick: function onTitleClick(e) {
      var onActionTap = this.props.onActionTap;
      var event = fmtEvent(this.props, e);

      if (typeof onActionTap === 'function') {
        onActionTap(event);
      }
    }
  }
});