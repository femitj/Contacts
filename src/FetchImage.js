const url = "https://randomuser.me/api/";

const options = {
  method: "GET"
};

fetch(`${url}`, options)
  .then(res => res.json())
  .then(res => {
    getImage(res.results[0].picture.thumbnail);
  });

class GetImage 
const getImage = data => {
  //console.log(data);
  return data;
};

export default getImage;
