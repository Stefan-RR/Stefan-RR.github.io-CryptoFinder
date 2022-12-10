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
            const rank = document.getElementById(data[i].name).appendChild(document.createElement('td'))
            rank.setAttribute("class", "coin");
            const imageContent = '<img src='+ data[i].image +' class="imageContent"/>'
            const price = document.getElementById(data[i].name).appendChild(document.createElement('td'))
            price.setAttribute("class", "num");
            const priceChange = document.getElementById(data[i].name).appendChild(document.createElement('td'))
            priceChange.setAttribute("id", data[i].price_change_percentage_24h);
            priceChange.setAttribute("class", "num");
            const volume = document.getElementById(data[i].name).appendChild(document.createElement('td'))
            volume.setAttribute("class", "num");
            const marketCap = document.getElementById(data[i].name).appendChild(document.createElement('td')) 
            marketCap.setAttribute("class", "num");
            // Insert api data into appropriate td
            rank.innerHTML = "<div class='coinDiv'>" + "<div class='rankDiv'>" + "<span class='rank'>" + data[i].market_cap_rank + "</span>" + "</div>" + "<div class='imageDiv'>" + "<span class='image'>" + imageContent + "</span>" + "</div>" + "<div class='searchDiv'>" + "<a class='search'>" + "<span class='name'>" + data[i].name + "</span>" + "<span class='symbol'>" + data[i].symbol.toUpperCase() +"</span>" + "</a>" + "</div>" + "</div>";
            price.innerText = '$' + data[i].current_price;
            const pChange = data[i].price_change_percentage_24h
            priceChange.innerHTML = pChange.toFixed(2) + '%'; 
            volume.innerText = '$' + data [i].total_volume.toLocaleString('en-US');
            marketCap.innerText = '$' + data [i].market_cap.toLocaleString('en-US');
            // Change colour of % gain based on positive or negative value
            priceChange.style.color = (pChange >= 0 ? '#ADFF2F':'#FA8072')
            }
        }
    )
     

   
    
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

    function sortTable(th) {
        // Get the table element that contains the th element
        const table = th.closest('table');
      
        // Get the index of the th element within the table header row
        const headerIndex = Array.from(th.parentNode.children).indexOf(th);
      
        // Get all of the tr elements in the table body
        const rows = Array.from(table.querySelectorAll('tbody tr'));
      
        // Sort the rows in ascending order if the th element is not currently sorted,
        // or in descending order if the th element is currently sorted in ascending order
        const sortAscending = th.getAttribute('aria-sort') !== 'ascending';
        rows.sort((row1, row2) => {
          const cell1 = row1.children[headerIndex];
          const cell2 = row2.children[headerIndex];
          return sortAscending
            ? cell1.innerText.localeCompare(cell2.innerText)
            : cell2.innerText.localeCompare(cell1.innerText);
        });
      
        // Clear the existing rows from the table body
        const tbody = table.querySelector('tbody');
        tbody.innerHTML = '';
      
        // Add the sorted rows back to the table body
        rows.forEach(row => tbody.appendChild(row));
      
        // Update the aria-sort attribute on the th element
        th.setAttribute('aria-sort', sortAscending ? 'ascending' : 'descending');
      }
      
      const thElements = document.querySelectorAll('th');
      thElements.forEach(th => th.addEventListener('click', () => sortTable(th)));
      