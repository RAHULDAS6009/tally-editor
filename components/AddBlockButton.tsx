import {
  SideMenuProps,
  useBlockNoteEditor,
  useComponentsContext,
} from "@blocknote/react";
import { MdAdd } from "react-icons/md";

export function AddBlockButton(props: SideMenuProps) {
  const editor = useBlockNoteEditor();
  const Components = useComponentsContext()!;

  return (
    <Components.SideMenu.Button
      label="Add block"
      icon={<MdAdd size={20} />}
      onClick={() => {
        const currentBlock = editor.getTextCursorPosition().block;

        editor.insertBlocks(
          [
            {
              type: "paragraph", // Or any custom block like "inputbox"
              content: [{ type: "text", text: "", styles: {} }],
            },
          ],
          currentBlock,
          "after"
        );
      }}
    />
  );
}
