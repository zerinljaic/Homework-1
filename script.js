function LocalFormData(form) {
    this.name = form[0].value ? form[0].value : form[0].textContent;
    this.description = form[1].value ? form[1].value : form[1].textContent;
    this.assessment = form[2].value ? form[2].value : form[2].textContent;
    this.duration = form[3].value ? form[3].value : form[3].textContent;
  
    this.getParamInputField = function(varName) {
      return `<input value="${this[varName]}"/>`;
    } 
    this.getSelectInputForDurations = function() {
      return `
        <select id="duration">
          <option value="1h">1h</option>
          <option value="1h 30min">1h 30min</option>
          <option value="2h">2h</option>
          <option value="2h 30min">2h 30min</option>
        </select>
      `;
    }
  }
  
  
  var getDataFromForm = function (event) {

    var form = event.currentTarget;
  
    console.log(form);
    var data = new LocalFormData(form);
    console.log(data);
    form.reset();
    return data;
  };
  
  var editActionFunc = function (event) {
    var trow = event.currentTarget.parentElement.parentElement;
    var data = new LocalFormData(trow.children);
    // trow.
    console.log(data);
  
    trow.children[0].innerHTML = data.getParamInputField('name');
    trow.children[1].innerHTML = data.getParamInputField('description');
    trow.children[2].innerHTML = data.getParamInputField('assessment');
    trow.children[3].innerHTML = data.getSelectInputForDurations();
    trow.children[4].innerHTML = "";
  
    var saveAction = document.createElement("button");
    saveAction.textContent = `Save`;
  
    saveAction.addEventListener("click", function (saveEvent) {
      if (
        trow.children[0].firstChild.value.match(letters) &&
        trow.children[1].firstChild.value.match(letters) &&
        trow.children[2].firstChild.value.match(num)
      ) {
        var row = saveEvent.currentTarget.parentElement.parentElement;
        trow.children[0].innerHTML = trow.children[0].firstChild.value;
        trow.children[1].innerHTML = trow.children[1].firstChild.value;
        trow.children[2].innerHTML = trow.children[2].firstChild.value;
        trow.children[3].innerHTML = trow.children[3].firstChild.nextSibling.value;
        
        trow.children[4].appendChild(getEditButton());
        trow.children[4].appendChild(getDeleteButton());
  
      } else {
        alert("Podaci nisu validni");
      }
    });
  
    var discartAction = document.createElement("button");
    discartAction.textContent = `Discart`;
  
    trow.children[4].appendChild(saveAction);
    trow.children[4].appendChild(discartAction);
  }
  
  var deleteActionFunc = function (event) {
    var result = window.confirm("Are you sure you want to delete this row ?");
    if (result) {
      var trow = event.currentTarget.parentElement.parentElement;
      trow.remove();
    }
  }
  
  var getEditButton = function() {
    var editAction = document.createElement("button");
    editAction.textContent = `Edit`;
    
    editAction.addEventListener("click", editActionFunc);
  
    return editAction;
  }
  
  var getDeleteButton = function() {
    var deleteAction = document.createElement("button");
    deleteAction.textContent = `Delete`;
  
    deleteAction.addEventListener('click', deleteActionFunc);
  
    return deleteAction;
  }
  
  var letters = /^[A-Za-z]+$/;
  var num = /^[1-9][0-9]+$/;
  
  var addDataIntoTable = function (data) {
    var table = document.getElementById("list-of-movies");
    var row = document.createElement("tr");
  
    if (
      data.name.match(letters) &&
      data.description.match(letters) &&
      data.assessment.match(num)
    ) {
      var nameCell = document.createElement("td");
      nameCell.innerHTML = data.name;
      row.appendChild(nameCell);
      var descriptionCell = document.createElement("td");
      descriptionCell.innerHTML = data.description;
      row.appendChild(descriptionCell);
      var assessmentCell = document.createElement("td");
      assessmentCell.innerHTML = data.assessment;
      row.appendChild(assessmentCell);
      var depCell = document.createElement("td");
      depCell.innerHTML = data.Duration;
      row.appendChild(depCell);
      var actionCell = document.createElement("td");
  
      var editAction = document.createElement("button");
      editAction.textContent = `Edit`;

      editAction.addEventListener("click", editActionFunc);
  
      actionCell.appendChild(getEditButton());
      actionCell.appendChild(getDeleteButton());
  
      row.appendChild(actionCell);
  
      table.appendChild(row);
    } else alert("Podaci nisu validni");
  };
  
  var form = document.getElementById("form-input");
  console.log(form);
  
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var data = getDataFromForm(event);
    addDataIntoTable(data);
  });
  
  var sortTableByColumn = function(event) {
    var ths = document.querySelectorAll('th');
    var thsArray = Array.from(ths);
    for(var preTh of thsArray) {
      preTh.style.backgroundColor = 'white';
    }
    var th = event.currentTarget;
    th.style.backgroundColor = 'gray';
  
    var sortByProp = th.getAttribute('data-prop');
  
    var tableRows = document.querySelectorAll("table > tr");
    var tableRowsArray = Array.from(tableRows);
  
    var datObj = [];
  
    for(var tr of tableRowsArray) {
      
      datObj.push(new LocalFormData(tr.children));
  
    }
    datObj.sort(function(a, b) {
      if(typeof a[sortByProp] == 'string') {
        return a[sortByProp].split('')[0] < b[sortByProp].split('')[0]
      }
      return a[sortByProp] < b[sortByProp];
    });
  
    for(var rowOfTable of tableRows) {
      rowOfTable.remove();
    }
    for(var data of datObj) {
      addDataIntoTable(data);
    }
  
  }
  // 
  var setEventListenersOnTh = function() {
    var ths = document.getElementsByTagName('th');
    var thsArray = Array.from(ths);
    for (var i = 0; i < thsArray.length - 1; i++) {
      thsArray[i].addEventListener("click", sortTableByColumn)
    }
    console.log(ths);
    debugger;
  }
  setEventListenersOnTh();