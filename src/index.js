// Fetch api data then insert into table
fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then((response) =>
    response.json())
    .then((data) => {
        for (let i = 0; i < data.length; i++) {
            // Generate table structure
            const tableRow = document.getElementById("table").appendChild(document.createElement('tr'))
            tableRow.setAttribute("id", data[i].name);
            tableRow.setAttribute("class", "row");
            const rank = document.getElementById(data[i].name).appendChild(document.createElement('th'))
            rank.setAttribute("class", "coin");
            const imageContent = '<img src='+ data[i].image +' class="imageContent"/>'
            const price = document.getElementById(data[i].name).appendChild(document.createElement('td'))
            price.setAttribute("class", "num");
            const priceChange = document.getElementById(data[i].name).appendChild(document.createElement('td'))
            priceChange.setAttribute("class", "pnum");
            const volume = document.getElementById(data[i].name).appendChild(document.createElement('td'))
            volume.setAttribute("class", "num");
            const marketCap = document.getElementById(data[i].name).appendChild(document.createElement('td')) 
            marketCap.setAttribute("class", "num");
            // Insert api data into appropriate td
            rank.innerHTML = "<div class='coinDiv'>" + "<div class='rankDiv'>" + "<span class='rank'>" + data[i].market_cap_rank + "</span>" + "</div>" + "<div class='imageDiv'>" + "<span class='image'>" + imageContent + "</span>" + "</div>" + "<div class='searchDiv'>" + "<a class='search'>" + "<span class='name'>" + data[i].name + "</span>" + "<span class='symbol'>" + data[i].symbol.toUpperCase() +"</span>" + "</a>" + "</div>" + "</div>";
            price.innerText = '$' + data[i].current_price;
            priceChange.innerText = data[i].price_change_percentage_24h.toFixed(2) + '%'; 
            volume.innerText = '$' + data [i].total_volume.toLocaleString('en-US');
            marketCap.innerText = '$' + data [i].market_cap.toLocaleString('en-US');
            
            }
        }
    )
     
    function textColor(){
        const table = document.getElementById("table");
        const tr = table.getElementsByTagName("tr");

        for(i = 0; i < tr.length; i++){
            const priceChange = tr[i].getElementsByClassName("pnum")[0];
            if (priceChange) {
                const txtValue = priceChange.textContent;
                if((txtValue) >=0){
                    txtValue[i].style.color = "green"
                } else {
                    txtValue[i].style.color = "red"
                }
            }
        }
    }  
    textColor()
    function findCrypto(){
        const input = document.getElementById("input");
        const filter = input.value.toUpperCase();
        const table = document.getElementById("table");
        const tr = table.getElementsByTagName("tr");
    
        for(i = 0; i < tr.length; i++) {
           const td = tr[i].getElementsByClassName("search")[0];
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
