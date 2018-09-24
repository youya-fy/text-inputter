import sketch from "sketch";
import { isWebviewPresent, sendToWebview } from "sketch-module-web-view/remote";
import parseText from "./parse-text";
const document = require("sketch/dom").getSelectedDocument();

export function changeHandler(context) {
    if (!isWebviewPresent("youya-inputter.inputter")) return;
    let selection = document.selectedLayers;
    if (!selection.isEmpty && selection.layers[0].type == "Text") {
        let value = selection.layers[0].text;
        sendToWebview(
            "youya-inputter.inputter",
            parseText(value, selection.layers[0].id)
        );
    }
}
