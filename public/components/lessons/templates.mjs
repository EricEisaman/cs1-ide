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
CLIENT CONFIG LESSON<p>Under construction</p>
`}

export const helloComponentLessonTemplate = props=>{ return `
HELLO COMPONENT LESSON<p>Under construction</p>
`}






