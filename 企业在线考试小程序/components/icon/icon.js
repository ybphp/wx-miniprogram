Component({
  externalClasses: ['tui-icon-class'],
  properties: {
    name: {
      type: String,
      value: ''
    },
    size: {
      type: Number,
      value: 16
    },
    color: {
      type: String,
      value: ''
    },
    bold:{
      type:Boolean,
      value:false
    },
    visible:{
      type: Boolean,
      value: true
    }
  }
});
