const clientID = '0b25b96e9fcc426cb962a396ef3fbbff';
const URIRedirect = 'http://localhost:3000';

var accessToken;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }

        //Check URL for acces token and set them to variables
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        
        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);

            //Clear token after expiration time
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${URIRedirect}`;
            window.location = accessURL;
        }
    },

    search(term) {
        const token = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, { headers: { Authorization: `Bearer ${token}` } 
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                preview_url: track.preview_url,
                uri: track.uri
            }));
        });
    },

    savePlaylist(playlistName, URIList) {
        if (!playlistName || !URIList.length) {
            return;
        }
        const token = this.getAccessToken();
        const headers = { Authorization: `Bearer ${token}` };
        let userID;
        return fetch('https://api.spotify.com/v1/me', {headers: headers})
        .then(response => {
            return response.json();
        }).then(jsonResponse => {
            userID = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ name: playlistName })
            })
        }).then(response => response.json()
            ).then(jsonResponse => {
                const playlistID = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify( { uris: URIList } )
            })
        })
    },
};

export default Spotify;