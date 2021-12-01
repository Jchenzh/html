var appdata;
let itemdata;
let phtodata;

alert("test");
// 讀關於我json格式
function aboutUpdate() {
    $.ajax(
        {
            url: "about.json",
            method: "GET",
            dataType: "json",
            success: function (data) {
                console.log('-------- susccess --------');
                console.log(data)
                const d = new Date();
                console.log(d)
                appdata = data;
                let photo = document.getElementById("aboutphoto");
                let name = document.getElementById("aboutname");
                let edu = document.getElementById("aboutedu");
                let maj = document.getElementById("aboutmaj");
                let int = document.getElementById("aboutint");
                photo.setAttribute('src', data.photo)
                name.innerText = data.name
                edu.innerText = data.edu
                maj.innerText = data.major
                int.innerText = data.interest


            },
            error: function (xhr, status, error) {
                console.log('錯誤')
                console.log(xhr)
                console.log(status)
                console.log(error)
            }
        }

    );
}

// 讀商品圖片json
function photoUpdate() {
    $.ajax(
        {
            // url: "ppp//gameinfo.json",
            url: "ppp/pokemonphoto.json",
            method: "GET",
            dataType: "json",
            success: function (data) {
                console.log('-------- susccess --------');
                console.log(data)
                photodata = data;
            }
        }
    )
}

// 讀商品資料 django
function itemUpdate() {
    $.ajax(
        {
            // url: "ppp//gameinfo.json",
            url: "http://127.0.0.1:8000/api/product/",
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
$("#id_about").load("about.html");
itemUpdate();
aboutUpdate();
photoUpdate();

// 點擊關於我，秀關於我頁面
function clickAbout() {
    $("#id_about").hide("about.html");
    $("#id_about").slideDown(500);
}

// 收
function clickHide() {
    $("#id_about").slideUp(300);
    $("#item").slideUp(300);
}

// 點item
function clickItem() {
    carts.cartt = []
    document.getElementById("cart-n").textContent = 0
    updateItem()
    $("#item").slideToggle();
    $(".buy").click(function () {
        // 購物車數字增加
        let n = parseInt(document.getElementById("cart-n").textContent) + 1
        console.log(n)
        document.getElementById("cart-n").textContent = n
    })
    addcart()
}

// 登入頁
function clickLogin() {
    $("#boxx").load("login.html");
    $("#boxx").slideToggle(300);
}


// 存購物車資料用
let carts = {
    products: [],
    cartt: []
};

// 商品模板
function itemm(ii, i) {
    let pp;
    for (pho of photodata) {
        if (ii.name == pho.name) {
            pp = pho.pp
        }
    }
    s = `<div class="card bg-light" style="flex:0 0 auto; wrap:true">
        <img class="card-img-top" src="ppp/${pp}" alt="Card image" style= "width:250px; height:250px;">
            <div class="card-body">
                <h4>${i}.</h4>  <h4 class="card-title">${ii.name}</h4>
                <p class="card-text">${ii.description}</p>
            </div>
            <h5 class="card-text price">售價:${ii.price}</h5>
            <button type="button" class="btn btn-info price buy" id="buy">購買</button>
    </div>
    `
    // console.log(s);
    return s;
};

// 更新item頁內容
function updateItem() {
    console.log(itemdata)
    let carddeck = document.getElementById("id_item");
    carddeck.innerHTML = ''

    for (i in itemdata) {
        console.log(itemdata[i])
        console.log(i)
        // let item = new itemm(itemdata[i], i);
        // console.log(item);
        carddeck.innerHTML += itemm(itemdata[i], parseInt(i) + 1);
    }
    $("#item").hide()

    console.log(itemdata)

}

// 點擊購物車時
$(".cartbtn").click(cart)
function cart() {
    carthh(carts)
    // clickHide()
    check()
}

// 找到'.card-title'(name)加入carts.cartt
addcart()
function addcart() {
    $(".buy").click(function () {
        alert($(this).parent().children().find('.card-title').html() + ' 加入購物車');
        carts.cartt.push($(this).parent().children().find('.card-title').html());
        // $(this).parent().children().slideUp();
        console.log(carts.cartt)
    })

}


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
    for (pho of photodata) {
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
    ss += `<div class="check"><h3>總金額:${total}</h3><h3>
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
