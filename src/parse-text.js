export default function(text_from_layer, id) {
    // 此处需要将换行符转为<br> 否则无法正常执行executeJavaScript
    let text = text_from_layer.replace(/[\n\r]/g, "<br>");
    return 'set_cm_value({text:"' + text + '",id:"' + id + '"})';
}
