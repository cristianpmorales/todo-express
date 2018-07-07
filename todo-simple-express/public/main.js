var trash = document.getElementsByClassName("fa fa-trash");

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const item = this.parentNode.parentNode.childNodes[1].innerText
        console.log(this)
        console.log("hello????")
        fetch('deleteitem', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'item': item
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});


//create a function that car item then is pushed from the html to the database
