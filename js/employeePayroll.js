const salary = document.querySelector('#salary');
const salary_output = document.querySelector('.salary-output');
salary_output.textContent = salary.value;
salary.addEventListener('input',function() {
    salary_output.textContent = salary.value;
});

function save() {
    const name_val = document.querySelector('#name').value;
    const salary_val = salary.value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const day = document.querySelector('#day').value;
    const month = parseInt(document.querySelector('#month').value) -1;
    const year = document.querySelector('#year').value;
    const start_date = new Date(year,month,day);
    console.log(start_date);
    try {
        let newEmployeePayrllData  = new EmployeePayrllData(1, name_val,salary_val, gender, start_date);
        alert("saved successfully : "+ newEmployeePayrllData);
    }
    catch (e) {
        alert(e);
    }
}