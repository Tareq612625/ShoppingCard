// let title =document.getElementById("itemName").textContent;
// console.log(title);
///////Elements
let productList=document.getElementById("addToCard");
let itemName=document.querySelector("#itemName");
let itemPrice=document.querySelector("#itemPrice");
let itemCode=document.querySelector("#itemCode");
let CardItem_list=document.querySelector("#CardItem_list")

///class
class itemList{
    constructor(itemName,itemPrice,itemCode){
        this.itemName=itemName;
        this.itemPrice=itemPrice;
        this.itemCode=itemCode;
    }
}
class UI{
    static addToCard(item){
        let cardItemList=document.querySelector("#CardItem_list")
        let row=document.createElement('tr')
        row.innerHTML=`<td>${item.itemName}</td>
                        <td>${item.itemPrice}</td>
                        <td>${item.itemCode}</td>
                        <td><a href='#' class='delete btn btn-danger'>Remove</a></td>`
         cardItemList.appendChild(row);
    }
    static deleteFromCard(target){
        // if(target.hasAttribute('href')){
        //     target.parentElement.parentElement.remove();

        //     Store.removeItem(target.parentElement.previousElementSibling.textContent.trim())

        //     console.log(target.parentElement.previousElementSibling.textContent.trim());
        if(target.hasAttribute('href')){
            target.parentElement.parentElement.remove();
          Store.removeItem(target.parentElement.previousElementSibling.textContent.trim())
 
         console.log(target.parentElement.previousElementSibling.textContent.trim())
            
            UI.showAlert("Item Remove", "success")
        }
    }
    static showAlert(message, className){
        let div=document.createElement('div')
        div.className=`alert ${className}`;
        div.appendChild(document.createTextNode(message))
        let container=document.querySelector('.container');
        let product_list=document.querySelector('#product_list');
        container.insertBefore(div,product_list)

        setTimeout(function(){
            document.querySelector('.alert').remove();
        },1500)
    }
    
}
///////Local Stroge ----class
class Store{
    static getItems(){
        let items;
        if(localStorage.getItem('items')===null){
            items=[];
        }
        else{
            items=JSON.parse(localStorage.getItem('items'))
        }
        return items;    
    }
    static addItem(item){
        let items=Store.getItems()
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items))
    }
    static displayItems(){
        let items=Store.getItems();
        items.forEach(item=>{
            UI.addToCard(item)
        })
    }
    
    static removeItem(code){
        let items=Store.getItems();

        items.forEach((item,index)=>{
            if(item.code===code){
                items.splice(index,1)
            }
        })
        localStorage.setItem('items', JSON.stringify(items));
    }
}
///Add even listener
productList.addEventListener('click',newProduct)
CardItem_list.addEventListener('click', deleteFromCard_item);
document.addEventListener('DOMContentLoaded', Store.displayItems());

////////function defination section
function newProduct(event){
    let name=document.querySelector("#itemName").textContent;
    let code=document.querySelector("#itemCode").textContent;
    let price=document.querySelector("#itemPrice").textContent
    // console.log(name,price);

    let item=new itemList(name,price,code)
    UI.addToCard(item)
    // console.log("clicked");
    UI.showAlert("Item Added into Card","success")

    Store.addItem(item)

    event.preventDefault()
}

function deleteFromCard_item(event){
    UI.deleteFromCard(event.target) 
    // UI.showAlert("Item Delete From Card","success")

    
    event.preventDefault()
}