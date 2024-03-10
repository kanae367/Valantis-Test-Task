import data from '../md5.json';

const fetchData = async (body) => {
    return await fetch('http://api.valantis.store:40000/', {
        method: "POST",
        headers: {
            "Accept": '*/*',
            "Accept-Encoding": "gzip, deflate, br",
            "Content-Type": "application/json",
            "X-Auth": `${data.key}`
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
