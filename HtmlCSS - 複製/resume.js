
$.ajax(
    {
        url: "resume.json",
        method: "GET",
        dataType: "json",   
        success: function(data){
            console.log('-------- susccess --------');
            console.log(data)
            let photo = document.getElementById("photo");
            let name = document.getElementById("name");
            let edu = document.getElementById("edu");
            let major = document.getElementById("major");
            let interest = document.getElementById("intrest");
            let skill = document.getElementById("skill");
            let skill2 = document.getElementById("skill2");
            let exp = document.getElementById("exp");
            let intro = document.getElementById("intro")
            photo.setAttribute('src', data.photo);
            name.innerText = data.name;
            edu.innerText = data.edu;
            major.innerText = data.major;
            interest.innerText = data.interest;
            intro.innerText = data.intro;
            
            
            for(s of data.skill){
                let li = document.createElement("li");
                li.appendChild(document.createTextNode(s));
                li.setAttribute("class",  "card")
                skill.appendChild(li);
            }
            for(s of data.skill2){
                let li = document.createElement("li");
                li.appendChild(document.createTextNode(s));
                li.setAttribute("class",  "card")
                skill2.appendChild(li);
            }
            for (e of data.exp){
                let ul = document.createElement("ul");
                let lij = document.createElement("li");
                let lid = document.createElement("li");
                ul.setAttribute("class", "jobs");
                lij.setAttribute("class", "job");
                lid.setAttribute("class", "des card");
                exp.appendChild(ul)
                ul.appendChild(lij);
                ul.appendChild(lid);
                lij.appendChild(document.createTextNode(e.job + ", 期間:" + e.time));
                lid.appendChild(document.createTextNode(e.description));
            }
        },
        error: function(xhr, status, error){
            console.log('錯誤')
            console.log(xhr)
            console.log(status)
            console.log(error)
        }
    }
);

$.getJSON("resume.json", "", function(data) {
    //给info赋值给定义好的变量
    pageData=data.info
});
