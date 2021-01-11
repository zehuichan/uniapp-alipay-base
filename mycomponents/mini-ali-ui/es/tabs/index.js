import fmtUnit from '../_util/fmtUnit';
Component({
  props: {
    className: '',
    // tabbar激活的 tab 样式 class
    activeCls: '',
    // tabbar的自定义样式class
    tabBarCls: '',
    // 选中选项卡下划线颜色 & 胶囊选中背景色
    tabBarUnderlineColor: '#1677FF',
    // 选中选项卡字体颜色
    tabBarActiveTextColor: '#1677FF',
    // 胶囊选中选项卡字体颜色
    capsuleTabBarActiveTextColor: '#ffffff',
    // 未选中选项卡字体颜色
    tabBarInactiveTextColor: '#333333',
    // 未选中描述字体颜色
    tabBarSubTextColor: '#999999',
    // 选中描述字体颜色
    tabBarActiveSubTextColor: '#ffffff',
    // 选项卡背景颜色
    tabBarBackgroundColor: '#ffffff',
    // 胶囊选项卡未选中的背景色
    capsuleTabBarBackgroundColor: '#e5e5e5',
    showPlus: false,
    // tabs 内容区是否可拖动，true 可拖动，内容区固定高度 false 不可拖动，内容区自适应高度
    swipeable: true,
    // 当前激活tab id
    activeTab: 0,
    animation: true,
    duration: 500,
    // 是否为胶囊形式 tab
    capsule: false,
    // 是否有副标题
    hasSubTitle: false,
    elevator: false,
    floorNumber: [],
    elevatorTop: '0px',
    showBadge: false,
    // 选中选项卡下划线宽度
    tabBarUnderlineWidth: '',
    // 选中选项卡下划线高度
    tabBarUnderlineHeight: '',
    // 电梯组件 tab-content 距离顶部高度
    elevatorContentTop: 0,
    // 通过接收外部传值，动态控制 tab-content 在 swiper 下的高度
    tabContentHeight: '',
    // plus icon 类型更多的支持
    plusIcon: 'add',
    plusIconSize: 16,
    plusIconColor: '',
    // plus icon 使用 image 的方式
    plusImg: '',
    plusImgWidth: '',
    plusImgHeight: '',
    // tab-bar 是否滚动定位在顶部的判断
    stickyBar: false
  },
  data: {
    windowWidth: 0,
    tabWidth: 0.25,
    autoplay: false,
    animation: false,
    showLeftShadow: false,
    showRightShadow: true,
    version: my.SDKVersion,
    viewScrollLeft: 0,
    tabViewNum: 0,
    hideRightShadow: false,
    boxWidth: 0,
    elWidth: 0,
    tabFontSize15: fmtUnit('15px'),
    tabFontSize13: fmtUnit('13px'),
    _showPlus: false
  },
  didMount: function didMount() {
    var _this = this;

    var _this$props = this.props,
        tabs = _this$props.tabs,
        animation = _this$props.animation,
        hasSubTitle = _this$props.hasSubTitle,
        elevator = _this$props.elevator,
        showPlus = _this$props.showPlus;

    if (tabs.length !== 0 || !tabs) {
      this.setData({
        _showPlus: showPlus
      });
      this.setWindowWidth();

      if (hasSubTitle) {
        this.setData({
          capsule: true
        });
      }

      this.setData({
        tabWidth: tabs.length > 3 ? 0.25 : 1 / tabs.length,
        animation: animation,
        autoplay: true
      });

      if (elevator) {
        this.setData({
          swipeable: false
        }); // 记录电梯组件总高度，并写入 data

        my.createSelectorQuery().select('#am-tabs-elevator-content').boundingClientRect().exec(function (ret) {
          _this.setData({
            elevatorHeight: ret[0].height
          });
        }); // 获取电梯组件每个 pane 的 top 值

        this.getElevatorHeight(tabs);
      } // 初始状态下，如果 activeTab 数值较大，会将后面的 tab 前移


      var boxWidth = 0;
      var elWidth = 0;
      var elLeft = 0;
      my.createSelectorQuery().select("#tabs-item-" + this.props.tabsName + "-" + this.props.activeTab).boundingClientRect().exec(function (ret) {
        elWidth = ret[0].width;
        elLeft = ret[0].left;

        _this.setData({
          elWidth: elWidth,
          elLeft: elLeft
        });
      });
      my.createSelectorQuery().select("#am-tabs-bar-" + this.props.tabsName + "-content").boundingClientRect().exec(function (ret) {
        boxWidth = ret[0].width;

        _this.setData({
          boxWidth: boxWidth
        });

        setTimeout(function () {
          _this.setData({
            viewScrollLeft: Math.floor(_this.data.elWidth + _this.data.elLeft - _this.data.boxWidth)
          });
        }, 300);
      });
    }
  },
  didUpdate: function didUpdate(prevProps, prevData) {
    var _this2 = this;

    var _this$props2 = this.props,
        tabs = _this$props2.tabs,
        elevator = _this$props2.elevator,
        showPlus = _this$props2.showPlus;
    this.setData({
      _showPlus: showPlus
    });

    if (prevProps.tabs.length !== tabs.length) {
      this.setData({
        tabWidth: tabs.length > 3 ? 0.25 : 1 / tabs.length
      });
    }

    if (elevator) {
      // 当 didUpdate 时判断电梯组件总高度是否发生变化
      my.createSelectorQuery().select('#am-tabs-elevator-content').boundingClientRect().exec(function (ret) {
        if (ret[0].height !== _this2.data.elevatorHeight) {
          // 如高度变化将页面滚动至顶部，重新设置电梯总高度
          my.pageScrollTo({
            scrollTop: 0,
            success: function success() {
              _this2.setData({
                elevatorHeight: ret[0].height
              }); // 总高度变化后，重新获取电梯组件每个 panel 的 top 值


              _this2.getElevatorHeight(tabs);
            }
          });
        }
      });
      this.$page.data.floorNumber = this.data.floorNumber;

      if (this.$page.data.getFloorNumber >= 0) {
        this.setData({
          tabViewNum: this.$page.data.getFloorNumber,
          prevTabViewNum: prevData.tabViewNum
        });
      }
    }
  },
  methods: {
    setWindowWidth: function setWindowWidth() {
      var _this3 = this;

      my.getSystemInfo({
        success: function success(res) {
          _this3.setData({
            windowWidth: res.windowWidth
          });
        }
      });
    },
    getElevatorHeight: function getElevatorHeight(tabs) {
      var _this4 = this;

      var _loop = function _loop(i) {
        my.createSelectorQuery().select("#am-tabs-elevator-pane-" + i).boundingClientRect().select('.am-tabs-bar-sticky').boundingClientRect().exec(function (ret) {
          var _this4$props = _this4.props,
              elevatorTop = _this4$props.elevatorTop,
              elevatorContentTop = _this4$props.elevatorContentTop;
          var tabContentDistance = 0;

          if (elevatorTop.match(/\d+px/)) {
            tabContentDistance = parseInt(elevatorTop, 10);
          } else {
            tabContentDistance = parseInt(elevatorContentTop, 10);
          }

          _this4.props.floorNumber[i] = ret[0].top - ret[1].height - tabContentDistance;

          _this4.setData({
            floorNumber: _this4.props.floorNumber
          });
        });
      };

      for (var i = 0; i < tabs.length; i++) {
        _loop(i);
      }

      setTimeout(function () {
        _this4.$page.data.floorNumber = _this4.data.floorNumber;
      }, 100);
    },
    handleSwiperChange: function handleSwiperChange(e) {
      var current = e.detail.current;
      var tabsName = e.target.dataset.tabsName;
      this.setData({
        tabViewNum: current
      });

      if (this.props.onChange) {
        this.props.onChange({
          index: current,
          tabsName: tabsName
        });
      }
    },
    handleTabClick: function handleTabClick(e) {
      var _this5 = this;

      var _e$target$dataset = e.target.dataset,
          index = _e$target$dataset.index,
          tabsName = _e$target$dataset.tabsName,
          floor = _e$target$dataset.floor;
      var boxWidth = 0;
      var elWidth = 0;
      my.createSelectorQuery().select("#" + e.currentTarget.id).boundingClientRect().exec(function (ret) {
        elWidth = ret[0].width;

        _this5.setData({
          elWidth: elWidth
        });
      });
      my.createSelectorQuery().select("#am-tabs-bar-" + tabsName + "-content").boundingClientRect().exec(function (ret) {
        boxWidth = ret[0].width;

        _this5.setData({
          boxWidth: boxWidth
        });

        if (_this5.data.elWidth > _this5.data.boxWidth / 2) {
          setTimeout(function () {
            _this5.setData({
              viewScrollLeft: e.currentTarget.offsetLeft - 40
            });
          }, 300);
        } else {
          setTimeout(function () {
            _this5.setData({
              viewScrollLeft: e.currentTarget.offsetLeft - Math.floor(_this5.data.boxWidth / 2)
            });
          }, 300);
        }
      });

      if (this.props.onTabClick && !this.props.elevator) {
        this.props.onTabClick({
          index: index,
          tabsName: tabsName
        });
      }

      if (this.props.onTabClick && this.props.elevator) {
        this.setData({
          tabViewNum: this.data.prevTabViewNum
        });
        setTimeout(function () {
          _this5.props.onTabClick({
            index: index,
            tabsName: tabsName
          });
        }, 300);
        my.pageScrollTo({
          scrollTop: Math.ceil(floor),
          duration: 1
        });
      }
    },
    handlePlusClick: function handlePlusClick() {
      if (this.props.onPlusClick) {
        this.props.onPlusClick();
      }
    },
    showLeftShadow: function showLeftShadow(e) {
      var _e$detail = e.detail,
          scrollLeft = _e$detail.scrollLeft,
          scrollWidth = _e$detail.scrollWidth; // 判断是否隐藏左边的阴影

      if (scrollLeft > 0) {
        this.setData({
          showLeftShadow: true
        });
      } else {
        this.setData({
          showLeftShadow: false
        });
      } // 判断是否隐藏右边的阴影


      if (scrollLeft + this.data.boxWidth >= scrollWidth - 8) {
        this.setData({
          showRightShadow: false
        });
      } else {
        this.setData({
          showRightShadow: true
        });
      }
    },
    onTabFirstShow: function onTabFirstShow(e) {
      // SDKversion 最低要求 1.9.4
      var _e$target$dataset2 = e.target.dataset,
          index = _e$target$dataset2.index,
          tabsName = _e$target$dataset2.tabsName;

      if (this.props.onTabFirstShow) {
        this.props.onTabFirstShow({
          index: index,
          tabsName: tabsName
        });
      }
    }
  }
});