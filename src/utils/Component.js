// Простой компонент с callback

export default function Component({ html, callback }){
    const wrapper = document.createElement("div");
    wrapper.innerHTML = html.trim();
    const element = wrapper.firstElementChild;

    const applyComp = (child) => {
        element.append(child._element);
        
        if(child._callback){
            child._callback(child._element);
        }
    }

    return {
        _element: element,
        _callback: callback,
        applyComp,
    }
}