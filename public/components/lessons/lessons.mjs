import {templates} from './templates.mjs';



export const lessons = state=>{

  IDE.lesson = {templates:templates};
  IDE.lesson.templates.keys = Object.keys(templates);
  
  
  return `
  
  
  <select id="lesson-select"></select>
  
  <button id="launch-btn" class="pulse">Launch Game</button>
  
  <div id="lesson">
  <div class="content">
  <span class="lesson-hd">Client Config</span> 
  <button id="quiz-btn" class="pulse">✓</button>
  <button id="lesson-btn" class="pulse">📖</button>
    <hr>
    <iframe 
    id="lesson-iframe"
    width="100%"
    height="800px"
    src=""/>
    <iframe 
    id="lesson-quizframe"
    width="100%"
    height="800px"
    src=""/>
  </div>
  
  
  <script>
    
    IDE.lesson.select = document.querySelector('#lesson-select');
    IDE.lesson.heading = document.querySelector('.lesson-hd');
    IDE.lesson.iframe = document.querySelector('#lesson-iframe');
    IDE.lesson.quizframe = document.querySelector('#lesson-quizframe');
    
    IDE.lesson.templates.keys.forEach(lessonName=>{
      IDE.lesson.select.options[IDE.lesson.select.options.length] = new Option(lessonName, lessonName);
    });
    
    let temp = IDE.lesson.templates[IDE.lesson.select.value];
    IDE.saveTarget = temp.saveTarget;
    IDE.lesson.heading.innerHTML = IDE.lesson.select.value;
    IDE.lesson.iframe.src = temp.lessonURL;
    IDE.lesson.quizframe.src = temp.quizURL;
    temp.name = IDE.lesson.select.value;
    IDE.currentLesson = temp;
    
     
    IDE.lesson.select.addEventListener('change',e=>{
      let temp = IDE.lesson.templates[IDE.lesson.select.value];
      IDE.saveTarget = temp.saveTarget;
      IDE.lesson.heading.innerHTML = IDE.lesson.select.value;
      IDE.lesson.iframe.src = temp.lessonURL;
      IDE.lesson.quizframe.src = temp.quizURL;
      IDE.getSrc(temp.saveTarget);
      IDE.lesson.iframe.hidden = false; 
      temp.name = IDE.lesson.select.value;
      IDE.currentLesson = temp;
    
    });
    
    let launchBtn = document.querySelector('#launch-btn');
    launchBtn.addEventListener('click',e=>{
      window.open(
        IDE.projectURL,
        '_blank' // <- This is what makes it open in a new window.
      );
    });
    let quizBtn = document.querySelector('#quiz-btn');
    quizBtn.addEventListener('click',e=>{
      IDE.lesson.iframe.hidden = true; 
    });
    let lessonBtn = document.querySelector('#lesson-btn');
    lessonBtn.addEventListener('click',e=>{
      IDE.lesson.iframe.hidden = false; 
    });
    
  </script>
   
  `


}