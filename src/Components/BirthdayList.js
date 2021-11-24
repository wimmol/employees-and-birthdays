import './BirthdayList.css'

function BirthdayList({actives}) {
    if (actives.length === 0)
        return (<div className="birthday-list">
            <h2>Birthdays</h2>
            <div className="birthday-list__month">
                <p className="birthday-list__empty">Employees List is empty</p>
            </div>
        </div>)
    let months = 'November December January February March April May June July August September October'.split(' ')
    actives = actives.sort((a, b) => a.lastName > b.lastName ? 1 : -1)
    let list = months.map((month, index) =>
        actives
            .filter(employee => {
                let monthNum = (Number.parseInt(employee.dob.split('-')[1]) + 1) % 12
                return monthNum === index ? 1 : 0
            })
            .map(employee => {
                let day = Number.parseInt(employee.dob.split('-')[2])
                let year = Number.parseInt(employee.dob.split('-')[0])
                return (
                        <p key={employee.id} className="birthday-list__employee">
                            <span className="employee__name">{employee.firstName + ' ' + employee.lastName}</span>
                            {' - ' + day + ' ' + month + ', ' + year + ' year'}
                        </p>
                )
            }))
        .map(array => {
            if (array.length === 0) {
                return <p className="employee-name">No Employees</p>
            } else {
                return array
            }
        })

    function getRandomColor() {
        let which = Math.floor(Math.random() * 3)
        let a = [Math.floor(Math.random() * 30) + 220, Math.floor(Math.random() * 30) + 220, 255]
        return '#' + a[which % 3].toString(16) + a[(which+1) % 3].toString(16) + a[(which+2) % 3].toString(16)
    }


    return (
        <div className="birthday-list">
            <h2>Birthdays</h2>
            <div className="birthday-list__months-list">
                {months.map((month, index) =>
                    <div key={month} className="birthday-list__month" style={{backgroundColor: getRandomColor()}}>
                        <p className="birthday-list__month-name">{month}</p>
                        {list[index]}
                    </div>
                )}
            </div>
        </div>
    );
}

export default BirthdayList;
