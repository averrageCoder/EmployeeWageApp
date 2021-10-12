const salary = document.querySelector('#salary');
const salary_output = document.querySelector('.salary-output');
salary_output.textContent = salary.value;
salary.addEventListener('input',function() {
    salary_output.textContent = salary.value;
});

document.getElementsByClassName("submitButton").disabled = true;
function validateName() {
    const text = document.querySelector('#name');
    const text_error = document.querySelector('.name-error');
    let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
    if(nameRegex.test(text.value)) {
        text_error.textContent = "";
        return true;
    }
    else {
        text_error.textContent = "Name is incorrect!";
        return false;
    }
}

const text = document.querySelector('#name');
text.addEventListener('input', validateName);


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

function save() {
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