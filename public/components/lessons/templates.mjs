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

export const myComponentsLessonTemplate = props=>{ return `
<div class="content">MY COMPONENTS LESSON<p>Under construction</p></div>
`}






