// 把VIEW封装一下
window.View = function (selector) {
    return document.querySelector(selector)
}
window.Model = function (options) {
    let resourceName = options.resourceName
    return {
        init: function () {
            var APP_ID = '4LKKOTty9dS7QAbiIgqSzjtn-gzGzoHsz';
            var APP_KEY = 'HyWsTpindavo1UCROsuxOXAe';
            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            })
        },
        fetch: function () {
            var query = new AV.Query(resourceName);
            return query.find()
        },
        save: function (object) {
            var X = AV.Object.extend(resourceName);
            var x = new X();
            return x.save(object)
        }
    }
}
window.Controller = function (options) {
    var init = options.init
    bindEvents = options.bindEvents
    let object = {
        view: null,
        model: null,
        init: function (view, model) {
            this.view = view
            this.model = model
            
            this.model.init()
           
            init.call(this, view, model)
            options.bindEvents.call(this)
        },
    }
    for (let key in options) {
        if (key !== 'init') {
            object[key] = options[key]
        }
    }
    return object
}
