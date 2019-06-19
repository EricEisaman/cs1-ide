import codemirror from '../../../lib/codemirror/codemirror.mjs';
import jsMode from '../../../lib/codemirror/js-mode.mjs';


export const codeEditor = state=>{

  return `
  
  
  <textarea class="editor-textarea"></textarea>
  
  
  <script>
   var codeTA = $(".editor-textarea")[0]
    var editor = CodeMirror.fromTextArea(codeTA,{
    	lineNumbers :true,
      lineWrapping:true,
    	mode:"javascript",
      theme:"dracula"
    });
    editor.on('keyup',e=>{
      $('.save-btn').css('filter','invert(0%)');
    })
    //console.log(${JSON.stringify(state)});
    editor.setSize('100%','100%');
  </script>
  
  
  
  `


}