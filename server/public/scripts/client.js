function onReady() {
    console.log('Hello from client.js');

    axios({
        method: 'GET',
        url: '/artist'
    })
        .then(function (response) {
            // Code that will run on successful response
            // from the server.
            console.log(response);
            // quotesFromServer will be an Array of quotes
            let quotesFromServer = response.data;
            let contentDiv = document.querySelector('#artistTableBody');
            for (let artist of quotesFromServer) {
                contentDiv.innerHTML += `
                <tr>
                    <td>${artist.name}</td>
                    <td>${artist.born}</td>
                    <td>${artist.died}</td>
                </tr>
            `;
            }
        }).catch(function (error) {
            // Code that will run on any errors from the server.
            console.log(error);
            alert('Something bad happened! Check the console for more details.')

        });

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
        //maybe not right
      onReady()
    })
}


function renderNewArtist(artistListArray) {
    let artistList = document.getElementById('artistTableBody');
  
    artistList.innerHTML = '';
  
    for (let man of artistListArray) {
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
