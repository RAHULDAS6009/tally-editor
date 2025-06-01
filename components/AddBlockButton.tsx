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
      className="hover:bg-amber-300"
      label="Add block"
      icon={<MdAdd className="w-20 h-20" />}
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
