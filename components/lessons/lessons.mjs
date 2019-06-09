export const lessons = state=>{

  return `
  
  
  <select class="lesson-select">
    <option value="client-config">Client Config</option>
    <option value="hello-component">Hello Component</option>
  </select>
  
  
  <script>
    let lesson = document.querySelector('.lesson');
    let select = document.querySelector('.lesson-select');
    
    select.addEventListener('change',e=>{
     
     switch(select.value){
     
       case 'client-config':
         lesson.innerHTML = 'CLIENT CONFIG LESSON';
         break;
       case 'hello-component':
         lesson.innerHTML = 'HELLO COMPONENT LESSON';
         break;
     
     }
      
    
    });
   
  </script>
  
  <div class="lesson">
     CLIENT CONFIG LESSON
  </div>
  
  
  
  `


}