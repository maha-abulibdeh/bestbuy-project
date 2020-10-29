window.onload = function() {
    const iconShopping = document.querySelector('.iconShopping');
    const cartCloseBtn= document.querySelector('.fa-close');
    const cartBox= document.querySelector('.cartBox');
    iconShopping.addEventListener("click", function(){
        cartBox.classList.add('active');

    });

    cartCloseBtn.addEventListener("click", function() {
        cartBox.classList.remove('active');
    });

  //adding data to localStorage//
    const  addCartBtn  = document.getElementsByClassName('addcart');
    let items = [];

    for(let i = 0; i < addCartBtn.length; i++) {
        addCartBtn[i].addEventListener("click", function(e) {
            if(typeof(Storage) !== 'undefined'){
                let cd1= {
                    id: i+1,
                    name: e.target.parentElement.children[0].textContent,
                    price: e.target.parentElement.children[1].children[0].textContent,
                    no: 1
                };

                if(JSON.parse(localStorage.getItem('items')) === null) {
                    items.push(cd1);
                    localStorage.setItem("items", JSON.stringify(items));
                    window.location.reload();
                } else {
                    const localItems = JSON.parse(localStorage.getItem("items"));

                    localItems.map(data => {
                        if(cd1.id === data.id){
                            cd1.no = data.no + 1;

                        } else {
                            items.push(data);
                        }
                    });

                    items.push(cd1);
                    localStorage.setItem('items',JSON.stringify(items));
                    window.location.reload();
                }
            } else {
                console.log('local storage is not working on your browser')
            }
        });
    }

  //adding data to shopping cart
    const iconShoppingP = document.querySelector('.iconShopping p');
    let no = 0;
    JSON.parse(localStorage.getItem('items')).map(data => {
        no = no+data.no;
    });

    iconShoppingP.innerHTML = no;

    //adding cartbox data in table

    const cardBoxTable = cartBox.querySelector('table');
    let tableData = '';
    tableData += '<tr><th>S no.</th><th>Item Name</th><th>Item No</th><th>item Price</th><th></th></tr>';

    if (JSON.parse(localStorage.getItem('items'))[0] === null) {
        tableData += '<tr><td colspan="5">No items found</td></tr>'
    } else {
        JSON.parse(localStorage.getItem('items')).map(data => {
			tableData += '<tr><th>'+data.id+'</th><th>'+data.name+'</th><th>'+data.no+'</th><th>'+data.price+'</th><th><a href="#" class="delete-item" onclick=Delete(this);>Delete</a></th></tr>';
        });
    }

    cardBoxTable.innerHTML = tableData;
}

function Delete(e){
    let items = [];

    JSON.parse(localStorage.getItem('items')).map(data=>{
        if(data.id != e.parentElement.parentElement.children[0].textContent){
            items.push(data);
        }
    });

    localStorage.setItem('items',JSON.stringify(items));
    window.location.reload();
};

