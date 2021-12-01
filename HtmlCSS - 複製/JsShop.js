
let itemdata;



// 讀商品資料 django
function itemUpdate() {
    $.ajax(
        {
            url: "ppp/pokemonphoto.json",
            // url: "http://127.0.0.1:8000/api/product/",
            method: "GET",
            dataType: "json",
            success: function (data) {
                console.log('-------- susccess --------');
                console.log(data)
                const d = new Date();
                console.log(d)
                itemdata = data;

            }
        }
    )
}


// 在入頁面時，讀取資料
itemUpdate();


// 商品模板
function itemm(ii, i) {
    s = `<div class="card bg-light" style="flex:0 0 auto; wrap:true">
        <img class="card-img-top" src="ppp/${ii.name}.webp" alt="Card image" style= "width:250px; height:250px;">
            <div class="card-body">
                <h4>${i}.</h4>  <h4 class="card-title">${ii.name}</h4>
                <p class="card-text">${ii.description}</p>
            </div>
            <h5 class="card-text price">售價:${ii.price}</h5>
            <button type="button" class="btn btn-info buybtn" id="buybtn" onclick="buyitem(this)">購買</button>
        </div>
        `
    // console.log(s);
    return s;
};


// 存購物車資料用
let carts = {
    products: [],
    cartt: []
};

// 更新item頁內容
function updateItem() {
    carts = {
        products: [],
        cartt: []
    };
    document.getElementById("cart-n").textContent = 0

    console.log(itemdata)
    let carddeck = document.getElementById("id_item");
    carddeck.innerHTML = "";

    for (i in itemdata) {
        console.log(itemdata[i])
        console.log(i)
        carddeck.innerHTML += itemm(itemdata[i], parseInt(i) + 1);
        
    }

    console.log(itemdata);

    // 加入購物車，改寫 function buyitem()
    /*
    $("#buybtn").click(function () {
        console.log(this)
        alert($(this).parent().find(".card-title").html() + " 加入購物車");
        carts.cartt.push($(this).parent().find('.card-title').html());
        // $(this).parent().children().slideUp();
        console.log(carts.cartt);
    })
    */


}


// this指向問題，參考解決。 https://www.itread01.com/content/1545389287.html
function buyitem(_this){
    console.log($(_this).parent().find('.card-title').html())
    carts.cartt.push($(_this).parent().find('.card-title').html());
    console.log(carts.cartt);
    let n = parseInt(document.getElementById("cart-n").textContent) + 1
    console.log(n)
    document.getElementById("cart-n").textContent = n
}




// 點擊購物車時
$(".cartbtn").click(cart)
function cart() {
    carthh(carts)
    // clickHide()
    check()
}

// 找到'.card-title'(name)加入carts.cartt




// 購物車 計算數量 醜
function carthh(carts) {
    console.log(carts.products);
    carts.products = [];
    for (pm of carts.cartt) {
        console.log(pm)
        let flag = false
        for (b of carts.products) {
            if (pm == b.name) {
                b.qq += 1;
                flag = true;
                break;
            }
        }
        if (flag == false) {
            let ppp = 0
            for (p of itemdata) {
                if (pm == p.name) {
                    ppp = p.price
                }
            }
            carts.products.push({ 'name': pm, 'qq': 1, price: ppp })

        }
    }
    console.log(carts)

}

// 購買卡片模板
function buyp(ii) {
    let pp;
    for (pho of itemdata) {
        if (ii.name == pho.name) {
            pp = pho.pp
        }
    }
    s = `<div class="card bg-light" style="flex:0 0 auto; wrap:true">
        <img class="card-img-top" src="ppp/${pp}" alt="Card image" style= "width:250px; height:250px;">
            <div class="card-body">
                <h4 class="card-title nnn">${ii.name}</h4>
            </div>
            <h5 class="card-text price">購買數量:${ii.qq}</h5>
            <h5 class="card-text price">單價:${ii.price}</h5>
            <h5 class="card-text price ttt">總價:${ii.qq * ii.price}</h5>
            <button type="button" class="btn btn-info price sell" id="buy">刪除</button>
    </div>
    `
    // console.log(s);
    return s;
};



function check() {

    function bill() {
        ss = ''
    let total = 0
    for (p of carts.products) {
        ss += buyp(p)
        total += (p.qq * p.price)
    }
    ss += `<div class="check" style="padding: 30px;"><h3>總金額:${total}</h3><h3>
    <button type="button" class="btn btn-outline-danger ccc">
    結帳</button><div>`

    let carddeck = document.getElementById("id_item");
    carddeck.innerHTML = ss
    }
    bill()
    // 刪除
    $(".sell").click(function () {
        
        let nnn = $(this).parent().find('.nnn').html()
        for(pm of carts.products){
            if(pm.name == nnn){
                pm.qq = 0
            }
        check()
        }
    })
    
    $('.ccc').click(function () {
        alert('餘額不足')    
    })

}
