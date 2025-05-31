"use client"; // this registers <Editor> as a Client Component

import "@blocknote/core/fonts/inter.css";
import {
  BlockTypeSelectItem,
  blockTypeSelectItems,
  FormattingToolbar,
  FormattingToolbarController,
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
  useCreateBlockNote,
} from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { addBlock } from "@/slices/BlockSlice";
import { useAppDispatch } from "@/hook";
import {
  Block,
  BlockNoteSchema,
  defaultBlockSpecs,
  filterSuggestionItems,
  insertOrUpdateBlock,
  PartialBlock,
} from "@blocknote/core";
import { Alert } from "./customBlock/Alert";
import { RiAlertFill } from "react-icons/ri";
import { CustomSlashMenu } from "./CustomSlashMenu";
import { InputBox } from "./customBlock/InputBox";

export const schema = BlockNoteSchema.create({
  blockSpecs: {
    // Adds all default blocks.
    ...defaultBlockSpecs,
    // Adds the Alert block.
    alert: Alert,
    //Adds the Input Block
    inputbox: InputBox,
  },
});

const insertAlert = (editor: typeof schema.BlockNoteEditor) => ({
  title: "Alert",
  subtext: "Alert for emphasizing text",
  onItemClick: () =>
    // If the block containing the text caret is empty, `insertOrUpdateBlock`
    // changes its type to the provided block. Otherwise, it inserts the new
    // block below and moves the text caret to it. We use this function with an
    // Alert block.
    insertOrUpdateBlock(editor, {
      type: "alert",
    }),
  aliases: [
    "alert",
    "notification",
    "emphasize",
    "warning",
    "error",
    "info",
    "success",
  ],
  group: "Basic blocks",
  icon: <RiAlertFill />,
});

const insertInput = (editor: typeof schema.BlockNoteEditor) => ({
  title: "inputbox",
  subtext: "inputbox for emphasizing text",
  onItemClick: () =>
    // If the block containing the text caret is empty, `insertOrUpdateBlock`
    // changes its type to the provided block. Otherwise, it inserts the new
    // block below and moves the text caret to it. We use this function with an
    // Alert block.
    insertOrUpdateBlock(editor, {
      type: "inputbox",
    }),

  group: "Basic blocks",
  icon: <RiAlertFill />,
});

// Our <Editor> component we can reuse later
export default function Editor() {
  // Creates a new editor instance.
  const editor = useCreateBlockNote({
    schema,
  });

  console.log(editor.document);
  const dispatch = useAppDispatch();

  // Renders the editor instance using a React component.
  return (
    <BlockNoteView
      editor={editor}
      formattingToolbar={false}
      slashMenu={false}
      onChange={() => dispatch(addBlock(editor.document as PartialBlock[]))}
    >
      {/* Replaces the default Formatting Toolbar */}
      <FormattingToolbarController
        formattingToolbar={() => (
          // Uses the default Formatting Toolbar.
          <FormattingToolbar
            // Sets the items in the Block Type Select.
            blockTypeSelectItems={[
              // Gets the default Block Type Select items.
              ...blockTypeSelectItems(editor.dictionary),
              // Adds an item for the Alert block.
              {
                name: "Alert",
                type: "alert",
                icon: RiAlertFill,
                isSelected: (block) => block.type === "alert",
              } satisfies BlockTypeSelectItem,
              {
                name: "inputbox",
                type: "inputbox",
                icon: RiAlertFill,
                isSelected: (block) => block.type === "inputbox",
              } satisfies BlockTypeSelectItem,
            ]}
          />
        )}
      />
      {/* Replaces the default Slash Menu. */}
      <SuggestionMenuController
        triggerCharacter={"/"}
        suggestionMenuComponent={CustomSlashMenu}
        getItems={async (query) => {
          // Gets all default slash menu items.
          const defaultItems = getDefaultReactSlashMenuItems(editor);
          // Finds index of last item in "Basic blocks" group.
          const lastBasicBlockIndex = defaultItems.findLastIndex(
            (item) => item.group === "Basic blocks"
          );
          // Inserts the Alert item as the last item in the "Basic blocks" group.
          defaultItems.splice(lastBasicBlockIndex + 1, 0, insertAlert(editor));
          defaultItems.splice(lastBasicBlockIndex + 1, 0, insertInput(editor));

          // Returns filtered items based on the query.
          return filterSuggestionItems(defaultItems, query);
        }}
      />
    </BlockNoteView>
  );
}
