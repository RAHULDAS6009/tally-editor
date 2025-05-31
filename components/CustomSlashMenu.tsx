import {
  DefaultReactSuggestionItem,
  SuggestionMenuProps,
} from "@blocknote/react";
import "./style.css";

export function CustomSlashMenu(
  props: SuggestionMenuProps<DefaultReactSuggestionItem>
) {
  return (
    <div className={"slash-menu"}>
      {props.items.map((item, index) => (
        <div
          key={index}
          className={`slash-menu-item ${
            props.selectedIndex === index ? "selected" : ""
          }`}
          onClick={() => {
            props.onItemClick?.(item);
          }}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
}
