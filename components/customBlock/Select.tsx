import { defaultProps } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";
import { useState } from "react";

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

      const updateText = (newValue: string) => {
        setInput(newValue);
        props.editor.updateBlock(props.block.id, {
          props: {
            ...props.block.props,
            text: newValue,
          },
        });
      };

      return (
        <div className="w-full">
          {props.editor.isEditable ? (
            <input
              className=" bg-amber-50 outline-none p-2 w-full"
              placeholder="Type option"
              type="text"
              value={input}
              onChange={(e) => updateText(e.target.value)}
            />
          ) : (
            <select name="" id="">
              <option className="p-2"></option>
              <option className="p-2">{input}</option>
            </select>
          )}
        </div>
      );
    },
  }
);
export default SelectBlock;
