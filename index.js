let createEmployeeRecord = function(array) {
    return Object.assign({}, {
         firstName: array[0],
         familyName: array[1],
         title: array[2],
         payPerHour: array[3],
         timeInEvents: [],
         timeOutEvents: []
     });
 }
 
 let createEmployeeRecords = function(array) {
     return array.map(a => createEmployeeRecord(a))
 }
 
 let createTimeInEvent = function(dateStamp) {
     let hour = parseInt(dateStamp.split(' ')[1])
     let day = dateStamp.split(' ')[0]
     this.timeInEvents.push({
         type: "TimeIn",
         hour: hour,
         date: day
     });
     return this
 }
 
 let createTimeOutEvent = function(dateStamp) {
     let hour = parseInt(dateStamp.split(' ')[1])
     let day = dateStamp.split(' ')[0]
     this.timeOutEvents.push({
         type: "TimeOut",
         hour: hour,
         date: day
     });
     return this
 }
 
 let hoursWorkedOnDate = function(dateStamp) {
     let timeIn = this.timeInEvents.find(time => time.date === dateStamp)
     let timeOut = this.timeOutEvents.find(time => time.date === dateStamp)
     let hoursWorked = parseInt(timeOut.hour - timeIn.hour)/100
     return hoursWorked
 }
 
 let wagesEarnedOnDate = function(dateStamp) {
     let hours = hoursWorkedOnDate.call(this, dateStamp)
     let wagePerHour = this.payPerHour
     let wagesEarned = hours * wagePerHour
     return wagesEarned
 }
 
 let findEmployeeByFirstName = function(array, name) {
     return array.find(a => {return a.firstName === name})
 }
 
 let calculatePayroll = function(records) {
     let wagesArray = records.map(record => allWagesFor.call(record))
     return wagesArray.reduce((total, element, start = 0) => total = total + element)
 }

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}