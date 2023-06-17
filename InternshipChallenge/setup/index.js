const body = document.querySelector('body');
const loadMoreButton = document.querySelector('.load-more-button');
const gridContainer = document.querySelector("#grid-container");

const allPosts = [];
let numberOfFetchedPosts = 0;
let isDarkTheme = false;

const fetchPosts = async () => {
    await fetch(FILE_DATA_URL).then(response => {
        return response.json().then(data => {
            allPosts.push(...data);
        })
    })
}

const appendFourPosts = () => {
    for(let i=numberOfFetchedPosts; i<numberOfFetchedPosts + 4; i++) {
        const markupCard = `
        <div id="${allPosts[i].id}" class="card">
        <div class="profileInfo">
          <img class="profileImg" src="${allPosts[i].profile_image}"/>
          <div>
              <span class="text-bold text-lg">${allPosts[i].name}</span>
              <div class="text-sm">${allPosts[i].date}</div>
          </div>
          <div class="social-network-icon">
              <img src="./icons/${allPosts[i].source_type}.svg"
                    onerror="this.onerror=null; this.src='./icons/${allPosts[i].source_type}-logo.svg'"
              ></img>
          </div>
        </div>
        <div class="card-content">
            <img class="contentImg" 
              src="${allPosts[i].image}"/>
           <div class="caption-container">
               <p class="text-ellipsis">${allPosts[i].caption}</p>
           </div>
        </div>
        <div class="card-footer">
          <img id="favorite-icon" onclick="addLike(${i})"  src="./icons/heart.svg"/>
          <span id="likes-${i}">${allPosts[i].likes}</span>
        </div>
      </div>
        `
        gridContainer.appendChild(createElementFromHTML(markupCard));
    }

    numberOfFetchedPosts += 4;

    if(numberOfFetchedPosts == allPosts.length) {
        loadMoreButton.remove();
    }
}

const app = async () => {
    await fetchPosts();

    appendFourPosts();
};

const addLike = (index) => {
    let newLikes = 0;

    if(allPosts[index].liked === false || allPosts[index].liked === undefined) {
        newLikes = (Number(allPosts[index].likes) + 1).toString();
        allPosts[index].likes = newLikes;
        allPosts[index].liked = true;
    } else {
        newLikes = (Number(allPosts[index].likes) - 1).toString();
        allPosts[index].likes = newLikes;
        allPosts[index].liked = false;
    }

    
    document.querySelector(`#likes-${index}`).innerHTML = newLikes;
    
}


const switchTheme = () => {
    isDarkTheme = !isDarkTheme;

    if(isDarkTheme) {
        body.style.backgroundColor = '#66347F';
        body.style.color = "#DDE6ED";
        loadMoreButton.style.backgroundColor = "#836512"
        loadMoreButton.style.color = "#DDE6ED";
        loadMoreButton.classList.add(darkThemeHoverClass);
    } else {
        body.style.backgroundColor = '#fff';
        body.style.color = "#27374D";
        loadMoreButton.style.backgroundColor = "#ffbe0b"
        loadMoreButton.style.color = "#fff";
        loadMoreButton.classList.add(lightThemeHoverClass);
    }
    
}

document.addEventListener("DOMContentLoaded", app);