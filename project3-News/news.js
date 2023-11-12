API_KEY="6723168c4866068263d76de2b5e500ff"
let articles=[]
const menus=document.querySelectorAll(".menus")
menus.forEach((menu)=>menu.addEventListener("click",(event)=>clickCategory(event)))
let page=1
let totalArticles=0
let pageSize=10
let groupSize=5
const errorCatchNews=async()=>{
    try{
        url.searchParams.set("page",page)
        url.searchParams.set("pageSize",pageSize)
        const response=await fetch(url)
        const data=await response.json()
        console.log(data)
        articles=data.articles
        if(response.status===200){ 
            if(articles.length===0){
            throw new Error("No news found")
            } 
            totalArticles=data.totalArticles
            render()
            paginationRender()
        }else{
            page=0
            total
            throw new Error(data.errors)
        }   
    }catch(error){
        console.log(error,error.message)
        errorRender(error.message)
    }
}

const getNews=async()=>{
    page=1
    url=new URL(`https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=us&max=10&apikey=${API_KEY}`)
    errorCatchNews()
}
getNews()


const render=()=>{
    let innerHTML=articles.map((item)=>`
                <div class="row">
                    <div class="col-lg-4">
                        <img class="img" src="${item.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"}">
                    </div>
                    <div class="col-lg-8">
                        <h2>${item.title}</h2>
                        <p>${item.description==""||item.description==null?"내용없음":item.description.length>100?item.description.substring(0,100)+"...":item.description}</p>
                        <div>${item.source.name||"no source"}*${moment(item.publishedAt).startOf('hour').fromNow()}</div>
                    </div>
                </div>`).join('')
    document.getElementById("newsBoard").innerHTML=innerHTML
}

const clickCategory=async(event)=>{
    const category=event.target.textContent.toLowerCase()
    url=new URL(`https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=10&apikey=${API_KEY}`)
    errorCatchNews()
}

const searchNews=async()=>{
    const search=document.getElementById("search-input").value
    url=new URL(`https://gnews.io/api/v4/top-headlines?q=${search}&lang=en&country=us&max=10&apikey=${API_KEY}`)
    errorCatchNews()
}

const errorRender=(error)=>{
    const errorHTML=`<div class="alert alert-warning" role="alert">${error}</div>`;
    document.getElementById("newsBoard").innerHTML=errorHTML
}

const paginationRender=()=>{
    let totalPage=Math.ceil(totalArticles/pageSize)
    let pageGroup=Math.ceil(page/groupSize)
    let last=pageGroup*groupSize
    if(last>totalPage){
        last=totalPage
    }
    let first=last-4<=0?1:last-4
    let innerHTML=``
    if(first>=6){
        innerHTML=`<li class="page-item">
        <a class="page-link" aria-label="Previous" onclick="goToPage(${1})">
        <span aria-hidden="true">&laquo;</span>
        </a>
        </li>
        <li class="page-item" onclick="goToPage(${page-1})"><a class="page-link"><</a></li>`
        
    }
    for(let i=first;i<=last;i++){
            innerHTML+=`<li class="page-item"${i===page?"active":""}><a class="page-link" onclick="goToPage(${i})">${i}</a></li>`
        }
    if(last<totalPage){
        innerHTML+=`<li class="page-item" onclick="goToPage(${page+1})"><a class="page-link">></a></li>
        <li class="page-item">
        <a class="page-link" aria-label="Next" onclick="goToPage(${totalPage})">
          <span aria-hidden="true">&raquo;</span>
        </a>
        </li>`
    }

    document.querySelector(".pagination").innerHTML=innerHTML
}
const goToPage=(i)=>{
    page=i
    errorCatchNews()
}

const openNav=()=>{
    document.getElementById("mySideNav").style.width="250px"
}
const closeNav=()=>{
    document.getElementById("mySideNav").style.width="0px"
}
const openSearchBox=()=>{
    let input=document.getElementById("input-area")
    input.style.display==="inline"?input.style.display="none":input.style.display="inline"
}