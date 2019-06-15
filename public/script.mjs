'use strict';

let IDE = window.IDE = {};

IDE.socket;

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

//myLayout.init();

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



// LOGIN

let projectInput = document.querySelector('#project');
let adminkeyInput = document.querySelector('#adminkey');
adminkeyInput.addEventListener('keydown',e=>{
  if(e.which==13 && (projectInput.value.length>0)  ){
  
    IDE.projectURL = `https://${projectInput.value}.glitch.me`;
    fetch(IDE.projectURL + '/ide-get-client-config')
    .then(res=>{
      return res.json();
    })
    .then(data=>{
      IDE.config = js_beautify(JSON.stringify(data));
      editor.setValue(IDE.config);
    })
    .catch(err=>{console.log(err)})
    
    IDE.socket = io(IDE.projectURL);
    IDE.socket.on('connect',data=>{
      console.log(`Socket opened to ${IDE.projectURL}.`);
    });
    IDE.socket.on('msg',msg=>{
      console.log(msg);
    });
    IDE.socket.emit('admin-key',adminkeyInput.value,d=>{
      if(d=='success'){
        $('#overlay').hide();
      } 
    });
        
  }
});


// Save Button

myLayout.on( 'stackCreated', function( stack ){
    
    /*
     * Accessing the DOM element that contains the popout, maximise and * close icon
     */
    //console.log('ADDING SAVE BTN');
    //console.log(stack);
    if(stack.contentItems[0].componentName=="code-editor")
      stack.header.controlsContainer.prepend( "<div class='save-btn'>💾</div>" );

    /*
     * Listening for activeContentItemChanged. This happens initially
     * when the stack is created and everytime the user clicks a tab
     */
    stack.on( 'activeContentItemChanged', function( contentItem ){
        // interact with the contentItem
    });

    /*
     * Accessing the container and updating its state
     */
    //stack.getActiveContentItem().container.extendState({color: '#faa'});
});

myLayout.init();

