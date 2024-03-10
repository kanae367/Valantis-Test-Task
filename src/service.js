import md5 from "js-md5";

const PASSWORD = import.meta.env.VITE_PASSWORD;

const date = new Date();
const currentMonth = String(date.getMonth() + 1);
const api_key_date = String(date.getFullYear()) + (currentMonth < 10 ? '0' + String(currentMonth) : String(currentMonth)) + String(date.getDate());

const API_KEY = md5(PASSWORD + api_key_date);

const fetchData = async (body) => {
    return await fetch('https://api.valantis.store:41000/', {
        method: "POST",
        headers: {
            "Accept": '*/*',
            "Accept-Encoding": "gzip, deflate, br",
            "Content-Type": "application/json",
            "X-Auth": `${API_KEY}`
        },
        body: JSON.stringify(body)
    }).then(response => response.json());
}

export async function loadItems(params){
    let ids = null;
    let items = null;

    while(ids === null){
        try{
            ids = await fetchData(params)
        }catch(error){
            console.log(error);
        }
    }

    const preparedIds = ids.result.filter((item, index) => ids.result.indexOf(item) == index);

    while(items === null){
        try {
            items = await fetchData({
                action: "get_items",
                params: {
                    ids: preparedIds
                }
            });
        } catch (error) {
            console.log(error)
        }
    }

    const itemsWithoutDuplicates = items.result.reduce((o, i) => {
        if (!o.find(v => v.id === i.id)) {
            o.push(i);
        }

        return o;
    }, [])

    return itemsWithoutDuplicates;
}
