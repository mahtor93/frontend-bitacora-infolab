import Editor from "@/app/components/editor/editor.component";
import StateCompo from "@/app/components/auth/auth.component.js";

export default function CreateReport() {
    
  return (
    <StateCompo>
     <div className="mainContent">
      <h2>Creación de Reportes</h2>
        <Editor/>
     </div>
     </StateCompo>
    );
  }