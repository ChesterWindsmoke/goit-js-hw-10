import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_rNPh4iondwmBSLsvp1nHDgEKgwMyje2GJCdk5GJRpiAv1YcPEuWauFWjrJZNjTX9";

export function fetchBreeds() {
    return axios.get('https://api.thecatapi.com/v1/breeds')
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
        });
}

export function fetchCatByBreed(breedId) {
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
        });
}
