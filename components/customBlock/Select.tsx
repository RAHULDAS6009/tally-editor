import { defaultProps } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";
import { useState, useEffect } from "react";

const SelectBlock = createReactBlockSpec(
  {
    type: "selectblock",
    propSchema: {
      textAlignment: defaultProps.textAlignment,
      textColor: defaultProps.textColor,
      text: { default: "" },
    },
    content: "inline",
  },
  {
    render: (props) => {
      const [input, setInput] = useState<string>(props.block.props.text);
      const [showAddButton, setShowAddButton] = useState(false);

      const allBlocks = props.editor.document;
      const selectBlocks = allBlocks.filter(
        (block) => block.type === "selectblock"
      );

      const isFirstSelectBlock =
        selectBlocks.length > 0 && selectBlocks[0].id === props.block.id;

      useEffect(() => {
        setShowAddButton(input.trim().length > 0);
      }, [input]);

      const updateText = (newValue: string) => {
        setInput(newValue);
        props.editor.updateBlock(props.block.id, {
          props: {
            ...props.block.props,
            text: newValue,
          },
        });
      };

      const createNewBlock = () => {
        props.editor.insertBlocks(
          [
            {
              type: "selectblock",
              props: {
                text: "",
                textColor: defaultProps.textColor.default,
                textAlignment: defaultProps.textAlignment.default,
              },
              content: [],
            },
          ],
          props.block.id,
          "after"
        );
      };

      return (
        <div className="w-full mb-2">
          {props.editor.isEditable ? (
            <>
              <input
                className="bg-slate-100 drop-shadow-2xl border-slate-500 border-2 rounded-md outline-none p-2 w-full mb-1"
                placeholder="Type option"
                type="text"
                value={input}
                onChange={(e) => updateText(e.target.value)}
              />
              {showAddButton && (
                <button
                  className="text-sm text-white bg-blue-400 px-3 py-1 rounded-md hover:bg-blue-700"
                  onClick={createNewBlock}
                >
                  Add New Block
                </button>
              )}
            </>
          ) : (
            // Only render <select> once, in the first selectblock
            isFirstSelectBlock && (
              <select className="bg-slate-100 drop-shadow-2xl border-slate-500 border-2 rounded-md outline-none p-2 w-full">
                {selectBlocks
                  .filter((item) => item.props.text.trim() !== "")
                  .map((item) => (
                    <OptionComponent key={item.id}>
                      {item.props.text}
                    </OptionComponent>
                  ))}
              </select>
            )
          )}
        </div>
      );
    },
  }
);

function OptionComponent({ children }: { children: string }) {
  return <option value={children}>{children}</option>;
}

export default SelectBlock;
