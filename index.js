// Your code here
// 1. Create a single employee record
function createEmployeeRecord(arr) {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

// 2. Create multiple employee records
function createEmployeeRecords(arrOfArrs) {
  return arrOfArrs.map(createEmployeeRecord);
}

// 3. Record Time In event
function createTimeInEvent(employee, timestamp) {
  const [date, hour] = timestamp.split(" ");
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour),
    date: date,
  });
  return employee;
}

// 4. Record Time Out event
function createTimeOutEvent(employee, timestamp) {
  const [date, hour] = timestamp.split(" ");
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour),
    date: date,
  });
  return employee;
}

// 5. Calculate hours worked on a specific date
function hoursWorkedOnDate(employee, date) {
  const timeIn = employee.timeInEvents.find(e => e.date === date);
  const timeOut = employee.timeOutEvents.find(e => e.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
}

// 6. Calculate wages earned on a specific date
function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

// 7. Calculate total wages for all dates
function allWagesFor(employee) {
  const datesWorked = employee.timeInEvents.map(e => e.date);
  return datesWorked.reduce((total, date) => {
    return total + wagesEarnedOnDate(employee, date);
  }, 0);
}

// 8. Calculate total payroll for all employees
function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce((total, emp) => {
    return total + allWagesFor(emp);
  }, 0);
}
