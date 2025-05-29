import { useEffect, useState } from "react";
import { useCreateBlockNote } from "@blocknote/react";

export const useBlockToHtml = () => {
  const editor = useCreateBlockNote();
  const [html, setHTML] = useState<string>("");

  useEffect(() => {
    const updateHTML = async () => {
      if (editor) {
        const htmlString = await editor.blocksToHTMLLossy(editor.document);
        setHTML(htmlString);
      }
    };

    updateHTML();
  }, [editor]);

  return { html, editor };
};
