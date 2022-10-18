fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then((response) =>
    response.json())
    .then((data) => {
        for (let i = 0; i < data.length; i++) {
            const tableRow = document.getElementById("table").appendChild(document.createElement('tr'))
            tableRow.setAttribute("id", data[i].name);
            tableRow.setAttribute("class", "row");
            const rank = document.getElementById(data[i].name).appendChild(document.createElement('td'))
            const image = document.getElementById(data[i].name).appendChild(document.createElement('td'))
            image.setAttribute("class", "image");
            const imageContent = '<img src='+data[i].image+' class="imageContent"/>'
            const name = document.getElementById(data[i].name).appendChild(document.createElement('td'))
            name.setAttribute("class", "name");
            const symbol = document.getElementById(data[i].name).appendChild(document.createElement('td'))
            symbol.setAttribute("class", "symbol"); 
            const price = document.getElementById(data[i].name).appendChild(document.createElement('td'))
            price.setAttribute("class", "num");
            const priceChange = document.getElementById(data[i].name).appendChild(document.createElement('td'))
            priceChange.setAttribute("class", "num");
            const volume = document.getElementById(data[i].name).appendChild(document.createElement('td'))
            volume.setAttribute("class", "num");
            const marketCap = document.getElementById(data[i].name).appendChild(document.createElement('td')) 
            marketCap.setAttribute("class", "num");
            rank.innerText = data[i].market_cap_rank;
            image.innerHTML = imageContent;
            name.innerText = data[i].name;
            symbol.innerText = data[i].symbol.toUpperCase();
            price.innerText = '$' + data[i].current_price;
            priceChange.innerText = data[i].price_change_percentage_24h.toFixed(2) + '%'; 
            volume.innerText = '$' + data [i].total_volume.toLocaleString('en-US');
            marketCap.innerText = '$' + data [i].market_cap.toLocaleString('en-US');
    }
    }
    )

    function findCrypto(){
        const input = document.getElementById("input");
        const filter = input.value.toUpperCase();
        const table = document.getElementById("table");
        const tr = table.getElementsByTagName("tr");
    
        for(i = 0; i < tr.length; i++) {
           const td = tr[i].getElementsByClassName("name")[0];
            if (td) {
                 const txtValue = td.textContent || td.innerText;
                if(txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }