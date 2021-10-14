const stringifyDate = (date) => {
    const options = {year: 'numeric', month: 'short', day: 'numeric'};
    const newDate = !date ? "undefined" : new Date(date).toLocaleString('en-GB',options);
    return newDate;
}

const update = (node) => {
    let employeeData = EmployeePayrllDataList.find(empData => empData._id == node.id)
    if(!employeeData) return;
    localStorage.setItem('editEmp', JSON.stringify(employeeData));
    window.location.replace(site_properties.addEmployeePayrollData);
}