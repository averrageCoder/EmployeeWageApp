window.addEventListener('DOMContentLoaded',(event) => {
    const name = document.querySelector('#name');
    const text_error = document.querySelector('.name-error');
    name.addEventListener('input', function() {
        if(name.value.length == 0) {
            text_error.textContent = "";
            return
        }
        try {
            (new EmployeePayrllData()).name = name.value;
            text_error.textContent = "";
        }
        catch(e) {
            text_error.textContent = e;
        }
    });

    const salary = document.querySelector('#salary');
    const salary_output = document.querySelector('.salary-output');
    salary_output.textContent = salary.value;
    salary.addEventListener('input',function() {
        salary_output.textContent = salary.value;
    });
});


const save = () => {
    try {
        let employeeData = createNewEmployeeData();
        createAndUpdateStorage(employeeData);
    }
    catch(e) {
        alert(e);
        //return; 
    }
}

function createNewEmployeeData() {
    let employeeData = new EmployeePayrllData();
    try {
        employeeData.name = getInputValueId('#name');
    }
    catch(e) {
        setTextValue('.text-error',e);
        //return;
    }

    employeeData.profilePic = getSelectedValues('[name=profile]').pop();
    employeeData.gender = getSelectedValues('[name=gender]').pop();
    employeeData.department = getSelectedValues('[name=department]');
    employeeData.salary = getInputValueId('#salary');
    employeeData.note = getInputValueId('#notes');
    let date = getInputValueId('#year')+"-"+getInputValueId('#month')+"-"+getInputValueId('#day');
    employeeData.startDate = new Date(date);
    //alert(employeeData.toString());
    return employeeData;
}

function getSelectedValues(propertyValue) {
    let allItems = document.querySelectorAll(propertyValue);
    let selectedItems = new Array();
    allItems.forEach(element => {
        if(element.checked) selectedItems.push(element.value);
    });
    return selectedItems;
}

function getInputValueId(id) {
    return document.querySelector(id).value;
}


//uc4
function createAndUpdateStorage(employeeData) {

    let EmployeePayrllDataList = JSON.parse(localStorage.getItem('EmployeePayrllDataList'));

    if(EmployeePayrllDataList != undefined) {
        EmployeePayrllDataList.push(employeeData);
    }
    else {
        EmployeePayrllDataList = [employeeData];
    }

    alert(EmployeePayrllDataList.toString());
    localStorage.setItem("EmployeePayrllDataList", JSON.stringify(EmployeePayrllDataList));
}

function resetForm() {
    setValue('#name','');
    unSelectValues('[name=profile]');
    unSelectValues('[name=gender]');
    unSelectValues('[name=department]');
    setValue('#salary','');
    setValue('#notes','');
    setValue('#day','01');
    setValue('#month','01');
    setValue('#year','2021');
}

const unSelectValues = (property) => {
    let allItems = document.querySelectorAll(property);
    allItems.forEach(element => {
        element.checked = false;
    });
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

function validateStartDate() {
    const day = document.querySelector('#day').value;
    const month = parseInt(document.querySelector('#month').value) -1;
    const year = document.querySelector('#year').value;

    const start_date = new Date(year,month,day);
    const text_error = document.querySelector('.startdate-error');
    var today = new Date();
    const one_month_ago = new Date(today.setDate(today.getDate()-30));
    today = new Date();
    if(today < start_date || start_date < one_month_ago) {
        text_error.textContent = "Start date is invalid!";
        return false;
    }
    else {
        text_error.textContent = "";
        return true;
    }
}

let object = document.getElementsByTagName('select');
for(var obj of object) {
    obj.addEventListener("change", validateStartDate);
}

function save2() {
    var markedCheckbox = document.getElementsByClassName('checkbox');
    let departments = new Array();  
    for (var checkbox of markedCheckbox) {
        if (checkbox.checked)  {
            departments.push(checkbox.value); 
        }
    }
    const name_val = document.querySelector('#name').value;
    const salary_val = salary.value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const day = document.querySelector('#day').value;
    const month = parseInt(document.querySelector('#month').value) -1;
    const year = document.querySelector('#year').value;
    const start_date = new Date(year,month,day);
    console.log(start_date);
    try {
        let newEmployeePayrllData  = new EmployeePayrllData(1, name_val,salary_val, gender, departments, start_date);
        alert(newEmployeePayrllData.toString());
    }
    catch (e) {
        alert(e);
    }
}

function validateForm() {
    if(validateName() && validateStartDate()) {
        save();
    }
}