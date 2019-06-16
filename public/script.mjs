'use strict';

let IDE = window.IDE = {building:false,currentLesson:'client-config'};

IDE.socket;

import {codeEditor} from './components/code-editor/code-editor.mjs';

import {lessons} from './components/lessons/lessons.mjs';




var config = {
    content: [
      {
        type: 'row',
        
        content: [
        
          {
              type: 'row',
              content: [{
                  title: 'Lessons',
                  isClosable: false,
                  type:'component',
                  componentName: 'lessons',
                  componentState: { text: 'CS1 Lessons' }
              }]
          },
        
          {   
              type: 'row',
              content: [{
                title: 'Code Editor',
                isClosable: false,
                type:'component',
                componentName: 'code-editor',
                componentState: { text: 'CS1 IDE Code Editor' }
              }]
          }
                
        ]
    }]
        
};

var myLayout = new window.GoldenLayout( config, $('#layoutContainer') );



myLayout.registerComponent( 'code-editor', function( container, state ){
    container.getElement().html(codeEditor(state));
    let layoutSettings = container.layoutManager.config.settings;
    layoutSettings.showPopoutIcon = false;
});

myLayout.registerComponent( 'lessons', function( container, state ){
    container.getElement().html(lessons(state));
    let layoutSettings = container.layoutManager.config.settings;
    layoutSettings.showPopoutIcon = false;
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

// IDE Functions
IDE.save = function(){
            console.log('calling remote save');
            let path;
            switch(IDE.currentLesson){
              case 'client-config':
                path = './src/core/config/client-config.json';
                break;
              case 'my-components':
                path = './src/core/components/my-components.js';
                break;
            }
            IDE.socket.emit('save',{path:path,txt:editor.getValue()},res=>{
              if(res=='success'){
                $('.save-btn').css('filter','invert(100%)');
                $('.build-btn').css('filter','invert(0%)');
              }else{
                alert('error saving to remote server');
              }
            });
          }
IDE.build = function(){
            if(IDE.building)return;
            console.log('calling remote build');
            IDE.building = true;
            $('.build-btn').html('building remote project');
            $('.save-btn').hide();
            IDE.socket.emit('build',res=>{
              if(res=='success'){
                $('.build-btn').html('🔧');
                $('.save-btn').show();
                $('.build-btn').css('filter','invert(100%)');
              }else{
                alert('error with remote build');
              }
            });
          }



// Editor Buttons

myLayout.on( 'stackCreated', function( stack ){
    
    /*
     * Accessing the DOM element that contains the popout, maximise and * close icon
     */
    //console.log('ADDING SAVE BTN');
    //console.log(stack);
  
    /*
     * Listening for activeContentItemChanged. This happens initially
     * when the stack is created and everytime the user clicks a tab
     */
    stack.on( 'activeContentItemChanged', function( contentItem ){
        // interact with the contentItem
        if(stack.contentItems && stack.contentItems[0] && stack.contentItems[0].componentName=="code-editor"){
          
          stack.header.controlsContainer.prepend( "<div class='build-btn' onclick='IDE.build()'>🔧</div><div class='save-btn' onclick='IDE.save()'>💾</div>" );
        }
    });

    /*
     * Accessing the container and updating its state
     */
    //stack.getActiveContentItem().container.extendState({color: '#faa'});
});

myLayout.init();

