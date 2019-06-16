import codemirror from '../../../lib/codemirror/codemirror.mjs';
import jsMode from '../../../lib/codemirror/js-mode.mjs';


export const codeEditor = state=>{

  return `
  
  
  <textarea class="codemirror-textarea"></textarea>
  
  
  <script>
   var code = $(".codemirror-textarea")[0]
    var editor = CodeMirror.fromTextArea(code,{
    	lineNumbers :true,
      lineWrapping:true,
    	mode:"javascript"
    });
    editor.on('keyup',e=>{
      $('.save-btn').css('filter','invert(0%)');
    })
    //console.log(${JSON.stringify(state)});
    editor.setSize('100%','100%');
  </script>
  
  
  
  `


}