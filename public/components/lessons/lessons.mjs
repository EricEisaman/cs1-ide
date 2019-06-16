import {aframeComponentCodeTemplate,
        clientConfigLessonTemplate,
        myComponentsLessonTemplate} from './templates.mjs';



export const lessons = state=>{

  IDE.getSrc = function(path){
    IDE.socket.emit('get-src',path,d=>{
      if(d.status=='success'){
        console.log(d.data);
        editor.setValue(d.data);
      }else{
        console.error('ERROR RETRIEVING MY COMPONENTS FROM REMOTE SERVER');
        console.log(d.data);
        editor.setValue(d.data);
      }
    });
  }
  IDE.clientConfigLessonTemplate = clientConfigLessonTemplate;
  IDE.myComponentsLessonTemplate = myComponentsLessonTemplate;

  return `
  
  
  <select id="lesson-select">
    <option value="client-config">Client Config</option>
    <option value="my-components">My Components</option>
  </select>
  
  
  <script>
    
    let lesson = document.querySelector('#lesson');
    lesson.innerHTML = IDE.clientConfigLessonTemplate();
    let select = document.querySelector('#lesson-select');
    
    select.addEventListener('change',e=>{
     
     switch(select.value){
     
       case 'client-config':
         lesson.innerHTML = IDE.clientConfigLessonTemplate();
         IDE.getSrc('./src/core/config/client-config.json');
         IDE.currentLesson = 'client-config';
         break;
       case 'my-components':
         lesson.innerHTML = IDE.myComponentsLessonTemplate();
         IDE.getSrc('./src/core/components/my-components.js');
         IDE.currentLesson = 'my-components';
         break;
     
     }
      
    
    });
   
  </script>
  
  <div id="lesson"></div>
  
  
  
  `


}