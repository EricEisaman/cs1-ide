import {aframeComponentCodeTemplate,
        clientConfigLessonTemplate,
        helloComponentLessonTemplate} from './templates.mjs';



export const lessons = state=>{

  IDE.aframeComponentCodeTemplate = aframeComponentCodeTemplate;
  IDE.clientConfigLessonTemplate = clientConfigLessonTemplate;
  IDE.helloComponentLessonTemplate = helloComponentLessonTemplate;

  return `
  
  
  <select id="lesson-select">
    <option value="client-config">Client Config</option>
    <option value="hello-component">Hello Component</option>
  </select>
  
  
  <script>
    
    let lesson = document.querySelector('#lesson');
    lesson.innerHTML = IDE.clientConfigLessonTemplate();
    let select = document.querySelector('#lesson-select');
    
    select.addEventListener('change',e=>{
     
     switch(select.value){
     
       case 'client-config':
         lesson.innerHTML = IDE.clientConfigLessonTemplate();
         editor.setValue(IDE.config);
         break;
       case 'hello-component':
         lesson.innerHTML = IDE.helloComponentLessonTemplate();
         editor.setValue(IDE.aframeComponentCodeTemplate());
         break;
     
     }
      
    
    });
   
  </script>
  
  <div id="lesson"></div>
  
  
  
  `


}