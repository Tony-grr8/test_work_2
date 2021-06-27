document.addEventListener("DOMContentLoaded", function(event) { 

  const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль",
   "Август", "Сентярь", "Октябрь", "Ноябрь", "Декабрь"
  ];
  var currentTime = new Date();
  var month = currentTime.getMonth();
  var year = currentTime.getFullYear();
  $('#year-btn').text(year);
  $('#month-btn').text(monthNames[month]);
  
  $('#year-dropdown-menu button').on('click', function(event) {
    $('#year-btn').text($(this).text());
    
  });

  $('#month-dropdown-menu button').on('click', function(event) {
    $('#month-btn').text($(this).text());
    
  });

  $('#update-btn').on('click', function(event) {
    console.log("Нажата кнопка обновления ");
    console.log($('#year-btn').text());
    console.log($('#month-btn').text());
    console.log(monthNames.indexOf($('#month-btn').text()) + 1);
    $("#spentTime-table tbody tr").remove();
    $.ajax({
      type: "POST",
      url: 'inc/App.php',
      data: {year:$('#year-btn').text(), month:monthNames.indexOf($('#month-btn').text()) + 1},
      success: function(response)
      {
        // console.log(response);
        var jsonData = JSON.parse(response);
        // console.log(jsonData);
        if (Object.keys(jsonData).length > 0) {
          for (var key in jsonData){
            console.log(key, jsonData[key]);
            
            var tr = "<tr>" + 
                      "<td>" + jsonData[key].id + "</td>" +
                      "<td>" + jsonData[key].name + "</td>" +
                      "<td>" + jsonData[key].fullTime + " ч. (" + jsonData[key].fullTime/8 + " дн.)" +                    
                          `<button type="button" class="btn btn-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                            </svg>
                          </button>
                        </td>` + 
                        `<td>${jsonData[key].fullTime - 160}</td>` + 
                      "</tr";
            $('#spentTime-table tbody').append(tr);
          }
        }
        else {
          alert('Отсутсвуют данные за указанную выборку');
        }

     }
    });
    
  });  

});

var sdBarIsOpen = false
function openNav() {
  if (sdBarIsOpen == false)
  {
    $('#mySidebar').css('width', '250px');
    $("#main").css('margin-left', '250px');
    sdBarIsOpen = true
  }
  else 
  {
    $('#mySidebar').css('width', '0px');
    $("#main").css('margin-left', '0px');
    sdBarIsOpen = false
  }
}
