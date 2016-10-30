var get = function (url) {
    return new Promise(function (resolve, reject) {

        var xhr =  new XMLHttpRequest();

        xhr.open('GET', url);

        xhr.onload = function () {
            if (xhr.status === 200) {
                resolve(xhr.response);
            } else {
                reject(xhr.statusText);
            }
        };

        xhr.onerror = function (err) {
            reject(Error("Network error!"));
        };

        xhr.send();
    });
};

var getJSON = function (url) {
    return get(url).then(JSON.parse);
};

var getChapter = (function () {
    var storyPromise;

    return function (i) {
        storyPromise = storyPromise || getJSON('data/story.json');

        return storyPromise
            .then(function (story) {
                return getJSON(story.chapters[i - 1].url);
            })
            .catch(function (err) {
                console.log("error", err);
            });
    };
})();