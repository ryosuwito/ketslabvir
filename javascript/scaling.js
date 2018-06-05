
function addStyle(css){
    var styleTag = document.createElement('style');
    var dynamicStyleCss = document.createTextNode(css);
    styleTag.appendChild(dynamicStyleCss);
    var header = document.getElementsByTagName('head')[0];
    header.appendChild(styleTag);
}
function getElementContentWidth(element) {
  var styles = window.getComputedStyle(element);
  var padding = parseFloat(styles.paddingLeft) +
                parseFloat(styles.paddingRight);

  return element.clientWidth - padding;
}
function scaling(){
	var simContainer = document.getElementById("sim-container");
	var simWidth = getElementContentWidth(simContainer);

    console.log(simWidth + "px");
	var imgFloor = document.getElementById("img-floor");
	console.log(imgFloor.offsetWidth);
	var floorWidth = imgFloor.offsetWidth;
	var oldFloorWidth = floorWidth;
	var imgTable = document.getElementById('img-table');
	console.log(imgTable.offsetHeight);
	var tableHeight = imgTable.offsetHeight;
	var sidebar = document.getElementById("sidebar");
	var sidebarComponents = document.getElementById("sidebar-components");
	var mainComponents = document.getElementById("main-components");
	var bretboard = document.getElementById("breadboard");
	var dumps = document.getElementById("dumps");
    var multimeter_img = document.getElementsByClassName('multimeterImg');

	imgFloor.style.width = 100+"%";
	imgTable.style.height = imgFloor.offsetHeight+"px";
    imgTable.style.width = 100+"%";;
    floorWidth = imgFloor.offsetWidth;
    console.log(floorWidth+" vs "+oldFloorWidth);
    console.log("scaled by :"+(floorWidth/oldFloorWidth));
    
    skala = floorWidth/oldFloorWidth;
    for(i=0; i<multimeter_img.length; i++){
        var old_left = multimeter_img[i].style.left;
        old_left = parseInt(old_left.replace('px',''));
        multimeter_img[i].style.left = old_left+(80*skala)+"px";

    }

    multiRedEndX += 80*skala;
    multiBlackEndX += 80*skala;
    update_kabel();
 
    normal = oldFloorWidth/floorWidth;
    console.log(normal);

    sidebar.style.transform = "scale("+skala+")";
    sidebar.style.position = "absolute";
    sidebar.style.right = "0";
    sidebar.style.top = "0";

    sidebarComponents.style.transform = "scale("+skala+")";
    sidebarComponents.style.position = "absolute";
    sidebarComponents.style.right = "0";
    sidebarComponents.style.top = "0";

    mainComponents.style.transform = "scale("+skala*0.8+")";
    mainComponents.style.zIndex = "1000";
    mainComponents.style.position = "absolute";
    mainComponents.style.left = "0";
    mainComponents.style.top = "0";    

    dumps.style.transform = "scale("+skala*0.8+")";
    dumps.style.zIndex = "1001";
    dumps.style.position = "absolute";
    dumps.style.left = "20px";
    dumps.style.top = "0";

    simContainer.style.height = imgFloor.offsetHeight+'px';

    for(j=0; j<5; j++){
        var koef = 13.275*j;
        var jarak = 104.5+koef;
        var index = ['A','B','C','D','E']
        addStyle('.row'+index[j]+'{top:'+jarak+'px; }');
	}
    for(k=0; k<30; k++){
        var koef = 13.28*k;
        var jarak = 498.8-koef;
        addStyle('.col'+(k+1)+'{left:'+jarak+'px; }');
    }
}
scaling();