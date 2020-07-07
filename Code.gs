function main() {
  var videoId = "7WyizoxPprA";
  var videoData = getVideoDetails(videoId);
  
  if(!validate(videoData)){
    updateDetails(videoData);
  }
  
  Logger.log(videoData);
}

function getVideoDetails(videoId){
  var result = YouTube.Videos.list('snippet,statistics', {id:videoId});
  var obj = {
    id:videoId,
    title: result.items[0].snippet.title,
    categoryId: result.items[0].snippet.categoryId,
    viewCount: result.items[0].statistics.viewCount
  }
  
  return obj;
}

function validate(videoData){
  if(videoData.title.indexOf(videoData.viewCount) > 0){
    return true;
  }
  return false;
}

function updateDetails(videoData){
  var resource = {
    snippet : {
      title: "This video has " + videoData.viewCount + " views now",
      categoryId : videoData.categoryId
    },
    id : videoData.id
  };
  
  Logger.log(resource);
  YouTube.Videos.update(resource, "snippet,id");
}