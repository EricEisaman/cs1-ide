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
<div class="content">
  Client Config Lesson
  <hr>
  <p>
    Under construction
  </p>
</div>
`}

export const myComponentsLessonTemplate = props=>{ return `
<div class="content">
  My Components Lesson
  <hr>
  <p>
    The CS1 Game Engine is built upon the A-Frame entity component system.  An entity component system allows you to easily declare game objects called entities in HTML. Components provide you with a convenient way to add appearance and behavior to an entity.
  </p>
  <iframe 
  width="100%"
  height="800px"
  src="https://aframe.io/docs/0.9.0/core/component.html">
  Under construction</iframe>
</div>
`}






