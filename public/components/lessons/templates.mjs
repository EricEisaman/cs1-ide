// CODE TEMPLATES

export const aframeComponentCodeTemplate = props=>{ return `AFRAME.registerComponent('log', {
  schema: {
    msg: {type: 'string', default: 'Hello, World!'}
  },

  init: function () {
    var self = this;
    
  },

  update: function (oldData) {
    
  }
});`}




// LESSON TEMPLATES

export const clientConfigLessonTemplate = props=>{ return `
<div class="content">CLIENT CONFIG LESSON<p>Under construction</p></div>
`}

export const helloComponentLessonTemplate = props=>{ return `
<div class="content">HELLO COMPONENT LESSON<p>Under construction</p></div>
`}






