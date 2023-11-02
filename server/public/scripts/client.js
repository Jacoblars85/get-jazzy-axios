function onReady() {
    console.log('Hello from client.js');
     // TODO Add Axios request for /songs and display on DOM
    axios({
        method: 'GET',
        url: '/song'
    })
      .then(function (response) {
        console.log(response);

        let quotesFromServer = response.data;
        let contentDiv = document.querySelector('#songTableBody');
        for (let song of quotesFromServer) {
            contentDiv.innerHTML += `
            <tr>
            <td>${song.title}</td>
            <td>${song.artist}</td>
        </tr>
    `;
        }
      }).catch(function (error) {
        console.log(error);
        alert('Something bad happened! Check the console for more details.')
    });
}

function getArtist() {
    axios({
      url: '/artist',
      method: 'GET'
    }).then((response) => {
      let artist = response.data 
      renderNewArtist(artist)
    })
  }


function onSubmit(event) {
    event.preventDefault()

    let artistInput = document.getElementById('artistInput').value
    let bornInput = document.getElementById('bornInput').value
    let diedInput = document.getElementById('diedInput').value

    document.getElementById('artistInput').value = ''
    document.getElementById('bornInput').value = ''
    document.getElementById('diedInput').value = ''
  
    
    let newArtist = {
        name: artistInput,
        born: bornInput,
        died: diedInput
    }
    axios({
      method: 'POST',
      url: '/artist',
      data: newArtist
    }).then((response) => {
        getArtist()
    })
}


function renderNewArtist(artist) {
    let artistList = document.getElementById('artistTableBody');
  
    artistList.innerHTML = '';
  
    for (let man of artist) {
        artistList.innerHTML += `
      <tr>
        <th>${man.name}:</th>
        <th>${man.born}</th>
        <th>${man.died}</th>
     </tr>
      `
    }
  }
  

onReady();
getArtist();