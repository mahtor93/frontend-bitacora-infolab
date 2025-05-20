
import { Editor, RichUtils } from "draft-js";
import { FaBold, FaItalic, FaStrikethrough, FaUnderline } from "react-icons/fa";
import { IoCodeOutline } from "react-icons/io5";
import { BsBlockquoteLeft } from "react-icons/bs";
import { GrUnorderedList } from "react-icons/gr";
import { AiOutlineOrderedList } from "react-icons/ai";
import styles from "./editor.module.css"; // Usa los mismos estilos

export default function TextEditor({ editorState, setEditorState }) {
  // Funciones para cambiar estilos
  const toggleInlineStyle = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const toggleBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  return (
    <div className={styles.textEditor}>
      <div className={styles.editorButtonRack}>
        <button type="button" onClick={() => toggleInlineStyle("BOLD")}>
          <FaBold />
        </button>
        <button
          type="button"
          onClick={() => toggleInlineStyle("ITALIC")}
          title="Cursiva"
        >
          <FaItalic />
        </button>
        <button
          type="button"
          onClick={() => toggleInlineStyle("UNDERLINE")}
          title="Subrayado"
        >
          <FaUnderline />
        </button>
        <button
          type="button"
          onClick={() => toggleInlineStyle("STRIKETHROUGH")}
          title="Tachado"
        >
          <FaStrikethrough />
        </button>
        <button type="button" onClick={() => toggleInlineStyle("CODE")} title="Código">
          <IoCodeOutline />
        </button>
        <button
          type="button"
          onClick={() => toggleBlockType("blockquote")}
          title="Cita"
        >
          <BsBlockquoteLeft />
        </button>
        <button
          type="button"
          onClick={() => toggleBlockType("unordered-list-item")}
          title="Lista"
        >
          <GrUnorderedList />
        </button>
        <button
          type="button"
          onClick={() => toggleBlockType("ordered-list-item")}
          title="Lista Ordenada"
        >
          <AiOutlineOrderedList />
        </button>
        <button
          type="button"
          onClick={() => toggleBlockType("header-three")}
          title="Encabezado 3"
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => toggleBlockType("header-four")}
          title="Encabezado 4"
        >
          H4
        </button>
        <button
          type="button"
          onClick={() => toggleBlockType("header-five")}
          title="Encabezado 5"
        >
          H5
        </button>
        <button
          type="button"
          onClick={() => toggleBlockType("header-six")}
          title="Encabezado 6"
        >
          H6
        </button>
      </div>
      <div className={styles.wrapperClassName}>
        <Editor
          className={styles.editorClassName}
          name="description"
          editorState={editorState}
          onChange={setEditorState}
          placeholder="Escribe tu reporte aquí"
        />
      </div>
    </div>
  );
}
