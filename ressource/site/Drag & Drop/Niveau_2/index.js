// TIMER
var h = 00;
var m = 00;
var s = 00;
document.getElementById('compteur').innerHTML = h + 'h ' + m + 'm '+s+'s';
var interval = setInterval(seconde, 1000);
function seconde(){
    if(s >= 60){
        s = 00;
        m++;
        if(m >= 60){
            m = 00;
            h++;
        }
    }
    else{
        s++;
    }
    document.getElementById('compteur').innerHTML = h + 'h ' + m + 'm '+s+'s';
}
// METTRE LES IMAGES DANS UN ORDRE RANDOM
var idUtilise = [1,2,11,12,13,24,49,60,61,62,71,72];
var count = 0;
function idImg(){
    var test = Math.round(Math.random() * (72 - 1) + 1);
    const found = idUtilise.find(element => element == test);
    if(found != test){
        idUtilise.push(test);
    }
    count = idUtilise.length;
}
while(count < 72){
    idImg();
}
for(var i = 0; i< 72; i++){
    //console.log('idUtilise =' + idUtilise[i]);
    if(idUtilise[i] == 1 || idUtilise[i] == 2 || idUtilise[i] == 11 || idUtilise[i] == 12 || idUtilise[i] == 13 || idUtilise[i] == 24 || idUtilise[i] == 49 || idUtilise[i] == 60 || idUtilise[i] == 61 || idUtilise[i] == 62 || idUtilise[i] == 71 || idUtilise[i] == 72){
        let nCase = "case_"+idUtilise[i];
        document.getElementById(nCase).innerHTML = document.getElementById(nCase).innerHTML + '<img src="Image/img_'+idUtilise[i]+'.png" alt="img'+idUtilise[i]+'" id="img_'+idUtilise[i]+'">';
        //console.log(document.getElementById(nCase).childNodes);
    }
    else{
        document.getElementById('barre').innerHTML = document.getElementById('barre').innerHTML + '<img src="Image/img_'+idUtilise[i]+'.png" alt="img'+idUtilise[i]+'" id="img_'+idUtilise[i]+'" draggable="true">';
    }
}

// DRAG & DROP
let nCoup = 0;
function start(e){
    var type = 'start'+ e.srcElement;
    if(type == 'start[object HTMLImageElement]'){
        e.dataTransfer.effectAllowed="move";
        e.dataTransfer.setData("text",e.target.getAttribute("id"));        
    }
}
function over(e){
    e.currentTarget.setAttribute("drop-active", true);
    return false;
}
function drop(e){
    console.log(e.target.childNodes);
    let longueurChild = e.target.childNodes.length;
    for(let i = 0; i<longueurChild; i++){
        console.log(e.target.childNodes[i]);
    }
    //let hasChild = e.target.hasChildNodes();console.log(hasChild);
    if(nCoup == 0){

        if(e.target.hasChildNodes()){
            //console.log('ça marche');
            var img = e.dataTransfer.getData("text");
            e.currentTarget.appendChild(document.getElementById(img));
            let nCase = e.target.id.split('_');
            var idLength = e.target.childNodes.length - 1;
            let nImg = e.target.childNodes[idLength].id.split('_');
        }
        else{
            console.log('doit bloquer');
        }    
    }
    else{
        //console.log(e.srcElement);
        //console.log(e.target.childNodes.length);
        var img = e.dataTransfer.getData("text");
        e.currentTarget.appendChild(document.getElementById(img));
        let nCase = e.target.id.split('_');
        var idLength = e.target.childNodes.length - 1;
        let nImg = e.target.childNodes[idLength].id.split('_');        
    }
    e.stopPropagation();
    return false;
}
function enter(e){
    e.currentTarget.classList.add('active');
}
function leave(e){
    e.currentTarget.classList.remove('active');
}

// VERIF LES IMAGES
function verifImage(){
    let nbBonneImg = 0;
    for(let i=1; i<73; i++){
        var idCase = 'case_'+i;
        const nCase = document.getElementById(idCase).id.split('_');
        var idLength = document.getElementById(idCase).childNodes.length - 1;
        //console.log(idCase +' longueur : ' + idLength);
        //console.log(document.getElementById(idCase).childNodes);
        //console.log(document.getElementById(idCase).childNodes[idLength].id);
        const nImg = document.getElementById(idCase).childNodes[idLength].id.split('_');
        if(nCase[1] == nImg[1]){
            nbBonneImg = nbBonneImg + 1;
        }    
    }
    if(nbBonneImg == 72){
        if(nCoup == 0){
            window.alert("Bravo vous avez fini le puzzle !");    
        }
        else{
            nCoup = nCoup+1;
            window.alert("Bravo vous avez fini le puzzle en "+nCoup+" coups !");
        }
    }
    else{
        window.alert("Certaines images sont fausses ! \n Nombre de bonnes images : "+ nbBonneImg+"/72");
        for(let i=1; i<73; i++){
            var idCase = 'case_'+i;
            const nCase = document.getElementById(idCase).id.split('_');
            var idLength = document.getElementById(idCase).childNodes.length - 1;
            const nImg = document.getElementById(idCase).childNodes[idLength].id.split('_');
            const idImg = document.getElementById(idCase).childNodes[idLength].id.split('#');
            if(nCase[1] != nImg[1]){
                document.getElementById('barre').innerHTML = document.getElementById('barre').innerHTML + '<img src="Image/img_'+nImg[1]+'.png" alt="img'+nImg[1]+'" id="'+idImg[0]+'" draggable="true">';
                while(document.getElementById(idCase).firstChild){
                    document.getElementById(idCase).removeChild(document.getElementById(idCase).firstChild);
                }
            }    
        }    
    }
    nCoup = nCoup + 1; 
    console.log(nCoup + " nombre de coups");
}
