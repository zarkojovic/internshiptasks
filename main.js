function createLS(name) {
  ajaxCallback(name + ".json", function (data) {
    localStorage.setItem(name, JSON.stringify(data));
  });
}
function getLS(name) {
  return JSON.parse(localStorage.getItem(name));
}
function setLS(name, data) {
  localStorage.setItem(name, JSON.stringify(data));
}

function removeLS(name) {
  localStorage.removeItem(name);
}

function addItem() {
  var name = $("#name").val();
  var country = $("#country").val();

  var conuntErrors = 0;

  let regexFullname = /^[A-Z][a-z]{2,10}\s[A-Z][a-z]{2,10}$/;
  if (!regexFullname.test(name)) {
    conuntErrors++;
    $("#errorName").html("Invalid full name format! Try: Will Smith");
  } else {
    $("#errorName").html("");
  }

  if (country == 0) {
    conuntErrors++;
    $("#errorCountry").html("You have to choose country");
  } else {
    $("#errorCountry").html("");
  }

  if (conuntErrors == 0) {
    var data = getLS("data");

    if (data == null) {
      setLS("data", []);

      data = getLS("data");
    }

    var newInput = { name: name, country: country };

    data.push(newInput);

    data = setLS("data", data);
    displayItems();

    // triggers();
    document.forms[0].reset();
  }
}

function displayItems() {
  var data = getLS("data");
  var html = "";
  if (data != null) {
    for (let i = 0; i < data.length; i++) {
      html += `<tr>
                    <th scope="row">${i + 1}</th>
                    <td>${data[i].name}</td>
                    <td>${data[i].country}</td>
                    <td><button class="btn btn-danger removeItem" onClick="removeItem(${i})">Remove</button></td>
                </tr>`;
    }
  }
  $("#dataDisplay").html(html);
  //   triggers();
}

function removeItem(id) {
  var data = getLS("data");
  if (data != null) {
    var newItems = [];
    for (let i = 0; i < data.length; i++) {
      if (i != id) {
        newItems.push(data[i]);
      }
    }

    setLS("data", newItems);
    displayItems();
  }
}

function triggers() {
  $("#submitBtn").click(function () {
    addItem();
  });
  $(".removeItem").click(function () {
    var id = $(this).data("id");
    removeItem(id);
  });
}
$(document).ready(function () {
  displayItems();
  //   triggers();
});
