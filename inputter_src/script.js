import pluginCall from "sketch-module-web-view/client";
import debounce from "lodash.debounce";
import * as CodeMirror from "codemirror";
import vim from "codemirror/keymap/vim.js";
import "codemirror/lib/codemirror.css";
import "./style.scss";

var textarea = document.getElementById("textarea");
var editor = document.getElementById("editor");
var footer = document.getElementById("footer");
var CM = CodeMirror.fromTextArea(textarea, {
    autofocus: true,
    lineNumbers: true,
    lineWrapping: true,
    scrollbarStyle: null,
    keyMap: "vim"
});
CM.setSize(editor.clientWidth, editor.clientHeight);

// 让输入框大小适应窗口的变化
window.addEventListener("resize", () => {
    CM.setSize(editor.clientWidth, editor.clientHeight);
});

// footer上显示输入模式
CM.on("vim-mode-change", e => {
    if (e.mode !== "insert") {
        footer.classList.add("hide");
    } else {
        footer.classList.remove("hide");
    }
});

// 编辑文字时获取文本内容，消除抖动后传入sketch
CM.on(
    "change",
    debounce(e => {
        console.log(e.getValue());
        pluginCall("nativeLog", {
            text: e.getValue(),
            id: window.element_id
        });
    }, 800)
);

window.element_id = "";
window.set_cm_value = function(value) {
    // id用于记录选中的目标文字元素
    window.element_id = value.id;
    // 转换回换行符
    let text = value.text.replace(/<br>/g, "\n");
    CM.setValue(text);
};
