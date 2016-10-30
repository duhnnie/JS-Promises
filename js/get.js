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

var getChapter = (function () {
    var storyPromise;

    return function (i) {
        storyPromise = storyPromise || get('data/story.json');

        return storyPromise.then(JSON.parse)
            .then(function (story) {
                return get(story.chapters[i - 1].url);
            }).then(JSON.parse);
    };
})();