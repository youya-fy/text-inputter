import sketch from "sketch";
import BrowserWindow from "sketch-module-web-view";
import parseText from "./parse-text";

const document = require("sketch/dom").getSelectedDocument();

export default function() {
    let selection = document.selectedLayers;
    const options = {
        identifier: "youya-inputter.inputter",
        width: 400,
        height: 300,
        show: false,
        alwaysOnTop: true,
        backgroundColor: "#222222"
    };
    const browserWindow = new BrowserWindow(options);
    browserWindow.once("ready-to-show", () => {
        if (!selection.isEmpty && selection.layers[0].type == "Text") {
            let value = selection.layers[0].text;
            browserWindow.webContents.executeJavaScript(
                parseText(value, selection.layers[0].id)
            );
        }
        browserWindow.show();
    });
    browserWindow.webContents.on("nativeLog", function(value) {
        let text_layer = document.getLayerWithID(value.id);
        if (text_layer) text_layer.text = value.text;
    });
    browserWindow.loadURL("index.html");
}
