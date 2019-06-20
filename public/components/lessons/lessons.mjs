import {templates} from './templates.mjs';



export const lessons = state=>{

  IDE.lesson = {templates:templates};
  IDE.lesson.templates.keys = Object.keys(templates);
  
  
  return `
  
  
  <select id="lesson-select"></select>
  
  <button id="launch-btn" class="pulse">Launch Game</button>
  <button id="lesson-btn" class="pulse">📖</button>
  <button id="quiz-btn" class="pulse">✓</button>
  <div id="lesson">
  <div class="content">  
    <div id="frames">   
      <iframe id="lesson-quizframe" allowfullscreen src=""/>
      <iframe id="lesson-iframe" allowfullscreen src=""/>
    </div>
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
    IDE.lesson.iframe.src = temp.lessonURL;
    IDE.lesson.quizframe.src = temp.quizURL;
    temp.name = IDE.lesson.select.value;
    IDE.currentLesson = temp;
    
     
    IDE.lesson.select.addEventListener('change',e=>{
      let temp = IDE.lesson.templates[IDE.lesson.select.value];
      IDE.saveTarget = temp.saveTarget;
      IDE.lesson.iframe.src = temp.lessonURL;
      IDE.lesson.quizframe.src = temp.quizURL;
      IDE.getSrc(temp.saveTarget);
      IDE.lesson.iframe.style.zIndex = 0; 
      temp.name = IDE.lesson.select.value;
      IDE.currentLesson = temp;
    
    });
    
    let launchBtn = document.querySelector('#launch-btn');
    launchBtn.addEventListener('click',e=>{
      window.open(
        IDE.projectURL,
        '_blank' // <- This is what makes it open in a new window.
      );
      IDE.lesson.select.focus();
    });
    let quizBtn = document.querySelector('#quiz-btn');
    quizBtn.addEventListener('click',e=>{
      IDE.lesson.iframe.style.zIndex = -10; 
    });
    let lessonBtn = document.querySelector('#lesson-btn');
    lessonBtn.addEventListener('click',e=>{
      IDE.lesson.iframe.style.zIndex = 0; 
    });
    
  </script>
   
  `


}