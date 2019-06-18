import codemirror from '../../../lib/codemirror/codemirror.mjs';
import shellMode from '../../../lib/codemirror/shell-mode.mjs';


export const log = state=>{

  return `
  
  
  <textarea class="log-textarea"></textarea>
  
  
  <script>
   var logTA = $(".log-textarea")[0]
    var log = CodeMirror.fromTextArea(logTA,{
    	lineNumbers :false,
      lineWrapping:true,
    	mode:"null",
      theme:"dracula"
    });
    log.setSize('100%','100%');
  </script>
  
  
  
  `


}