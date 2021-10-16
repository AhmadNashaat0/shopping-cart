const api = "http://127.0.0.1:3000/products/"

const headers = {
    'Accept': 'application/json'
}

export const getAll = async () => {
    const res = await fetch(`${api}/`, { headers })
    const data = res.json();
    return data;

}