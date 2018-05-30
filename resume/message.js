!function () {
  var view = document.querySelector('section.message')
  
  var model = {
    init: function (){
      var APP_ID = '4LKKOTty9dS7QAbiIgqSzjtn-gzGzoHsz';
      var APP_KEY = 'HyWsTpindavo1UCROsuxOXAe';
      AV.init({
        appId: APP_ID,
        appKey: APP_KEY
      })
    },
    //获取数据
    fetch: function () {
      var query = new AV.Query('Message');
      return query.find()
    },
    save: function (name,content) {
      var Message = AV.Object.extend('Message');
      var message = new Message();
      return message.save({
        'name': name,
        'content': content
      })
    }
  }

  var controller = {
    view: null,
    model: null,
    messageList:null,
    init: function (view,model) {
      this.model = model
      this.view = view
      console.log(3)
      this.messageList = view.querySelector('#messageList')
      this.form = view.querySelector('form')
      this.model.init()
      this.loadMessage()
      this.bindEvents()
    },
   
    loadMessage: function () {
      this.model.fetch()
        .then((messages) => {
          console.log(messages)
          console.log(messages[0].attributes)
          let array = messages.map((item) => item.attributes)
          console.log(array)
          array.forEach((item) => {
            let li = document.createElement('li')
            li.innerText = `${item.name}:${item.content}`
            // let messageList = document.querySelector('#messageList')
            this.messageList.appendChild(li)
          })
        },
          function (error) {
            alert('wrong')
          }
        )
    },
    // let myForm = document.querySelector('#postMessageForm')
    // 监听提交，不监听click，因为回车也是一种提交，
    bindEvents: function () {
      this.form.addEventListener('submit', function(e){
        e.preventDefault()
        this.saveMessage()
      })
    },

    saveMessage: function(){
      let myForm = this.form
      console.log(8)
      let name = myForm.querySelector('input[name=name]').value
      let content = myForm.querySelector('input[name=content]').value
      this.model.save(name, content)
        .then(function (object) {
          // 成功了就自动刷新页面
          // window.location.reload()
          //  console.log(object);
          let li = document.createElement('li')
          li.innerText = `${object.attributes.name}:${object.attributes.content}`
          let messageList = document.querySelector('#messageList')
          messageList.appendChild(li)
          console.log(4)
          myForm.querySelector('input[name=content]').value = ''
            
    })
  }
}
  controller.init(view,model)
}.call()



