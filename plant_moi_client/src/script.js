//let test = document.getElementById("test");

let url = "https://api.gbif.org/v1/species/match?name=Calathea"
let taxon_key;

async function getname(doc) {
    let test = document.getElementById(doc);
    const response = await fetch("https://api.gbif.org/v1/occurrence/3042966788");
    const json = await response.json();

    test.innerHTML = json.species;
    taxon_key = json.taxonKey;
    test.innerHTML = test.innerHTML + "\n" + json.taxonKey;
}

async function getimg() {

  const response = await fetch("https://api.gbif.org/v1/occurrence/search?media_type=StillImage&taxon_key=5669632");
  const json = await response.json();

  //test.innerHTML = test.innerHTML + "\n" + json.results[0].extensions.http://rs.gbif.org/terms/1.0/Multimedia;
  //test.innerHTML = test.innerHTML + "\n" + "<img src=\"https://www.artsobservasjoner.no/MediaLibrary/2021/1/2f49dbfa-d30f-4996-9c71-50ffd8fa487d_image.jpg\" />";
  test.innerHTML = test.innerHTML + "\n" + "<img src=\"https://bs.plantnet.org/image/o/99b4bfd87e9737af7e99c80902a50690a1603352\" width=\"250px\" height=\"400px\"/>";
  
}


getname();
//getimg();

