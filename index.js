//https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=avengers&type=video&key=[YOUR_API_KEY]
var searchItem = "";
var searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", function () {
  // console.log("first")
  var filterBtns = document.querySelectorAll(".color");
  defaultClass(filterBtns);
  var firstBtn = document.querySelector(".color")
   firstBtn.classList.add("clicked")
   
  searchItem = document.getElementById("search-item").value;
  fetchData2(searchItem);
});

async function fetchData2(searchItem,duration,date) {
  var dateAfter = "2023-06-23T00:00:00Z";
  let dateType = date|| "relevance"
  let durationType = duration|| "long"

  var key = "AIzaSyATLdELdG3VAxrGwfYMNyrsMhPB_Rc4VqQ";
  try {
    let result = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${searchItem}&videoDuration=${durationType}&order=${dateType}&publishedAfter=${dateAfter}&maxResults=20&type=video&key=${key}`
    );
    let output = await result.json();
    console.log(output)
    display2(output);
  } catch (error) {}
}
fetchData1("long","");

async function fetchData1(duration, date) {
  searchItem = "";
 let dateType = date|| "relevance"
var key = "AIzaSyATLdELdG3VAxrGwfYMNyrsMhPB_Rc4VqQ";
var dateAfter = "2023-02-23T00:00:00Z";
  try {
      
    let result = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&topicId=/m/01k8wb&videoDuration=${duration}&order=${dateType}&maxResults=25&publishedAfter=${dateAfter}&regionCode=IN&type=video&key=${key}`
    );
    let output = await result.json();
    console.log(output)
   
    display1(output);
  } catch (error) {}
}
// display1(1);

function display1(output) {
  var content = document.querySelector('.select-c');
  content.innerHTML = ""
  content.setAttribute("id", "content");
  
  var arr = output.items;

  // let array = JSON.parse(localStorage.getItem("videoArray"));
  var array = arr.slice(5)
  console.log(array)
  array.forEach(function (element) {
    var div = document.createElement("div");
    var imgDiv = document.createElement("div");
    var nameDiv = document.createElement("div");
   
    var img = document.createElement("img");
   
    img.src = element.snippet.thumbnails.medium.url;
   
   
    var name = document.createElement("h5");
    name.textContent = element.snippet.title;
    var channel = document.createElement("p");
    channel.textContent = element.snippet.channelTitle;
    img.addEventListener("click", function () {
      localStorage.setItem("videoId", element.id.videoId);
      localStorage.setItem("videoName", element.snippet.title );
      localStorage.setItem("channelName", element.snippet.channelTitle );
      
      
      localStorage.setItem("videoArray", JSON.stringify(array));
      
      window.location.assign("./movie.html")
    })
    imgDiv.append(img);
    
    nameDiv.append(name, channel)
    
    nameDiv.setAttribute("class","name-div")
    div.append(imgDiv, nameDiv);
    content.append(div);
    
  });
}
function display2(output) {
  var content = document.querySelector('.select-c');
  content.innerHTML = ""
  content.setAttribute("id", "sContent");
  // content.style.display = "flex"
  var array = output.items;

  // let array = JSON.parse(localStorage.getItem("videoArray"));

  
  array.forEach(function (element) {
    var div = document.createElement("div");
    var imgDiv = document.createElement("div");
    var nameDiv = document.createElement("div");
   
    var img = document.createElement("img");
   
    img.src = element.snippet.thumbnails.medium.url;
   
 
    var name = document.createElement("h5");
    name.textContent = element.snippet.title;
    var channel = document.createElement("p");
    channel.textContent = element.snippet.channelTitle;
    img.addEventListener("click", function () {
      localStorage.setItem("videoId", element.id.videoId);
      localStorage.setItem("videoName", element.snippet.title );      
      localStorage.setItem("videoArray", JSON.stringify(array));
      localStorage.setItem("channelName", element.snippet.channelTitle );
      window.location.assign("./movie.html")
    })
    var desc = document.createElement("p");
    desc.textContent = element.snippet.description;
  
    imgDiv.append(img);
    
    nameDiv.append(name, channel, desc)
    nameDiv.setAttribute("class","name2-div")
   
    div.append(imgDiv, nameDiv);
    div.setAttribute("class","child-div")
    content.append(div);
    
  });
}


var logoImg = document.getElementById("logo-img");
logoImg.addEventListener("click", function () {
  fetchData1("long", "");
  searchItem = "";
  console.log(searchItem)
  var filterBtns = document.querySelectorAll(".color");
  defaultClass(filterBtns);
  var firstBtn = document.querySelector(".color")
   firstBtn.classList.add("clicked")
})

var filterBtns = document.querySelectorAll(".color");
filterBtns.forEach(function (element) {
  element.addEventListener("click", function () {
    defaultClass(filterBtns);
    element.classList.add("clicked");
    if (searchItem == "") {
      if (element.value == "date" ) {
        fetchData1("long", element.value)
       
         
        } else {
        fetchData1(element.value, "")
          
       }
    } else {
      if (element.value == "date" ) {
        fetchData2(searchItem,"long", element.value)
         
        } else {
        fetchData2(searchItem,element.value, "")
          
       }
      
    }
   
    
      
    
  })
})


function defaultClass(array) {
  array.forEach(function (ele) {
    ele.classList.remove("clicked");
  })
}