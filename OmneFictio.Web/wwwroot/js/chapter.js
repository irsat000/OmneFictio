

$(document).ready(function () {
    fetchChapter();
});

async function fetchChapter() {
    let postid = parseInt(window.getSlashQuery(2), 10);
    let index = parseInt(window.getSlashQuery(3), 10);
    await fetch("/g/GetChapter/" + postid + "/" + index, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.statusCode === 200) {
                console.log(data.value);
            } else {
                console.log("Not 200 :( -> " + data.statusCode);
            }
        })
        .catch(error => { console.log('Fetch failed -> ' + error); });
}