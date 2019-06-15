import codemirror from '../../../lib/codemirror/codemirror.mjs';
import jsMode from '../../../lib/codemirror/js-mode.mjs';


export const codeEditor = state=>{

  return `
  
  
  <textarea class="codemirror-textarea"></textarea>
  
  
  <script>
   var code = $(".codemirror-textarea")[0]
    var editor = CodeMirror.fromTextArea(code,{
    	lineNumbers :true,
    	mode:"javascript"
    });
    //console.log(${JSON.stringify(state)});
    editor.setSize('100%','100%');
  </script>
  
  
  
  `


}