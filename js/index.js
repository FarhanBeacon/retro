const loadContentData = async (category) => {
    let value = '';
    if(!category == ''){
        value = `?category=${category}`;
    }

    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts${value}`);
    const data = await res.json();
    const posts = data.posts;
    contentDataHandler(posts);
}

const contentDataHandler = (posts) => {
    const discussContentField = document.getElementById('discussContentField');
    discussContentField.textContent = '';
    posts.forEach(post => {
        const discussContent = document.createElement('div');
        discussContent.classList = `flex justify-center gap-7 bg-[#F3F3F5] rounded-[24px] p-4 lg:p-[40px] mb-6 shadow-[0_0_5px_rgba(0,0,0,0.25)]`;
        const activeStatus = () => {
            if(post.isActive){
                return 'success';
            } else {
                return 'error';
            }
        }

        discussContent.innerHTML = `
        <div class="relative h-fit w-[72px] bg-[#FFF] rounded-2xl space-y-4">
            <img class="rounded-2xl" src="${post.image}" alt="ProfilePicture">
            <div class="badge badge-${activeStatus()} badge-sm absolute -top-5 -right-1"></div>
        </div>
        <div>
            <div class="flex gap-5">
                <p>#  ${post.category}</p>
                <p>Author: ${post.author.name}</p>               
            </div>
            <div>
                <h4 class="text-xl font-bold">${post.title}</h4>
                <p class="text-[#12132d99]">${post.description}</p>
            </div>
            <hr class="border-t-4 border-dotted border-gray-500 my-4">
            <div class="flex justify-between">
                <div class="flex gap-3 lg:gap-8">
                    <p><i class="fa-regular fa-comment"></i> ${post.comment_count}</p>
                    <p><i class="fa-regular fa-eye"></i> ${post.view_count}</p>
                    <p><i class="fa-regular fa-clock"></i> ${post.posted_time}</p>
                </div>
                <div>
                    <a onclick="titleCommentHandler('${post.title}', '${post.view_count}')" class="h-[28px] w-[28px] py-1 px-4  rounded-full bg-[#10B981]"><i class="fa-solid fa-envelope-open-text text-white"></i></a>
                </div>
            </div>
        </div>
        `;
        discussContentField.appendChild(discussContent);
        loaderHandler(false);
    });
}

const titleCommentHandler = (postTitle, viewCount) => {
    const discussTitleField = document.getElementById('discussTitleField');
    const checkMark = document.getElementById('checkMark');
    const commentCounter = document.getElementById('commentCounter');
    let commentCounterValue = parseInt(commentCounter.innerText);
    commentCounter.innerText = commentCounterValue + 1;
    if(commentCounterValue >= 0){
        checkMark.classList.add('text-green-600');
    }

    const div = document.createElement('div');
    div.classList = `flex justify-between p-4 rounded-[24px] bg-white my-4`;
    div.innerHTML = `
    <h4 class="font-bold">${postTitle}</h4>
    <p class="flex items-center gap-1"><i class="fa-regular fa-eye"></i> ${viewCount}</p>           
    `;
    discussTitleField.appendChild(div);
}

loadContentData();

// For Search Field
document.getElementById('searchBtn').addEventListener('click', function(){
    loaderHandler(true);
    const searchField = document.getElementById('searchField');
    const searchBtnValue = searchField.value;
    console.log(searchBtnValue);
    loadContentData(searchBtnValue);
});

// Loader Handler
const loaderHandler = (isLoading) => {
    const loader = document.getElementById('loader');
    if(isLoading){
        loader.classList.remove('hidden');
    } else {
        loader.classList.add('hidden');
    }
}


// Latest Posts Section
const loadLatestData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts')
    const data = await res.json();
    latestPostsHandler(data);
}

const latestPostsHandler = (posts) => {
    const latestPostsContainer = document.getElementById('latestPostsContainer');

    posts.forEach(post => {
        const div = document.createElement('div');
        div.classList = 'card bg-base-100 lg:w-96 shadow-[0_0_5px_rgba(0,0,0,0.25)]';
        div.innerHTML = `
        <figure class="px-6 pt-6">
            <img
            src="${post.cover_image}" alt="Content Image"
            class="rounded-xl" />
        </figure>
        <div class="card-body">
        <p><i class="fa-regular fa-calendar"></i> ${post.author.posted_date}</p>
        <h2 class="card-title">${post.title}</h2>
            <p>${post.description}</p>
            <div class="card-actions flex gap-5">
                <div class="h-fit w-[44px] rounded-[44px]">
                    <img class="rounded-[44px]" src="${post.profile_image}" alt="Profile Picture">
                </div>
                <div>
                    <h3 class="text-base">${post.author.name}</h3>
                    <p>${post.author.designation? post.author.designation : 'Unknown'}</p>
                </div>
            </div>
        </div>
        `;
        latestPostsContainer.appendChild(div);
    });
}

loadLatestData();