let isUpdate = false;
let empPayrollObj = {};

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

    checkForUpdate();
});


const save = () => {
    try {
        let employeeData = createNewEmployeeData();
        createAndUpdateStorage(employeeData);
    }
    catch(e) {
        alert(e);
    }
    return;
}

function createNewEmployeeData() {
    let employeeData = new EmployeePayrllData();
    try {
        employeeData.name = getInputValueId('#name');
    }
    catch(e) {
        setTextValue('.name-error',e);
        throw e;
    }

    employeeData.profilePic = getSelectedValues('[name=profile]').pop();
    employeeData.gender = getSelectedValues('[name=gender]').pop();
    employeeData.department = getSelectedValues('[name=department]');
    employeeData.salary = getInputValueId('#salary');
    employeeData.note = getInputValueId('#notes');
    let date = getInputValueId('#year')+"-"+getInputValueId('#month')+"-"+getInputValueId('#day');
    try {
        employeeData.startDate = new Date(date);
    }
    catch(e) {
        setTextValue('.startdate-error',e);
        throw e;
    }
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
        if(EmployeePayrllDataList.length == 0) employeeData.id = 1;
        else employeeData.id = (EmployeePayrllDataList[EmployeePayrllDataList.length-1]._id)+1;
        EmployeePayrllDataList.push(employeeData);
    }
    else {
        employeeData.id = 1;
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
    const salary = document.querySelector('#salary');
    salary.dispatchEvent(new Event('input'));
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

const setTextValue = (property, value) => {
    const text_error = document.querySelector(property);
    text_error.textContent = value;
}

//curd operations
function checkForUpdate() {
    const employeePayrollJSON = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJSON ? true:false;
    if(!isUpdate) return;
    empPayrollObj = JSON.parse(employeePayrollJSON);
    setForm();
}

function setForm() {
    setValue('#name',empPayrollObj._name);
    setSelectValues('[name=profile]',empPayrollObj._profilePic);
    setSelectValues('[name=gender]',empPayrollObj._gender);
    setSelectValues('[name=department]',empPayrollObj._department);
    setValue('#salary',empPayrollObj._salary);
    const salary = document.querySelector('#salary');
    salary.dispatchEvent(new Event('input'));
    setValue('#notes',empPayrollObj._note);
    let date = new Date(empPayrollObj._startDate);
    setValue('#day',("0" + date.getDate()).slice(-2));
    setValue('#month',("0" + (date.getMonth() + 1)).slice(-2));
    setValue('#year',date.getFullYear());
}

function setSelectValues(property, value) {
    let allItems = document.querySelectorAll(property);
    allItems.forEach(item => {
        if(Array.isArray(value)){
            if(value.includes(item.value)) {
                item.checked = true;
            }
        }
        else if(item.value== value) {
            item.checked = true;
        }
    });
}