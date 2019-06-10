'use strict';

window.IDE = {};

import {codeEditor} from './components/code-editor/code-editor.mjs';

import {lessons} from './components/lessons/lessons.mjs';




var config = {
    content: [{
        type: 'column',
        content: [{
            title: 'Code Editor',
            type:'component',
            componentName: 'code-editor',
            componentState: { text: 'CS1 IDE Code Editor' }
        },
        
        
        
         {
        type: 'column',
        content: [{
            title: 'Lessons',
            type:'component',
            componentName: 'lessons',
            componentState: { text: 'CS1 Lessons' }
        }]
        }
        
        
        
        
        
        ]
    }]
        
};

var myLayout = new window.GoldenLayout( config, $('#layoutContainer') );



myLayout.registerComponent( 'code-editor', function( container, state ){
    container.getElement().html(codeEditor(state));
});

myLayout.registerComponent( 'lessons', function( container, state ){
    container.getElement().html(lessons(state));
});

myLayout.init();

var addMenuItem = function( title, name, text='default' ) {
    var element = $( '<li>' + title + '</li>' );
    $( '#menuContainer' ).append( element );

   var newItemConfig = {
        title: title,
        type: 'component',
        componentName: name,
        componentState: { text: text }
    };
  
    myLayout.createDragSource( element, newItemConfig );
};

//addMenuItem( 'Lessons', 'lessons' );
//addMenuItem( 'Code Editor', 'code-editor', 'code' );

let projectInput = document.querySelector('#project');
projectInput.addEventListener('keydown',e=>{
  if(e.which==13){
    fetch(`https://${projectInput.value}.glitch.me/ide-get-client-config`)
    .then(res=>{
      return res.json();
    })
    .then(data=>{
      IDE.config = js_beautify(JSON.stringify(data));
      editor.setValue(IDE.config)
    })
    .catch(err=>{console.log(err)})
    
    $('#overlay').hide();
  }
});

