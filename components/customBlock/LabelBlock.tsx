import { defaultProps } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";
import { useState, useEffect } from "react";

const LabelBlock = createReactBlockSpec(
  {
    type: "labelblock",
    propSchema: {
      textAlignment: defaultProps.textAlignment,
      textColor: defaultProps.textColor,
      text: { default: "" },
    },
    content: "inline",
  },
  {
    render: (props) => {
      const [labelText, setLabelText] = useState<string>(
        props.block.props.text
      );

      // Persist label text in block props
      const updateText = (value: string) => {
        setLabelText(value);
        props.editor.updateBlock(props.block.id, {
          props: {
            ...props.block.props,
            text: value,
          },
        });
      };

      useEffect(() => {
        if (!props.editor.isEditable) {
          setLabelText(props.block.props.text); // sync latest saved text
        }
      }, [props.editor.isEditable]);

      return (
        <label
          style={{
            fontWeight: "600",
            fontSize: "14px",
            paddingBottom: "4px",
            display: "block",
            color: "#333",
            background: "transparent",
            width: "100%",
          }}
        >
          {props.editor.isEditable ? (
            <input
              className="text-sm font-semibold text-gray-800 w-full outline-none bg-transparent"
              type="text"
              placeholder="Type the question"
              value={labelText}
              onChange={(e) => updateText(e.target.value)}
            />
          ) : (
            <span>{labelText}</span>
          )}
        </label>
      );
    },
  }
);

export default LabelBlock;
