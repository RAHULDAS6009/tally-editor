import { defaultProps } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";

const LabelBlock = createReactBlockSpec(
  {
    type: "labelblock",
    propSchema: {
      textAlignment: defaultProps.textAlignment,
      textColor: defaultProps.textColor,
      text: { default: "Label" },
    },
    content: "inline",
  },
  {
    render: (props) => {
      return (
        <label
          style={{
            fontWeight: "600",
            fontSize: "14px",
            paddingBottom: "4px",
            display: "block",
            color: "#333",
            border: "none",
            background: "transparent",
            outline: "none",
            width: "100%",
          }}
        >
          <div className={"inline-content"} ref={props.contentRef} />
        </label>
      );
    },
  }
);

export default LabelBlock;
