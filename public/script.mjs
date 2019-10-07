'use strict';

let IDE = window.IDE = {building:false,currentLesson:'Client Config'};

IDE.socket;

import {codeEditor} from './components/code-editor/code-editor.mjs';
import {log} from './components/log/log.mjs';

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
              type: 'column',
              content: [{
                title: 'Code Editor',
                isClosable: false,
                type:'component',
                componentName: 'code-editor',
                componentState: { text: 'CS1 IDE Code Editor' }
              },
              {
                title: 'Log',
                isClosable: false,
                type:'component',
                componentName: 'log',
                height: 30,
                componentState: { text: 'CS1 IDE Log' }
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

myLayout.registerComponent( 'log', function( container, state ){
    container.getElement().html(log(state));
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
let cachedKey = '';
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
    
    IDE.getSrc = function(path){
      console.log('trying to get remote source code');
      let mode;
      switch( path.split('.').pop() ){
        case 'html': mode = 'htmlembedded';
          break;
        case 'js': mode = 'javascript';
          break;
        case 'json': mode = {name: "javascript", json: true};
          break;
        case 'css': mode = 'css';
          break;
        case 'py': mode = 'python';
      }
      editor.setOption('mode', mode);
      IDE.socket.emit('get-src',path,d=>{
        if(d.status=='success'){
          editor.setValue(d.data);
          $('.save-btn').css('filter','invert(100%)');
          editor.setSize('100%','100%');
        }else{
          console.error('ERROR RETRIEVING MY COMPONENTS FROM REMOTE SERVER');
          editor.setValue(d.data);
        }
      });
    }
      
    IDE.socket.on('connect',data=>{
      console.log(`Socket opened to ${IDE.projectURL}.`);
    });
    IDE.socket.on('msg',msg=>{
      console.log(msg);
    });
    IDE.socket.emit('admin-key',adminkeyInput.value,d=>{
      if(d=='success'){
        $('#overlay').hide();
        IDE.getSrc(IDE.currentLesson.saveTarget);
        cachedKey = adminkeyInput.value;
      } 
    });
    IDE.socket.on('log',data=>{
       const el = document.querySelector('.cm-s-dracula');
       if(data.includes('failed')){
         el.setAttribute('style',"color:red !important");
       }else{
         el.setAttribute('style',"color:#f8f8f2 !important");
       }
       window.log.setValue(data);
       window.log.setSize('100%','100%');
    });
    IDE.socket.on('disconnect',data=>{
       IDE.socket.emit('admin-key',cachedKey,d=>{
          if(d=='success'){
            console.log('Reauthorizing server connection ...')
            //IDE.save();
            //IDE.getSrc(IDE.currentLesson.saveTarget);
          } 
        });
    });
        
  }
});

// IDE Functions
IDE.save = function(){
            console.log('calling remote save');
            let path;
            switch(IDE.currentLesson.name){
              case 'client-config':
                path = './src/core/config/client-config.json';
                break;
              case 'my-components':
                path = './src/core/components/my-components.js';
                break;
            }
            IDE.socket.emit('save',{path:IDE.currentLesson.saveTarget,txt:editor.getValue()},res=>{
              if(res=='success'){
                $('.save-btn').css('filter','invert(100%)');
                
                if(IDE.currentLesson.saveTarget.includes('socket/addons')){
                  IDE.socket.emit('refresh',res=>{
                    if(res=='success'){
                      $('.save-btn').css('filter','invert(100%)');
                      console.log('server refresh success');
                    }else{alert('fail in refreshing server..')}
                  }); 
                  console.log('called refresh on server');
                }     
              }else{
                alert('error saving to remote server');
              }
            });
          }
IDE.build = function(){
            setLog('building remote project');
            if(IDE.building)return;
            console.log('calling remote build');
            IDE.building = true;
            $('.build-btn').html('');
            $('.save-btn').hide();
            IDE.socket.emit('build',res=>{
              IDE.building = false;
              $('.build-btn').html('🔧');
              $('.save-btn').show();
              $('.build-btn').css('filter','invert(100%)');
              if(res=='success'){
                console.log('successful remote build');
                editor.setSize('100%','100%');
              }else{
                console.log('error with remote build');
              }
            });
          }

function setLog(v){
  const el = document.querySelector('.cm-s-dracula');
  window.log.setValue(v);
  window.log.setSize('100%','100%');
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


$(window).resize(function () {
myLayout.updateSize($(window).width(), $(window).height());
});


myLayout.init();

