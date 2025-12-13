let userNameInputTag = document.querySelector('#username');
let searchBtn = document.getElementById('searchBtn');
let resultCard = document.getElementById('resultCard');


function decorateUI(data) {
    let DOMui = `<div class="flex flex-col items-center text-center gap-3">
                            <img id="avatar" alt="avatar" class="w-28 h-28 rounded-full ring-2 ring-gray-800" src="${data.avatar_url}" />
                            <div>
                                <h2 id="displayName" class="text-lg font-semibold">${data.login}</h2>
                                <p id="handle" class="text-sm text-gray-400">@${data.name}</p>
                            </div>
                            <a id="profileLink" class="text-sm text-indigo-400 underline" href="${data.html_url}" target="_blank"
                                rel="noopener">View on GitHub</a>

                            <div class="w-full mt-3 text-left">
                                <p id="bio" class="text-sm text-gray-300">${data.bio ? data.bio : "Bio not provided"}</p>
                                <div class="mt-4 grid grid-cols-3 gap-2 text-sm text-gray-400">
                                    <div class="p-2 bg-gray-800 rounded-lg">
                                        <div class="font-semibold text-gray-100" id="reposCount">${data.public_repos}</div>
                                        <div class="text-xs">Repos</div>
                                    </div>
                                    <div class="p-2 bg-gray-800 rounded-lg">
                                        <div class="font-semibold text-gray-100" id="followersCount">${data.followers}</div>
                                        <div class="text-xs">Followers</div>
                                    </div>
                                    <div class="p-2 bg-gray-800 rounded-lg">
                                        <div class="font-semibold text-gray-100" id="followingCount">${data.following}</div>
                                        <div class="text-xs">Following</div>
                                    </div>
                                </div>
                            </div>
                        </div>`
    resultCard.innerHTML = DOMui;
}

function decorateUIWithErrors() {
    let message = "does not exist";
    let DOMui = `<div class="flex flex-col items-center text-center gap-3">
                            <img id="avatar" alt="avatar" class="w-28 h-28 rounded-full ring-2 ring-gray-800" src="" />
                            <div>
                                <h2 id="displayName" class="text-lg font-semibold">Found Nothing</h2>
                                <p id="handle" class="text-sm text-gray-400">${message}</p>
                            </div>
                            <a id="profileLink" class="text-sm text-indigo-400 underline" href="#" target="_blank"
                                rel="noopener">${message}</a>

                            <div class="w-full mt-3 text-left">
                                <p id="bio" class="text-sm text-gray-300"></p>
                                <div class="mt-4 grid grid-cols-3 gap-2 text-sm text-gray-400">
                                    <div class="p-2 bg-gray-800 rounded-lg">
                                        <div class="font-semibold text-gray-100" id="reposCount">-</div>
                                        <div class="text-xs">Repos</div>
                                    </div>
                                    <div class="p-2 bg-gray-800 rounded-lg">
                                        <div class="font-semibold text-gray-100" id="followersCount">-</div>
                                        <div class="text-xs">Followers</div>
                                    </div>
                                    <div class="p-2 bg-gray-800 rounded-lg">
                                        <div class="font-semibold text-gray-100" id="followingCount">-</div>
                                        <div class="text-xs">Following</div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
    resultCard.innerHTML = DOMui;
}
function getUsers(username) {
    console.log("function called: ", username);

    try {
        return fetch(`https://api.github.com/users/${username}`).then(raw => {
            if (!raw.ok) {
                console.log("api called with error");
                decorateUIWithErrors();
                throw new Error("something broke!")
            }
            return raw.json();
        });

    } catch (error) {
        decorateUIWithErrors();
        console.error(error.message);
        throw error;
    }
}

searchBtn.addEventListener('click', function (event) {
    event.preventDefault();
    let username = userNameInputTag.value.trim();
    // alert(username);

    getUsers(username).then((data) => {
        decorateUI(data);
        console.log(data);
    }).catch((message) => {
        decorateUIWithErrors();
        console.log(message);
    })
})





